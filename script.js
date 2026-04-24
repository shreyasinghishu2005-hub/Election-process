const localized = (en, hi) => ({ en, hi });

const copy = {
  brandEyebrow: localized("Smart civic learning tool", "स्मार्ट नागरिक सीखने का साधन"),
  brandTitle: localized("Election Process Explained", "चुनाव प्रक्रिया समझिए"),
  brandSubtitle: localized(
    "Built for older voters with simple steps, large text, and calm guidance.",
    "बुजुर्ग मतदाताओं के लिए सरल चरण, बड़े अक्षर और शांत मार्गदर्शन के साथ बनाया गया है।"
  ),
  languageLabel: localized("Language", "भाषा"),
  english: localized("English", "English"),
  hindi: localized("Hindi", "हिंदी"),
  textSizeLabel: localized("Text size", "अक्षर आकार"),
  decreaseText: localized("A-", "A-"),
  increaseText: localized("A+", "A+"),
  contrastLabel: localized("Contrast", "कॉन्ट्रास्ट"),
  contrastOn: localized("High contrast", "हाई कॉन्ट्रास्ट"),
  contrastOff: localized("Standard view", "सामान्य दृश्य"),
  voiceLabel: localized("Audio", "ऑडियो"),
  stopAudio: localized("Stop audio", "ऑडियो बंद करें"),
  voiceReady: localized("Voice support ready", "आवाज सहायता तैयार है"),
  voicePlaying: localized("Audio is playing", "ऑडियो चल रहा है"),
  heroEyebrow: localized("Easy guide for all ages", "हर उम्र के लिए आसान गाइड"),
  heroTitle: localized(
    "Learn how an election works, one step at a time.",
    "चुनाव कैसे होता है, इसे एक-एक कदम में समझिए।"
  ),
  heroIntro: localized(
    "This guide explains what happens before voting day, on voting day, and after the vote count. The language stays simple so older adults can follow without confusion.",
    "यह गाइड बताती है कि मतदान से पहले, मतदान के दिन और वोट गिनती के बाद क्या होता है। भाषा आसान रखी गई है ताकि बुजुर्ग बिना उलझन के समझ सकें।"
  ),
  startLearning: localized("Start Learning", "सीखना शुरू करें"),
  viewTimeline: localized("View Timeline", "टाइमलाइन देखें"),
  listenAudio: localized("Listen Audio", "आवाज में सुनें"),
  listenSection: localized("Listen", "सुनें"),
  listenStep: localized("Listen to this step", "यह चरण सुनें"),
  assistantEyebrow: localized("Smart assistant", "स्मार्ट सहायक"),
  assistantTitle: localized(
    "Get personal help for an older voter",
    "वरिष्ठ मतदाता के लिए व्यक्तिगत मदद पाएं"
  ),
  assistantIntro: localized(
    "This assistant changes its advice based on the current election step, your concern, accessibility need, practice progress, and optional question. It works offline with local rules and can use Google Gemini when the secure server is running.",
    "यह सहायक वर्तमान चुनाव चरण, आपकी चिंता, सहायता की जरूरत, अभ्यास प्रगति और वैकल्पिक प्रश्न के आधार पर सलाह बदलता है। यह स्थानीय नियमों के साथ ऑफलाइन भी काम करता है और सुरक्षित सर्वर चलने पर Google Gemini का उपयोग कर सकता है।"
  ),
  assistantPersona: localized("Chosen persona: Older voter", "चुना गया व्यक्तित्व: वरिष्ठ मतदाता"),
  assistantConcernLabel: localized("What do you need help with?", "आपको किस बात में मदद चाहिए?"),
  assistantSupportLabel: localized("Accessibility or support need", "सहायता या पहुंच की जरूरत"),
  assistantQuestionLabel: localized("Optional question", "वैकल्पिक प्रश्न"),
  assistantQuestionPlaceholder: localized(
    "Example: I may need help standing in line for a long time.",
    "उदाहरण: मुझे लंबी लाइन में खड़े रहने में कठिनाई हो सकती है।"
  ),
  assistantAsk: localized("Get Personal Guidance", "व्यक्तिगत मार्गदर्शन लें"),
  assistantLoading: localized("Preparing guidance...", "मार्गदर्शन तैयार हो रहा है..."),
  assistantSummaryTitle: localized("Personal guidance", "व्यक्तिगत मार्गदर्शन"),
  assistantActionsTitle: localized("Recommended actions", "सुझाए गए कदम"),
  assistantReassuranceLabel: localized("Reassurance:", "हौसला:"),
  assistantNextStepLabel: localized("Next:", "अगला:"),
  assistantModeLocal: localized("Offline browser mode", "ऑफलाइन ब्राउज़र मोड"),
  assistantModeFallback: localized("Server rules ready", "सर्वर नियम तैयार"),
  assistantModeGemini: localized("Google Gemini ready", "Google Gemini तैयार"),
  assistantSourceLocal: localized("Source: local smart rules", "स्रोत: स्थानीय स्मार्ट नियम"),
  assistantSourceFallback: localized("Source: secure server fallback", "स्रोत: सुरक्षित सर्वर फॉलबैक"),
  assistantSourceGemini: localized("Source: Google Gemini", "स्रोत: Google Gemini"),
  guideEyebrow: localized("Step-by-step guide", "एक-एक चरण की जानकारी"),
  guideTitle: localized("Follow the election process in order", "चुनाव प्रक्रिया को सही क्रम में समझें"),
  guideIntro: localized(
    "Use Next and Back to move through the process. Each screen keeps the explanation short and clear.",
    "प्रक्रिया समझने के लिए Next और Back का उपयोग करें। हर स्क्रीन पर जानकारी छोटी और साफ रखी गई है।"
  ),
  prevStep: localized("Back", "पीछे"),
  nextStep: localized("Next", "अगला"),
  stepForYou: localized("What this means for you", "आपके लिए इसका मतलब"),
  timelineEyebrow: localized("Visual timeline", "दृश्य टाइमलाइन"),
  timelineTitle: localized("See all six steps together", "सभी छह चरण एक साथ देखें"),
  timelineIntro: localized(
    "Tap any step to jump straight to it. The current step stays highlighted.",
    "किसी भी चरण पर टैप करें और सीधे उस पर जाएं। जो चरण खुला है, वह हाइलाइट रहेगा।"
  ),
  guidanceEyebrow: localized("Real-life guidance", "व्यावहारिक मदद"),
  guidanceTitle: localized("What you need to do", "आपको क्या करना है"),
  guidanceIntro: localized(
    "These reminders help you prepare for voting day in a calm and simple way.",
    "ये आसान याद दिलाने वाली बातें आपको मतदान दिवस के लिए सरल तरीके से तैयार करती हैं।"
  ),
  guidanceNote: localized(
    "Rules can change by place. Always confirm local details with your election office or official election website.",
    "नियम अलग-अलग जगह बदल सकते हैं। सही जानकारी के लिए अपने स्थानीय चुनाव कार्यालय या आधिकारिक चुनाव वेबसाइट से पुष्टि करें।"
  ),
  practiceEyebrow: localized("Practice mode", "प्रैक्टिस मोड"),
  practiceTitle: localized("Try a simple demo ballot", "एक आसान डेमो मतपत्र आजमाएं"),
  practiceIntro: localized(
    "This is only for learning. Choose one candidate and press Submit Vote to see how a simple ballot works.",
    "यह केवल सीखने के लिए है। एक उम्मीदवार चुनें और Submit Vote दबाएं ताकि समझ सकें कि सरल मतपत्र कैसे काम करता है।"
  ),
  practiceNote: localized("Demo only. No real vote is recorded here.", "यह केवल डेमो है। यहां कोई वास्तविक वोट दर्ज नहीं होता।"),
  submitVote: localized("Submit Vote", "वोट जमा करें"),
  resetVote: localized("Clear Choice", "चयन हटाएं"),
  voteSuccess: localized(
    "Vote submitted successfully. This was a practice vote only.",
    "वोट सफलतापूर्वक जमा हुआ। यह केवल अभ्यास वाला वोट था।"
  ),
  votePickFirst: localized("Please choose one candidate first.", "कृपया पहले एक उम्मीदवार चुनें।"),
  quizEyebrow: localized("Simple quiz", "सरल प्रश्न"),
  quizTitle: localized("Check what you learned", "देखिए आपने क्या सीखा"),
  quizIntro: localized(
    "These questions are short and easy. You will get feedback right away.",
    "ये प्रश्न छोटे और आसान हैं। आपको तुरंत उत्तर मिलेगा कि जवाब सही है या नहीं।"
  ),
  correct: localized("Correct", "सही"),
  tryAgain: localized("Try again", "फिर कोशिश करें"),
  faqEyebrow: localized("Help and FAQ", "मदद और सामान्य प्रश्न"),
  faqTitle: localized("Common questions", "सामान्य सवाल"),
  faqIntro: localized(
    "Short answers to common concerns people have before voting.",
    "मतदान से पहले लोगों के सामान्य सवालों के छोटे और साफ जवाब।"
  ),
  stepCounter: localized("Step", "चरण"),
  of: localized("of", "में से"),
  speechUnavailable: localized(
    "This browser does not support text-to-speech.",
    "यह ब्राउज़र टेक्स्ट को आवाज में पढ़ने का समर्थन नहीं करता।"
  ),
  speechStarted: localized("Reading aloud started.", "आवाज में पढ़ना शुरू हुआ।"),
  speechStopped: localized("Audio stopped.", "ऑडियो बंद हुआ।"),
  languageChanged: localized("Language changed.", "भाषा बदल गई है।"),
  textSmaller: localized("Text size decreased.", "अक्षर आकार छोटा किया गया।"),
  textLarger: localized("Text size increased.", "अक्षर आकार बड़ा किया गया।"),
  contrastChanged: localized("Contrast setting changed.", "कॉन्ट्रास्ट सेटिंग बदली गई।"),
};

