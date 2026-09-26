import os
import uuid

import pytest
import requests

BASE_URL = (os.environ.get("EXPO_PUBLIC_BACKEND_URL") or os.environ.get("EXPO_BACKEND_URL")).rstrip("/")


@pytest.fixture
def session():
    response = requests.post(f"{BASE_URL}/api/auth/login", json={"email": "pionero.qa@example.com", "password": "Agenda123!"}, timeout=15)
    assert response.status_code == 200
    return requests.Session(), {"Authorization": f"Bearer {response.json()['session_token']}"}


def test_health():
    response = requests.get(f"{BASE_URL}/api/", timeout=15)
    assert response.status_code == 200
    assert response.json()["message"] == "Horizonte Pionero API"


def test_login_and_state_shape(session):
    client, headers = session
    response = client.get(f"{BASE_URL}/api/state", headers=headers, timeout=15)
    assert response.status_code == 200
    state = response.json()["state"]
    assert len(state["patria"]) == 15
    assert state["progress"] == {"Búsqueda": 30, "Encuentro": 35, "Desafío": 40}


def test_state_persistence(session):
    client, headers = session
    current = client.get(f"{BASE_URL}/api/state", headers=headers, timeout=15).json()["state"]
    marker = f"qa-{uuid.uuid4().hex}"
    current["notes"] = [{"id": marker, "title": "QA reflection", "body": "Persistence", "date": "Ahora"}]
    saved = client.put(f"{BASE_URL}/api/state", headers=headers, json={"state": current}, timeout=15)
    assert saved.status_code == 200
    reread = client.get(f"{BASE_URL}/api/state", headers=headers, timeout=15)
    assert reread.json()["state"]["notes"][0]["id"] == marker


def test_profile_persistence(session):
    client, headers = session
    payload = {"patrol": "QA Patrol", "blood_type": "O+", "emergency_contact": "QA Contact", "emergency_phone": "70000000", "camping_nights": 7}
    response = client.put(f"{BASE_URL}/api/profile", headers=headers, json=payload, timeout=15)
    assert response.status_code == 200
    profile = response.json()["user"]["profile"]
    assert profile["blood_type"] == "O+"
    assert profile["camping_nights"] == 7