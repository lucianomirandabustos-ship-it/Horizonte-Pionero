"""
Backend tests for iteration_6 changes:
1. Master Key access control on POST /api/auth/register
2. GET /api/auth/bootstrap-status
3. POST /api/calendar accepts and persists `category`
"""
import os
import uuid
import requests
import pytest

BASE_URL = os.environ.get("EXPO_PUBLIC_BACKEND_URL").rstrip("/")
API = f"{BASE_URL}/api"

MASTER_KEY = "ASB-HORIZONTE-2026"
ADMIN_EMAIL = "admin.qa@example.com"
ADMIN_PASS = "Admin123!"
PIONERO_EMAIL = "pionero.qa@example.com"
PIONERO_PASS = "Agenda123!"


# --------- Fixtures ---------
@pytest.fixture(scope="module")
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


@pytest.fixture(scope="module")
def admin_token(s):
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASS})
    assert r.status_code == 200, r.text
    return r.json()["session_token"]


@pytest.fixture(scope="module")
def pionero_token(s):
    r = s.post(f"{API}/auth/login", json={"email": PIONERO_EMAIL, "password": PIONERO_PASS})
    assert r.status_code == 200, r.text
    return r.json()["session_token"]


# --------- Bootstrap status ---------
class TestBootstrapStatus:
    def test_bootstrap_available_false(self, s):
        """After admin.qa exists as verified dirigente, bootstrap must be unavailable."""
        r = s.get(f"{API}/auth/bootstrap-status")
        assert r.status_code == 200
        data = r.json()
        assert "bootstrap_available" in data
        assert data["bootstrap_available"] is False


# --------- Master Key access control on register ---------
class TestMasterKeyAccessControl:
    def test_register_dirigente_with_masterkey_yields_en_revision(self, s):
        """Since a verified dirigente already exists, master_key must be ignored -> en_revision."""
        uid = uuid.uuid4().hex[:8]
        payload = {
            "email": f"TEST_dir_{uid}@example.com",
            "password": "Test123!",
            "name": f"TEST Dirigente {uid}",
            "role": "dirigente",
            "master_key": MASTER_KEY,
            "patrol": "Halcones",
            "group_number": "110",
        }
        r = s.post(f"{API}/auth/register", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        assert "user" in body
        user = body["user"]
        assert user["role"] == "dirigente"
        assert user["verification_status"] == "en_revision", (
            f"Expected en_revision but got {user['verification_status']}"
        )

    def test_register_dirigente_without_masterkey_yields_en_revision(self, s):
        """Without master key it also stays en_revision."""
        uid = uuid.uuid4().hex[:8]
        payload = {
            "email": f"TEST_dir2_{uid}@example.com",
            "password": "Test123!",
            "name": f"TEST Dirigente2 {uid}",
            "role": "dirigente",
            "patrol": "Halcones",
            "group_number": "110",
        }
        r = s.post(f"{API}/auth/register", json=payload)
        assert r.status_code == 200, r.text
        assert r.json()["user"]["verification_status"] == "en_revision"

    def test_register_pionero_unchanged(self, s):
        """Pionero registration should not be affected."""
        uid = uuid.uuid4().hex[:8]
        payload = {
            "email": f"TEST_pio_{uid}@example.com",
            "password": "Test123!",
            "name": f"TEST Pionero {uid}",
            "role": "pionero",
            "patrol": "Halcones",
            "group_number": "110",
        }
        r = s.post(f"{API}/auth/register", json=payload)
        assert r.status_code == 200, r.text
        user = r.json()["user"]
        assert user["role"] == "pionero"
        assert user["verification_status"] == "verificado"


# --------- Calendar category ---------
class TestCalendarCategory:
    created_event_id = None

    def test_create_event_with_category(self, s, admin_token):
        payload = {
            "title": "TEST Reunión de Patrulla",
            "date": "2026-05-15",
            "time": "18:00",
            "place": "TEST Local scout",
            "description": "TEST descripcion",
            "equipment": ["TEST uniforme"],
            "category": "reunion",
        }
        r = s.post(
            f"{API}/calendar",
            json=payload,
            headers={"Authorization": f"Bearer {admin_token}"},
        )
        assert r.status_code == 200, r.text
        ev = r.json()["event"]
        assert ev["category"] == "reunion"
        assert ev["title"] == payload["title"]
        assert "event_id" in ev
        TestCalendarCategory.created_event_id = ev["event_id"]

    def test_get_calendar_returns_category(self, s, pionero_token):
        r = s.get(
            f"{API}/calendar",
            headers={"Authorization": f"Bearer {pionero_token}"},
        )
        assert r.status_code == 200, r.text
        events = r.json()["events"]
        found = next(
            (e for e in events if e.get("event_id") == TestCalendarCategory.created_event_id),
            None,
        )
        assert found is not None, "Created event not found in feed"
        assert found["category"] == "reunion"

    def test_create_event_without_category(self, s, admin_token):
        """category is optional."""
        payload = {
            "title": "TEST Sin categoria",
            "date": "2026-05-16",
            "time": "18:00",
            "place": "Local",
        }
        r = s.post(
            f"{API}/calendar",
            json=payload,
            headers={"Authorization": f"Bearer {admin_token}"},
        )
        assert r.status_code == 200, r.text
        ev = r.json()["event"]
        assert ev.get("category") is None

    def test_create_event_forbidden_for_pionero(self, s, pionero_token):
        payload = {"title": "X", "date": "2026-05-17", "place": "X"}
        r = s.post(
            f"{API}/calendar",
            json=payload,
            headers={"Authorization": f"Bearer {pionero_token}"},
        )
        assert r.status_code in (401, 403)

    def test_delete_test_events(self, s, admin_token):
        """Cleanup: delete TEST_* events."""
        r = s.get(
            f"{API}/calendar",
            headers={"Authorization": f"Bearer {admin_token}"},
        )
        for e in r.json()["events"]:
            if e.get("title", "").startswith("TEST "):
                s.delete(
                    f"{API}/calendar/{e['event_id']}",
                    headers={"Authorization": f"Bearer {admin_token}"},
                )