const steps = [
  {
    icon: "🪪",
    title: localized("Voter Registration", "मतदाता पंजीकरण"),
    description: localized(
      "Your name must be on the voter list before election day. It is best to check early so there is time to correct mistakes.",
      "मतदान दिवस से पहले आपका नाम मतदाता सूची में होना चाहिए। गलती सुधारने का समय मिले, इसलिए पहले से जांच करना बेहतर है।"
    ),
    helper: localized(
      "Keep your basic details ready, such as name, address, age proof, and any form your local authority asks for.",
      "अपना नाम, पता, आयु प्रमाण और स्थानीय प्राधिकरण द्वारा मांगे गए फॉर्म जैसी जरूरी जानकारी तैयार रखें।"
    ),
  },
  {
    icon: "📄",
    title: localized("Candidate Nomination", "उम्मीदवार नामांकन"),
    description: localized(
      "People who want to contest the election submit forms and documents. Election officials check whether each application meets the rules.",
      "जो लोग चुनाव लड़ना चाहते हैं, वे फॉर्म और दस्तावेज जमा करते हैं। चुनाव अधिकारी जांच करते हैं कि आवेदन नियमों के अनुसार है या नहीं।"
    ),
    helper: localized(
      "This step helps make sure the final list of candidates is official and verified.",
      "यह चरण सुनिश्चित करता है कि अंतिम उम्मीदवार सूची आधिकारिक और जांची हुई हो।"
    ),
  },
  {
    icon: "📣",
    title: localized("Campaigning", "प्रचार"),
    description: localized(
      "Candidates meet voters and explain their plans. Campaigning is allowed only within election rules about speech, money, and public conduct.",
      "उम्मीदवार मतदाताओं से मिलते हैं और अपनी योजनाएं बताते हैं। प्रचार चुनाव नियमों के भीतर ही किया जा सकता है, जैसे भाषण, खर्च और सार्वजनिक व्यवहार।"
    ),
    helper: localized(
      "Use this time to compare ideas calmly and listen for clear promises that matter to your daily life.",
      "इस समय अलग-अलग विचारों की शांत मन से तुलना करें और उन वादों पर ध्यान दें जो आपके रोजमर्रा जीवन से जुड़ते हैं।"
    ),
  },
  {
    icon: "🗳️",
    title: localized("Voting Day", "मतदान दिवस"),
    description: localized(
      "Go to your polling booth, show accepted identification, and cast your vote. Your choice stays secret.",
      "अपने मतदान केंद्र पर जाएं, मान्य पहचान पत्र दिखाएं और वोट डालें। आपका वोट गुप्त रहता है।"
    ),
    helper: localized(
      "Check your booth location in advance, go at a comfortable time, and ask polling staff for help if you need assistance.",
      "पहले से अपना मतदान केंद्र देख लें, आरामदायक समय पर जाएं और जरूरत हो तो मतदान कर्मियों से मदद मांगें।"
    ),
  },
  {
    icon: "📊",
    title: localized("Vote Counting", "वोट गिनती"),
    description: localized(
      "After voting ends, officials count valid votes carefully. Observers and authorized agents may watch the process.",
      "मतदान खत्म होने के बाद अधिकारी मान्य वोटों की सावधानी से गिनती करते हैं। पर्यवेक्षक और अधिकृत प्रतिनिधि इस प्रक्रिया को देख सकते हैं।"
    ),
    helper: localized(
      "Counting is meant to be orderly and transparent so people can trust the result.",
      "गिनती की प्रक्रिया व्यवस्थित और पारदर्शी रखी जाती है ताकि लोग परिणाम पर भरोसा कर सकें।"
    ),
  },
  {
    icon: "🏁",
    title: localized("Results Declaration", "परिणाम घोषणा"),
    description: localized(
      "When counting is complete, the official result is announced publicly. The winner is declared according to the election rules.",
      "गिनती पूरी होने पर आधिकारिक परिणाम सार्वजनिक रूप से घोषित किया जाता है। चुनाव नियमों के अनुसार विजेता घोषित होता है।"
    ),
    helper: localized(
      "Wait for official updates from trusted election sources instead of relying on rumors or forwarded messages.",
      "अफवाहों या फॉरवर्ड संदेशों पर नहीं, बल्कि आधिकारिक चुनाव स्रोतों की जानकारी पर भरोसा करें।"
    ),
  },
];

