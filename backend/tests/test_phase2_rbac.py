"""Phase 2 backend tests: RBAC, approvals inbox, gallery, calendar, upload auth."""
import os
import uuid
import io
from pathlib import Path

import pytest
import requests
from dotenv import load_dotenv

# Load frontend env for public URL
load_dotenv(Path(__file__).resolve().parents[2] / "frontend" / ".env")

BASE_URL = (os.environ.get("EXPO_PUBLIC_BACKEND_URL") or os.environ.get("EXPO_BACKEND_URL") or "").rstrip("/")
MASTER_KEY = "ASB-HORIZONTE-2026"

PIONERO_EMAIL = "pionero.qa@example.com"
PIONERO_PASSWORD = "Agenda123!"
ADMIN_EMAIL = "admin.qa@example.com"
ADMIN_PASSWORD = "Admin123!"


def _login(email, password):
    r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": email, "password": password}, timeout=20)
    assert r.status_code == 200, f"login {email} failed: {r.status_code} {r.text}"
    return r.json()["session_token"], r.json()["user"]


@pytest.fixture(scope="module")
def pionero():
    tok, user = _login(PIONERO_EMAIL, PIONERO_PASSWORD)
    return {"token": tok, "user": user, "headers": {"Authorization": f"Bearer {tok}"}}


@pytest.fixture(scope="module")
def dirigente():
    tok, user = _login(ADMIN_EMAIL, ADMIN_PASSWORD)
    assert user["role"] == "dirigente" and user["verification_status"] == "verificado"
    return {"token": tok, "user": user, "headers": {"Authorization": f"Bearer {tok}"}}


# ---------------- Health ----------------
def test_health():
    r = requests.get(f"{BASE_URL}/api/", timeout=15)
    assert r.status_code == 200
    assert "Horizonte" in r.json().get("message", "")


# ---------------- Registration RBAC ----------------
def test_register_dirigente_with_master_key_verified():
    email = f"qa_dir_{uuid.uuid4().hex[:8]}@example.com"
    r = requests.post(f"{BASE_URL}/api/auth/register", json={
        "email": email, "password": "Passw0rd!", "name": "QA Dir", "role": "dirigente",
        "master_key": MASTER_KEY, "group_number": "110",
    }, timeout=20)
    assert r.status_code == 200, r.text
    body = r.json()
    assert body["user"]["role"] == "dirigente"
    assert body["user"]["verification_status"] == "verificado"


def test_register_dirigente_without_master_key_en_revision():
    email = f"qa_dir_{uuid.uuid4().hex[:8]}@example.com"
    r = requests.post(f"{BASE_URL}/api/auth/register", json={
        "email": email, "password": "Passw0rd!", "name": "QA Dir Rev", "role": "dirigente",
        "group_number": "110",
    }, timeout=20)
    assert r.status_code == 200, r.text
    assert r.json()["user"]["verification_status"] == "en_revision"


def test_register_dirigente_wrong_master_key_en_revision():
    email = f"qa_dir_{uuid.uuid4().hex[:8]}@example.com"
    r = requests.post(f"{BASE_URL}/api/auth/register", json={
        "email": email, "password": "Passw0rd!", "name": "QA Dir Bad", "role": "dirigente",
        "master_key": "WRONG-KEY", "group_number": "110",
    }, timeout=20)
    assert r.status_code == 200
    assert r.json()["user"]["verification_status"] == "en_revision"


# ---------------- Approvals flow ----------------
def _reset_patria_index(pionero, idx):
    """Reset a single patria index back to idle/False so re-runs behave deterministically."""
    state_r = requests.get(f"{BASE_URL}/api/state", headers=pionero["headers"], timeout=15)
    st = state_r.json()["state"]
    patria = list(st.get("patria") or [False] * 15)
    status = list(st.get("patria_status") or ["idle"] * 15)
    notes = list(st.get("patria_notes") or [""] * 15)
    while len(patria) < 15: patria.append(False)
    while len(status) < 15: status.append("idle")
    while len(notes) < 15: notes.append("")
    patria[idx] = False
    status[idx] = "idle"
    notes[idx] = ""
    st["patria"] = patria; st["patria_status"] = status; st["patria_notes"] = notes
    requests.put(f"{BASE_URL}/api/state", headers=pionero["headers"], json={"state": st}, timeout=15)


def test_pionero_approval_request_sets_pendiente(pionero):
    idx = 3
    _reset_patria_index(pionero, idx)
    r = requests.post(f"{BASE_URL}/api/approvals/request", headers=pionero["headers"], json={
        "kind": "patria", "ref_id": str(idx), "note": "QA request pendiente"
    }, timeout=20)
    assert r.status_code == 200, r.text
    appr = r.json()["approval"]
    assert appr["status"] == "pendiente"
    # verify state updated
    st = requests.get(f"{BASE_URL}/api/state", headers=pionero["headers"], timeout=15).json()["state"]
    assert st["patria_status"][idx] == "pendiente"


def test_inbox_requires_dirigente(pionero):
    r = requests.get(f"{BASE_URL}/api/admin/approvals/inbox", headers=pionero["headers"], timeout=15)
    assert r.status_code == 403


