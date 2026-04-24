"""FastAPI app for the standalone election guide challenge project."""

from __future__ import annotations

from pathlib import Path
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response
from pydantic import BaseModel, Field

from . import config, gemini_assistant, google_audio, logic
from .data import CONCERN_LABELS, STEP_TITLES, SUPPORT_LABELS

app = FastAPI(title="Election Process Guide API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.cors_origins(),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parents[1]


class AssistantGuideRequest(BaseModel):
    language: Literal["en", "hi"] = "en"
    persona: Literal["older_adult"] = "older_adult"
    step_index: int = Field(ge=0, le=5)
    concern: Literal["registration", "documents", "booth", "assistance", "voting_process", "trusted_updates"]
    support_need: Literal["none", "vision", "hearing", "mobility", "helper"] = "none"
    question: str | None = Field(default=None, max_length=400)
    high_contrast: bool = False
    text_scale: float = Field(default=1.12, ge=1.0, le=1.4)
    vote_submitted: bool = False
    quiz_correct_count: int = Field(default=0, ge=0, le=3)


class SpeakRequest(BaseModel):
    language: Literal["en", "hi"] = "en"
    text: str = Field(min_length=1, max_length=1600)


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "Election Process Guide"}


@app.get("/api/config/public")
def public_config() -> dict[str, object]:
    return {
        "assistant": "gemini" if config.gemini_api_key() else "fallback",
        "audio": "google" if config.google_tts_enabled() else "browser",
        "persona": "older_adult",
        "google_services": {
            "gemini": bool(config.gemini_api_key()),
            "cloud_text_to_speech": config.google_tts_enabled(),
        },
    }


@app.post("/api/assistant/guide")
def assistant_guide(body: AssistantGuideRequest) -> dict[str, object]:
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

    return {
        "summary": final_result.summary,
        "actions": final_result.actions,
        "reassurance": final_result.reassurance,
        "next_step": final_result.next_step,
        "why_this_help": final_result.why_this_help,
        "source": source,
    }


@app.post("/api/audio/speak")
def speak_audio(body: SpeakRequest) -> Response:
    audio_bytes, provider = google_audio.synthesize_speech(
        text=body.text,
        language=body.language,
    )
    if not audio_bytes:
        raise HTTPException(status_code=503, detail="google_text_to_speech_not_configured")
    return Response(
        content=audio_bytes,
        media_type="audio/mpeg",
        headers={"X-Audio-Provider": provider, "Cache-Control": "no-store"},
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