const guidanceItems = [
  {
    title: localized("How to register", "पंजीकरण कैसे करें"),
    points: [
      localized("Check whether your name is already on the voter list.", "जांच करें कि आपका नाम पहले से मतदाता सूची में है या नहीं।"),
      localized(
        "If needed, fill the required form and submit proof of identity and address.",
        "जरूरत हो तो जरूरी फॉर्म भरें और पहचान व पते का प्रमाण जमा करें।"
      ),
    ],
  },
  {
    title: localized("What to carry", "क्या साथ ले जाएं"),
    points: [
      localized(
        "Carry an accepted photo ID and any voter slip or reference note you have.",
        "मान्य फोटो पहचान पत्र और आपके पास हो तो वोटर स्लिप या संदर्भ पर्ची साथ रखें।"
      ),
      localized(
        "If you use spectacles, hearing aids, or a walking support, take them with you.",
        "यदि आप चश्मा, सुनने की मशीन या चलने का सहारा लेते हैं, तो उसे साथ ले जाएं।"
      ),
    ],
  },
  {
    title: localized("How to vote", "वोट कैसे दें"),
    points: [
      localized(
        "Find your polling desk, confirm your name, and follow the instructions given there.",
        "अपनी मतदान डेस्क खोजें, अपना नाम जांचें और वहां दिए गए निर्देशों का पालन करें।"
      ),
      localized(
        "Press the button or mark the ballot for your chosen candidate, then complete the final step as guided by staff.",
        "अपने चुने हुए उम्मीदवार के लिए बटन दबाएं या मतपत्र पर निशान लगाएं, फिर कर्मचारियों के बताए अंतिम चरण को पूरा करें।"
      ),
    ],
  },
];

const candidates = [
  { id: "candidate-a", name: "Asha Verma", label: localized("Candidate A", "उम्मीदवार A"), note: localized("Practice choice only", "केवल अभ्यास विकल्प") },
  { id: "candidate-b", name: "Rohan Mehta", label: localized("Candidate B", "उम्मीदवार B"), note: localized("Practice choice only", "केवल अभ्यास विकल्प") },
  { id: "candidate-c", name: "Nazia Khan", label: localized("Candidate C", "उम्मीदवार C"), note: localized("Practice choice only", "केवल अभ्यास विकल्प") },
];

const quizQuestions = [
  {
    question: localized(
      "When is the best time to check whether your name is on the voter list?",
      "मतदाता सूची में अपना नाम जांचने का सबसे अच्छा समय कब है?"
    ),
    options: [
      localized("Only after the results are announced", "केवल परिणाम आने के बाद"),
      localized("Before election day", "मतदान दिवस से पहले"),
      localized("There is no need to check", "जांच करने की जरूरत नहीं है"),
    ],
    correctIndex: 1,
  },
  {
    question: localized("What should you usually carry on voting day?", "मतदान दिवस पर आम तौर पर क्या साथ ले जाना चाहिए?"),
    options: [
      localized("An accepted photo ID", "मान्य फोटो पहचान पत्र"),
      localized("A school notebook", "स्कूल की कॉपी"),
      localized("A shopping bill", "खरीदारी की रसीद"),
    ],
    correctIndex: 0,
  },
  {
    question: localized("Is your vote meant to stay private?", "क्या आपका वोट निजी और गुप्त रहना चाहिए?"),
    options: [
      localized("Yes, your choice is secret", "हां, आपका चुनाव गुप्त रहता है"),
      localized("No, everyone should know", "नहीं, सबको पता होना चाहिए"),
      localized("Only your neighbors should know", "केवल पड़ोसियों को पता होना चाहिए"),
    ],
    correctIndex: 0,
  },
];

const faqs = [
  {
    question: localized("What if I forget my ID?", "अगर मैं पहचान पत्र भूल जाऊं तो क्या होगा?"),
    answer: localized(
      "Ask the polling staff what other accepted proof is allowed in your area. Rules can differ, so official guidance is important.",
      "मतदान कर्मियों से पूछें कि आपके क्षेत्र में कौन सा दूसरा मान्य प्रमाण स्वीकार है। नियम अलग हो सकते हैं, इसलिए आधिकारिक जानकारी जरूरी है।"
    ),
  },
  {
    question: localized("Where is my polling booth?", "मेरा मतदान केंद्र कहां है?"),
    answer: localized(
      "Check your voter slip, official election message, or your local election website before you travel.",
      "यात्रा से पहले अपनी वोटर स्लिप, आधिकारिक चुनाव संदेश या स्थानीय चुनाव वेबसाइट देखें।"
    ),
  },
  {
    question: localized(
      "Can I ask for help if I am elderly or have difficulty walking?",
      "अगर मैं बुजुर्ग हूं या चलने में दिक्कत है तो क्या मैं मदद मांग सकता हूं?"
    ),
    answer: localized(
      "Yes. Polling staff can guide you, and many places provide support for senior citizens and voters with disabilities.",
      "हां। मतदान कर्मी आपकी मदद कर सकते हैं, और कई जगह वरिष्ठ नागरिकों व दिव्यांग मतदाताओं के लिए सहायता उपलब्ध होती है।"
    ),
  },
  {
    question: localized(
      "Should I trust every election message I receive on my phone?",
      "क्या मुझे फोन पर मिला हर चुनाव संदेश सच मान लेना चाहिए?"
    ),
    answer: localized(
      "No. Use official election sources for important details such as dates, booth location, and ID rules.",
      "नहीं। तारीख, मतदान केंद्र और पहचान नियम जैसी जरूरी जानकारी के लिए आधिकारिक चुनाव स्रोतों का उपयोग करें।"
    ),
  },
];

const assistantConcerns = [
  { id: "registration", label: localized("Checking registration", "पंजीकरण जांचना") },
  { id: "documents", label: localized("What ID or papers to carry", "कौन सा पहचान पत्र या कागज ले जाएं") },
  { id: "booth", label: localized("Finding the polling booth", "मतदान केंद्र ढूंढना") },
  { id: "assistance", label: localized("Senior citizen support at the booth", "मतदान केंद्र पर वरिष्ठ सहायता") },
  { id: "voting_process", label: localized("Understanding the voting process", "मतदान प्रक्रिया समझना") },
  { id: "trusted_updates", label: localized("How to trust election updates", "चुनाव जानकारी पर भरोसा कैसे करें") },
];

const assistantSupportNeeds = [
  { id: "none", label: localized("No extra support needed", "अतिरिक्त सहायता की जरूरत नहीं") },
  { id: "vision", label: localized("Vision support", "दृष्टि सहायता") },
  { id: "hearing", label: localized("Hearing support", "सुनने की सहायता") },
  { id: "mobility", label: localized("Mobility support", "चलने-फिरने की सहायता") },
  { id: "helper", label: localized("Family helper or caregiver support", "परिवार या सहायक की मदद") },
];

const state = {
  language: "en",
  textScaleIndex: 1,
  highContrast: false,
  currentStepIndex: 0,
  selectedCandidateId: null,
  voteSubmitted: false,
  quizSelections: {},
  isSpeaking: false,
  assistantAvailability: "local",
  assistantConcern: "registration",
  assistantSupportNeed: "none",
  assistantQuestion: "",
  assistantLoading: false,
  assistantResult: null,
};

const textScales = [1, 1.12, 1.24];

