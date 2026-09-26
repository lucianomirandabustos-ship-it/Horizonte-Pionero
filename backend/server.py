from fastapi import FastAPI, APIRouter, Header, HTTPException, UploadFile, File, Form, Query, Request
from fastapi.responses import FileResponse, Response, HTMLResponse, JSONResponse
from fastapi.concurrency import run_in_threadpool
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any, Literal
import bcrypt

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Database connection: MONGODB_URI (e.g. MongoDB Atlas M0) or MONGO_URL or localhost fallback
mongo_url = os.environ.get('MONGODB_URI') or os.environ.get('MONGO_URL') or 'mongodb://localhost:27017'
db_name = os.environ.get('DB_NAME') or 'test_database'
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# --------- Storage Configuration (Hybrid: Cloudinary Cloud + Local Fallback) ---------
APP_NAME = "horizonte-pionero"
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MASTER_DIRIGENTE_KEY = os.environ.get("MASTER_DIRIGENTE_KEY", "ASB-HORIZONTE-2026")

try:
    import cloudinary
    import cloudinary.uploader
    HAS_CLOUDINARY = True
except ImportError:
    HAS_CLOUDINARY = False

CLOUDINARY_CLOUD_NAME = os.environ.get("CLOUDINARY_CLOUD_NAME")
CLOUDINARY_API_KEY = os.environ.get("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET = os.environ.get("CLOUDINARY_API_SECRET")

if HAS_CLOUDINARY and CLOUDINARY_CLOUD_NAME and CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET:
    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_API_SECRET,
        secure=True
    )

