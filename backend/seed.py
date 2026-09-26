"""
Script de inicialización y siembra de base de datos para Horizonte Pionero.
Compatible con MongoDB Atlas (Tier M0 Gratuito) y MongoDB local.
Permite migrar y preparar colecciones, índices y cuentas QA sin pérdida de esquemas.
Uso: python seed.py
"""
import os
import sys
from pathlib import Path
from datetime import datetime, timezone, timedelta
from dotenv import load_dotenv
from pymongo import MongoClient, ASCENDING, DESCENDING
from passlib.context import CryptContext

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

MONGODB_URI = os.environ.get("MONGODB_URI") or os.environ.get("MONGO_URL") or "mongodb://localhost:27017"
DB_NAME = os.environ.get("DB_NAME") or "test_database"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def utc_now():
    return datetime.now(timezone.utc)

DEFAULT_STATE = {
    "progress": {"Búsqueda": 30, "Encuentro": 35, "Desafío": 40},
    "completedProgress": {"Búsqueda": 0, "Encuentro": 0, "Desafío": 0},
    "patria": [False] * 15,
    "patria_status": ["idle"] * 15,
    "patria_notes": [""] * 15,
    "specialties": [
        "Primeros Auxilios", "Campista", "Conservacionista", "Cocinero",
        "Fotógrafo", "Orientación", "Nudos", "Liderazgo", "Astronomía",
        "Ciclismo", "Comunicación", "Rescate", "Arte"
    ],
    "notes": [],
    "projects": [],
    "service": [],
    "events": [],
    "announcements": [
        {
            "id": "news-1",
            "title": "Bienvenidos a Horizonte Pionero",
            "body": "Registra tus avances, momentos y servicio en un solo lugar.",
            "date": "Hoy"
        }
    ],
    "earthTribe": [],
    "progression": {"busqueda": [], "encuentro": [], "desafio": []},
}

def seed_database():
    print(f"[*] Conectando a MongoDB en: {MONGODB_URI} (BD: {DB_NAME})")
    try:
        client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
        # Test connection
        client.admin.command('ping')
        print("[+] Conexión exitosa a MongoDB.")
    except Exception as e:
        print(f"[-] Error al conectar a MongoDB: {e}")
        print("    Asegúrate de que MongoDB Atlas o el servicio local de MongoDB estén corriendo y MONGODB_URI sea correcto.")
        sys.exit(1)

    db = client[DB_NAME]

    print("[*] Configurando índices de base de datos...")
    db.users.create_index("email", unique=True)
    db.users.create_index("user_id", unique=True)
    db.user_sessions.create_index("session_token", unique=True)
    db.user_sessions.create_index("expires_at", expireAfterSeconds=0)
    db.user_states.create_index("user_id", unique=True)
    db.approvals.create_index("approval_id", unique=True)
    db.approvals.create_index([("status", ASCENDING), ("created_at", ASCENDING)])
    db.gallery.create_index("post_id", unique=True)
    db.gallery.create_index([("deleted_at", ASCENDING), ("created_at", DESCENDING)])
    db.calendar.create_index("event_id", unique=True)
    db.uploads.create_index("path", unique=True)
    print("[+] Índices configurados correctamente.")

    # 1. Seed Admin QA
    admin_email = "admin.qa@example.com"
    existing_admin = db.users.find_one({"email": admin_email})
    if not existing_admin:
        admin_doc = {
            "user_id": "user_admin_qa_001",
            "email": admin_email,
            "name": "Dirigente QA",
            "password_hash": pwd_context.hash("Admin123!"),
            "role": "dirigente",
            "verification_status": "verificado",
            "credential_code": "ASB-DIR-001",
            "credential_doc_path": None,
            "profile": {
                "patrol": "Jefatura",
                "group_number": "1",
                "stage": "desafio",
                "blood_type": "O+",
                "emergency_contact": "Jefatura de Grupo",
                "emergency_phone": "+591 70000001",
                "camping_nights": 25,
            },
            "created_at": utc_now(),
        }
        db.users.insert_one(admin_doc)
        db.user_states.update_one(
            {"user_id": admin_doc["user_id"]},
            {"$set": {"state": DEFAULT_STATE, "updated_at": utc_now()}},
            upsert=True
        )
        print(f"[+] Usuario Dirigente creado: {admin_email} / Admin123!")
    else:
        print(f"[i] Usuario Dirigente ya existe: {admin_email}")

    # 2. Seed Pionero QA
    pionero_email = "pionero.qa@example.com"
    existing_pionero = db.users.find_one({"email": pionero_email})
    if not existing_pionero:
        pionero_doc = {
            "user_id": "user_pionero_qa_001",
            "email": pionero_email,
            "name": "Pionero QA",
            "password_hash": pwd_context.hash("Agenda123!"),
            "role": "pionero",
            "verification_status": "verificado",
            "credential_code": None,
            "credential_doc_path": None,
            "profile": {
                "patrol": "Halcones",
                "group_number": "1",
                "stage": "encuentro",
                "blood_type": "O+",
                "emergency_contact": "María Pérez (madre)",
                "emergency_phone": "+54 9 11 5555 1234",
                "allergies": "Polen y maní",
                "medical_conditions": "Asma leve",
                "medical_insurance": "OSDE 210",
                "camping_nights": 5,
            },
            "created_at": utc_now(),
        }
        db.users.insert_one(pionero_doc)
        db.user_states.update_one(
            {"user_id": pionero_doc["user_id"]},
            {"$set": {"state": DEFAULT_STATE, "updated_at": utc_now()}},
            upsert=True
        )
        print(f"[+] Usuario Pionero creado: {pionero_email} / Agenda123!")
    else:
        print(f"[i] Usuario Pionero ya existe: {pionero_email}")

    # 3. Seed Calendar Events
    sample_event = {
        "event_id": "evt_bienvenida_2026",
        "title": "Apertura Gestión 2026 - Horizonte Pionero",
        "date": "2026-10-15",
        "time": "09:00",
        "place": "Albergue Municipal Bicentenario, Tarija",
        "description": "Reunión general de inicio de ciclo y revisión de planes de adelanto.",
        "equipment": ["Uniforme scout completo", "Libreta y bolígrafo", "Botiquín personal", "Cantimplora"],
        "category": "reunion",
        "created_by": "user_admin_qa_001",
        "creator_name": "Dirigente QA",
        "created_at": utc_now(),
        "deleted_at": None,
    }
    db.calendar.update_one({"event_id": sample_event["event_id"]}, {"$set": sample_event}, upsert=True)
    print("[+] Evento de bienvenida en calendario registrado.")

    print("\n[OK] Inicializacion de Base de Datos completada exitosamente.")
    client.close()

if __name__ == "__main__":
    seed_database()