const elements = {
  body: document.body,
  brandEyebrow: document.getElementById("brandEyebrow"),
  brandTitle: document.getElementById("brandTitle"),
  brandSubtitle: document.getElementById("brandSubtitle"),
  languageLabel: document.getElementById("languageLabel"),
  langEnBtn: document.getElementById("langEnBtn"),
  langHiBtn: document.getElementById("langHiBtn"),
  textSizeLabel: document.getElementById("textSizeLabel"),
  decreaseTextBtn: document.getElementById("decreaseTextBtn"),
  increaseTextBtn: document.getElementById("increaseTextBtn"),
  contrastLabel: document.getElementById("contrastLabel"),
  contrastToggleBtn: document.getElementById("contrastToggleBtn"),
  voiceLabel: document.getElementById("voiceLabel"),
  stopAudioBtn: document.getElementById("stopAudioBtn"),
  currentStepBadge: document.getElementById("currentStepBadge"),
  voiceStatusBadge: document.getElementById("voiceStatusBadge"),
  globalStatus: document.getElementById("globalStatus"),
  heroEyebrow: document.getElementById("heroEyebrow"),
  heroTitle: document.getElementById("heroTitle"),
  heroIntro: document.getElementById("heroIntro"),
  startLearningBtn: document.getElementById("startLearningBtn"),
  viewTimelineBtn: document.getElementById("viewTimelineBtn"),
  listenHeroBtn: document.getElementById("listenHeroBtn"),
  assistantEyebrow: document.getElementById("assistantEyebrow"),
  assistantTitle: document.getElementById("assistantTitle"),
  assistantIntro: document.getElementById("assistantIntro"),
  listenAssistantBtn: document.getElementById("listenAssistantBtn"),
  assistantPersona: document.getElementById("assistantPersona"),
  assistantConcernLabel: document.getElementById("assistantConcernLabel"),
  assistantConcern: document.getElementById("assistantConcern"),
  assistantSupportLabel: document.getElementById("assistantSupportLabel"),
  assistantSupportNeed: document.getElementById("assistantSupportNeed"),
  assistantQuestionLabel: document.getElementById("assistantQuestionLabel"),
  assistantQuestion: document.getElementById("assistantQuestion"),
  assistantAskBtn: document.getElementById("assistantAskBtn"),
  assistantSourceBadge: document.getElementById("assistantSourceBadge"),
  assistantModeBadge: document.getElementById("assistantModeBadge"),
  assistantSummaryTitle: document.getElementById("assistantSummaryTitle"),
  assistantSummary: document.getElementById("assistantSummary"),
  assistantActionsTitle: document.getElementById("assistantActionsTitle"),
  assistantActions: document.getElementById("assistantActions"),
  assistantReassuranceLabel: document.getElementById("assistantReassuranceLabel"),
  assistantReassurance: document.getElementById("assistantReassurance"),
  assistantNextStepLabel: document.getElementById("assistantNextStepLabel"),
  assistantNextStep: document.getElementById("assistantNextStep"),
  assistantWhyThisHelp: document.getElementById("assistantWhyThisHelp"),
  guideEyebrow: document.getElementById("guideEyebrow"),
  guideTitle: document.getElementById("guideTitle"),
  guideIntro: document.getElementById("guideIntro"),
  listenGuideBtn: document.getElementById("listenGuideBtn"),
  stepRail: document.getElementById("stepRail"),
  currentStepCard: document.getElementById("currentStepCard"),
  prevStepBtn: document.getElementById("prevStepBtn"),
  nextStepBtn: document.getElementById("nextStepBtn"),
  timelineEyebrow: document.getElementById("timelineEyebrow"),
  timelineTitle: document.getElementById("timelineTitle"),
  timelineIntro: document.getElementById("timelineIntro"),
  listenTimelineBtn: document.getElementById("listenTimelineBtn"),
  timelineList: document.getElementById("timelineList"),
  guidanceEyebrow: document.getElementById("guidanceEyebrow"),
  guidanceTitle: document.getElementById("guidanceTitle"),
  guidanceIntro: document.getElementById("guidanceIntro"),
  listenGuidanceBtn: document.getElementById("listenGuidanceBtn"),
  guidanceGrid: document.getElementById("guidanceGrid"),
  guidanceNote: document.getElementById("guidanceNote"),
  practiceEyebrow: document.getElementById("practiceEyebrow"),
  practiceTitle: document.getElementById("practiceTitle"),
  practiceIntro: document.getElementById("practiceIntro"),
  listenPracticeBtn: document.getElementById("listenPracticeBtn"),
  practiceNote: document.getElementById("practiceNote"),
  ballotList: document.getElementById("ballotList"),
  submitVoteBtn: document.getElementById("submitVoteBtn"),
  resetVoteBtn: document.getElementById("resetVoteBtn"),
  practiceStatus: document.getElementById("practiceStatus"),
  quizEyebrow: document.getElementById("quizEyebrow"),
  quizTitle: document.getElementById("quizTitle"),
  quizIntro: document.getElementById("quizIntro"),
  listenQuizBtn: document.getElementById("listenQuizBtn"),
  quizList: document.getElementById("quizList"),
  faqEyebrow: document.getElementById("faqEyebrow"),
  faqTitle: document.getElementById("faqTitle"),
  faqIntro: document.getElementById("faqIntro"),
  listenFaqBtn: document.getElementById("listenFaqBtn"),
  faqList: document.getElementById("faqList"),
};

function t(entry) {
  return entry[state.language];
}

function announce(message) {
  elements.globalStatus.textContent = message;
}

function updateTheme() {
  document.documentElement.style.setProperty("--text-scale", String(textScales[state.textScaleIndex]));
  elements.body.classList.toggle("high-contrast", state.highContrast);
  document.documentElement.lang = state.language === "hi" ? "hi" : "en";
}

function currentQuizCorrectCount() {
  return quizQuestions.reduce((count, question, index) => {
    return state.quizSelections[index] === question.correctIndex ? count + 1 : count;
  }, 0);
}

function currentAssistantModeLabel() {
  if (state.assistantAvailability === "gemini") return t(copy.assistantModeGemini);
  if (state.assistantAvailability === "fallback") return t(copy.assistantModeFallback);
  return t(copy.assistantModeLocal);
}

function currentAssistantSourceLabel() {
  if (!state.assistantResult) return t(copy.assistantSourceLocal);
  if (state.assistantResult.source === "gemini") return t(copy.assistantSourceGemini);
  if (state.assistantResult.source === "fallback") return t(copy.assistantSourceFallback);
  return t(copy.assistantSourceLocal);
}

function buildAssistantPayload() {
  return {
    language: state.language,
    persona: "older_adult",
    stepIndex: state.currentStepIndex,
    concern: state.assistantConcern,
    supportNeed: state.assistantSupportNeed,
    question: state.assistantQuestion.trim(),
    highContrast: state.highContrast,
    textScale: textScales[state.textScaleIndex],
    voteSubmitted: state.voteSubmitted,
    quizCorrectCount: currentQuizCorrectCount(),
  };
}