# --------- Models ---------
class RegisterInput(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: Literal["pionero", "dirigente"] = "pionero"
    group_number: Optional[str] = None
    patrol: Optional[str] = None
    stage: Optional[Literal["busqueda", "encuentro", "desafio"]] = None
    credential_code: Optional[str] = None
    master_key: Optional[str] = None

class LoginInput(BaseModel):
    email: EmailStr
    password: str

class GoogleSessionRequest(BaseModel):
    session_id: str

class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    patrol: Optional[str] = None
    blood_type: Optional[str] = None
    emergency_contact: Optional[str] = None
    emergency_phone: Optional[str] = None
    camping_nights: Optional[int] = None
    group_number: Optional[str] = None
    stage: Optional[str] = None
    credential_doc_path: Optional[str] = None
    allergies: Optional[str] = None
    medical_conditions: Optional[str] = None
    medical_insurance: Optional[str] = None

class StatePayload(BaseModel):
    state: Dict[str, Any]

class ApprovalRequestInput(BaseModel):
    kind: Literal["patria", "progression", "camping", "service", "tribu"]
    ref_id: str
    stage: Optional[str] = None
    text: Optional[str] = None
    note: Optional[str] = None
    nights: Optional[int] = None
    date: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    place: Optional[str] = None

class ApprovalDecisionInput(BaseModel):
    approved: bool
    note: Optional[str] = None

class GalleryPostInput(BaseModel):
    caption: str
    file_path: str

class EventInput(BaseModel):
    id: Optional[str] = None
    title: str
    date: str  # ISO or free text
    time: Optional[str] = None
    place: str
    description: Optional[str] = None
    equipment: List[str] = Field(default_factory=list)
    category: Optional[str] = None

# --------- Helpers ---------
def utc_now():
    return datetime.now(timezone.utc)

def public_user(user: Dict[str, Any]) -> Dict[str, Any]:
    return {
        "user_id": user["user_id"],
        "email": user["email"],
        "name": user.get("name", "Pionero"),
        "picture": user.get("picture"),
        "role": user.get("role", "pionero"),
        "verification_status": user.get("verification_status", "verificado"),
        "profile": user.get("profile", {}),
        "credential_code": user.get("credential_code"),
        "credential_doc_path": user.get("credential_doc_path"),
    }

async def create_session(user_id: str):
    token = uuid.uuid4().hex + uuid.uuid4().hex
    await db.user_sessions.insert_one({
        "session_token": token,
        "user_id": user_id,
        "created_at": utc_now(),
        "expires_at": utc_now() + timedelta(days=7),
    })
    return token

async def current_user(authorization: Optional[str]) -> Dict[str, Any]:
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")
    token = authorization.split(" ", 1)[1].strip()
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")
    expires_at = session["expires_at"]
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at <= utc_now():
        raise HTTPException(status_code=401, detail="Expired session")
    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

async def require_dirigente(authorization: Optional[str]) -> Dict[str, Any]:
    user = await current_user(authorization)
    if user.get("role") != "dirigente" or user.get("verification_status") != "verificado":
        raise HTTPException(status_code=403, detail="Solo dirigentes verificados")
    return user

DEFAULT_STATE = {
    "progress": {"Búsqueda": 30, "Encuentro": 35, "Desafío": 40},
    "completedProgress": {"Búsqueda": 0, "Encuentro": 0, "Desafío": 0},
    "patria": [False] * 15,
    "patria_status": ["idle"] * 15,   # idle | pendiente | aprobado | rechazado
    "patria_notes": [""] * 15,
    "specialties": ["Primeros Auxilios", "Campista", "Conservacionista", "Cocinero", "Fotógrafo", "Orientación", "Nudos", "Liderazgo", "Astronomía", "Ciclismo", "Comunicación", "Rescate", "Arte"],
    "notes": [],
    "projects": [],
    "service": [],
    "events": [],
    "announcements": [
        {"id": "news-1", "title": "Bienvenidos a Horizonte Pionero", "body": "Registra tus avances, momentos y servicio en un solo lugar.", "date": "Hoy"},
    ],
    "earthTribe": [],
    "progression": {"busqueda": [], "encuentro": [], "desafio": []},
}

# --------- Base ---------
@api_router.get("/")
async def root():
    return {"message": "Horizonte Pionero API"}

@api_router.get("/auth/bootstrap-status")
async def bootstrap_status():
    """Indica si aún no hay ningún dirigente verificado (permitir usar Master Key para el primer registro)."""
    verified_count = await db.users.count_documents({"role": "dirigente", "verification_status": "verificado"})
    return {"bootstrap_available": verified_count == 0}

STATIC_DIR = ROOT_DIR / "static"
PDF_FILES = {"agenda": "agenda-pionero.pdf", "specialties": "especialidades-scouts.pdf"}

@api_router.get("/docs/{kind}")
async def get_doc(kind: str, download: bool = False):
    filename = PDF_FILES.get(kind)
    if not filename:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    path = STATIC_DIR / filename
    if not path.exists():
        raise HTTPException(status_code=404, detail="Archivo no disponible")
    disposition = "attachment" if download else "inline"
    return FileResponse(
        path,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'{disposition}; filename="{filename}"',
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    )

@api_router.get("/docs/{kind}/viewer", response_class=HTMLResponse)
async def get_doc_viewer(kind: str):
    filename = PDF_FILES.get(kind)
    if not filename:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    path = STATIC_DIR / filename
    if not path.exists():
        raise HTTPException(status_code=404, detail="Archivo no disponible")
    
    title = "Agenda del Pionero" if kind == "agenda" else "Especialidades Scouts"
    doc_url = f"/api/docs/{kind}"
    
    html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3, user-scalable=yes">
  <title>{title}</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
  <style>
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      background: #14081F;
      color: #FFFFFF;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }}
    .toolbar {{
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #241035;
      border-bottom: 1px solid #472057;
      padding: 10px 14px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    }}
    .nav-group {{
      display: flex;
      align-items: center;
      gap: 6px;
    }}
    button {{
      background: #361952;
      color: #FFFFFF;
      border: 1px solid #4B245E;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
    }}
    button:active {{
      background: #D62828;
    }}
    button:disabled {{
      opacity: 0.4;
      cursor: not-allowed;
    }}
    .page-info {{
      font-size: 12px;
      font-weight: 700;
      color: #F4A261;
      padding: 0 4px;
    }}
    .download-btn {{
      background: #D62828;
      border-color: #D62828;
      color: #FFFFFF;
      text-decoration: none;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 800;
      display: inline-flex;
      align-items: center;
    }}
    #viewer-container {{
      flex: 1;
      overflow: auto;
      padding: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }}
    #canvas-wrapper {{
      box-shadow: 0 6px 20px rgba(0,0,0,0.7);
      border-radius: 6px;
      background: #FFFFFF;
      max-width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
    }}
    canvas {{
      display: block;
      max-width: 100%;
      height: auto !important;
    }}
    #status-msg {{
      padding: 40px 20px;
      text-align: center;
      color: #BDAFC9;
      font-size: 14px;
      line-height: 1.6;
    }}
    .spinner {{
      width: 32px;
      height: 32px;
      border: 3px solid #361952;
      border-top: 3px solid #F4A261;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 16px;
    }}
    @keyframes spin {{ 0% {{ transform: rotate(0deg); }} 100% {{ transform: rotate(360deg); }} }}
  </style>
