"""Environment-driven settings for the election guide assistant."""

from __future__ import annotations

import os


def gemini_api_key() -> str | None:
    key = os.getenv("GEMINI_API_KEY", "").strip()
    return key or None


def google_service_account_json() -> str | None:
    payload = os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON", "").strip()
    return payload or None


def google_tts_enabled() -> bool:
    flag = os.getenv("GOOGLE_TTS_ENABLED", "").strip().lower()
    if flag in {"1", "true", "yes", "on"}:
        return True
    return google_service_account_json() is not None


def cors_origins() -> list[str]:
    raw = os.getenv(
        "ELECTION_GUIDE_CORS_ORIGINS",
        "http://127.0.0.1:8001,http://localhost:8001,http://127.0.0.1:5500,http://localhost:5500",
    )
    values = [item.strip() for item in raw.split(",") if item.strip()]
    return values or ["http://127.0.0.1:8001", "http://localhost:8001"]
