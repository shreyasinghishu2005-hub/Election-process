"""HTTP-focused tests for the standalone election guide backend."""

from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

os.environ["GEMINI_API_KEY"] = ""
os.environ["GOOGLE_TTS_ENABLED"] = ""
os.environ.pop("GOOGLE_SERVICE_ACCOUNT_JSON", None)

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from server import gemini_assistant, google_audio  # noqa: E402
from server.main import app  # noqa: E402


@pytest.fixture(autouse=True)
def reset_service_caches() -> None:
    gemini_assistant._gemini_import_error.cache_clear()
    google_audio._tts_client_status.cache_clear()


@pytest.fixture()
def client() -> TestClient:
    return TestClient(app)


def test_health_route_reports_service_statuses(client: TestClient) -> None:
    response = client.get("/api/health")

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "google_services" in data
    assert "gemini" in data["google_services"]
    assert "cloud_text_to_speech" in data["google_services"]


def test_public_config_uses_real_service_availability(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        "server.main.gemini_assistant.gemini_service_status",
        lambda: {"available": False, "reason": "missing_api_key"},
    )
    monkeypatch.setattr(
        "server.main.google_audio.google_tts_service_status",
        lambda: {"available": False, "reason": "missing_service_account_json"},
    )

    response = client.get("/api/config/public")

    assert response.status_code == 200
    data = response.json()
    assert data["assistant"] == "fallback"
    assert data["audio"] == "browser"
    assert data["google_services"]["gemini"]["reason"] == "missing_api_key"
    assert data["google_services"]["cloud_text_to_speech"]["reason"] == "missing_service_account_json"


def test_assistant_guide_route_returns_structured_fallback(client: TestClient) -> None:
    response = client.post(
        "/api/assistant/guide",
        json={
            "language": "en",
            "persona": "older_adult",
            "step_index": 3,
            "concern": "documents",
            "support_need": "mobility",
            "question": "I get tired if the line is too long.",
            "high_contrast": True,
            "text_scale": 1.24,
            "vote_submitted": False,
            "quiz_correct_count": 2,
        },
    )

    assert response.status_code == 200
    data = response.json()
    assert data["source"] in ("gemini", "fallback")
    assert isinstance(data["actions"], list)
    assert len(data["actions"]) >= 3
    assert "older voter" in data["why_this_help"].lower()


def test_validation_rejects_bad_step_over_http(client: TestClient) -> None:
    response = client.post(
        "/api/assistant/guide",
        json={
            "language": "en",
            "persona": "older_adult",
            "step_index": 12,
            "concern": "documents",
            "support_need": "none",
        },
    )

    assert response.status_code == 422


def test_validation_rejects_unexpected_fields(client: TestClient) -> None:
    response = client.post(
        "/api/assistant/guide",
        json={
            "language": "en",
            "persona": "older_adult",
            "step_index": 2,
            "concern": "documents",
            "support_need": "none",
            "admin": True,
        },
    )

    assert response.status_code == 422


def test_audio_route_returns_503_with_clear_reason(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        "server.main.google_audio.synthesize_speech",
        lambda **_: (None, "fallback"),
    )
    monkeypatch.setattr(
        "server.main.google_audio.google_tts_service_status",
        lambda: {"available": False, "reason": "missing_service_account_json"},
    )

    response = client.post(
        "/api/audio/speak",
        json={"language": "en", "text": "Please read this clearly."},
    )

    assert response.status_code == 503
    assert response.json()["detail"] == "missing_service_account_json"


def test_audio_route_returns_mp3_when_google_audio_succeeds(
    client: TestClient,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        "server.main.google_audio.synthesize_speech",
        lambda **_: (b"fake-audio", "google_tts"),
    )

    response = client.post(
        "/api/audio/speak",
        json={"language": "en", "text": "Please read this clearly."},
    )

    assert response.status_code == 200
    assert response.content == b"fake-audio"
    assert response.headers["content-type"] == "audio/mpeg"
    assert response.headers["x-audio-provider"] == "google_tts"


def test_audio_route_rejects_blank_text_after_normalization(client: TestClient) -> None:
    response = client.post(
        "/api/audio/speak",
        json={"language": "en", "text": "   \n\t   "},
    )

    assert response.status_code == 422


def test_security_headers_are_set_on_api_responses(client: TestClient) -> None:
    response = client.get("/api/health")

    assert response.headers["cache-control"] == "no-store"
    assert response.headers["x-content-type-options"] == "nosniff"
    assert response.headers["x-frame-options"] == "DENY"
    assert response.headers["x-permitted-cross-domain-policies"] == "none"
    assert response.headers["cross-origin-opener-policy"] == "same-origin"
    assert "default-src 'self'" in response.headers["content-security-policy"]


def test_secure_request_gets_hsts_header(client: TestClient) -> None:
    response = client.get("/api/health", headers={"x-forwarded-proto": "https"})

    assert response.status_code == 200
    assert response.headers["strict-transport-security"] == "max-age=31536000; includeSubDomains"


def test_index_route_serves_html(client: TestClient) -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "Election Process Explained" in response.text


def test_index_route_includes_security_headers(client: TestClient) -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert response.headers["x-frame-options"] == "DENY"
    assert "frame-ancestors 'none'" in response.headers["content-security-policy"]