</head>
<body>
  <div class="toolbar">
    <div class="nav-group">
      <button id="prev-btn" onclick="onPrevPage()">◀ Ant</button>
      <span class="page-info" id="page-num-display">Pág. - / -</span>
      <button id="next-btn" onclick="onNextPage()">Sig ▶</button>
    </div>
    <div class="nav-group">
      <button onclick="zoomOut()">−</button>
      <button onclick="zoomIn()">+</button>
      <a href="{doc_url}?download=true" class="download-btn" download>Descargar</a>
    </div>
  </div>

  <div id="viewer-container">
    <div id="status-msg">
      <div class="spinner"></div>
      Cargando documento oficial ({title})...
    </div>
    <div id="canvas-wrapper" style="display: none;">
      <canvas id="pdf-canvas"></canvas>
    </div>
  </div>

  <script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    
    let pdfDoc = null;
    let pageNum = 1;
    let pageRendering = false;
    let pageNumPending = null;
    let scale = 1.3;
    const canvas = document.getElementById('pdf-canvas');
    const ctx = canvas.getContext('2d');
    const wrapper = document.getElementById('canvas-wrapper');
    const statusMsg = document.getElementById('status-msg');
    const pageNumDisplay = document.getElementById('page-num-display');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function renderPage(num) {{
      pageRendering = true;
      pdfDoc.getPage(num).then(function(page) {{
        const viewport = page.getViewport({{ scale: scale }});
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {{
          canvasContext: ctx,
          viewport: viewport
        }};
        const renderTask = page.render(renderContext);

        renderTask.promise.then(function() {{
          pageRendering = false;
          wrapper.style.display = 'flex';
          statusMsg.style.display = 'none';
          if (pageNumPending !== null) {{
            renderPage(pageNumPending);
            pageNumPending = null;
          }}
        }});
      }});

      pageNumDisplay.textContent = `Pág. ${{num}} / ${{pdfDoc.numPages}}`;
      prevBtn.disabled = num <= 1;
      nextBtn.disabled = num >= pdfDoc.numPages;
    }}

    function queueRenderPage(num) {{
      if (pageRendering) {{
        pageNumPending = num;
      }} else {{
        renderPage(num);
      }}
    }}

    function onPrevPage() {{
      if (pageNum <= 1) return;
      pageNum--;
      queueRenderPage(pageNum);
    }}

    function onNextPage() {{
      if (pageNum >= pdfDoc.numPages) return;
      pageNum++;
      queueRenderPage(pageNum);
    }}

    function zoomIn() {{
      scale += 0.25;
      queueRenderPage(pageNum);
    }}

    function zoomOut() {{
      if (scale <= 0.6) return;
      scale -= 0.25;
      queueRenderPage(pageNum);
    }}

    pdfjsLib.getDocument('{doc_url}').promise.then(function(pdfDoc_) {{
      pdfDoc = pdfDoc_;
      renderPage(pageNum);
    }}).catch(function(err) {{
      statusMsg.innerHTML = '<span style="color:#D62828;font-weight:bold;">Error al cargar el PDF:</span> ' + err.message;
    }});
  </script>
