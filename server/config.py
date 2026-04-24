"""Environment-driven settings for the election guide assistant."""

from __future__ import annotations

import os


def gemini_api_key() -> str | None:
    key = os.getenv("GEMINI_API_KEY", "").strip()
    return key or None


def cors_origins() -> list[str]:
    raw = os.getenv(
        "ELECTION_GUIDE_CORS_ORIGINS",
        "http://127.0.0.1:8001,http://localhost:8001,http://127.0.0.1:5500,http://localhost:5500",
    )
    values = [item.strip() for item in raw.split(",") if item.strip()]
    return values or ["http://127.0.0.1:8001", "http://localhost:8001"]
