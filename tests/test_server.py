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
        "server.main.google_services.collect_google_service_statuses",
        lambda: {
            "gemini": {"available": False, "reason": "missing_api_key"},
            "cloud_text_to_speech": {"available": False, "reason": "missing_service_account_json"},
        },
    )

    response = client.get("/api/config/public")

    assert response.status_code == 200
    data = response.json()
    assert data["assistant"] == "fallback"
    assert data["audio"] == "browser"
    assert data["google_services"]["gemini"]["reason"] == "missing_api_key"
    assert data["google_services"]["cloud_text_to_speech"]["reason"] == "missing_service_account_json"
    assert data["google_features"] == []


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
    assert isinstance(data["verification_tip"], str)
    assert isinstance(data["follow_up_prompt"], str)
    assert isinstance(data["google_features"], list)
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
    assert "assistantVerificationTip" in response.text


def test_assistant_preview_asset_is_served(client: TestClient) -> None:
    response = client.get("/js/assistantPreview.js")

    assert response.status_code == 200
    assert "javascript" in response.headers["content-type"]
    assert "ElectionGuideAssistantPreview" in response.text


def test_index_route_includes_security_headers(client: TestClient) -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert response.headers["x-frame-options"] == "DENY"
    assert "frame-ancestors 'none'" in response.headers["content-security-policy"]


# ---------------------------------------------------------------------------
# New tests added for code-quality-google-service-improvements
# ---------------------------------------------------------------------------

def test_parse_labeled_lines_is_total_for_arbitrary_input() -> None:
    """_parse_labeled_lines must return a dict and never raise for any input."""
    from server.gemini_assistant import _parse_labeled_lines

    tricky_inputs = [
        "",
        "   ",
        "```json\nSummary: hello\n```",
        "SUMMARY: Hello\nREASSURANCE: World",
        "no labels here at all",
        "Summary:",
        "Summary: \nReassurance: ",
        "\U0001f389 unicode \U0001f5f3\ufe0f",
        "Summary: test\nExtra: ignored\nReassurance: calm",
        "```\nSUMMARY: upper\nREASSURANCE: upper too\n```",
        "VerificationTip: check this\nFollowUpPrompt: next?",
    ]
    for s in tricky_inputs:
        result = _parse_labeled_lines(s)
        assert isinstance(result, dict), f"Expected dict for input {s!r}, got {type(result)}"


def test_gemini_enhance_guidance_falls_back_on_value_error(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """enhance_guidance must return (base_result, 'fallback') when generate_content raises ValueError."""
    import sys
    import types

    from server import gemini_assistant
    from server.logic import GuideResult

    base = GuideResult(
        summary="base summary",
        actions=["action 1", "action 2", "action 3"],
        reassurance="base reassurance",
        next_step="next",
        verification_tip="tip",
        follow_up_prompt="prompt",
        why_this_help="why",
    )

    monkeypatch.setenv("GEMINI_API_KEY", "fake-key")
    gemini_assistant._gemini_import_error.cache_clear()

    fake_genai = types.ModuleType("google.generativeai")

    class _FakeModel:
        def generate_content(self, *args: object, **kwargs: object) -> None:
            raise ValueError("bad response")

    fake_genai.configure = lambda **_: None  # type: ignore[attr-defined]
    fake_genai.GenerativeModel = lambda *_: _FakeModel()  # type: ignore[attr-defined]

    monkeypatch.setitem(sys.modules, "google.generativeai", fake_genai)

    result, source = gemini_assistant.enhance_guidance(
        language="en",
        step_title="Voting Day",
        concern_label="Documents",
        support_label="None",
        question=None,
        base_result=base,
    )

    assert source == "fallback"
    assert result is base


def test_synthesize_speech_returns_fallback_on_tts_exception(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """synthesize_speech must return (None, 'fallback') when the TTS client raises."""
    from server import google_audio
    from server.google_audio import REASON_READY

    class _FakeClient:
        def synthesize_speech(self, **_: object) -> None:
            raise RuntimeError("network error")

    monkeypatch.setattr(
        "server.google_audio._tts_client_status",
        lambda: (_FakeClient(), REASON_READY),
    )

    audio, provider = google_audio.synthesize_speech(text="hello", language="en")

    assert audio is None
    assert provider == "fallback"
