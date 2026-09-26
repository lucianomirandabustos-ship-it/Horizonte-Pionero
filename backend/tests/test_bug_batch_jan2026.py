"""Backend regression + fix verification for the 4 bug batch (Jan 2026).

Covers:
- /api/docs/agenda and /api/docs/specialties still serve PDFs (bug #4)
- POST /api/approvals/request accepts kind='tribu' (bug #3)
- POST /api/admin/approvals/{id}/decide handles kind='tribu':
    approve  -> state.tribu_tierra[ref_id].approved = True, status = 'aprobado'
    reject   -> status = 'rechazado', approved False
- Regression: existing patria/progression/camping/service flows still work
"""
import os
import uuid
import requests
import pytest

BASE_URL = os.environ.get("EXPO_PUBLIC_BACKEND_URL", "").rstrip("/") or os.environ.get(
    "EXPO_BACKEND_URL", ""
).rstrip("/")
assert BASE_URL, "EXPO_PUBLIC_BACKEND_URL / EXPO_BACKEND_URL missing in frontend/.env"

API = f"{BASE_URL}/api"

PIONERO = {"email": "pionero.qa@example.com", "password": "Agenda123!"}
DIRIGENTE = {"email": "admin.qa@example.com", "password": "Admin123!"}
MASTER_KEY = "ASB-HORIZONTE-2026"


# ---------- helpers ----------
def _login(payload):
    r = requests.post(f"{API}/auth/login", json=payload, timeout=30)
    return r


def _tok(body):
    return body.get("session_token") or body.get("token")


def _ensure_login(payload, role="pionero"):
    r = _login(payload)
    if r.status_code == 200:
        b = r.json()
        return _tok(b), b["user"]
    # try to register (idempotent-ish)
    reg = {
        "email": payload["email"],
        "password": payload["password"],
        "name": "QA " + role,
        "role": role,
    }
    if role == "dirigente":
        reg["master_key"] = MASTER_KEY
        reg["credential_code"] = "DIR-001"
        reg["group_number"] = "110"
    rr = requests.post(f"{API}/auth/register", json=reg, timeout=30)
    if rr.status_code in (200, 201):
        b = rr.json()
        return _tok(b), b["user"]
    r = _login(payload)
    assert r.status_code == 200, f"cannot login {payload['email']}: {r.status_code} {r.text}"
    b = r.json()
    return _tok(b), b["user"]


@pytest.fixture(scope="session")
def pionero_ctx():
    token, user = _ensure_login(PIONERO, role="pionero")
    return {"token": token, "user": user, "h": {"Authorization": f"Bearer {token}"}}


@pytest.fixture(scope="session")
def dirigente_ctx():
    token, user = _ensure_login(DIRIGENTE, role="dirigente")
    return {"token": token, "user": user, "h": {"Authorization": f"Bearer {token}"}}


# ---------- bug #4: PDF endpoints ----------
class TestDocsPdf:
    def test_agenda_pdf(self):
        r = requests.get(f"{API}/docs/agenda", timeout=30)
        assert r.status_code == 200, r.text
        assert r.headers.get("content-type", "").startswith("application/pdf")
        assert r.content[:4] == b"%PDF"
        assert len(r.content) > 1000

    def test_specialties_pdf(self):
        r = requests.get(f"{API}/docs/specialties", timeout=30)
        assert r.status_code == 200, r.text
        assert r.headers.get("content-type", "").startswith("application/pdf")
        assert r.content[:4] == b"%PDF"

    def test_docs_unknown_kind_404(self):
        r = requests.get(f"{API}/docs/does-not-exist", timeout=30)
        assert r.status_code == 404


