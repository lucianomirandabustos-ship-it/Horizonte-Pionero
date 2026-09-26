"""Tests for GET /api/admin/pioneros (fichas médicas) — Jan 2026 feature."""
import os
import uuid
import pytest
import requests
from datetime import datetime, timezone
from pymongo import MongoClient

BASE_URL = os.environ["EXPO_PUBLIC_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin.qa@example.com"
ADMIN_PASSWORD = "Admin123!"
PIONERO_EMAIL = "pionero.qa@example.com"
PIONERO_PASSWORD = "Agenda123!"


@pytest.fixture(scope="module")
def admin_token():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=30)
    assert r.status_code == 200, f"admin login failed: {r.status_code} {r.text}"
    return r.json()["session_token"]


@pytest.fixture(scope="module")
def pionero_token():
    r = requests.post(f"{API}/auth/login", json={"email": PIONERO_EMAIL, "password": PIONERO_PASSWORD}, timeout=30)
    assert r.status_code == 200, f"pionero login failed: {r.status_code} {r.text}"
    return r.json()["session_token"]


@pytest.fixture(scope="module")
def pionero_with_medical(pionero_token):
    """Populate medical fields on the QA pionero so responses have meaningful data."""
    payload = {
        "blood_type": "O+",
        "allergies": "Polen y maní",
        "medical_conditions": "Asma leve",
        "medical_insurance": "OSDE 210",
        "emergency_contact": "María Pérez (madre)",
        "emergency_phone": "+54 9 11 5555 1234",
        "patrol": "Halcones",
    }
    r = requests.put(f"{API}/profile", json=payload, headers={"Authorization": f"Bearer {pionero_token}"}, timeout=30)
    assert r.status_code == 200, f"profile update failed: {r.text}"
    return r.json()["user"]


# ------------------------ Auth guards ------------------------

def test_admin_pioneros_requires_token():
    r = requests.get(f"{API}/admin/pioneros", timeout=30)
    assert r.status_code == 401


def test_admin_pioneros_forbidden_for_pionero(pionero_token):
    r = requests.get(f"{API}/admin/pioneros", headers={"Authorization": f"Bearer {pionero_token}"}, timeout=30)
    assert r.status_code == 403


def test_admin_pioneros_bad_token():
    r = requests.get(f"{API}/admin/pioneros", headers={"Authorization": "Bearer notavalidtoken"}, timeout=30)
    assert r.status_code == 401


# ------------------------ Happy path ------------------------

def test_admin_pioneros_returns_list_for_dirigente(admin_token, pionero_with_medical):
    r = requests.get(f"{API}/admin/pioneros", headers={"Authorization": f"Bearer {admin_token}"}, timeout=30)
    assert r.status_code == 200, r.text
    body = r.json()
    assert "pioneros" in body and isinstance(body["pioneros"], list)
    assert len(body["pioneros"]) >= 1

    required = {"user_id", "name", "email", "patrol", "group_number", "stage",
                "blood_type", "allergies", "medical_conditions", "medical_insurance",
                "emergency_contact", "emergency_phone", "camping_nights"}
    for f in body["pioneros"]:
        missing = required - set(f.keys())
        assert not missing, f"Missing fields: {missing}"


def test_admin_pioneros_reflects_updated_medical(admin_token, pionero_with_medical):
    r = requests.get(f"{API}/admin/pioneros", headers={"Authorization": f"Bearer {admin_token}"}, timeout=30)
    assert r.status_code == 200
    match = [p for p in r.json()["pioneros"] if p["email"] == PIONERO_EMAIL]
    assert len(match) == 1, f"pionero not found in fichas list"
    p = match[0]
    assert p["blood_type"] == "O+"
    assert p["allergies"] == "Polen y maní"
    assert p["medical_conditions"] == "Asma leve"
    assert p["medical_insurance"] == "OSDE 210"
    assert p["emergency_contact"] == "María Pérez (madre)"
    assert p["emergency_phone"] == "+54 9 11 5555 1234"
    assert p["patrol"] == "Halcones"


def test_admin_pioneros_only_returns_role_pionero(admin_token):
    r = requests.get(f"{API}/admin/pioneros", headers={"Authorization": f"Bearer {admin_token}"}, timeout=30)
    assert r.status_code == 200
    emails = {p["email"] for p in r.json()["pioneros"]}
    # dirigente must not appear
    assert ADMIN_EMAIL not in emails


# ------------------------ Audit log ------------------------

def test_admin_pioneros_writes_access_log(admin_token):
    mongo_url = os.environ["MONGO_URL"]
    db_name = os.environ["DB_NAME"]
    mc = MongoClient(mongo_url)
    try:
        db = mc[db_name]
        before = db.access_log.count_documents({"action": "list_pioneros_fichas"})
        r = requests.get(f"{API}/admin/pioneros", headers={"Authorization": f"Bearer {admin_token}"}, timeout=30)
        assert r.status_code == 200
        after = db.access_log.count_documents({"action": "list_pioneros_fichas"})
        assert after == before + 1, f"expected access_log to grow by 1 (before={before}, after={after})"
        last = db.access_log.find_one({"action": "list_pioneros_fichas"}, sort=[("at", -1)])
        assert last is not None
        assert "actor_id" in last and last["actor_id"].startswith("user_")
        assert last.get("count", 0) >= 1
    finally:
        mc.close()


# ------------------------ Regression: previous bug batch endpoints ------------------------

def test_regression_docs_agenda_ok():
    r = requests.get(f"{API}/docs/agenda", timeout=30)
    assert r.status_code == 200
    assert r.headers.get("content-type", "").startswith("application/pdf")
    assert r.content[:4] == b"%PDF"


def test_regression_docs_specialties_ok():
    r = requests.get(f"{API}/docs/specialties", timeout=30)
    assert r.status_code == 200
    assert r.content[:4] == b"%PDF"


def test_regression_tribu_approval_flow(admin_token, pionero_token):
    # pionero requests tribu approval
    ref_id = f"regress-{uuid.uuid4().hex[:6]}"
    r = requests.post(f"{API}/approvals/request",
                      json={"kind": "tribu", "ref_id": ref_id, "text": "Champions for Nature (regression)"},
                      headers={"Authorization": f"Bearer {pionero_token}"}, timeout=30)
    assert r.status_code == 200
    apr_id = r.json()["approval"]["approval_id"]
    # admin approves
    r2 = requests.post(f"{API}/admin/approvals/{apr_id}/decide",
                       json={"approved": True, "note": "OK"},
                       headers={"Authorization": f"Bearer {admin_token}"}, timeout=30)
    assert r2.status_code == 200
    assert r2.json()["status"] == "aprobado"