function buildLocalAssistantResponse(context) {
  const stepTitle = t(steps[context.stepIndex].title);
  const concernLabel = t(assistantConcerns.find((item) => item.id === context.concern).label);
  const supportLabel = t(assistantSupportNeeds.find((item) => item.id === context.supportNeed).label);
  const nextStep = context.stepIndex < steps.length - 1 ? t(steps[context.stepIndex + 1].title) : t(copy.faqTitle);

  let summary = state.language === "en"
    ? `You are looking at ${stepTitle}. For an older voter, the safest approach is to keep this part simple, prepare early, and confirm official details before the day becomes stressful.`
    : `आप अभी ${stepTitle} देख रहे हैं। एक वरिष्ठ मतदाता के लिए सबसे अच्छा तरीका यह है कि इस हिस्से को सरल रखें, पहले से तैयारी करें और तनाव बढ़ने से पहले आधिकारिक जानकारी की पुष्टि करें।`;

  let reassurance = state.language === "en"
    ? "You do not need to remember everything at once. One clear step at a time is enough."
    : "आपको सब कुछ एक साथ याद रखने की जरूरत नहीं है। एक समय में एक साफ कदम ही काफी है।";

  const actions = [];

  switch (context.concern) {
    case "registration":
      actions.push(
        state.language === "en" ? "Check the voter list early so there is time to fix spelling or address errors." : "मतदाता सूची जल्दी जांचें ताकि नाम या पते की गलती सुधारने का समय मिल सके।",
        state.language === "en" ? "Keep age, address, and identity proof in one easy-to-carry folder." : "आयु, पता और पहचान प्रमाण एक आसान फोल्डर में साथ रखें।",
        state.language === "en" ? "If a detail is missing, contact the local election office instead of waiting for voting day." : "यदि कोई जानकारी गायब है, तो मतदान दिवस तक इंतजार करने के बजाय स्थानीय चुनाव कार्यालय से संपर्क करें।"
      );
      break;
    case "documents":
      actions.push(
        state.language === "en" ? "Carry an accepted photo ID and any voter slip or note that helps you find your record faster." : "मान्य फोटो पहचान पत्र और वोटर स्लिप जैसी कोई भी पर्ची साथ रखें ताकि रिकॉर्ड जल्दी मिले।",
        state.language === "en" ? "Place your ID in the same bag or pocket you plan to use on voting day." : "अपना पहचान पत्र उसी बैग या जेब में रखें जिसे आप मतदान दिवस पर इस्तेमाल करेंगे।",
        state.language === "en" ? "If rules differ in your area, confirm accepted documents from official election sources." : "यदि आपके क्षेत्र में नियम अलग हैं, तो आधिकारिक चुनाव स्रोतों से मान्य दस्तावेजों की पुष्टि करें।"
      );
      break;
    case "booth":
      actions.push(
        state.language === "en" ? "Check your polling booth location before you leave home." : "घर से निकलने से पहले अपना मतदान केंद्र देख लें।",
        state.language === "en" ? "Write the booth name or save it in a phone note so you do not need to remember it under stress." : "मतदान केंद्र का नाम लिख लें या फोन नोट में सेव कर लें ताकि तनाव में याद न रखना पड़े।",
        state.language === "en" ? "Travel at a comfortable time and keep a contact number ready in case you need help on the way." : "आरामदायक समय पर निकलें और जरूरत पड़ने पर मदद के लिए एक संपर्क नंबर तैयार रखें।"
      );
      break;
    case "assistance":
      actions.push(
        state.language === "en" ? "Ask polling staff politely about senior citizen support, seating, or queue assistance if available." : "यदि उपलब्ध हो तो मतदान कर्मियों से वरिष्ठ नागरिक सहायता, बैठने की जगह या लाइन में मदद के बारे में विनम्रता से पूछें।",
        state.language === "en" ? "Keep walking support, hearing aids, or spectacles with you instead of packing them away." : "चलने का सहारा, सुनने की मशीन या चश्मा अपने साथ रखें, अलग रखकर न जाएं।",
        state.language === "en" ? "If local rules allow, go with a trusted family helper who can help you stay calm and organized." : "यदि स्थानीय नियम अनुमति दें, तो किसी विश्वसनीय परिवार सदस्य के साथ जाएं जो आपको शांत और व्यवस्थित रहने में मदद करे।"
      );
      break;
    case "voting_process":
      actions.push(
        state.language === "en" ? "Read or listen to the voting instructions slowly before entering the final voting area." : "अंतिम मतदान क्षेत्र में जाने से पहले मतदान निर्देशों को धीरे-धीरे पढ़ें या सुनें।",
        state.language === "en" ? "Take your time. You do not need to rush if you need a moment to understand the process." : "आराम से करें। प्रक्रिया समझने के लिए समय चाहिए तो जल्दबाजी की जरूरत नहीं है।",
        state.language === "en" ? "If something is unclear before the final vote is cast, ask staff to explain the general process again." : "अंतिम वोट डालने से पहले कुछ स्पष्ट न हो तो कर्मचारियों से सामान्य प्रक्रिया फिर समझाने को कहें।"
      );
      break;
    case "trusted_updates":
    default:
      actions.push(
        state.language === "en" ? "Trust official election websites, notices, or helplines for key details." : "मुख्य जानकारी के लिए आधिकारिक चुनाव वेबसाइट, सूचना या हेल्पलाइन पर भरोसा करें।",
        state.language === "en" ? "Be careful with forwarded messages, rumors, and social media claims." : "फॉरवर्ड संदेश, अफवाहें और सोशल मीडिया दावों से सावधान रहें।",
        state.language === "en" ? "If you hear conflicting information, write down the question and verify it from one official source." : "यदि अलग-अलग जानकारी मिले, तो सवाल लिख लें और एक आधिकारिक स्रोत से सत्यापित करें।"
      );
      break;
  }

  if (context.supportNeed === "vision") {
    actions.unshift(
      state.language === "en" ? "Keep spectacles or a magnifier ready and ask staff to repeat written instructions clearly." : "चश्मा या मैग्निफायर तैयार रखें और कर्मचारियों से लिखे निर्देश साफ-साफ दोहराने को कहें।"
    );
    reassurance = state.language === "en"
      ? "Using larger text and asking for clear instructions is a smart step, not an inconvenience."
      : "बड़े अक्षरों का उपयोग करना और साफ निर्देश मांगना समझदारी है, कोई परेशानी नहीं।";
  }

  if (context.supportNeed === "hearing") {
    actions.unshift(
      state.language === "en" ? "Prefer written directions or ask someone to face you while speaking so instructions are easier to follow." : "लिखित निर्देश लें या किसी से सामने देखकर बोलने को कहें ताकि निर्देश समझना आसान हो।"
    );
  }

  if (context.supportNeed === "mobility") {
    actions.unshift(
      state.language === "en" ? "Ask early about seating, ramp access, or a shorter waiting option if such support exists at the booth." : "यदि ऐसी सुविधा उपलब्ध हो तो पहले ही बैठने, रैंप या कम इंतजार वाले विकल्प के बारे में पूछें।"
    );
    reassurance = state.language === "en"
      ? "Comfort and safety matter. Planning around movement is part of good preparation."
      : "सुविधा और सुरक्षा महत्वपूर्ण हैं। चलने-फिरने के अनुसार योजना बनाना अच्छी तैयारी का हिस्सा है।";
  }

  if (context.supportNeed === "helper") {
    actions.unshift(
      state.language === "en" ? "A trusted family helper can keep documents organized and reduce stress before you leave home." : "कोई विश्वसनीय परिवार सहायक दस्तावेज व्यवस्थित रखने और घर से निकलने से पहले तनाव कम करने में मदद कर सकता है।"
    );
  }

  if (context.voteSubmitted) {
    reassurance = state.language === "en"
      ? "You already completed the practice ballot, which means the final voting flow will feel more familiar."
      : "आपने अभ्यास वाला मतपत्र पूरा कर लिया है, इसलिए अंतिम मतदान प्रक्रिया अब अधिक परिचित लगेगी।";
  }

  if (context.quizCorrectCount >= 2) {
    summary += state.language === "en"
      ? " You already understand the basics well, so now the focus is confidence and preparation."
      : " आपको बुनियादी बातें अच्छी तरह समझ आ गई हैं, इसलिए अब ध्यान आत्मविश्वास और तैयारी पर है।";
  }

  if (context.question) {
    summary += state.language === "en"
      ? " Your own question has been included in the guidance so the advice stays personal and practical."
      : " आपके अपने प्रश्न को भी इस मार्गदर्शन में शामिल किया गया है ताकि सलाह अधिक व्यक्तिगत और उपयोगी रहे।";
  }

  return {
    summary,
    actions: actions.slice(0, 4),
    reassurance,
    nextStep: nextStep,
    whyThisHelp: state.language === "en"
      ? `This advice is based on the older voter persona, the current step (${stepTitle}), your selected concern (${concernLabel}), and support need (${supportLabel}).`
      : `यह सलाह वरिष्ठ मतदाता व्यक्तित्व, वर्तमान चरण (${stepTitle}), आपकी चुनी हुई चिंता (${concernLabel}) और सहायता की जरूरत (${supportLabel}) पर आधारित है।`,
    source: "local",
  };
}

