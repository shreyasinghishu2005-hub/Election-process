"""Optional Google Cloud Text-to-Speech integration for elder-friendly audio."""

from __future__ import annotations

import json
from functools import lru_cache
import logging
from typing import Literal

from . import config

AudioProvider = Literal["google_tts", "fallback"]

logger = logging.getLogger(__name__)

# Named constants for service status reason strings
REASON_READY: str = "ready"
REASON_DISABLED: str = "disabled"
REASON_MISSING_SERVICE_ACCOUNT_JSON: str = "missing_service_account_json"
REASON_LIBRARY_UNAVAILABLE: str = "library_unavailable"
REASON_INVALID_SERVICE_ACCOUNT_JSON: str = "invalid_service_account_json"
REASON_CLIENT_INITIALIZATION_FAILED: str = "client_initialization_failed"


@lru_cache(maxsize=1)
def _tts_client_status() -> tuple[object | None, str]:
    if not config.google_tts_enabled():
        return None, REASON_DISABLED

    credentials_json = config.google_service_account_json()
    if not credentials_json:
        return None, REASON_MISSING_SERVICE_ACCOUNT_JSON

    try:
        from google.cloud import texttospeech  # type: ignore[import-untyped]
        from google.oauth2 import service_account  # type: ignore[import-untyped]
    except Exception:  # pragma: no cover - depends on local environment
        return None, REASON_LIBRARY_UNAVAILABLE

    try:
        credentials = service_account.Credentials.from_service_account_info(json.loads(credentials_json))
        client = texttospeech.TextToSpeechClient(credentials=credentials)
    except (ValueError, TypeError, json.JSONDecodeError):
        logger.warning("TTS client initialization failed: invalid service account JSON")
        return None, REASON_INVALID_SERVICE_ACCOUNT_JSON
    except Exception:  # pragma: no cover - depends on cloud client internals
        return None, REASON_CLIENT_INITIALIZATION_FAILED

    logger.info("Google Cloud TTS client initialized successfully")
    return client, REASON_READY


def google_tts_service_status() -> dict[str, str | bool]:
    _, reason = _tts_client_status()
    return {"available": reason == "ready", "reason": reason}


def synthesize_speech(*, text: str, language: str) -> tuple[bytes | None, AudioProvider]:
    client, reason = _tts_client_status()
    if client is None:
        return None, "fallback"

    try:
        from google.cloud import texttospeech  # type: ignore[import-untyped]

        voice_name = "hi-IN-Wavenet-A" if language == "hi" else "en-IN-Wavenet-A"
        synthesis_input = texttospeech.SynthesisInput(text=text)
        voice = texttospeech.VoiceSelectionParams(
            language_code="hi-IN" if language == "hi" else "en-IN",
            name=voice_name,
        )
        audio_config = texttospeech.AudioConfig(
            audio_encoding=texttospeech.AudioEncoding.MP3,
            speaking_rate=0.88,
        )
        response = client.synthesize_speech(
            input=synthesis_input,
            voice=voice,
            audio_config=audio_config,
        )
        return response.audio_content, "google_tts"
    except Exception:  # pragma: no cover - third-party failure path
        logger.exception(
            "Google Cloud TTS synthesis failed (language=%s, text_length=%d)",
            language,
            len(text),
        )
        return None, "fallback"
