"""Optional Google Cloud Text-to-Speech integration for elder-friendly audio."""

from __future__ import annotations

import json
from typing import Literal

from . import config

AudioProvider = Literal["google_tts", "fallback"]


def synthesize_speech(*, text: str, language: str) -> tuple[bytes | None, AudioProvider]:
    if not config.google_tts_enabled():
        return None, "fallback"

    try:
        from google.cloud import texttospeech  # type: ignore[import-untyped]
        from google.oauth2 import service_account  # type: ignore[import-untyped]

        credentials_json = config.google_service_account_json()
        if credentials_json:
            credentials = service_account.Credentials.from_service_account_info(json.loads(credentials_json))
            client = texttospeech.TextToSpeechClient(credentials=credentials)
        else:
            client = texttospeech.TextToSpeechClient()

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
    except Exception:
        return None, "fallback"
