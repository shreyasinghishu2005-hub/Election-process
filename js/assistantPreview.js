(() => {
  function pick(language, english, hindi) {
    return language === "hi" ? hindi : english;
  }

  function buildOfflineAssistantPreview({
    context,
    language,
    t,
    steps,
    assistantConcerns,
    assistantSupportNeeds,
    copy,
    availableGoogleFeatures = [],
  }) {
    const stepTitle = t(steps[context.stepIndex].title);
    const concernLabel = t(
      (assistantConcerns.find((item) => item.id === context.concern) || assistantConcerns[0]).label
    );
    const supportLabel = t(
      (assistantSupportNeeds.find((item) => item.id === context.supportNeed) || assistantSupportNeeds[0]).label
    );
    const nextStep = context.stepIndex < steps.length - 1 ? t(steps[context.stepIndex + 1].title) : t(copy.faqTitle);

    let summary = pick(
      language,
      `This quick preview is focused on ${stepTitle}. Your current concern is ${concernLabel}, and the support need is ${supportLabel}.`,
      `यह त्वरित प्रीव्यू ${stepTitle} पर केंद्रित है। आपकी चिंता ${concernLabel} है और सहायता की जरूरत ${supportLabel} है।`
    );

    if (context.quizCorrectCount >= 2) {
      summary += pick(
        language,
        " You already know the basics, so the next step is calm preparation.",
        " आपको बुनियादी बातें समझ आ गई हैं, अब ध्यान शांत तैयारी पर है।"
      );
    }

    if (context.question) {
      summary += pick(
        language,
        " Your question is saved for the detailed guidance request.",
        " आपका प्रश्न विस्तृत मार्गदर्शन अनुरोध के लिए शामिल है।"
      );
    }

    const concernAction = {
      registration: pick(language, "Check your voter details early.", "मतदाता विवरण जल्दी जांचें।"),
      documents: pick(language, "Keep your ID papers together in one place.", "पहचान पत्र एक जगह रखें।"),
      booth: pick(language, "Confirm the polling booth before leaving home.", "घर से निकलने से पहले बूथ पता करें।"),
      assistance: pick(language, "Ask about senior support at the booth if needed.", "ज़रूरत हो तो वरिष्ठ सहायता के बारे में पूछें।"),
      voting_process: pick(language, "Use the step guide to understand the voting flow calmly.", "मतदान प्रक्रिया को शांति से समझने के लिए चरण गाइड देखें।"),
      trusted_updates: pick(language, "Trust only official election updates.", "सिर्फ आधिकारिक चुनाव जानकारी पर भरोसा करें।"),
    };

    const supportAction = {
      none: pick(language, "Use large text, contrast, and audio whenever it feels helpful.", "ज़रूरत लगे तो बड़े अक्षर, कॉन्ट्रास्ट और ऑडियो का उपयोग करें।"),
      vision: pick(language, "Keep glasses or a magnifier ready and ask for clear instructions.", "चश्मा या मैग्निफायर रखें और साफ निर्देश मांगें।"),
      hearing: pick(language, "Prefer written directions or face-to-face speaking support.", "लिखित निर्देश या सामने से बोलकर मदद लें।"),
      mobility: pick(language, "Plan seating, ramp access, and a comfortable travel time.", "बैठने, रैंप और आरामदायक समय की पहले योजना बनाएं।"),
      helper: pick(language, "A trusted helper can keep documents and travel plans organized.", "विश्वसनीय सहायक दस्तावेज़ और यात्रा को व्यवस्थित रख सकता है।"),
    };

    const actions = [
      concernAction[context.concern],
      supportAction[context.supportNeed],
      t(copy.assistantPreviewAction),
    ];

    if (context.voteSubmitted) {
      actions.push(
        pick(
          language,
          "Your practice vote is complete, so the final flow should feel more familiar.",
          "आपने अभ्यास वोट पूरा कर लिया है, इसलिए अंतिम प्रक्रिया अधिक परिचित लगेगी।"
        )
      );
    }

    const verificationTip = pick(
      language,
      "Use one official election source to confirm the key detail you care about most right now.",
      "जिस जानकारी की आपको अभी सबसे अधिक जरूरत है, उसे एक आधिकारिक चुनाव स्रोत से पुष्टि करें।"
    );

    const followUpPrompt = pick(
      language,
      `Would you like a simple checklist for ${nextStep}?`,
      `क्या आप ${nextStep} के लिए एक आसान चेकलिस्ट चाहते हैं?`
    );

    return {
      summary,
      actions,
      reassurance: pick(
        language,
        "This preview keeps things simple. Use Get Personal Guidance for full server advice.",
        "यह प्रीव्यू बातों को सरल रखता है। पूरी सलाह के लिए Get Personal Guidance दबाएँ।"
      ),
      nextStep,
      verificationTip,
      followUpPrompt,
      whyThisHelp: pick(
        language,
        `This quick preview uses the current step (${stepTitle}), concern (${concernLabel}), and support need (${supportLabel}) while keeping the secure server as the main source of detailed advice.`,
        `यह त्वरित प्रीव्यू वर्तमान चरण (${stepTitle}), चिंता (${concernLabel}) और सहायता की जरूरत (${supportLabel}) के आधार पर बना है, जबकि विस्तृत सलाह के लिए सुरक्षित सर्वर मुख्य स्रोत है।`
      ),
      googleFeatures: availableGoogleFeatures,
      source: "local",
    };
  }

  window.ElectionGuideAssistantPreview = {
    buildOfflineAssistantPreview,
  };
})();
