"""FastAPI app for the standalone election guide challenge project."""

from __future__ import annotations

from pathlib import Path

from typing import Callable, Awaitable

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from fastapi.staticfiles import StaticFiles

from . import assistant_service, config, google_audio, google_services
from .schemas import (
    AssistantGuideRequest,
    GuideResponse,
    HealthResponse,
    PublicConfigResponse,
    ServiceStatusResponse,
    SpeakRequest,
)

app = FastAPI(title="Election Process Guide API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.cors_origins(),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parents[1]
app.mount("/js", StaticFiles(directory=BASE_DIR / "js"), name="js")
CSP_POLICY = (
    "default-src 'self'; "
    "script-src 'self'; "
    "style-src 'self'; "
    "img-src 'self' data:; "
    "media-src 'self' blob:; "
    "connect-src 'self'; "
    "font-src 'self' data:; "
    "object-src 'none'; "
    "base-uri 'self'; "
    "form-action 'self'; "
    "frame-ancestors 'none'"
)


@app.middleware("http")
async def add_security_headers(request: Request, call_next: Callable[[Request], Awaitable[Response]]) -> Response:
    response = await call_next(request)

    if request.url.path.startswith("/api/"):
        response.headers.setdefault("Cache-Control", "no-store")

    if config.security_headers_enabled():
        response.headers.setdefault("Content-Security-Policy", CSP_POLICY)
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault("Permissions-Policy", "camera=(), geolocation=(), microphone=()")
        response.headers.setdefault("X-Permitted-Cross-Domain-Policies", "none")
        response.headers.setdefault("Cross-Origin-Opener-Policy", "same-origin")
        response.headers.setdefault("Cross-Origin-Resource-Policy", "same-origin")
        if _request_is_secure(request):
            response.headers.setdefault("Strict-Transport-Security", "max-age=31536000; includeSubDomains")

    return response


def _service_status_response(data: dict[str, str | bool]) -> ServiceStatusResponse:
    return ServiceStatusResponse(available=bool(data["available"]), reason=str(data["reason"]))


def _request_is_secure(request: Request) -> bool:
    forwarded_proto = request.headers.get("x-forwarded-proto", "").split(",")[0].strip().lower()
    return request.url.scheme == "https" or forwarded_proto == "https"


@app.get("/api/health", response_model=HealthResponse)
def health() -> HealthResponse:
    service_statuses = google_services.collect_google_service_statuses()
    return HealthResponse(
        status="ok",
        service="Election Process Guide",
        google_services={
            name: _service_status_response(status) for name, status in service_statuses.items()
        },
    )


@app.get("/api/config/public", response_model=PublicConfigResponse)
def public_config() -> PublicConfigResponse:
    service_statuses = google_services.collect_google_service_statuses()
    return PublicConfigResponse(
        assistant=google_services.assistant_mode_from_statuses(service_statuses),
        audio=google_services.audio_mode_from_statuses(service_statuses),
        persona="older_adult",
        google_services={
            name: _service_status_response(status) for name, status in service_statuses.items()
        },
        google_features=google_services.available_google_features(service_statuses),
    )


@app.post("/api/assistant/guide", response_model=GuideResponse)
def assistant_guide(body: AssistantGuideRequest) -> GuideResponse:
    return assistant_service.build_assistant_response(body)


@app.post("/api/audio/speak")
def speak_audio(body: SpeakRequest) -> Response:
    audio_bytes, provider = google_audio.synthesize_speech(
        text=body.text,
        language=body.language,
    )
    if not audio_bytes:
        status = google_audio.google_tts_service_status()
        detail = status["reason"] if status["reason"] != "ready" else "synthesis_failed"
        raise HTTPException(status_code=503, detail=detail)
    return Response(
        content=audio_bytes,
        media_type="audio/mpeg",
        headers={"X-Audio-Provider": provider},
    )


@app.get("/", include_in_schema=False)
def index() -> FileResponse:
    return FileResponse(BASE_DIR / "index.html")


@app.get("/styles.css", include_in_schema=False)
def styles() -> FileResponse:
    return FileResponse(BASE_DIR / "styles.css")


@app.get("/script.js", include_in_schema=False)
def script() -> FileResponse:
    return FileResponse(BASE_DIR / "script.js")