</body>
</html>"""
    return HTMLResponse(content=html_content)

CLAVES_DIR = STATIC_DIR / "claves"
CLAVE_FILES = {
    "semaforo": ("semaforo.jpg", "image/jpeg"),
    "siete_cruces": ("siete-cruces.webp", "image/webp"),
    "agujerito": ("agujerito.jpg", "image/jpeg"),
    "tierra_aire": ("tierra-aire.jpg", "image/jpeg"),
    "sordomudo": ("sordomudo.jpg", "image/jpeg"),
}

@api_router.get("/claves/{kind}")
async def get_clave_image(kind: str):
    entry = CLAVE_FILES.get(kind)
    if not entry:
        raise HTTPException(status_code=404, detail="Clave no encontrada")
    filename, media = entry
    path = CLAVES_DIR / filename
    if not path.exists():
        raise HTTPException(status_code=404, detail="Imagen no disponible")
    return FileResponse(path, media_type=media)

# --------- Auth ---------
@api_router.post("/auth/register")
async def register(input: RegisterInput):
    email = input.email.lower()
    if len(input.password) < 6:
        raise HTTPException(status_code=400, detail="La contraseña debe tener al menos 6 caracteres")
    exists = await db.users.find_one({"email": email}, {"_id": 0})
    if exists:
        raise HTTPException(status_code=409, detail="Este correo ya está registrado")

    verification = "verificado"
    if input.role == "dirigente":
        # Bootstrap: master key solo funciona si NO existe todavía ningún dirigente verificado
        verified_count = await db.users.count_documents({"role": "dirigente", "verification_status": "verificado"})
        if verified_count == 0 and input.master_key and input.master_key.strip() == MASTER_DIRIGENTE_KEY and MASTER_DIRIGENTE_KEY:
            verification = "verificado"
        else:
            # A partir del primer dirigente, todos deben ser autorizados por otro dirigente
            verification = "en_revision"

    profile = {
        "patrol": input.patrol or "Patrulla por definir",
        "group_number": input.group_number or "",
        "stage": input.stage or "busqueda",
        "blood_type": "Por registrar",
        "emergency_contact": "",
        "emergency_phone": "",
        "camping_nights": 0,
    }
    user = {
        "user_id": f"user_{uuid.uuid4().hex[:12]}",
        "email": email,
        "name": input.name.strip(),
        "password_hash": hash_password(input.password),
        "role": input.role,
        "verification_status": verification,
        "credential_code": input.credential_code,
        "credential_doc_path": None,
        "profile": profile,
        "created_at": utc_now(),
    }
    await db.users.insert_one(user)
    await db.user_states.insert_one({"user_id": user["user_id"], "state": DEFAULT_STATE, "updated_at": utc_now()})
    token = await create_session(user["user_id"])
    return {"session_token": token, "user": public_user(user)}

@api_router.post("/auth/login")
async def login(input: LoginInput):
    user = await db.users.find_one({"email": input.email.lower()}, {"_id": 0})
    if not user or not user.get("password_hash") or not verify_password(input.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Correo o contraseña incorrectos")
    token = await create_session(user["user_id"])
    return {"session_token": token, "user": public_user(user)}

@api_router.post("/auth/session")
async def auth_session(input: GoogleSessionRequest):
    auth_url = os.environ.get("OAUTH_SESSION_PROVIDER_URL", "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data")
    try:
        async with httpx.AsyncClient(timeout=10) as http:
            response = await http.get(auth_url, headers={"X-Session-ID": input.session_id})
        if response.status_code != 200:
            raise HTTPException(status_code=401, detail="Sesión externa inválida o expirada")
        data = response.json()
    except httpx.RequestError:
        raise HTTPException(status_code=503, detail="Servicio de autenticación externa no disponible")
    email = data.get("email", "").lower()
    if not email:
        raise HTTPException(status_code=401, detail="Google no devolvió un correo")
    user = await db.users.find_one({"email": email}, {"_id": 0})
    if not user:
        user = {
            "user_id": f"user_{uuid.uuid4().hex[:12]}",
            "email": email,
            "name": data.get("name") or "Pionero",
            "picture": data.get("picture"),
            "role": "pionero",
            "verification_status": "verificado",
            "profile": {"camping_nights": 0, "patrol": "Patrulla por definir", "stage": "busqueda", "group_number": ""},
            "created_at": utc_now(),
        }
        await db.users.insert_one(user)
        await db.user_states.insert_one({"user_id": user["user_id"], "state": DEFAULT_STATE, "updated_at": utc_now()})
    token = data.get("session_token") or await create_session(user["user_id"])
    if data.get("session_token"):
        await db.user_sessions.insert_one({"session_token": token, "user_id": user["user_id"], "created_at": utc_now(), "expires_at": utc_now() + timedelta(days=7)})
    return {"session_token": token, "user": public_user(user)}

@api_router.get("/auth/me")
async def me(authorization: Optional[str] = Header(default=None)):
    return {"user": public_user(await current_user(authorization))}

@api_router.post("/auth/logout")
async def logout(authorization: Optional[str] = Header(default=None)):
    if authorization and authorization.lower().startswith("bearer "):
        await db.user_sessions.delete_one({"session_token": authorization.split(" ", 1)[1].strip()})
    return {"ok": True}

# --------- Profile & State ---------
@api_router.get("/profile")
async def get_profile(authorization: Optional[str] = Header(default=None)):
    return {"user": public_user(await current_user(authorization))}

@api_router.put("/profile")
async def update_profile(input: ProfileUpdate, authorization: Optional[str] = Header(default=None)):
    user = await current_user(authorization)
    updates = {k: v for k, v in input.model_dump().items() if v is not None}

    # Inmutabilidad de tipo de sangre: si ya fue registrado previamente (distinto de vacío o 'Por registrar')
    # no se permite modificarlo por seguridad médica.
    current_blood = (user.get("profile") or {}).get("blood_type")
    if current_blood and current_blood not in ["", "Por registrar"]:
        if "blood_type" in updates and updates["blood_type"] != current_blood:
            raise HTTPException(
                status_code=400,
                detail="El tipo de sangre ya ha sido registrado y no puede ser modificado por seguridad médica"
            )

    top_level = {}
    if updates.get("name"):
        top_level["name"] = updates.pop("name")
    if "credential_doc_path" in updates:
        top_level["credential_doc_path"] = updates.pop("credential_doc_path")
    profile_updates = {f"profile.{k}": v for k, v in updates.items()}
    payload = {**top_level, **profile_updates}
    if payload:
        await db.users.update_one({"user_id": user["user_id"]}, {"$set": payload})
    fresh = await db.users.find_one({"user_id": user["user_id"]}, {"_id": 0})
    return {"user": public_user(fresh)}

@api_router.get("/state")
async def get_state(authorization: Optional[str] = Header(default=None)):
    user = await current_user(authorization)
    record = await db.user_states.find_one({"user_id": user["user_id"]}, {"_id": 0})
    if not record:
        await db.user_states.insert_one({"user_id": user["user_id"], "state": DEFAULT_STATE, "updated_at": utc_now()})
        return {"state": DEFAULT_STATE}
    return {"state": record.get("state", DEFAULT_STATE)}

@api_router.put("/state")
async def put_state(input: StatePayload, authorization: Optional[str] = Header(default=None)):
    user = await current_user(authorization)
    await db.user_states.update_one({"user_id": user["user_id"]}, {"$set": {"state": input.state, "updated_at": utc_now()}}, upsert=True)
    return {"state": input.state, "saved": True}

# --------- File Upload (Cloudinary Cloud Storage + Local Static Fallback) ---------
@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...), purpose: str = Form("misc"), authorization: Optional[str] = Header(default=None)):
    user = await current_user(authorization)
    contents = await file.read()
    if len(contents) > 12 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="El archivo excede 12 MB")

    # 1. Si Cloudinary está configurado, guardar de forma persistente en la nube (25 GB gratis)
    if HAS_CLOUDINARY and CLOUDINARY_CLOUD_NAME and CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET:
        try:
            res = await run_in_threadpool(
                cloudinary.uploader.upload,
                contents,
                folder=f"{APP_NAME}/{purpose}/{user['user_id']}",
                resource_type="auto"
            )
            cloud_url = res.get("secure_url") or res.get("url")
            await db.uploads.insert_one({
                "path": cloud_url,
                "owner_id": user["user_id"],
                "purpose": purpose,
                "content_type": file.content_type or "application/octet-stream",
                "original_name": file.filename,
                "size": len(contents),
                "storage": "cloudinary",
                "created_at": utc_now(),
            })
            return {"path": cloud_url, "size": len(contents)}
        except Exception as e:
            logging.warning(f"Error al subir a Cloudinary ({e}), recurriendo a almacenamiento local.")

    # 2. Almacenamiento local (desarrollo o fallback)
    ext = (file.filename or "").split(".")[-1].lower() if file.filename and "." in file.filename else "bin"
    ext = ext[:10]
    obj_path = f"{APP_NAME}/uploads/{user['user_id']}/{uuid.uuid4().hex}.{ext}"
    dest_path = UPLOAD_DIR / obj_path
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    with open(dest_path, "wb") as f:
        f.write(contents)

    await db.uploads.insert_one({
        "path": obj_path,
        "owner_id": user["user_id"],
        "purpose": purpose,
        "content_type": file.content_type or "application/octet-stream",
        "original_name": file.filename,
        "size": len(contents),
        "storage": "local",
        "created_at": utc_now(),
    })
    return {"path": obj_path, "size": len(contents)}

@api_router.get("/files/{full_path:path}")
async def get_file(full_path: str, token: Optional[str] = Query(default=None), authorization: Optional[str] = Header(default=None)):
    if full_path.startswith("http://") or full_path.startswith("https://"):
        from fastapi.responses import RedirectResponse
        return RedirectResponse(url=full_path)

    # Web can't send auth headers on <img>, allow token query param
    if authorization:
        user = await current_user(authorization)
    elif token:
        session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
        if not session:
            raise HTTPException(status_code=401, detail="Token inválido")
        user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")
    else:
        raise HTTPException(status_code=401, detail="Se requiere autenticación")

    record = await db.uploads.find_one({"path": full_path}, {"_id": 0})
    if not record:
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    # Allow: owner, dirigente verificado, o si es foto pública del libro de oro
    if record.get("purpose") != "gallery" and record["owner_id"] != user["user_id"] and not (user.get("role") == "dirigente" and user.get("verification_status") == "verificado"):
        raise HTTPException(status_code=403, detail="Sin permiso")

    file_path = UPLOAD_DIR / full_path
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Archivo no disponible")
    return FileResponse(file_path, media_type=record.get("content_type") or "application/octet-stream")

# --------- Dirigente: Verification management ---------
@api_router.get("/admin/dirigentes/pending")
async def list_pending_dirigentes(authorization: Optional[str] = Header(default=None)):
    await require_dirigente(authorization)
    rows = await db.users.find({"role": "dirigente", "verification_status": "en_revision"}, {"_id": 0, "password_hash": 0}).to_list(200)
    return {"pending": [public_user(u) for u in rows]}

@api_router.post("/admin/dirigentes/{user_id}/approve")
async def approve_dirigente(user_id: str, authorization: Optional[str] = Header(default=None)):
    admin = await require_dirigente(authorization)
    result = await db.users.update_one({"user_id": user_id, "role": "dirigente"}, {"$set": {"verification_status": "verificado", "verified_by": admin["user_id"], "verified_at": utc_now()}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Dirigente no encontrado")
    return {"ok": True}

@api_router.post("/admin/dirigentes/{user_id}/reject")
async def reject_dirigente(user_id: str, authorization: Optional[str] = Header(default=None)):
    admin = await require_dirigente(authorization)
    await db.users.update_one({"user_id": user_id, "role": "dirigente"}, {"$set": {"verification_status": "rechazado", "verified_by": admin["user_id"], "verified_at": utc_now()}})
    return {"ok": True}

# --------- Fichas médicas (solo dirigentes verificados) ---------
@api_router.get("/admin/pioneros")
async def list_pioneros_fichas(authorization: Optional[str] = Header(default=None)):
    """Devuelve la ficha médica y de identificación de todos los pioneros. Solo dirigentes verificados."""
    admin = await require_dirigente(authorization)
    rows = await db.users.find({"role": "pionero"}, {"_id": 0, "password_hash": 0}).sort("name", 1).to_list(500)
    fichas = []
    for u in rows:
        profile = u.get("profile", {}) or {}
        fichas.append({
            "user_id": u["user_id"],
            "name": u.get("name", "Pionero"),
            "email": u.get("email"),
            "patrol": profile.get("patrol"),
            "group_number": profile.get("group_number"),
            "stage": profile.get("stage"),
            "blood_type": profile.get("blood_type"),
            "allergies": profile.get("allergies"),
            "medical_conditions": profile.get("medical_conditions"),
            "medical_insurance": profile.get("medical_insurance"),
            "emergency_contact": profile.get("emergency_contact"),
            "emergency_phone": profile.get("emergency_phone"),
            "camping_nights": profile.get("camping_nights", 0),
        })
    # Audit log for privacy tracking
    await db.access_log.insert_one({
        "actor_id": admin["user_id"],
        "actor_name": admin.get("name"),
        "action": "list_pioneros_fichas",
        "count": len(fichas),
        "at": utc_now(),
    })
    return {"pioneros": fichas}

# --------- Approvals inbox (Patria + Progression) ---------
@api_router.post("/approvals/request")
async def request_approval(input: ApprovalRequestInput, authorization: Optional[str] = Header(default=None)):
    user = await current_user(authorization)
    doc = {
        "approval_id": f"apr_{uuid.uuid4().hex[:12]}",
        "user_id": user["user_id"],
        "user_name": user.get("name"),
        "user_patrol": user.get("profile", {}).get("patrol"),
        "kind": input.kind,
        "ref_id": input.ref_id,
        "stage": input.stage,
        "text": input.text,
        "note": input.note,
        "nights": input.nights,
        "date": input.date,
        "start_date": input.start_date,
        "end_date": input.end_date,
        "place": input.place,
        "status": "pendiente",
        "created_at": utc_now(),
    }
    await db.approvals.insert_one(doc)
    state_rec = await db.user_states.find_one({"user_id": user["user_id"]}, {"_id": 0})
    state = state_rec.get("state") if state_rec else DEFAULT_STATE.copy()
    if input.kind == "patria":
        idx = int(input.ref_id)
        patria_status = list(state.get("patria_status") or ["idle"] * 15)
        while len(patria_status) < 15:
            patria_status.append("idle")
        patria_status[idx] = "pendiente"
        state["patria_status"] = patria_status
    elif input.kind == "progression" and input.stage:
        prog = state.get("progression") or {"busqueda": [], "encuentro": [], "desafio": []}
        lst = prog.get(input.stage, [])
        for obj in lst:
            if obj.get("id") == input.ref_id:
                obj["status"] = "pendiente"
        prog[input.stage] = lst
        state["progression"] = prog
    elif input.kind == "camping":
        # add to camp log optimistically; nights counter update remains local until aprobar
        camps = state.get("camping_log") or []
        camps.append({
            "id": input.ref_id,
            "place": input.place,
            "date": input.date,
            "start_date": input.start_date,
            "end_date": input.end_date,
            "nights": input.nights or 0,
            "status": "pendiente",
        })
        state["camping_log"] = camps
    elif input.kind == "service":
        services = state.get("service_log") or []
        services.append({
            "id": input.ref_id,
            "title": input.text or input.place or "Servicio",
            "hours": input.nights or 0,  # reusing nights field as hours
            "date": input.date,
            "note": input.note,
            "status": "pendiente",
        })
        state["service_log"] = services
    elif input.kind == "tribu":
        tribu = state.get("tribu_tierra") or {}
        entry = tribu.get(input.ref_id) or {"checks": {}, "approved": False}
        entry["status"] = "pendiente"
        entry["approved"] = False
        entry["program_name"] = input.text or entry.get("program_name")
        tribu[input.ref_id] = entry
        state["tribu_tierra"] = tribu
    await db.user_states.update_one({"user_id": user["user_id"]}, {"$set": {"state": state, "updated_at": utc_now()}}, upsert=True)
    doc_out = {k: v for k, v in doc.items() if k != "_id"}
    return {"approval": doc_out}

@api_router.get("/approvals/mine")
async def my_approvals(authorization: Optional[str] = Header(default=None)):
    user = await current_user(authorization)
    rows = await db.approvals.find({"user_id": user["user_id"]}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return {"approvals": rows}

@api_router.get("/admin/approvals/inbox")
async def admin_inbox(authorization: Optional[str] = Header(default=None)):
    await require_dirigente(authorization)
    rows = await db.approvals.find({"status": "pendiente"}, {"_id": 0}).sort("created_at", 1).to_list(500)
    return {"pending": rows}

@api_router.post("/admin/approvals/{approval_id}/decide")
async def decide_approval(approval_id: str, input: ApprovalDecisionInput, authorization: Optional[str] = Header(default=None)):
    admin = await require_dirigente(authorization)
    appr = await db.approvals.find_one({"approval_id": approval_id}, {"_id": 0})
    if not appr:
        raise HTTPException(status_code=404, detail="Solicitud no encontrada")
    new_status = "aprobado" if input.approved else "rechazado"
    await db.approvals.update_one({"approval_id": approval_id}, {"$set": {
        "status": new_status,
        "reviewed_by": admin["user_id"],
        "reviewer_name": admin.get("name"),
        "reviewer_credential_code": admin.get("credential_code"),
        "reviewer_credential_doc_path": admin.get("credential_doc_path"),
        "reviewed_at": utc_now(),
        "review_note": input.note,
    }})
    state_rec = await db.user_states.find_one({"user_id": appr["user_id"]}, {"_id": 0})
    if state_rec:
        state = state_rec.get("state", DEFAULT_STATE.copy())
        if appr["kind"] == "patria":
            idx = int(appr["ref_id"])
            patria = list(state.get("patria") or [False] * 15)
            while len(patria) < 15:
                patria.append(False)
            status = list(state.get("patria_status") or ["idle"] * 15)
            while len(status) < 15:
                status.append("idle")
            notes = list(state.get("patria_notes") or [""] * 15)
            while len(notes) < 15:
                notes.append("")
            status[idx] = new_status
            notes[idx] = input.note or ""
            if input.approved:
                patria[idx] = True
            state["patria"] = patria
            state["patria_status"] = status
            state["patria_notes"] = notes
        elif appr["kind"] == "progression" and appr.get("stage"):
            prog = state.get("progression") or {"busqueda": [], "encuentro": [], "desafio": []}
            lst = prog.get(appr["stage"], [])
            for obj in lst:
                if obj.get("id") == appr["ref_id"]:
                    obj["status"] = new_status
                    obj["approved"] = input.approved
                    obj["review_note"] = input.note or ""
            prog[appr["stage"]] = lst
            state["progression"] = prog
        elif appr["kind"] == "camping":
            camps = state.get("camping_log") or []
            for c in camps:
                if c.get("id") == appr["ref_id"]:
                    c["status"] = new_status
                    c["review_note"] = input.note or ""
            state["camping_log"] = camps
        elif appr["kind"] == "service":
            services = state.get("service_log") or []
            for s in services:
                if s.get("id") == appr["ref_id"]:
                    s["status"] = new_status
                    s["review_note"] = input.note or ""
            state["service_log"] = services
        elif appr["kind"] == "tribu":
            tribu = state.get("tribu_tierra") or {}
            entry = tribu.get(appr["ref_id"]) or {"checks": {}, "approved": False}
            entry["status"] = new_status
            entry["approved"] = bool(input.approved)
            entry["review_note"] = input.note or ""
            tribu[appr["ref_id"]] = entry
            state["tribu_tierra"] = tribu
        await db.user_states.update_one({"user_id": appr["user_id"]}, {"$set": {"state": state, "updated_at": utc_now()}})
    return {"ok": True, "status": new_status}

# --------- Libro de Oro (shared gallery) ---------
@api_router.get("/gallery")
async def gallery_feed(authorization: Optional[str] = Header(default=None)):
    await current_user(authorization)
    rows = await db.gallery.find({"deleted_at": None}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return {"posts": rows}

@api_router.post("/gallery")
async def gallery_post(input: GalleryPostInput, authorization: Optional[str] = Header(default=None)):
    user = await current_user(authorization)
    upload = await db.uploads.find_one({"path": input.file_path, "owner_id": user["user_id"]}, {"_id": 0})
    if not upload:
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    await db.uploads.update_one({"path": input.file_path}, {"$set": {"purpose": "gallery"}})
    post = {
        "post_id": f"post_{uuid.uuid4().hex[:12]}",
        "user_id": user["user_id"],
        "user_name": user.get("name"),
        "user_patrol": user.get("profile", {}).get("patrol"),
        "caption": input.caption.strip(),
        "file_path": input.file_path,
        "created_at": utc_now(),
        "deleted_at": None,
    }
    await db.gallery.insert_one(post)
    post_out = {k: v for k, v in post.items() if k != "_id"}
    return {"post": post_out}

@api_router.delete("/gallery/{post_id}")
async def gallery_delete(post_id: str, authorization: Optional[str] = Header(default=None)):
    user = await current_user(authorization)
    post = await db.gallery.find_one({"post_id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
    if post["user_id"] != user["user_id"] and user.get("role") != "dirigente":
        raise HTTPException(status_code=403, detail="Sin permiso")
    await db.gallery.update_one({"post_id": post_id}, {"$set": {"deleted_at": utc_now()}})
    return {"ok": True}

# --------- Itinerary / Calendar ---------
@api_router.get("/calendar")
async def calendar_feed(authorization: Optional[str] = Header(default=None)):
    await current_user(authorization)
    rows = await db.calendar.find({"deleted_at": None}, {"_id": 0}).sort("date", 1).to_list(500)
    return {"events": rows}

@api_router.post("/calendar")
async def calendar_create(input: EventInput, authorization: Optional[str] = Header(default=None)):
    admin = await require_dirigente(authorization)
    event = {
        "event_id": input.id or f"evt_{uuid.uuid4().hex[:12]}",
        "title": input.title.strip(),
        "date": input.date.strip(),
        "time": input.time,
        "place": input.place.strip(),
        "description": input.description,
        "equipment": input.equipment,
        "category": input.category,
        "created_by": admin["user_id"],
        "creator_name": admin.get("name"),
        "created_at": utc_now(),
        "deleted_at": None,
    }
    await db.calendar.insert_one(event)
    event_out = {k: v for k, v in event.items() if k != "_id"}
    return {"event": event_out}

@api_router.delete("/calendar/{event_id}")
async def calendar_delete(event_id: str, authorization: Optional[str] = Header(default=None)):
    await require_dirigente(authorization)
    await db.calendar.update_one({"event_id": event_id}, {"$set": {"deleted_at": utc_now()}})
    return {"ok": True}

@app.get("/")
@app.get("/health")
async def health_check():
    return {
        "status": "online",
        "app": "Horizonte Pionero API",
        "scout_unit": "Pioneros Tarija - ASB",
        "version": "1.0.1 - native-bcrypt"
    }

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    import traceback
    tb = traceback.format_exc()
    logger.error(f"Error procesando {request.method} {request.url.path}: {tb}")
    return JSONResponse(
        status_code=500,
        content={"detail": f"{type(exc).__name__}: {str(exc)}", "trace": tb}
    )

app.include_router(api_router)

@app.on_event("startup")
async def _startup():
    try:
        await db.users.create_index("email", unique=True)
        await db.users.create_index("user_id", unique=True)
        await db.user_sessions.create_index("session_token", unique=True)
        await db.user_sessions.create_index("expires_at", expireAfterSeconds=0)
        await db.user_states.create_index("user_id", unique=True)
        await db.approvals.create_index("approval_id", unique=True)
        await db.approvals.create_index([("status", 1), ("created_at", 1)])
        await db.gallery.create_index("post_id", unique=True)
        await db.gallery.create_index([("deleted_at", 1), ("created_at", -1)])
        await db.calendar.create_index("event_id", unique=True)
        await db.uploads.create_index("path", unique=True)
        logger.info("MongoDB indexes verified successfully.")
    except Exception as e:
        logger.warning(f"Aviso de conexion a MongoDB durante el inicio: {e}")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
