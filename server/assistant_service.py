"""Application service for assembling assistant responses."""

from __future__ import annotations

from . import gemini_assistant, logic
from .data import CONCERN_LABELS, STEP_TITLES, SUPPORT_LABELS
from .google_services import collect_google_service_statuses, guide_google_features
from .schemas import AssistantGuideRequest, GuideResponse


def build_assistant_response(body: AssistantGuideRequest) -> GuideResponse:
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

    statuses = collect_google_service_statuses()
    return GuideResponse(
        summary=final_result.summary,
        actions=final_result.actions,
        reassurance=final_result.reassurance,
        next_step=final_result.next_step,
        verification_tip=final_result.verification_tip,
        follow_up_prompt=final_result.follow_up_prompt,
        why_this_help=final_result.why_this_help,
        source=source,
        google_features=guide_google_features(statuses, source),
    )
