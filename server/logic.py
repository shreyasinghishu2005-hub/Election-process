"""Deterministic assistant logic for safe, offline-capable guidance."""

from __future__ import annotations

from dataclasses import dataclass

from .data import CONCERN_LABELS, FINAL_DESTINATIONS, PERSONA_LABELS, STEP_TITLES, SUPPORT_LABELS


@dataclass(frozen=True)
class GuideResult:
    summary: str
    actions: list[str]
    reassurance: str
    next_step: str
    why_this_help: str


def _t(language: str, english: str, hindi: str) -> str:
    return hindi if language == "hi" else english


def _lookup(table: dict[str, dict[str, str]], key: str, language: str) -> str:
    return table[key][language]


def build_guidance(
    *,
    language: str,
    persona: str,
    step_index: int,
    concern: str,
    support_need: str,
    question: str | None,
    high_contrast: bool,
    text_scale: float,
    vote_submitted: bool,
    quiz_correct_count: int,
) -> GuideResult:
    step_title = STEP_TITLES[language][step_index]
    concern_label = _lookup(CONCERN_LABELS, concern, language)
    support_label = _lookup(SUPPORT_LABELS, support_need, language)
    persona_label = PERSONA_LABELS[persona][language]

    summary = _t(
        language,
        f"You are on the {step_title} step. For an older voter, the safest approach is to keep this part simple, prepare early, and confirm official details before the day becomes stressful.",
        f"आप {step_title} चरण पर हैं। एक वरिष्ठ मतदाता के लिए सबसे अच्छा तरीका यह है कि इस हिस्से को सरल रखें, पहले से तैयारी करें और तनाव बढ़ने से पहले आधिकारिक जानकारी की पुष्टि करें।",
    )

    reassurance = _t(
        language,
        "You do not need to remember everything at once. One clear step at a time is enough.",
        "आपको सब कुछ एक साथ याद रखने की जरूरत नहीं है। एक समय में एक साफ कदम ही काफी है।",
    )

    actions: list[str] = []

    if concern == "registration":
        actions.extend(
            [
                _t(
                    language,
                    "Check the voter list early so there is time to fix spelling or address errors.",
                    "मतदाता सूची जल्दी जांचें ताकि नाम या पते की गलती सुधारने का समय मिल सके।",
                ),
                _t(
                    language,
                    "Keep age, address, and identity proof together in one easy-to-carry folder.",
                    "आयु, पता और पहचान प्रमाण एक आसान फोल्डर में साथ रखें।",
                ),
                _t(
                    language,
                    "If a detail is missing, contact the local election office instead of waiting for voting day.",
                    "यदि कोई जानकारी गायब है, तो मतदान दिवस तक इंतजार करने के बजाय स्थानीय चुनाव कार्यालय से संपर्क करें।",
                ),
            ]
        )
    elif concern == "documents":
        actions.extend(
            [
                _t(
                    language,
                    "Carry an accepted photo ID and any voter slip or note that helps you find your record faster.",
                    "मान्य फोटो पहचान पत्र और वोटर स्लिप जैसी कोई भी पर्ची साथ रखें ताकि रिकॉर्ड जल्दी मिले।",
                ),
                _t(
                    language,
                    "Place your ID in the same bag or pocket you plan to use on voting day.",
                    "अपना पहचान पत्र उसी बैग या जेब में रखें जिसे आप मतदान दिवस पर इस्तेमाल करेंगे।",
                ),
                _t(
                    language,
                    "If rules differ in your area, confirm accepted documents from official election sources.",
                    "यदि आपके क्षेत्र में नियम अलग हैं, तो आधिकारिक चुनाव स्रोतों से मान्य दस्तावेजों की पुष्टि करें।",
                ),
            ]
        )
    elif concern == "booth":
        actions.extend(
            [
                _t(
                    language,
                    "Check your polling booth location before you leave home.",
                    "घर से निकलने से पहले अपना मतदान केंद्र देख लें।",
                ),
                _t(
                    language,
                    "Write the booth name down or save it in a phone note so you do not need to remember it under stress.",
                    "मतदान केंद्र का नाम लिख लें या फोन नोट में सेव कर लें ताकि तनाव में याद न रखना पड़े।",
                ),
                _t(
                    language,
                    "Travel at a comfortable time and keep a contact number ready in case you need help on the way.",
                    "आरामदायक समय पर निकलें और जरूरत पड़ने पर मदद के लिए एक संपर्क नंबर तैयार रखें।",
                ),
            ]
        )
    elif concern == "assistance":
        actions.extend(
            [
                _t(
                    language,
                    "Ask polling staff politely about senior citizen support, seating, or queue assistance if available.",
                    "यदि उपलब्ध हो तो मतदान कर्मियों से वरिष्ठ नागरिक सहायता, बैठने की जगह या लाइन में मदद के बारे में विनम्रता से पूछें।",
                ),
                _t(
                    language,
                    "Keep walking support, hearing aids, or spectacles with you instead of packing them away.",
                    "चलने का सहारा, सुनने की मशीन या चश्मा अपने साथ रखें, अलग रखकर न जाएं।",
                ),
                _t(
                    language,
                    "If local rules allow, go with a trusted family helper who can help you stay calm and organized.",
                    "यदि स्थानीय नियम अनुमति दें, तो किसी विश्वसनीय परिवार सदस्य के साथ जाएं जो आपको शांत और व्यवस्थित रहने में मदद करे।",
                ),
            ]
        )
    elif concern == "voting_process":
        actions.extend(
            [
                _t(
                    language,
                    "Read or listen to the voting instructions slowly before entering the final voting area.",
                    "अंतिम मतदान क्षेत्र में जाने से पहले मतदान निर्देशों को धीरे-धीरे पढ़ें या सुनें।",
                ),
                _t(
                    language,
                    "Take your time. You do not need to rush if you need a moment to understand the process.",
                    "आराम से करें। प्रक्रिया समझने के लिए समय चाहिए तो जल्दबाजी की जरूरत नहीं है।",
                ),
                _t(
                    language,
                    "If something is unclear before the final vote is cast, ask staff to explain the general process again.",
                    "अंतिम वोट डालने से पहले कुछ स्पष्ट न हो तो कर्मचारियों से सामान्य प्रक्रिया फिर समझाने को कहें।",
                ),
            ]
        )
    else:
        actions.extend(
            [
                _t(
                    language,
                    "Trust official election websites, notices, or helplines for key details.",
                    "मुख्य जानकारी के लिए आधिकारिक चुनाव वेबसाइट, सूचना या हेल्पलाइन पर भरोसा करें।",
                ),
                _t(
                    language,
                    "Be careful with forwarded messages, rumors, and social media claims.",
                    "फॉरवर्ड संदेश, अफवाहें और सोशल मीडिया दावों से सावधान रहें।",
                ),
                _t(
                    language,
                    "If you hear conflicting information, write down the question and verify it from one official source.",
                    "यदि अलग-अलग जानकारी मिले, तो सवाल लिख लें और एक आधिकारिक स्रोत से सत्यापित करें।",
                ),
            ]
        )

    if support_need == "vision":
        actions.insert(
            0,
            _t(
                language,
                "Keep spectacles or a magnifier ready and ask staff to repeat written instructions clearly.",
                "चश्मा या मैग्निफायर तैयार रखें और कर्मचारियों से लिखे निर्देश साफ-साफ दोहराने को कहें।",
            ),
        )
        reassurance = _t(
            language,
            "Using larger text and asking for clear instructions is a smart step, not an inconvenience.",
            "बड़े अक्षरों का उपयोग करना और साफ निर्देश मांगना समझदारी है, कोई परेशानी नहीं।",
        )
    elif support_need == "hearing":
        actions.insert(
            0,
            _t(
                language,
                "Prefer written directions or ask someone to face you while speaking so instructions are easier to follow.",
                "लिखित निर्देश लें या किसी से सामने देखकर बोलने को कहें ताकि निर्देश समझना आसान हो।",
            ),
        )
    elif support_need == "mobility":
        actions.insert(
            0,
            _t(
                language,
                "Ask early about seating, ramp access, or a shorter waiting option if such support exists at the booth.",
                "यदि ऐसी सुविधा उपलब्ध हो तो पहले ही बैठने, रैंप या कम इंतजार वाले विकल्प के बारे में पूछें।",
            ),
        )
        reassurance = _t(
            language,
            "Comfort and safety matter. Planning around movement is part of good preparation.",
            "सुविधा और सुरक्षा महत्वपूर्ण हैं। चलने-फिरने के अनुसार योजना बनाना अच्छी तैयारी का हिस्सा है।",
        )
    elif support_need == "helper":
        actions.insert(
            0,
            _t(
                language,
                "A trusted family helper can keep documents organized and reduce stress before you leave home.",
                "कोई विश्वसनीय परिवार सहायक दस्तावेज व्यवस्थित रखने और घर से निकलने से पहले तनाव कम करने में मदद कर सकता है।",
            ),
        )

    if vote_submitted:
        reassurance = _t(
            language,
            "You already completed the practice ballot, which means the final voting flow will feel more familiar.",
            "आपने अभ्यास वाला मतपत्र पूरा कर लिया है, इसलिए अंतिम मतदान प्रक्रिया अब अधिक परिचित लगेगी।",
        )

    if quiz_correct_count >= 2:
        summary += _t(
            language,
            " You already understand the basics well, so now the focus is confidence and preparation.",
            " आपको बुनियादी बातें अच्छी तरह समझ आ गई हैं, इसलिए अब ध्यान आत्मविश्वास और तैयारी पर है।",
        )

    if question:
        summary += _t(
            language,
            " Your own question is included in this advice so the guidance stays practical for your situation.",
            " आपके अपने प्रश्न को भी इस सलाह में शामिल किया गया है ताकि मार्गदर्शन आपकी स्थिति के अनुसार उपयोगी रहे।",
        )

    accessibility_context = []
    if high_contrast:
      accessibility_context.append(_t(language, "high contrast is on", "हाई कॉन्ट्रास्ट चालू है"))
    if text_scale > 1.12:
      accessibility_context.append(_t(language, "larger text is active", "बड़ा अक्षर आकार चालू है"))

    why_this_help = _t(
        language,
        f"This advice is based on the {persona_label} persona, the current step ({step_title}), your selected concern ({concern_label}), and support need ({support_label})"
        + (f", plus accessibility settings such as {', '.join(accessibility_context)}." if accessibility_context else "."),
        f"यह सलाह {persona_label} व्यक्तित्व, वर्तमान चरण ({step_title}), आपकी चुनी हुई चिंता ({concern_label}) और सहायता की जरूरत ({support_label})"
        + (f", तथा पहुंच सेटिंग जैसे {', '.join(accessibility_context)} के आधार पर दी गई है।" if accessibility_context else " के आधार पर दी गई है।"),
    )

    next_step = STEP_TITLES[language][step_index + 1] if step_index < len(STEP_TITLES[language]) - 1 else FINAL_DESTINATIONS[language]

    return GuideResult(
        summary=summary,
        actions=actions[:4],
        reassurance=reassurance,
        next_step=next_step,
        why_this_help=why_this_help,
    )