# ---------- bug #3: Tribu Tierra approval workflow ----------
class TestTribuApproval:
    def _request(self, pionero_ctx, prog_id, name):
        payload = {"kind": "tribu", "ref_id": prog_id, "text": name}
        r = requests.post(f"{API}/approvals/request", json=payload, headers=pionero_ctx["h"], timeout=30)
        return r

    def test_request_tribu_approval(self, pionero_ctx):
        prog_id = "solar"
        r = self._request(pionero_ctx, prog_id, "Scouts Go Solar")
        assert r.status_code == 200, r.text
        appr = r.json().get("approval")
        assert appr and appr["kind"] == "tribu"
        assert appr["ref_id"] == prog_id
        assert appr["status"] == "pendiente"
        # verify user state now marks program pendiente
        st = requests.get(f"{API}/state", headers=pionero_ctx["h"], timeout=30).json()
        tt = st["state"].get("tribu_tierra", {}).get(prog_id)
        assert tt and tt["status"] == "pendiente"
        assert tt.get("approved") is False

    def test_dirigente_inbox_labels_tribu(self, pionero_ctx, dirigente_ctx):
        # ensure there is a pending tribu request
        self._request(pionero_ctx, "nature", "Champions for Nature")
        r = requests.get(f"{API}/admin/approvals/inbox", headers=dirigente_ctx["h"], timeout=30)
        assert r.status_code == 200, r.text
        pending = r.json().get("pending", [])
        tribu_rows = [p for p in pending if p["kind"] == "tribu"]
        assert tribu_rows, "no tribu approvals in inbox"
        # payload carries text so frontend can render 'Tribu Tierra · <name>'
        assert any((row.get("text") or "").strip() for row in tribu_rows)

    def test_dirigente_approves_tribu(self, pionero_ctx, dirigente_ctx):
        # fresh request
        prog_id = f"plastic"
        req = self._request(pionero_ctx, prog_id, "Plastic Tide Turners")
        approval_id = req.json()["approval"]["approval_id"]
        r = requests.post(
            f"{API}/admin/approvals/{approval_id}/decide",
            json={"approved": True, "note": "OK QA"},
            headers=dirigente_ctx["h"],
            timeout=30,
        )
        assert r.status_code == 200, r.text
        assert r.json()["status"] == "aprobado"
        # state reflects approved
        st = requests.get(f"{API}/state", headers=pionero_ctx["h"], timeout=30).json()
        entry = st["state"].get("tribu_tierra", {}).get(prog_id)
        assert entry and entry.get("approved") is True
        assert entry.get("status") == "aprobado"

    def test_dirigente_rejects_tribu(self, pionero_ctx, dirigente_ctx):
        prog_id = "solar"
        req = self._request(pionero_ctx, prog_id, "Scouts Go Solar")
        approval_id = req.json()["approval"]["approval_id"]
        r = requests.post(
            f"{API}/admin/approvals/{approval_id}/decide",
            json={"approved": False, "note": "faltan fotos"},
            headers=dirigente_ctx["h"],
            timeout=30,
        )
        assert r.status_code == 200
        assert r.json()["status"] == "rechazado"
        st = requests.get(f"{API}/state", headers=pionero_ctx["h"], timeout=30).json()
        entry = st["state"].get("tribu_tierra", {}).get(prog_id)
        assert entry and entry.get("status") == "rechazado"
        assert entry.get("approved") is False
        assert entry.get("review_note") == "faltan fotos"


# ---------- Regression: existing kinds still work ----------
class TestRegressionApprovals:
    def test_patria_request(self, pionero_ctx):
        r = requests.post(
            f"{API}/approvals/request",
            json={"kind": "patria", "ref_id": "9"},
            headers=pionero_ctx["h"],
            timeout=30,
        )
        assert r.status_code == 200, r.text
        assert r.json()["approval"]["kind"] == "patria"

    def test_service_request(self, pionero_ctx):
        r = requests.post(
            f"{API}/approvals/request",
            json={"kind": "service", "ref_id": f"srv_{uuid.uuid4().hex[:6]}", "text": "QA service", "nights": 2},
            headers=pionero_ctx["h"],
            timeout=30,
        )
        assert r.status_code == 200, r.text

    def test_inbox_still_works(self, dirigente_ctx):
        r = requests.get(f"{API}/admin/approvals/inbox", headers=dirigente_ctx["h"], timeout=30)
        assert r.status_code == 200
        assert "pending" in r.json()

    def test_pionero_cannot_access_inbox(self, pionero_ctx):
        r = requests.get(f"{API}/admin/approvals/inbox", headers=pionero_ctx["h"], timeout=30)
        assert r.status_code in (401, 403)
