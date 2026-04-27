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


# ---------------------------------------------------------------------------
# Coverage-boosting tests — targeting previously uncovered lines
# ---------------------------------------------------------------------------

# --- gemini_assistant.py: line 30 (REASON_LIBRARY_UNAVAILABLE branch) ---
def test_gemini_service_status_returns_library_unavailable(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """gemini_service_status returns library_unavailable when import fails."""
    from server import gemini_assistant
    from server.gemini_assistant import REASON_LIBRARY_UNAVAILABLE

    monkeypatch.setenv("GEMINI_API_KEY", "fake-key")
    gemini_assistant._gemini_import_error.cache_clear()
    monkeypatch.setattr(
        "server.gemini_assistant._gemini_import_error",
        lambda: "No module named 'google.generativeai'",
    )

    status = gemini_assistant.gemini_service_status()

    assert status["available"] is False
    assert status["reason"] == REASON_LIBRARY_UNAVAILABLE


# --- gemini_assistant.py: line 39 (REASON_READY branch) ---
def test_gemini_service_status_returns_ready_when_key_and_lib_present(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """gemini_service_status returns ready when API key set and library importable."""
    from server import gemini_assistant
    from server.gemini_assistant import REASON_READY

    monkeypatch.setenv("GEMINI_API_KEY", "fake-key")
    gemini_assistant._gemini_import_error.cache_clear()
    monkeypatch.setattr(
        "server.gemini_assistant._gemini_import_error",
        lambda: None,
    )

    status = gemini_assistant.gemini_service_status()

    assert status["available"] is True
    assert status["reason"] == REASON_READY


# --- gemini_assistant.py: lines 71-118 (successful Gemini path) ---
def test_gemini_enhance_guidance_returns_gemini_source_on_success(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """enhance_guidance returns (updated_result, 'gemini') when model responds correctly."""
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
    # Make import check return None (no error) so service is "available"
    monkeypatch.setattr("server.gemini_assistant._gemini_import_error", lambda: None)

    fake_genai = types.ModuleType("google.generativeai")

    class _FakeResponse:
        text = "Summary: AI summary\nReassurance: AI reassurance\nVerificationTip: AI tip\nFollowUpPrompt: AI prompt"

    class _FakeModel:
        def generate_content(self, *args: object, **kwargs: object) -> _FakeResponse:
            return _FakeResponse()

    fake_genai.configure = lambda api_key=None, **_: None  # type: ignore[attr-defined]
    fake_genai.GenerativeModel = lambda *_: _FakeModel()  # type: ignore[attr-defined]

    fake_api_core_exc = types.ModuleType("google.api_core.exceptions")

    class _FakeDeadlineExceeded(Exception):
        pass

    fake_api_core_exc.DeadlineExceeded = _FakeDeadlineExceeded  # type: ignore[attr-defined]

    # Stub the full google namespace so `import google.generativeai` resolves
    fake_google = types.ModuleType("google")
    monkeypatch.setitem(sys.modules, "google", fake_google)
    monkeypatch.setitem(sys.modules, "google.generativeai", fake_genai)
    monkeypatch.setitem(sys.modules, "google.api_core", types.ModuleType("google.api_core"))
    monkeypatch.setitem(sys.modules, "google.api_core.exceptions", fake_api_core_exc)

    result, source = gemini_assistant.enhance_guidance(
        language="en",
        step_title="Voting Day",
        concern_label="Documents",
        support_label="None",
        question="What do I bring?",
        base_result=base,
    )

    assert source == "gemini"
    assert result.summary == "AI summary"
    assert result.reassurance == "AI reassurance"
    assert result.verification_tip == "AI tip"
    assert result.follow_up_prompt == "AI prompt"


# --- gemini_assistant.py: TimeoutError fallback path ---
def test_gemini_enhance_guidance_falls_back_on_timeout(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """enhance_guidance returns fallback when generate_content raises TimeoutError."""
    import sys
    import types

    from server import gemini_assistant
    from server.logic import GuideResult

    base = GuideResult(
        summary="base", actions=["a", "b", "c"],
        reassurance="r", next_step="n",
        verification_tip="v", follow_up_prompt="f", why_this_help="w",
    )

    monkeypatch.setenv("GEMINI_API_KEY", "fake-key")
    gemini_assistant._gemini_import_error.cache_clear()
    monkeypatch.setattr("server.gemini_assistant._gemini_import_error", lambda: None)

    fake_genai = types.ModuleType("google.generativeai")

    class _FakeModel:
        def generate_content(self, *args: object, **kwargs: object) -> None:
            raise TimeoutError("timed out")

    fake_genai.configure = lambda api_key=None, **_: None  # type: ignore[attr-defined]
    fake_genai.GenerativeModel = lambda *_: _FakeModel()  # type: ignore[attr-defined]

    fake_api_core_exc = types.ModuleType("google.api_core.exceptions")

    class _FakeDeadlineExceeded(Exception):
        pass

    fake_api_core_exc.DeadlineExceeded = _FakeDeadlineExceeded  # type: ignore[attr-defined]
    monkeypatch.setitem(sys.modules, "google.generativeai", fake_genai)
    monkeypatch.setitem(sys.modules, "google.api_core", types.ModuleType("google.api_core"))
    monkeypatch.setitem(sys.modules, "google.api_core.exceptions", fake_api_core_exc)

    result, source = gemini_assistant.enhance_guidance(
        language="hi",
        step_title="मतदान दिवस",
        concern_label="दस्तावेज़",
        support_label="कोई नहीं",
        question=None,
        base_result=base,
    )

    assert source == "fallback"
    assert result is base


# --- google_audio.py: lines 30-50 (TTS enabled + invalid JSON path) ---
def test_tts_client_status_returns_invalid_json_reason(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """_tts_client_status returns invalid_service_account_json for bad JSON."""
    import types
    from server import google_audio
    from server.google_audio import REASON_INVALID_SERVICE_ACCOUNT_JSON

    # Stub the google.cloud and google.oauth2 libraries so the import succeeds
    fake_tts = types.ModuleType("google.cloud.texttospeech")

    class _FakeCredentials:
        @staticmethod
        def from_service_account_info(_info: object) -> "_FakeCredentials":
            return _FakeCredentials()

    class _FakeTTSClient:
        def __init__(self, credentials: object = None) -> None:
            pass

    fake_tts.TextToSpeechClient = _FakeTTSClient  # type: ignore[attr-defined]

    fake_sa = types.ModuleType("google.oauth2.service_account")
    fake_sa.Credentials = _FakeCredentials  # type: ignore[attr-defined]

    import sys
    monkeypatch.setitem(sys.modules, "google.cloud", types.ModuleType("google.cloud"))
    monkeypatch.setitem(sys.modules, "google.cloud.texttospeech", fake_tts)
    monkeypatch.setitem(sys.modules, "google.oauth2", types.ModuleType("google.oauth2"))
    monkeypatch.setitem(sys.modules, "google.oauth2.service_account", fake_sa)

    monkeypatch.setenv("GOOGLE_TTS_ENABLED", "true")
    monkeypatch.setenv("GOOGLE_SERVICE_ACCOUNT_JSON", "not-valid-json{{{")
    google_audio._tts_client_status.cache_clear()

    _, reason = google_audio._tts_client_status()

    assert reason == REASON_INVALID_SERVICE_ACCOUNT_JSON


# --- google_audio.py: line 61 (google_tts_service_status with enabled TTS) ---
def test_google_tts_service_status_disabled_when_flag_off(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """google_tts_service_status returns disabled when GOOGLE_TTS_ENABLED is not set."""
    from server import google_audio
    from server.google_audio import REASON_DISABLED

    monkeypatch.setenv("GOOGLE_TTS_ENABLED", "")
    google_audio._tts_client_status.cache_clear()

    status = google_audio.google_tts_service_status()

    assert status["available"] is False
    assert status["reason"] == REASON_DISABLED


# --- google_audio.py: missing_service_account_json path ---
def test_tts_client_status_missing_credentials(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """_tts_client_status returns missing_service_account_json when env var absent."""
    from server import google_audio
    from server.google_audio import REASON_MISSING_SERVICE_ACCOUNT_JSON

    monkeypatch.setenv("GOOGLE_TTS_ENABLED", "true")
    monkeypatch.delenv("GOOGLE_SERVICE_ACCOUNT_JSON", raising=False)
    google_audio._tts_client_status.cache_clear()

    _, reason = google_audio._tts_client_status()

    assert reason == REASON_MISSING_SERVICE_ACCOUNT_JSON


# --- google_services.py: lines 31,33 (gemini available = True path) ---
def test_google_services_assistant_mode_gemini_when_available(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """assistant_mode_from_statuses returns 'gemini' when gemini is available."""
    from server.google_services import assistant_mode_from_statuses, audio_mode_from_statuses

    statuses = {
        "gemini": {"available": True, "reason": "ready"},
        "cloud_text_to_speech": {"available": True, "reason": "ready"},
    }

    assert assistant_mode_from_statuses(statuses) == "gemini"
    assert audio_mode_from_statuses(statuses) == "google"


# --- google_services.py: lines 40,42 (features when both available) ---
def test_google_services_features_when_both_available(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """available_google_features and guide_google_features include all features when both services ready."""
    from server.google_services import available_google_features, guide_google_features

    statuses = {
        "gemini": {"available": True, "reason": "ready"},
        "cloud_text_to_speech": {"available": True, "reason": "ready"},
    }

    assert "gemini_personalized_guidance" in available_google_features(statuses)
    assert "cloud_tts_audio_ready" in available_google_features(statuses)
    assert "gemini_personalized_guidance" in guide_google_features(statuses, "gemini")
    assert "cloud_tts_audio_ready" in guide_google_features(statuses, "gemini")


# --- config.py: lines 21-22 (google_tts_enabled + cors_origins fallback) ---
def test_config_google_tts_enabled_true(monkeypatch: pytest.MonkeyPatch) -> None:
    """google_tts_enabled returns True when env var is set to 'true'."""
    from server import config

    monkeypatch.setenv("GOOGLE_TTS_ENABLED", "true")
    assert config.google_tts_enabled() is True


def test_config_cors_origins_custom(monkeypatch: pytest.MonkeyPatch) -> None:
    """cors_origins returns custom origins when env var is set."""
    from server import config

    monkeypatch.setenv("ELECTION_GUIDE_CORS_ORIGINS", "https://example.com,https://app.example.com")
    origins = config.cors_origins()
    assert "https://example.com" in origins
    assert "https://app.example.com" in origins


# --- logic.py: lines 248-249 (last step → FINAL_DESTINATIONS path) ---
def test_logic_build_guidance_last_step_uses_final_destination() -> None:
    """build_guidance at the last step uses FINAL_DESTINATIONS for next_step."""
    from server.logic import build_guidance

    result = build_guidance(
        language="en",
        persona="older_adult",
        step_index=5,  # last step (Results Declaration)
        concern="trusted_updates",
        support_need="none",
        question=None,
        high_contrast=False,
        text_scale=1.0,
        vote_submitted=True,
        quiz_correct_count=3,
    )

    assert "FAQ" in result.next_step or "personal" in result.follow_up_prompt


# --- logic.py: line 215 (Hindi language path) ---
def test_logic_build_guidance_hindi_language() -> None:
    """build_guidance returns Hindi text when language is 'hi'."""
    from server.logic import build_guidance

    result = build_guidance(
        language="hi",
        persona="older_adult",
        step_index=0,
        concern="registration",
        support_need="vision",
        question="मुझे क्या करना चाहिए?",
        high_contrast=True,
        text_scale=1.3,
        vote_submitted=False,
        quiz_correct_count=0,
    )

    assert isinstance(result.summary, str)
    assert len(result.actions) >= 1
    # Hindi summary should contain Devanagari characters
    assert any(ord(c) > 0x0900 for c in result.summary)
