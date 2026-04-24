"""FastAPI app for the standalone election guide challenge project."""

from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response

from . import config, gemini_assistant, google_audio, logic
from .data import CONCERN_LABELS, STEP_TITLES, SUPPORT_LABELS
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
async def add_security_headers(request: Request, call_next) -> Response:
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


def _google_service_statuses() -> dict[str, dict[str, str | bool]]:
    return {
        "gemini": gemini_assistant.gemini_service_status(),
        "cloud_text_to_speech": google_audio.google_tts_service_status(),
    }


def _request_is_secure(request: Request) -> bool:
    forwarded_proto = request.headers.get("x-forwarded-proto", "").split(",")[0].strip().lower()
    return request.url.scheme == "https" or forwarded_proto == "https"


@app.get("/api/health", response_model=HealthResponse)
def health() -> HealthResponse:
    google_services = _google_service_statuses()
    return HealthResponse(
        status="ok",
        service="Election Process Guide",
        google_services={
            name: _service_status_response(status) for name, status in google_services.items()
        },
    )


@app.get("/api/config/public", response_model=PublicConfigResponse)
def public_config() -> PublicConfigResponse:
    google_services = _google_service_statuses()
    gemini_status = google_services["gemini"]
    google_tts_status = google_services["cloud_text_to_speech"]
    return PublicConfigResponse(
        assistant="gemini" if gemini_status["available"] else "fallback",
        audio="google" if google_tts_status["available"] else "browser",
        persona="older_adult",
        google_services={
            name: _service_status_response(status) for name, status in google_services.items()
        },
    )


@app.post("/api/assistant/guide", response_model=GuideResponse)
def assistant_guide(body: AssistantGuideRequest) -> GuideResponse:
    base_result = logic.build_guidance(
        language=body.language,
        persona=body.persona,
        step_index=body.step_index,
        concern=body.concern,
        support_need=body.support_need,
        question=body.question,
        high_contrast=body.high_contrast,
        text_scale=body.text_scale,
        vote_submitted=body.vote_submitted,
        quiz_correct_count=body.quiz_correct_count,
    )

    step_title = STEP_TITLES[body.language][body.step_index]
    concern_label = CONCERN_LABELS[body.concern][body.language]
    support_label = SUPPORT_LABELS[body.support_need][body.language]
    final_result, source = gemini_assistant.enhance_guidance(
        language=body.language,
        step_title=step_title,
        concern_label=concern_label,
        support_label=support_label,
        question=body.question,
        base_result=base_result,
    )

    return GuideResponse(
        summary=final_result.summary,
        actions=final_result.actions,
        reassurance=final_result.reassurance,
        next_step=final_result.next_step,
        why_this_help=final_result.why_this_help,
        source=source,
    )


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