function updateLocalAssistant() {
  state.assistantResult = buildLocalAssistantResponse(buildAssistantPayload());
  renderAssistant();
}

async function loadAssistantAvailability() {
  if (!window.location.protocol.startsWith("http")) {
    state.assistantAvailability = "local";
    renderAssistant();
    return;
  }

  try {
    const response = await fetch("/api/config/public");
    if (!response.ok) throw new Error("config fetch failed");
    const data = await response.json();
    state.assistantAvailability = data.assistant === "gemini" ? "gemini" : "fallback";
  } catch {
    state.assistantAvailability = "local";
  }
  renderAssistant();
}

async function requestAssistantGuidance() {
  state.assistantLoading = true;
  renderAssistant();

  if (!window.location.protocol.startsWith("http") || state.assistantAvailability === "local") {
    state.assistantLoading = false;
    updateLocalAssistant();
    return;
  }

  try {
    const response = await fetch("/api/assistant/guide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: state.language,
        persona: "older_adult",
        step_index: state.currentStepIndex,
        concern: state.assistantConcern,
        support_need: state.assistantSupportNeed,
        question: state.assistantQuestion.trim() || undefined,
        high_contrast: state.highContrast,
        text_scale: textScales[state.textScaleIndex],
        vote_submitted: state.voteSubmitted,
        quiz_correct_count: currentQuizCorrectCount(),
      }),
    });

    if (!response.ok) {
      throw new Error("assistant fetch failed");
    }

    const data = await response.json();
    state.assistantResult = {
      summary: data.summary,
      actions: data.actions,
      reassurance: data.reassurance,
      nextStep: data.next_step,
      whyThisHelp: data.why_this_help,
      source: data.source,
    };
  } catch {
    state.assistantResult = buildLocalAssistantResponse(buildAssistantPayload());
  } finally {
    state.assistantLoading = false;
    renderAssistant();
  }
}

function speakText(text) {
  if (!("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") {
    announce(t(copy.speechUnavailable));
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = state.language === "hi" ? "hi-IN" : "en-IN";
  utterance.rate = 0.88;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const voicePrefix = state.language === "hi" ? "hi" : "en";
  const matchingVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith(voicePrefix));
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }

  utterance.onstart = () => {
    state.isSpeaking = true;
    renderStatus();
    announce(t(copy.speechStarted));
  };

  utterance.onend = () => {
    state.isSpeaking = false;
    renderStatus();
    announce(t(copy.speechStopped));
  };

  utterance.onerror = () => {
    state.isSpeaking = false;
    renderStatus();
    announce(t(copy.speechUnavailable));
  };

  window.speechSynthesis.speak(utterance);
}

function stopSpeaking(shouldAnnounce = true) {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  state.isSpeaking = false;
  renderStatus();
  if (shouldAnnounce) {
    announce(t(copy.speechStopped));
  }
}

function renderStatus() {
  elements.currentStepBadge.textContent = `${t(copy.stepCounter)} ${state.currentStepIndex + 1} ${t(copy.of)} ${steps.length}`;
  elements.voiceStatusBadge.textContent = state.isSpeaking ? t(copy.voicePlaying) : t(copy.voiceReady);
}

function renderStaticText() {
  elements.brandEyebrow.textContent = t(copy.brandEyebrow);
  elements.brandTitle.textContent = t(copy.brandTitle);
  elements.brandSubtitle.textContent = t(copy.brandSubtitle);
  elements.languageLabel.textContent = t(copy.languageLabel);
  elements.langEnBtn.textContent = t(copy.english);
  elements.langHiBtn.textContent = t(copy.hindi);
  elements.textSizeLabel.textContent = t(copy.textSizeLabel);
  elements.decreaseTextBtn.textContent = t(copy.decreaseText);
  elements.increaseTextBtn.textContent = t(copy.increaseText);
  elements.contrastLabel.textContent = t(copy.contrastLabel);
  elements.contrastToggleBtn.textContent = state.highContrast ? t(copy.contrastOff) : t(copy.contrastOn);
  elements.voiceLabel.textContent = t(copy.voiceLabel);
  elements.stopAudioBtn.textContent = t(copy.stopAudio);

  elements.heroEyebrow.textContent = t(copy.heroEyebrow);
  elements.heroTitle.textContent = t(copy.heroTitle);
  elements.heroIntro.textContent = t(copy.heroIntro);
  elements.startLearningBtn.textContent = t(copy.startLearning);
  elements.viewTimelineBtn.textContent = t(copy.viewTimeline);
  elements.listenHeroBtn.textContent = t(copy.listenAudio);

  elements.assistantEyebrow.textContent = t(copy.assistantEyebrow);
  elements.assistantTitle.textContent = t(copy.assistantTitle);
  elements.assistantIntro.textContent = t(copy.assistantIntro);
  elements.listenAssistantBtn.textContent = t(copy.listenSection);
  elements.assistantPersona.textContent = t(copy.assistantPersona);
  elements.assistantConcernLabel.textContent = t(copy.assistantConcernLabel);
  elements.assistantSupportLabel.textContent = t(copy.assistantSupportLabel);
  elements.assistantQuestionLabel.textContent = t(copy.assistantQuestionLabel);
  elements.assistantQuestion.placeholder = t(copy.assistantQuestionPlaceholder);
  elements.assistantSummaryTitle.textContent = t(copy.assistantSummaryTitle);
  elements.assistantActionsTitle.textContent = t(copy.assistantActionsTitle);
  elements.assistantReassuranceLabel.textContent = t(copy.assistantReassuranceLabel);
  elements.assistantNextStepLabel.textContent = t(copy.assistantNextStepLabel);

  elements.guideEyebrow.textContent = t(copy.guideEyebrow);
  elements.guideTitle.textContent = t(copy.guideTitle);
  elements.guideIntro.textContent = t(copy.guideIntro);
  elements.listenGuideBtn.textContent = t(copy.listenSection);
  elements.prevStepBtn.textContent = t(copy.prevStep);
  elements.nextStepBtn.textContent = t(copy.nextStep);

  elements.timelineEyebrow.textContent = t(copy.timelineEyebrow);
  elements.timelineTitle.textContent = t(copy.timelineTitle);
  elements.timelineIntro.textContent = t(copy.timelineIntro);
  elements.listenTimelineBtn.textContent = t(copy.listenSection);

  elements.guidanceEyebrow.textContent = t(copy.guidanceEyebrow);
  elements.guidanceTitle.textContent = t(copy.guidanceTitle);
  elements.guidanceIntro.textContent = t(copy.guidanceIntro);
  elements.guidanceNote.textContent = t(copy.guidanceNote);
  elements.listenGuidanceBtn.textContent = t(copy.listenSection);

  elements.practiceEyebrow.textContent = t(copy.practiceEyebrow);
  elements.practiceTitle.textContent = t(copy.practiceTitle);
  elements.practiceIntro.textContent = t(copy.practiceIntro);
  elements.practiceNote.textContent = t(copy.practiceNote);
  elements.listenPracticeBtn.textContent = t(copy.listenSection);
  elements.submitVoteBtn.textContent = t(copy.submitVote);
  elements.resetVoteBtn.textContent = t(copy.resetVote);

  elements.quizEyebrow.textContent = t(copy.quizEyebrow);
  elements.quizTitle.textContent = t(copy.quizTitle);
  elements.quizIntro.textContent = t(copy.quizIntro);
  elements.listenQuizBtn.textContent = t(copy.listenSection);

  elements.faqEyebrow.textContent = t(copy.faqEyebrow);
  elements.faqTitle.textContent = t(copy.faqTitle);
  elements.faqIntro.textContent = t(copy.faqIntro);
  elements.listenFaqBtn.textContent = t(copy.listenSection);

  elements.langEnBtn.classList.toggle("active", state.language === "en");
  elements.langHiBtn.classList.toggle("active", state.language === "hi");
}