def test_admin_inbox_lists_pending(dirigente):
    r = requests.get(f"{BASE_URL}/api/admin/approvals/inbox", headers=dirigente["headers"], timeout=15)
    assert r.status_code == 200
    assert isinstance(r.json()["pending"], list)


def test_approve_flow_marks_state_true(pionero, dirigente):
    idx = 5
    _reset_patria_index(pionero, idx)
    req = requests.post(f"{BASE_URL}/api/approvals/request", headers=pionero["headers"], json={
        "kind": "patria", "ref_id": str(idx), "note": "aprobame por favor",
    }, timeout=20).json()["approval"]
    approval_id = req["approval_id"]

    dec = requests.post(f"{BASE_URL}/api/admin/approvals/{approval_id}/decide",
                        headers=dirigente["headers"], json={"approved": True, "note": "OK"}, timeout=20)
    assert dec.status_code == 200
    assert dec.json()["status"] == "aprobado"

    st = requests.get(f"{BASE_URL}/api/state", headers=pionero["headers"], timeout=15).json()["state"]
    assert st["patria"][idx] is True
    assert st["patria_status"][idx] == "aprobado"


def test_reject_flow_saves_note(pionero, dirigente):
    idx = 7
    _reset_patria_index(pionero, idx)
    req = requests.post(f"{BASE_URL}/api/approvals/request", headers=pionero["headers"], json={
        "kind": "patria", "ref_id": str(idx), "note": "Rechazame",
    }, timeout=20).json()["approval"]
    approval_id = req["approval_id"]

    reject_note = "Faltan evidencias"
    dec = requests.post(f"{BASE_URL}/api/admin/approvals/{approval_id}/decide",
                        headers=dirigente["headers"], json={"approved": False, "note": reject_note}, timeout=20)
    assert dec.status_code == 200
    assert dec.json()["status"] == "rechazado"

    st = requests.get(f"{BASE_URL}/api/state", headers=pionero["headers"], timeout=15).json()["state"]
    assert st["patria_status"][idx] == "rechazado"
    assert st["patria_notes"][idx] == reject_note
    assert st["patria"][idx] is False


# ---------------- Upload ----------------
def test_upload_without_auth_rejected():
    r = requests.post(f"{BASE_URL}/api/upload",
                      files={"file": ("t.txt", io.BytesIO(b"hello"), "text/plain")},
                      data={"purpose": "misc"}, timeout=20)
    assert r.status_code == 401


def test_upload_with_auth_ok(pionero):
    r = requests.post(f"{BASE_URL}/api/upload", headers=pionero["headers"],
                      files={"file": ("t.png", io.BytesIO(b"\x89PNG\r\n\x1a\nQA"), "image/png")},
                      data={"purpose": "misc"}, timeout=60)
    # 200 ok or 402/502 if storage is unavailable in preview
    if r.status_code in (402, 502):
        pytest.skip(f"object storage unavailable: {r.status_code}")
    assert r.status_code == 200, r.text
    assert "path" in r.json()


# ---------------- Gallery ----------------
def test_gallery_feed_shape_and_post(pionero):
    r = requests.get(f"{BASE_URL}/api/gallery", headers=pionero["headers"], timeout=15)
    assert r.status_code == 200
    initial = r.json()["posts"]
    assert isinstance(initial, list)

    # try to upload then post
    up = requests.post(f"{BASE_URL}/api/upload", headers=pionero["headers"],
                       files={"file": ("g.png", io.BytesIO(b"\x89PNG\r\n\x1a\nGAL"), "image/png")},
                       data={"purpose": "gallery"}, timeout=60)
    if up.status_code in (402, 502):
        pytest.skip(f"storage unavailable: {up.status_code}")
    assert up.status_code == 200
    path = up.json()["path"]

    caption = f"QA post {uuid.uuid4().hex[:6]}"
    post_r = requests.post(f"{BASE_URL}/api/gallery", headers=pionero["headers"],
                           json={"caption": caption, "file_path": path}, timeout=20)
    assert post_r.status_code == 200
    post_id = post_r.json()["post"]["post_id"]

    feed = requests.get(f"{BASE_URL}/api/gallery", headers=pionero["headers"], timeout=15).json()["posts"]
    assert any(p["post_id"] == post_id and p["caption"] == caption for p in feed)


# ---------------- Calendar ----------------
def test_calendar_create_forbidden_for_pionero(pionero):
    r = requests.post(f"{BASE_URL}/api/calendar", headers=pionero["headers"], json={
        "title": "should fail", "date": "2026-02-01", "place": "camp",
    }, timeout=15)
    assert r.status_code == 403


def test_calendar_create_ok_for_dirigente(dirigente, pionero):
    title = f"QA event {uuid.uuid4().hex[:6]}"
    r = requests.post(f"{BASE_URL}/api/calendar", headers=dirigente["headers"], json={
        "title": title, "date": "2026-02-15", "time": "09:00", "place": "Sede", "description": "QA", "equipment": ["mochila"],
    }, timeout=15)
    assert r.status_code == 200
    event_id = r.json()["event"]["event_id"]

    feed = requests.get(f"{BASE_URL}/api/calendar", headers=pionero["headers"], timeout=15).json()["events"]
    assert any(e["event_id"] == event_id and e["title"] == title for e in feed)
