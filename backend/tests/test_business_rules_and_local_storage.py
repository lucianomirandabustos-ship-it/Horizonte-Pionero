"""
Test suite for new business rules, blood type immutability, camping dates range, and local static storage.
"""
import io
import os
import uuid
import pytest
import requests
from pathlib import Path
from dotenv import load_dotenv

# Load backend and frontend env
ROOT_DIR = Path(__file__).resolve().parents[2]
load_dotenv(ROOT_DIR / "frontend" / ".env")
load_dotenv(ROOT_DIR / "backend" / ".env")

BASE_URL = (os.environ.get("EXPO_PUBLIC_BACKEND_URL") or os.environ.get("EXPO_BACKEND_URL") or "http://localhost:8000").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin.qa@example.com"
ADMIN_PASSWORD = "Admin123!"

@pytest.fixture(scope="module")
def admin_token():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=30)
    assert r.status_code == 200, f"admin login failed: {r.status_code} {r.text}"
    return r.json()["session_token"]

@pytest.fixture
def new_pionero():
    """Register a clean test pionero for testing profile updates and immutability."""
    email = f"pionero_{uuid.uuid4().hex[:8]}@example.com"
    pwd = "Agenda123!"
    r = requests.post(f"{API}/auth/register", json={
        "email": email,
        "password": pwd,
        "name": "Pionero Test Inmutable",
        "role": "pionero",
        "patrol": "Halcones",
    }, timeout=30)
    assert r.status_code == 200, f"register failed: {r.status_code} {r.text}"
    token = r.json()["session_token"]
    headers = {"Authorization": f"Bearer {token}"}
    return {"email": email, "token": token, "headers": headers}

# ----------------- 1. Inmutabilidad del Tipo de Sangre -----------------

def test_blood_type_first_save_allowed(new_pionero):
    """La primera vez que se llena la ficha médica, el tipo de sangre DEBE guardarse exitosamente."""
    headers = new_pionero["headers"]
    payload = {
        "blood_type": "A+",
        "emergency_contact": "Contacto Familiar",
        "emergency_phone": "+591 70000000",
    }
    r = requests.put(f"{API}/profile", json=payload, headers=headers, timeout=20)
    assert r.status_code == 200, f"first save should succeed: {r.text}"
    profile = r.json()["user"]["profile"]
    assert profile["blood_type"] == "A+"

def test_blood_type_modification_blocked_after_first_save(new_pionero):
    """Una vez guardado por primera vez en la BD, cualquier intento de modificar blood_type debe ser bloqueado con HTTP 400."""
    headers = new_pionero["headers"]
    # 1. First save: set to A+
    r1 = requests.put(f"{API}/profile", json={"blood_type": "A+"}, headers=headers, timeout=20)
    assert r1.status_code == 200

    # 2. Second update: try to change from A+ to O-
    r2 = requests.put(f"{API}/profile", json={"blood_type": "O-"}, headers=headers, timeout=20)
    assert r2.status_code == 400, f"modification must be blocked: {r2.status_code} {r2.text}"
    assert "El tipo de sangre ya ha sido registrado" in r2.json().get("detail", "")

    # 3. Third update: send same blood_type A+ (idempotent / unchanged) -> should succeed
    r3 = requests.put(f"{API}/profile", json={"blood_type": "A+", "allergies": "Ninguna"}, headers=headers, timeout=20)
    assert r3.status_code == 200
    assert r3.json()["user"]["profile"]["blood_type"] == "A+"
    assert r3.json()["user"]["profile"]["allergies"] == "Ninguna"

# ----------------- 2. Malla de Campamentos: Fechas (Inicio - Fin) y Días -----------------

def test_camping_approval_stores_start_end_dates_and_days(new_pionero, admin_token):
    """El registro de campamento debe almacenar place, start_date, end_date, nights y date explícitos."""
    headers = new_pionero["headers"]
    ref_id = f"camp_test_{uuid.uuid4().hex[:6]}"
    payload = {
        "kind": "camping",
        "ref_id": ref_id,
        "place": "Valle de San Lorenzo",
        "start_date": "2026-10-10",
        "end_date": "2026-10-13",
        "date": "2026-10-10 al 2026-10-13",
        "nights": 3,
        "text": "Valle de San Lorenzo · 3 días (2026-10-10 al 2026-10-13)",
    }
    r = requests.post(f"{API}/approvals/request", json=payload, headers=headers, timeout=20)
    assert r.status_code == 200, f"request failed: {r.text}"
    appr = r.json()["approval"]
    assert appr["start_date"] == "2026-10-10"
    assert appr["end_date"] == "2026-10-13"
    assert appr["nights"] == 3
    assert appr["place"] == "Valle de San Lorenzo"

    # Verificar que el dirigente ve la solicitud en inbox con todos los datos
    r_inbox = requests.get(f"{API}/admin/approvals/inbox", headers={"Authorization": f"Bearer {admin_token}"}, timeout=20)
    assert r_inbox.status_code == 200
    pending = r_inbox.json()["pending"]
    matching = [p for p in pending if p.get("ref_id") == ref_id]
    assert len(matching) == 1, "Dirigente inbox must contain the new camping approval"
    target = matching[0]
    assert target["start_date"] == "2026-10-10"
    assert target["end_date"] == "2026-10-13"
    assert target["nights"] == 3

# ----------------- 3. Almacenamiento Local de Archivos (Sin Emergent) -----------------

def test_local_storage_upload_and_retrieve(new_pionero):
    """Verifica que el almacenamiento local guarde y sirva archivos sin depender de Emergent."""
    headers = new_pionero["headers"]
    sample_content = b"Horizonte Pionero 100% Offline y Local Storage Test"
    files = {"file": ("test_doc.txt", io.BytesIO(sample_content), "text/plain")}
    data = {"purpose": "misc"}

    # Upload
    r_upload = requests.post(f"{API}/upload", headers=headers, files=files, data=data, timeout=30)
    assert r_upload.status_code == 200, f"upload failed: {r_upload.status_code} {r_upload.text}"
    path = r_upload.json()["path"]
    assert "uploads" in path

    # Retrieve
    r_get = requests.get(f"{API}/files/{path}", headers=headers, timeout=20)
    assert r_get.status_code == 200, f"retrieve failed: {r_get.status_code} {r_get.text}"
    assert r_get.content == sample_content
