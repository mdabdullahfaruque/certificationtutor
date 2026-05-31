import { buildQuestions, QSeed } from './_builder'

const seeds: QSeed[] = [
  // ── Workload types ──────────────────────────────────────────────
  {
    id: 'aiw-001', topicId: 'workload-types', difficulty: 'easy',
    question: 'An app analyzes photos uploaded by users to identify whether each image contains a dog. Which AI workload is this?',
    options: ['Natural language processing', 'Computer vision', 'Anomaly detection', 'Knowledge mining'],
    correctAnswer: 1,
    explanation: 'Interpreting the content of images is a computer vision workload.',
  },
  {
    id: 'aiw-002', topicId: 'workload-types', difficulty: 'easy',
    question: 'A solution reads customer reviews and determines whether each is positive or negative. Which AI workload is this?',
    options: ['Computer vision', 'Natural language processing', 'Document processing', 'Generative AI'],
    correctAnswer: 1,
    explanation: 'Understanding and interpreting written language (such as sentiment) is a natural language processing (NLP) workload.',
  },
  {
    id: 'aiw-003', topicId: 'workload-types', difficulty: 'medium',
    question: 'A system extracts the vendor name, total, and line items from scanned invoices. Which AI workload best describes this?',
    options: ['Image classification', 'Document processing', 'Speech recognition', 'Clustering'],
    correctAnswer: 1,
    explanation: 'Extracting structured fields (key-value pairs and tables) from forms and invoices is a document processing workload.',
  },
  {
    id: 'aiw-004', topicId: 'workload-types', difficulty: 'medium',
    question: 'An assistant writes a draft marketing email when given a short prompt. Which AI workload is this?',
    options: ['Generative AI', 'Object detection', 'Entity recognition', 'Regression'],
    correctAnswer: 0,
    explanation: 'Creating new original content (text) from a prompt is a generative AI workload.',
  },
  {
    id: 'aiw-005', topicId: 'workload-types', difficulty: 'medium',
    question: 'A camera system locates and draws boxes around every car in a parking lot image. Which workload is this?',
    options: ['Image classification', 'Computer vision (object detection)', 'Document processing', 'NLP'],
    correctAnswer: 1,
    explanation: 'Locating multiple objects and returning bounding boxes is object detection, a computer vision workload.',
  },
  {
    id: 'aiw-006', topicId: 'workload-types', difficulty: 'medium',
    question: 'A call-center app converts recorded customer calls into written transcripts. Which AI workload is this?',
    options: ['Computer vision', 'Natural language processing', 'Document processing', 'Knowledge mining'],
    correctAnswer: 1,
    explanation: 'Speech recognition (speech-to-text) is part of natural language processing.',
  },
  {
    id: 'aiw-007', topicId: 'workload-types', difficulty: 'hard',
    question: 'Which scenario is a document processing workload rather than basic OCR?',
    options: [
      'Reading raw text from a street sign photo',
      'Extracting the invoice number, date, and total as structured fields from an invoice',
      'Detecting a face in a photo',
      'Translating a paragraph into French',
    ],
    correctAnswer: 1,
    explanation: 'OCR reads raw text, while document processing understands the document\'s structure and returns specific fields/key-value pairs.',
  },
  {
    id: 'aiw-008', topicId: 'workload-types', difficulty: 'easy',
    question: 'Generating a photorealistic image from the text "a red bicycle on a beach" is an example of which workload?',
    options: ['Computer vision', 'Generative AI', 'Object detection', 'OCR'],
    correctAnswer: 1,
    explanation: 'Creating new images from a text prompt is a generative AI workload (e.g., DALL·E).',
  },
  {
    id: 'aiw-009', topicId: 'workload-types', difficulty: 'medium',
    question: 'A chatbot understands a user\'s typed question and identifies their intent. Which AI workload is primarily involved?',
    options: ['Computer vision', 'Natural language processing', 'Anomaly detection', 'Regression'],
    correctAnswer: 1,
    explanation: 'Interpreting language and intent from text is a natural language processing workload.',
  },
  {
    id: 'aiw-010', topicId: 'workload-types', difficulty: 'medium',
    question: 'Identifying that an image as a whole shows a "pizza" with a single label is an example of which computer vision task?',
    options: ['Object detection', 'Image classification', 'OCR', 'Facial analysis'],
    correctAnswer: 1,
    explanation: 'Assigning one label to the entire image is image classification.',
  },

  // ── Responsible AI: Fairness ────────────────────────────────────
  {
    id: 'aiw-011', topicId: 'responsible-ai', difficulty: 'easy',
    question: 'A loan-approval model should not disadvantage applicants based on gender or ethnicity. Which responsible AI principle applies?',
    options: ['Reliability and safety', 'Fairness', 'Transparency', 'Accountability'],
    correctAnswer: 1,
    explanation: 'Fairness means the system treats all people equitably and avoids bias against groups.',
  },
  {
    id: 'aiw-012', topicId: 'responsible-ai', difficulty: 'medium',
    question: 'A hiring AI is tested to ensure it recommends candidates equitably across demographic groups. Which principle is being upheld?',
    options: ['Privacy and security', 'Inclusiveness', 'Fairness', 'Transparency'],
    correctAnswer: 2,
    explanation: 'Ensuring equitable treatment across groups is the fairness principle.',
  },

  // ── Responsible AI: Reliability and safety ──────────────────────
  {
    id: 'aiw-013', topicId: 'responsible-ai', difficulty: 'easy',
    question: 'A self-driving car system must operate safely even in unexpected weather. Which responsible AI principle applies?',
    options: ['Reliability and safety', 'Inclusiveness', 'Fairness', 'Accountability'],
    correctAnswer: 0,
    explanation: 'Reliability and safety means the system performs consistently under both expected and unexpected conditions.',
  },
  {
    id: 'aiw-014', topicId: 'responsible-ai', difficulty: 'medium',
    question: 'Rigorously testing an AI medical-diagnosis tool to ensure consistent, dependable results aligns with which principle?',
    options: ['Transparency', 'Reliability and safety', 'Privacy and security', 'Inclusiveness'],
    correctAnswer: 1,
    explanation: 'Reliability and safety focuses on consistent, dependable performance, especially in high-stakes scenarios.',
  },

  // ── Responsible AI: Privacy and security ────────────────────────
  {
    id: 'aiw-015', topicId: 'responsible-ai', difficulty: 'easy',
    question: 'Encrypting and protecting the personal data used to train a model reflects which responsible AI principle?',
    options: ['Privacy and security', 'Transparency', 'Fairness', 'Accountability'],
    correctAnswer: 0,
    explanation: 'Privacy and security means protecting personal data and securing the system against misuse.',
  },
  {
    id: 'aiw-016', topicId: 'responsible-ai', difficulty: 'medium',
    question: 'An AI solution anonymizes customer records and restricts who can access them. Which principle does this support?',
    options: ['Inclusiveness', 'Privacy and security', 'Reliability and safety', 'Transparency'],
    correctAnswer: 1,
    explanation: 'Safeguarding data and controlling access supports the privacy and security principle.',
  },

  // ── Responsible AI: Inclusiveness ───────────────────────────────
  {
    id: 'aiw-017', topicId: 'responsible-ai', difficulty: 'easy',
    question: 'Adding speech and captioning so people with disabilities can use an app reflects which responsible AI principle?',
    options: ['Fairness', 'Inclusiveness', 'Accountability', 'Transparency'],
    correctAnswer: 1,
    explanation: 'Inclusiveness means empowering everyone and engaging people across abilities.',
  },
  {
    id: 'aiw-018', topicId: 'responsible-ai', difficulty: 'medium',
    question: 'Designing an AI product so it is usable by people with visual impairments is an example of which principle?',
    options: ['Inclusiveness', 'Privacy and security', 'Reliability and safety', 'Fairness'],
    correctAnswer: 0,
    explanation: 'Inclusiveness ensures AI benefits people of all abilities and backgrounds.',
  },

  // ── Responsible AI: Transparency ────────────────────────────────
  {
    id: 'aiw-019', topicId: 'responsible-ai', difficulty: 'easy',
    question: 'Users should understand how an AI system reaches its decisions and its limitations. Which principle is this?',
    options: ['Accountability', 'Transparency', 'Fairness', 'Inclusiveness'],
    correctAnswer: 1,
    explanation: 'Transparency means people can understand how the system works and its limitations.',
  },
  {
    id: 'aiw-020', topicId: 'responsible-ai', difficulty: 'medium',
    question: 'A bank explains which factors influenced an AI credit decision to the applicant. Which principle is demonstrated?',
    options: ['Transparency', 'Reliability and safety', 'Privacy and security', 'Inclusiveness'],
    correctAnswer: 0,
    explanation: 'Making the system\'s behavior understandable to users reflects transparency.',
  },

  // ── Responsible AI: Accountability ──────────────────────────────
  {
    id: 'aiw-021', topicId: 'responsible-ai', difficulty: 'easy',
    question: 'People who design and operate AI must remain responsible for how it behaves and meet governance standards. Which principle is this?',
    options: ['Accountability', 'Transparency', 'Fairness', 'Inclusiveness'],
    correctAnswer: 0,
    explanation: 'Accountability means people remain responsible and the system is subject to governance and oversight.',
  },
  {
    id: 'aiw-022', topicId: 'responsible-ai', difficulty: 'medium',
    question: 'An organization sets up a governance board to oversee AI decisions and take responsibility for outcomes. Which principle does this represent?',
    options: ['Inclusiveness', 'Accountability', 'Reliability and safety', 'Transparency'],
    correctAnswer: 1,
    explanation: 'Oversight and clear human responsibility for outcomes is the accountability principle.',
  },
  {
    id: 'aiw-023', topicId: 'responsible-ai', difficulty: 'hard',
    question: 'Which pair correctly matches a scenario to a responsible AI principle?',
    options: [
      'Encrypting training data → Fairness',
      'Captions for accessibility → Accountability',
      'Explaining how a model decided → Transparency',
      'Equitable results across groups → Privacy and security',
    ],
    correctAnswer: 2,
    explanation: 'Explaining how a model reaches a decision is transparency. The others are mismatched.',
  },
  {
    id: 'aiw-024', topicId: 'responsible-ai', difficulty: 'medium',
    question: 'How many guiding principles are in Microsoft\'s responsible AI framework?',
    options: ['Four', 'Five', 'Six', 'Seven'],
    correctAnswer: 2,
    explanation: 'There are six: fairness, reliability & safety, privacy & security, inclusiveness, transparency, and accountability.',
  },
  {
    id: 'aiw-025', topicId: 'responsible-ai', difficulty: 'hard',
    question: 'An AI model performs well overall but is far less accurate for one ethnic group. Which principle is most at risk?',
    options: ['Transparency', 'Fairness', 'Reliability and safety', 'Accountability'],
    correctAnswer: 1,
    explanation: 'Unequal accuracy across groups is a fairness concern (bias).',
  },
  {
    id: 'aiw-026', topicId: 'responsible-ai', difficulty: 'medium',
    question: 'Keeping a human in the loop to review and approve AI decisions most directly supports which principle?',
    options: ['Accountability', 'Inclusiveness', 'Privacy and security', 'Transparency'],
    correctAnswer: 0,
    explanation: 'Human oversight and responsibility for outcomes is the accountability principle.',
  },

  // ── More workload identification ────────────────────────────────
  {
    id: 'aiw-027', topicId: 'workload-types', difficulty: 'medium',
    question: 'Detecting unusual spikes in credit-card transactions to flag possible fraud is best described as which workload?',
    options: ['Anomaly detection', 'Image classification', 'Speech synthesis', 'OCR'],
    correctAnswer: 0,
    explanation: 'Identifying data points that deviate from the norm is anomaly detection.',
  },
  {
    id: 'aiw-028', topicId: 'workload-types', difficulty: 'easy',
    question: 'Converting written text into spoken audio is an example of which capability?',
    options: ['Speech recognition', 'Speech synthesis', 'OCR', 'Translation'],
    correctAnswer: 1,
    explanation: 'Text-to-speech (speech synthesis) generates spoken audio from text — part of NLP.',
  },
  {
    id: 'aiw-029', topicId: 'workload-types', difficulty: 'medium',
    question: 'A search solution extracts insights and metadata from large document archives to make them searchable. Which AI workload is this?',
    options: ['Knowledge mining', 'Object detection', 'Regression', 'Speech translation'],
    correctAnswer: 0,
    explanation: 'Knowledge mining extracts information from large volumes of often unstructured content to enable search and insights.',
  },
  {
    id: 'aiw-030', topicId: 'workload-types', difficulty: 'hard',
    question: 'A solution reads a photographed receipt and returns the merchant, date, and total as labeled fields. Which TWO capabilities does this combine?',
    options: [
      'OCR and document/form field extraction',
      'Clustering and regression',
      'Speech recognition and translation',
      'Object detection and sentiment analysis',
    ],
    correctAnswer: 0,
    explanation: 'It reads the text (OCR) and extracts structured fields (document processing/form understanding).',
  },
]

export const aiWorkloadsQuestions = buildQuestions(
  'ai-workloads',
  'Describe AI workloads and considerations',
  seeds,
)
