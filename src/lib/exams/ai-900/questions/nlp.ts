import { buildQuestions, QSeed } from './_builder'

const seeds: QSeed[] = [
  // ── NLP scenarios ───────────────────────────────────────────────
  {
    id: 'nlp-001', topicId: 'nlp-scenarios', difficulty: 'easy',
    question: 'A service reads product reviews and reports a positive/negative/neutral score for each. Which NLP capability is this?',
    options: ['Key phrase extraction', 'Sentiment analysis', 'Entity recognition', 'Translation'],
    correctAnswer: 1,
    explanation: 'Scoring text as positive/negative/neutral is sentiment analysis.',
  },
  {
    id: 'nlp-002', topicId: 'nlp-scenarios', difficulty: 'easy',
    question: 'Extracting the main talking points or topics from a document is which capability?',
    options: ['Key phrase extraction', 'Sentiment analysis', 'Speech synthesis', 'Translation'],
    correctAnswer: 0,
    explanation: 'Key phrase extraction identifies the main points/topics in text.',
  },
  {
    id: 'nlp-003', topicId: 'nlp-scenarios', difficulty: 'easy',
    question: 'Identifying people, places, organizations, and dates mentioned in text is which capability?',
    options: ['Entity recognition', 'Sentiment analysis', 'Key phrase extraction', 'Speech recognition'],
    correctAnswer: 0,
    explanation: 'Detecting and categorizing named items (people, places, dates) is entity recognition.',
  },
  {
    id: 'nlp-004', topicId: 'nlp-scenarios', difficulty: 'easy',
    question: 'Converting spoken audio into written text is called:',
    options: ['Speech synthesis', 'Speech recognition', 'Translation', 'Key phrase extraction'],
    correctAnswer: 1,
    explanation: 'Speech recognition (speech-to-text) converts audio into text.',
  },
  {
    id: 'nlp-005', topicId: 'nlp-scenarios', difficulty: 'easy',
    question: 'Converting written text into a spoken voice is called:',
    options: ['Speech recognition', 'Speech synthesis', 'Entity recognition', 'Sentiment analysis'],
    correctAnswer: 1,
    explanation: 'Speech synthesis (text-to-speech) generates spoken audio from text.',
  },
  {
    id: 'nlp-006', topicId: 'nlp-scenarios', difficulty: 'medium',
    question: 'Determining the language a piece of text is written in is which capability?',
    options: ['Language detection', 'Translation', 'Sentiment analysis', 'Speech synthesis'],
    correctAnswer: 0,
    explanation: 'Language detection identifies which language text is written in.',
  },
  {
    id: 'nlp-007', topicId: 'nlp-scenarios', difficulty: 'medium',
    question: 'A travel app converts English text into French, German, and Spanish. Which capability is this?',
    options: ['Translation', 'Sentiment analysis', 'Entity recognition', 'OCR'],
    correctAnswer: 0,
    explanation: 'Converting text from one language to another is translation.',
  },
  {
    id: 'nlp-008', topicId: 'nlp-scenarios', difficulty: 'medium',
    question: 'Which capability would best summarize the key points customers raise without classifying sentiment?',
    options: ['Sentiment analysis', 'Key phrase extraction', 'Speech synthesis', 'Translation'],
    correctAnswer: 1,
    explanation: 'Key phrase extraction surfaces the main topics/points without scoring sentiment.',
  },
  {
    id: 'nlp-009', topicId: 'nlp-scenarios', difficulty: 'hard',
    question: 'A support system must understand a typed user request and identify the user\'s intent and key details. Which capability is this?',
    options: ['Conversational language understanding (intent + entities)', 'OCR', 'Image classification', 'Clustering'],
    correctAnswer: 0,
    explanation: 'Interpreting intent and extracting entities from user utterances is conversational language understanding (CLU).',
  },
  {
    id: 'nlp-010', topicId: 'nlp-scenarios', difficulty: 'medium',
    question: 'Detecting and redacting personal information (like SSNs) in text is an example of which NLP capability?',
    options: ['PII detection', 'Speech synthesis', 'Translation', 'Clustering'],
    correctAnswer: 0,
    explanation: 'Detecting personally identifiable information (PII) is a text-analysis capability in Azure AI Language.',
  },
  {
    id: 'nlp-011', topicId: 'nlp-scenarios', difficulty: 'hard',
    question: 'Which scenario combines speech recognition AND translation?',
    options: [
      'Transcribing a meeting into the same language',
      'Listening to a Spanish speaker and showing English subtitles in real time',
      'Reading text aloud',
      'Extracting key phrases from a document',
    ],
    correctAnswer: 1,
    explanation: 'Real-time speech translation first recognizes speech, then translates it into another language.',
  },
  {
    id: 'nlp-012', topicId: 'nlp-scenarios', difficulty: 'easy',
    question: 'Which of the following is an NLP workload?',
    options: ['Detecting objects in photos', 'Analyzing sentiment in customer feedback', 'Predicting house prices', 'Recognizing faces'],
    correctAnswer: 1,
    explanation: 'Sentiment analysis of text is a natural language processing workload.',
  },

  // ── Azure services ──────────────────────────────────────────────
  {
    id: 'nlp-013', topicId: 'nlp-services', difficulty: 'easy',
    question: 'Which Azure service provides sentiment analysis, key phrase extraction, and entity recognition?',
    options: ['Azure AI Language', 'Azure AI Vision', 'Azure AI Speech', 'Azure Machine Learning'],
    correctAnswer: 0,
    explanation: 'Azure AI Language provides text analytics such as sentiment, key phrases, and entities.',
  },
  {
    id: 'nlp-014', topicId: 'nlp-services', difficulty: 'easy',
    question: 'Which Azure service provides speech-to-text and text-to-speech?',
    options: ['Azure AI Speech', 'Azure AI Language', 'Azure AI Vision', 'Translator'],
    correctAnswer: 0,
    explanation: 'Azure AI Speech provides speech recognition (STT), synthesis (TTS), and speech translation.',
  },
  {
    id: 'nlp-015', topicId: 'nlp-services', difficulty: 'medium',
    question: 'A developer wants to build a question-answering bot from an existing FAQ document. Which Azure AI Language feature fits?',
    options: ['Custom question answering', 'Sentiment analysis', 'Speech synthesis', 'Object detection'],
    correctAnswer: 0,
    explanation: 'Custom question answering (in Azure AI Language) builds a knowledge base from FAQs/documents for a bot.',
  },
  {
    id: 'nlp-016', topicId: 'nlp-services', difficulty: 'medium',
    question: 'Which service translates written text across 100+ languages?',
    options: ['Azure AI Translator', 'Azure AI Vision', 'Azure AI Face', 'Azure Machine Learning'],
    correctAnswer: 0,
    explanation: 'Azure AI Translator handles text translation across many languages.',
  },
  {
    id: 'nlp-017', topicId: 'nlp-services', difficulty: 'medium',
    question: 'You need to interpret user intent and extract entities for a chatbot. Which Azure AI Language capability do you use?',
    options: ['Conversational language understanding (CLU)', 'OCR', 'Speech synthesis', 'Image tagging'],
    correctAnswer: 0,
    explanation: 'CLU in Azure AI Language interprets intents and entities from user input.',
  },
  {
    id: 'nlp-018', topicId: 'nlp-services', difficulty: 'hard',
    question: 'Which statement correctly distinguishes Azure AI Language from Azure AI Speech?',
    options: [
      'Language works on audio; Speech works on text',
      'Language works on text; Speech works on audio (STT/TTS)',
      'Both only handle images',
      'They are the same service',
    ],
    correctAnswer: 1,
    explanation: 'Azure AI Language analyzes text; Azure AI Speech handles audio (speech-to-text, text-to-speech, speech translation).',
  },
  {
    id: 'nlp-019', topicId: 'nlp-services', difficulty: 'easy',
    question: 'Generating a natural-sounding voice for a navigation app is a feature of which service?',
    options: ['Azure AI Speech', 'Azure AI Language', 'Azure AI Vision', 'Translator'],
    correctAnswer: 0,
    explanation: 'Text-to-speech (voice synthesis) is provided by Azure AI Speech.',
  },
  {
    id: 'nlp-020', topicId: 'nlp-services', difficulty: 'hard',
    question: 'A multinational call center wants live audio translated between agents and customers speaking different languages. Which service is most appropriate?',
    options: ['Azure AI Speech (speech translation)', 'Azure AI Vision', 'Azure AI Face', 'Custom Vision'],
    correctAnswer: 0,
    explanation: 'Speech translation, part of Azure AI Speech, translates spoken audio across languages in real time.',
  },
]

export const nlpQuestions = buildQuestions(
  'nlp',
  'Describe features of NLP workloads on Azure',
  seeds,
)