function renderAssistant() {
  if (!state.assistantResult) {
    state.assistantResult = buildLocalAssistantResponse(buildAssistantPayload());
  }

  elements.assistantConcern.innerHTML = assistantConcerns
    .map((item) => `<option value="${item.id}" ${item.id === state.assistantConcern ? "selected" : ""}>${t(item.label)}</option>`)
    .join("");

  elements.assistantSupportNeed.innerHTML = assistantSupportNeeds
    .map((item) => `<option value="${item.id}" ${item.id === state.assistantSupportNeed ? "selected" : ""}>${t(item.label)}</option>`)
    .join("");

  elements.assistantQuestion.value = state.assistantQuestion;
  elements.assistantAskBtn.textContent = state.assistantLoading ? t(copy.assistantLoading) : t(copy.assistantAsk);
  elements.assistantAskBtn.disabled = state.assistantLoading;
  elements.assistantSourceBadge.textContent = currentAssistantSourceLabel();
  elements.assistantModeBadge.textContent = currentAssistantModeLabel();
  elements.assistantSummary.textContent = state.assistantResult.summary;
  elements.assistantActions.innerHTML = state.assistantResult.actions.map((action) => `<li>${action}</li>`).join("");
  elements.assistantReassurance.textContent = state.assistantResult.reassurance;
  elements.assistantNextStep.textContent = state.assistantResult.nextStep;
  elements.assistantWhyThisHelp.textContent = state.assistantResult.whyThisHelp;
}

function renderGuide() {
  elements.stepRail.innerHTML = steps
    .map(
      (step, index) => `
        <button
          type="button"
          class="step-pill ${index === state.currentStepIndex ? "active" : ""}"
          data-step-index="${index}"
          aria-current="${index === state.currentStepIndex ? "step" : "false"}"
        >
          <span class="step-number">${index + 1}</span>
          <strong>${t(step.title)}</strong>
        </button>
      `
    )
    .join("");

  const currentStep = steps[state.currentStepIndex];
  elements.currentStepCard.innerHTML = `
    <div class="step-card-top">
      <div class="step-title-wrap">
        <span class="step-icon" aria-hidden="true">${currentStep.icon}</span>
        <div>
          <p class="eyebrow">${t(copy.stepCounter)} ${state.currentStepIndex + 1}</p>
          <h3>${t(currentStep.title)}</h3>
          <p>${t(currentStep.description)}</p>
        </div>
      </div>
      <button type="button" class="listen-btn" id="listenCurrentStepBtn">${t(copy.listenStep)}</button>
    </div>
    <div class="step-helper">
      <strong>${t(copy.stepForYou)}</strong>
      <p>${t(currentStep.helper)}</p>
    </div>
  `;

  elements.prevStepBtn.disabled = state.currentStepIndex === 0;
  elements.nextStepBtn.disabled = state.currentStepIndex === steps.length - 1;
}

function renderTimeline() {
  elements.timelineList.innerHTML = steps
    .map(
      (step, index) => `
        <button
          type="button"
          class="timeline-button ${index === state.currentStepIndex ? "active" : ""}"
          data-step-index="${index}"
        >
          <span class="timeline-number">${index + 1}</span>
          <strong>${t(step.title)}</strong>
          <p>${t(step.description)}</p>
        </button>
      `
    )
    .join("");
}

function renderGuidance() {
  elements.guidanceGrid.innerHTML = guidanceItems
    .map(
      (item) => `
        <article class="guidance-card">
          <h3>${t(item.title)}</h3>
          <ul>
            ${item.points.map((point) => `<li>${t(point)}</li>`).join("")}
          </ul>
        </article>
      `
    )
    .join("");
}

function renderPractice() {
  elements.ballotList.innerHTML = candidates
    .map(
      (candidate) => `
        <button
          type="button"
          class="ballot-card ${candidate.id === state.selectedCandidateId ? "selected" : ""}"
          data-candidate-id="${candidate.id}"
          aria-pressed="${candidate.id === state.selectedCandidateId ? "true" : "false"}"
        >
          <strong>${t(candidate.label)}</strong>
          <span>${candidate.name}</span>
          <span>${t(candidate.note)}</span>
        </button>
      `
    )
    .join("");

  if (state.voteSubmitted && state.selectedCandidateId) {
    elements.practiceStatus.textContent = t(copy.voteSuccess);
  } else {
    elements.practiceStatus.textContent = "";
  }
}

function renderQuiz() {
  elements.quizList.innerHTML = quizQuestions
    .map((item, questionIndex) => {
      const selectedIndex = state.quizSelections[questionIndex];
      const hasSelection = Number.isInteger(selectedIndex);
      const isCorrect = selectedIndex === item.correctIndex;

      return `
        <article class="quiz-card">
          <h3>${t(item.question)}</h3>
          <div class="option-list">
            ${item.options
              .map((option, optionIndex) => {
                let optionClass = "option-btn";
                if (selectedIndex === optionIndex) {
                  optionClass += optionIndex === item.correctIndex ? " correct" : " wrong";
                }

                return `
                  <button
                    type="button"
                    class="${optionClass}"
                    data-question-index="${questionIndex}"
                    data-option-index="${optionIndex}"
                  >
                    ${t(option)}
                  </button>
                `;
              })
              .join("")}
          </div>
          ${hasSelection ? `<p class="quiz-feedback">${isCorrect ? t(copy.correct) : t(copy.tryAgain)}</p>` : ""}
        </article>
      `;
    })
    .join("");
}

