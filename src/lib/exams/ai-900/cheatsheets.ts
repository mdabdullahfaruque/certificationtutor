import { CheatSheetSection } from '@/lib/exams/types'

/**
 * AI-900 theory cheat sheets — built for fast recall.
 * Each card uses: content (core facts), keyPoints (exam triggers),
 * compareWith (the "X vs Y" decisions the exam loves), and a mnemonic hook.
 * Grouped to mirror the five official functional areas (skills as of May 2, 2025).
 */
export const AI900_CHEAT_SHEETS: CheatSheetSection[] = [
  // ─────────────────────── AI WORKLOADS & RESPONSIBLE AI ───────────────────────
  {
    id: 'ai-workloads',
    title: 'AI Workloads & Responsible AI',
    category: 'AI Concepts',
    iconKey: 'general',
    summary: 'Recognize the four workload types and the six responsible AI principles — heavily tested as scenario matching.',
    topics: [
      {
        id: 'workload-types',
        title: 'Identifying AI Workload Types',
        content: [
          'The exam constantly asks "what kind of AI workload is this?" — match the scenario to ONE type.',
          'Computer vision: interpret images/video (classify images, detect objects, read text, analyze faces).',
          'Natural language processing (NLP): understand written/spoken language (sentiment, entities, translation, speech).',
          'Document processing: extract fields/structure from forms, invoices, receipts (key-value pairs + tables).',
          'Generative AI: create new content (text, code, images) from a natural-language prompt.',
        ],
        keyPoints: [
          '"Photo / camera / image / bounding box" → computer vision.',
          '"Text / language / speech / sentiment / translate" → NLP.',
          '"Invoice / receipt / form fields / tables" → document processing.',
          '"Generate / write / summarize / create new" → generative AI.',
        ],
        compareWith: {
          label: 'Vision vs Document processing',
          points: [
            'Computer vision OCR → reads raw text from any image.',
            'Document processing → understands structure (fields, key-value pairs, tables) of forms/invoices.',
          ],
        },
        mnemonic: 'See=Vision, Say/Read=NLP, Forms=Document, Create=Generative.',
      },
      {
        id: 'responsible-ai',
        title: 'The 6 Responsible AI Principles',
        content: [
          'Microsoft\'s responsible AI framework — expect 1-3 questions matching a scenario to a principle.',
          'Fairness: treat all people equitably; avoid bias against groups.',
          'Reliability & safety: perform consistently under expected AND unexpected conditions.',
          'Privacy & security: protect personal data; secure the system against misuse.',
          'Inclusiveness: empower everyone, including people with disabilities.',
          'Transparency: people understand how the system works and its limitations.',
          'Accountability: people (and governance) remain responsible for the AI\'s outcomes.',
        ],
        keyPoints: [
          'Bias / discrimination against a group → Fairness.',
          'Self-driving car must handle bad weather → Reliability & safety.',
          'Protect / encrypt personal data → Privacy & security.',
          'Captions, accessibility, all abilities → Inclusiveness.',
          'Explain how a decision was made → Transparency.',
          'A human/team is responsible & governed → Accountability.',
        ],
        mnemonic: 'FRPITA: Fairness, Reliability, Privacy, Inclusiveness, Transparency, Accountability.',
      },
    ],
  },

  // ─────────────────────────── MACHINE LEARNING ───────────────────────────
  {
    id: 'machine-learning',
    title: 'Machine Learning Fundamentals',
    category: 'Machine Learning',
    iconKey: 'monitor',
    summary: 'ML techniques (regression/classification/clustering), features vs labels, training/validation, and Azure ML capabilities.',
    topics: [
      {
        id: 'ml-techniques',
        title: 'ML Techniques: Regression vs Classification vs Clustering',
        content: [
          'The most common ML question on the exam: pick the technique for a scenario.',
          'Regression (supervised): predict a continuous NUMBER (price, temperature, sales).',
          'Classification (supervised): predict a discrete CATEGORY/label (spam or not, disease yes/no).',
          'Clustering (unsupervised): group similar items with NO labels (customer segments).',
        ],
        keyPoints: [
          '"How much / how many / what value" → Regression.',
          '"Which category / yes-no / class" → Classification.',
          '"Group / segment unlabeled data" → Clustering.',
          'Supervised = labeled data (regression, classification); Unsupervised = no labels (clustering).',
        ],
        compareWith: {
          label: 'Supervised vs Unsupervised',
          points: [
            'Supervised → labeled training data: regression (number) & classification (category).',
            'Unsupervised → no labels: clustering groups by similarity.',
          ],
        },
        mnemonic: 'Number=Regression, Category=Classification, Group=Clustering.',
      },
      {
        id: 'features-labels',
        title: 'Features, Labels, Training & Validation',
        content: [
          'Feature = an input/predictor column (X). Label = the value you want to predict (Y).',
          'Training dataset: used to fit/learn the model.',
          'Validation dataset: held back to evaluate how well the model generalizes to unseen data.',
          'Splitting prevents overfitting and gives an honest accuracy estimate.',
        ],
        keyPoints: [
          'Features = inputs (X); Label = output/target (Y).',
          'Train on the training set, evaluate on the validation/test set.',
          'Good performance on training but poor on validation = overfitting.',
        ],
        mnemonic: 'Features feed in (X), Label is what you Look for (Y).',
      },
      {
        id: 'deep-learning-transformer',
        title: 'Deep Learning & the Transformer',
        content: [
          'Deep learning uses multi-layer neural networks to learn complex patterns (images, language, speech).',
          'The Transformer architecture processes sequences in parallel using attention — the foundation of modern LLMs.',
          'Transformers underpin generative AI models like GPT.',
        ],
        keyPoints: [
          'Deep learning = neural networks with many layers.',
          'Transformer = attention-based, powers LLMs / generative AI.',
          'More data + compute generally improves deep-learning models.',
        ],
        mnemonic: 'Transformers Transform sequences with Attention.',
      },
      {
        id: 'azure-ml',
        title: 'Azure Machine Learning Capabilities',
        content: [
          'Azure Machine Learning is the cloud platform to train, deploy, and manage models.',
          'Automated ML (AutoML): automatically tries algorithms + hyperparameters to find the best model.',
          'Designer: no-code drag-and-drop pipeline builder.',
          'Provides compute (clusters/instances), datasets, model registry, endpoints, and MLOps.',
        ],
        keyPoints: [
          '"Try many models automatically, no expertise" → Automated ML.',
          '"Visual, no-code pipeline" → Designer.',
          'Model management = register, version, and deploy models to endpoints.',
        ],
        compareWith: {
          label: 'AutoML vs Designer',
          points: [
            'AutoML → automates model/algorithm selection (best for non-experts, fast baseline).',
            'Designer → visual pipeline you assemble step-by-step (more control, still no-code).',
          ],
        },
        mnemonic: 'AutoML Automates; Designer you Drag-and-Drop.',
      },
    ],
  },

  // ─────────────────────────── COMPUTER VISION ───────────────────────────
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    category: 'Computer Vision',
    iconKey: 'compute',
    summary: 'Image classification, object detection, OCR, and face analysis — plus Azure AI Vision and Azure AI Face.',
    topics: [
      {
        id: 'vision-solution-types',
        title: 'Vision Solution Types',
        content: [
          'Image classification: assign ONE (or more) label to the WHOLE image ("this is a cat").',
          'Object detection: find each object, return a label AND a bounding box (coordinates).',
          'OCR (optical character recognition): extract printed/handwritten text from images/documents.',
          'Facial detection/analysis: locate faces and optionally analyze attributes.',
        ],
        keyPoints: [
          '"What is in this image?" (single label) → Image classification.',
          '"Where are the objects?" (boxes + labels) → Object detection.',
          '"Read the text" → OCR.',
          'Bounding box / coordinates → always object detection.',
        ],
        compareWith: {
          label: 'Classification vs Object detection',
          points: [
            'Image classification → label for the entire image, no location.',
            'Object detection → multiple objects, each with a label + bounding box.',
          ],
        },
        mnemonic: 'Classify = whole image label; Detect = boxes + locations.',
      },
      {
        id: 'vision-services',
        title: 'Azure AI Vision & Face Services',
        content: [
          'Azure AI Vision: image analysis (tags, captions, objects), OCR/Read, and more out of the box.',
          'Azure AI Face: detect faces, analyze attributes, and verify/identify people.',
          'Custom Vision: train your OWN image classification or object-detection models with your images.',
        ],
        keyPoints: [
          '"Read text from images/documents" → Azure AI Vision (Read/OCR).',
          '"Verify or identify a person" → Azure AI Face.',
          '"Train a custom image model with my own data" → Custom Vision.',
        ],
        compareWith: {
          label: 'AI Vision vs Custom Vision',
          points: [
            'Azure AI Vision → prebuilt, general-purpose image analysis + OCR.',
            'Custom Vision → you train a model on your own labeled images.',
          ],
        },
        mnemonic: 'Vision reads & analyzes; Face recognizes people; Custom Vision = your own model.',
      },
    ],
  },

  // ─────────────────────────────── NLP ───────────────────────────────
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    category: 'NLP',
    iconKey: 'integration',
    summary: 'Text analytics (key phrases, entities, sentiment), speech, and translation via Azure AI Language and Speech.',
    topics: [
      {
        id: 'nlp-scenarios',
        title: 'NLP Scenarios',
        content: [
          'Key phrase extraction: pull the main talking points/topics from text.',
          'Entity recognition: identify entities — people, places, organizations, dates, quantities.',
          'Sentiment analysis: score text as positive, negative, or neutral.',
          'Language detection: identify which language text is written in.',
          'Speech recognition (STT) and synthesis (TTS); translation (text and speech).',
        ],
        keyPoints: [
          '"Main points / topics" → key phrase extraction.',
          '"People, places, dates" → entity recognition.',
          '"How does the customer feel?" → sentiment analysis.',
          '"Convert audio to text" → speech recognition (speech-to-text).',
          '"Convert text to audio/voice" → speech synthesis (text-to-speech).',
        ],
        compareWith: {
          label: 'Key phrases vs Entities',
          points: [
            'Key phrase extraction → unstructured main topics ("great battery life").',
            'Entity recognition → typed items (Person, Location, DateTime, Quantity).',
          ],
        },
        mnemonic: 'Phrases=topics, Entities=typed things, Sentiment=feeling.',
      },
      {
        id: 'nlp-services',
        title: 'Azure AI Language & Speech Services',
        content: [
          'Azure AI Language: text analytics (sentiment, key phrases, entities, language detection, PII), conversational language understanding (CLU), and custom question answering.',
          'Azure AI Speech: speech-to-text, text-to-speech, speech translation, and speaker recognition.',
          'Azure AI Translator: text translation across 100+ languages.',
        ],
        keyPoints: [
          '"Sentiment / key phrases / entities / understand intent" → Azure AI Language.',
          '"Transcribe audio / generate a voice / translate speech" → Azure AI Speech.',
          '"Translate written text between languages" → Translator.',
          'CLU (in Azure AI Language) interprets user intent + entities (chatbots).',
        ],
        compareWith: {
          label: 'Language vs Speech',
          points: [
            'Azure AI Language → works on TEXT (analysis, understanding, Q&A).',
            'Azure AI Speech → works on AUDIO (STT, TTS, speech translation).',
          ],
        },
        mnemonic: 'Language = text brains; Speech = audio ears & voice.',
      },
    ],
  },

  // ─────────────────────────────── GENERATIVE AI ───────────────────────────────
  {
    id: 'generative-ai',
    title: 'Generative AI on Azure',
    category: 'Generative AI',
    iconKey: 'security',
    summary: 'How generative models work, common scenarios, responsible AI, and Azure OpenAI + Azure AI Foundry.',
    topics: [
      {
        id: 'genai-concepts',
        title: 'Generative AI Concepts',
        content: [
          'Generative AI creates NEW original content (text, code, images, audio) from a natural-language prompt.',
          'Large language models (LLMs) are built on the Transformer architecture.',
          'Tokens = chunks of text the model processes; embeddings = numeric vectors capturing meaning/similarity.',
          'Prompt = your instruction/input; completion = the model\'s generated response.',
        ],
        keyPoints: [
          'LLMs predict the next token based on context — they generate, not look up.',
          'Embeddings power semantic search and grounding (finding relevant context).',
          'Hallucination = confident but incorrect output; mitigate with grounding (RAG).',
        ],
        mnemonic: 'Prompt in → tokens → completion out.',
      },
      {
        id: 'genai-scenarios',
        title: 'Generative AI Scenarios & Improving Output',
        content: [
          'Common scenarios: content creation, summarization, code generation, chat assistants, translation, image generation.',
          'Prompt engineering: craft clear instructions, examples, and constraints to steer output.',
          'Grounding / RAG (retrieval-augmented generation): supply your own data so answers are relevant and current.',
          'Fine-tuning: further train a base model on your examples for a specialized task.',
        ],
        keyPoints: [
          '"Summarize / draft / brainstorm / write code" → generative AI scenario.',
          'Better prompts + grounding data → more accurate, on-topic answers.',
          'RAG adds your documents as context to reduce hallucination.',
        ],
        compareWith: {
          label: 'Prompt engineering vs Fine-tuning vs RAG',
          points: [
            'Prompt engineering → change the instruction (no training).',
            'RAG / grounding → inject relevant data at query time.',
            'Fine-tuning → retrain the model on your examples (most effort).',
          ],
        },
        mnemonic: 'Prompt, Ground (RAG), then Fine-tune — least to most effort.',
      },
      {
        id: 'genai-responsible',
        title: 'Responsible AI for Generative AI',
        content: [
          'Generative models raise specific risks: harmful/biased content, hallucinations, and misuse.',
          'Azure OpenAI includes content filters and safety systems to detect/​block harmful content.',
          'Microsoft\'s 6 responsible AI principles still apply (fairness, reliability/safety, privacy/security, inclusiveness, transparency, accountability).',
        ],
        keyPoints: [
          'Mitigations: content filtering, system prompts/guardrails, human oversight, grounding.',
          'Be transparent that content is AI-generated and may be inaccurate.',
          'Keep a human accountable for outcomes (human-in-the-loop).',
        ],
        mnemonic: 'Filter, Ground, Disclose, keep a Human responsible.',
      },
      {
        id: 'azure-genai-services',
        title: 'Azure OpenAI & Azure AI Foundry',
        content: [
          'Azure OpenAI Service: access GPT (text/chat), DALL·E (images), and embeddings with Azure security, networking, and compliance.',
          'Azure AI Foundry: a platform to build, evaluate, customize, and deploy generative AI applications.',
          'Model catalog (in Azure AI Foundry): browse and deploy many foundation models (Microsoft, OpenAI, and open-source).',
        ],
        keyPoints: [
          '"OpenAI models (GPT/DALL·E) with enterprise security" → Azure OpenAI Service.',
          '"Build/evaluate/deploy gen-AI apps end to end" → Azure AI Foundry.',
          '"Browse and pick from many models" → Azure AI Foundry model catalog.',
        ],
        compareWith: {
          label: 'Azure OpenAI vs Azure AI Foundry',
          points: [
            'Azure OpenAI → the service that hosts OpenAI models on Azure.',
            'Azure AI Foundry → the broader platform (incl. model catalog) to build gen-AI solutions.',
          ],
        },
        mnemonic: 'OpenAI = the models; Foundry = the workshop (with the model catalog).',
      },
    ],
  },
]