function renderFaq() {
  elements.faqList.innerHTML = faqs
    .map(
      (item) => `
        <details class="faq-item">
          <summary>${t(item.question)}</summary>
          <p class="faq-answer">${t(item.answer)}</p>
        </details>
      `
    )
    .join("");
}

function renderAll() {
  updateTheme();
  renderStaticText();
  renderStatus();
  renderAssistant();
  renderGuide();
  renderTimeline();
  renderGuidance();
  renderPractice();
  renderQuiz();
  renderFaq();
}

function setStep(index) {
  state.currentStepIndex = Math.max(0, Math.min(index, steps.length - 1));
  renderGuide();
  renderTimeline();
  renderStatus();
  updateLocalAssistant();
}

function getHeroSpeech() {
  return `${t(copy.brandTitle)}. ${t(copy.heroIntro)}`;
}

function getAssistantSpeech() {
  const result = state.assistantResult || buildLocalAssistantResponse(buildAssistantPayload());
  return `${t(copy.assistantTitle)}. ${result.summary}. ${result.actions.join(" ")} ${result.reassurance}. ${t(copy.assistantNextStepLabel)} ${result.nextStep}.`;
}

function getGuideSpeech() {
  const step = steps[state.currentStepIndex];
  return `${t(copy.stepCounter)} ${state.currentStepIndex + 1}. ${t(step.title)}. ${t(step.description)}. ${t(copy.stepForYou)}. ${t(step.helper)}`;
}

function getTimelineSpeech() {
  return steps.map((step, index) => `${index + 1}. ${t(step.title)}. ${t(step.description)}`).join(" ");
}

function getGuidanceSpeech() {
  return guidanceItems.map((item) => `${t(item.title)}. ${item.points.map((point) => t(point)).join(" ")}`).join(" ");
}

function getPracticeSpeech() {
  return `${t(copy.practiceIntro)} ${t(copy.practiceNote)}`;
}

function getQuizSpeech() {
  return quizQuestions.map((item) => t(item.question)).join(" ");
}

function getFaqSpeech() {
  return faqs.map((item) => `${t(item.question)} ${t(item.answer)}`).join(" ");
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

elements.langEnBtn.addEventListener("click", () => {
  if (state.language === "en") return;
  stopSpeaking(false);
  state.language = "en";
  renderAll();
  updateLocalAssistant();
  announce(t(copy.languageChanged));
});

elements.langHiBtn.addEventListener("click", () => {
  if (state.language === "hi") return;
  stopSpeaking(false);
  state.language = "hi";
  renderAll();
  updateLocalAssistant();
  announce(t(copy.languageChanged));
});

elements.decreaseTextBtn.addEventListener("click", () => {
  if (state.textScaleIndex === 0) return;
  state.textScaleIndex -= 1;
  updateTheme();
  announce(t(copy.textSmaller));
});

elements.increaseTextBtn.addEventListener("click", () => {
  if (state.textScaleIndex === textScales.length - 1) return;
  state.textScaleIndex += 1;
  updateTheme();
  announce(t(copy.textLarger));
});

elements.contrastToggleBtn.addEventListener("click", () => {
  state.highContrast = !state.highContrast;
  updateTheme();
  renderStaticText();
  updateLocalAssistant();
  announce(t(copy.contrastChanged));
});

elements.stopAudioBtn.addEventListener("click", () => {
  stopSpeaking();
});

elements.startLearningBtn.addEventListener("click", () => {
  setStep(0);
  scrollToSection("guide");
});

elements.viewTimelineBtn.addEventListener("click", () => {
  scrollToSection("timeline");
});

elements.listenHeroBtn.addEventListener("click", () => {
  speakText(getHeroSpeech());
});

elements.listenAssistantBtn.addEventListener("click", () => {
  speakText(getAssistantSpeech());
});

elements.listenGuideBtn.addEventListener("click", () => {
  speakText(getGuideSpeech());
});

elements.listenTimelineBtn.addEventListener("click", () => {
  speakText(getTimelineSpeech());
});

elements.listenGuidanceBtn.addEventListener("click", () => {
  speakText(getGuidanceSpeech());
});

elements.listenPracticeBtn.addEventListener("click", () => {
  speakText(getPracticeSpeech());
});

elements.listenQuizBtn.addEventListener("click", () => {
  speakText(getQuizSpeech());
});

elements.listenFaqBtn.addEventListener("click", () => {
  speakText(getFaqSpeech());
});

elements.assistantConcern.addEventListener("change", (event) => {
  state.assistantConcern = event.target.value;
  updateLocalAssistant();
});

elements.assistantSupportNeed.addEventListener("change", (event) => {
  state.assistantSupportNeed = event.target.value;
  updateLocalAssistant();
});

elements.assistantQuestion.addEventListener("input", (event) => {
  state.assistantQuestion = event.target.value;
  updateLocalAssistant();
});

elements.assistantAskBtn.addEventListener("click", async () => {
  await requestAssistantGuidance();
});

elements.prevStepBtn.addEventListener("click", () => {
  setStep(state.currentStepIndex - 1);
});

elements.nextStepBtn.addEventListener("click", () => {
  setStep(state.currentStepIndex + 1);
});

elements.stepRail.addEventListener("click", (event) => {
  const button = event.target.closest("[data-step-index]");
  if (!button) return;
  setStep(Number(button.dataset.stepIndex));
});

elements.currentStepCard.addEventListener("click", (event) => {
  const listenButton = event.target.closest("#listenCurrentStepBtn");
  if (!listenButton) return;
  speakText(getGuideSpeech());
});

elements.timelineList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-step-index]");
  if (!button) return;
  setStep(Number(button.dataset.stepIndex));
  scrollToSection("guide");
});

elements.ballotList.addEventListener("click", (event) => {
  const card = event.target.closest("[data-candidate-id]");
  if (!card) return;
  state.selectedCandidateId = card.dataset.candidateId;
  state.voteSubmitted = false;
  renderPractice();
  updateLocalAssistant();
});

elements.submitVoteBtn.addEventListener("click", () => {
  if (!state.selectedCandidateId) {
    elements.practiceStatus.textContent = t(copy.votePickFirst);
    return;
  }

  state.voteSubmitted = true;
  renderPractice();
  updateLocalAssistant();
});

elements.resetVoteBtn.addEventListener("click", () => {
  state.selectedCandidateId = null;
  state.voteSubmitted = false;
  elements.practiceStatus.textContent = "";
  renderPractice();
  updateLocalAssistant();
});

elements.quizList.addEventListener("click", (event) => {
  const option = event.target.closest("[data-question-index]");
  if (!option) return;
  const questionIndex = Number(option.dataset.questionIndex);
  const optionIndex = Number(option.dataset.optionIndex);
  state.quizSelections[questionIndex] = optionIndex;
  renderQuiz();
  updateLocalAssistant();
});

window.addEventListener("beforeunload", () => {
  stopSpeaking(false);
});

renderAll();
updateLocalAssistant();
void loadAssistantAvailability();
