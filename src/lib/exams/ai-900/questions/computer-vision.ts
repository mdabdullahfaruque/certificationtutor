import { buildQuestions, QSeed } from './_builder'

const seeds: QSeed[] = [
  // ── Solution types ──────────────────────────────────────────────
  {
    id: 'cv-001', topicId: 'vision-solution-types', difficulty: 'easy',
    question: 'A model assigns a single label such as "beach" to an entire photo. Which computer vision task is this?',
    options: ['Object detection', 'Image classification', 'OCR', 'Facial analysis'],
    correctAnswer: 1,
    explanation: 'Assigning one label to the whole image is image classification.',
  },
  {
    id: 'cv-002', topicId: 'vision-solution-types', difficulty: 'easy',
    question: 'A model returns labels AND bounding-box coordinates for each item in an image. Which task is this?',
    options: ['Image classification', 'Object detection', 'OCR', 'Sentiment analysis'],
    correctAnswer: 1,
    explanation: 'Returning a label plus a bounding box for each object is object detection.',
  },
  {
    id: 'cv-003', topicId: 'vision-solution-types', difficulty: 'easy',
    question: 'Extracting printed or handwritten text from a scanned page is which capability?',
    options: ['Optical character recognition (OCR)', 'Object detection', 'Image classification', 'Clustering'],
    correctAnswer: 0,
    explanation: 'OCR extracts text (printed or handwritten) from images and documents.',
  },
  {
    id: 'cv-004', topicId: 'vision-solution-types', difficulty: 'medium',
    question: 'A security system must locate every person in a frame and mark their position. Which task is required?',
    options: ['Image classification', 'Object detection', 'OCR', 'Translation'],
    correctAnswer: 1,
    explanation: 'Locating and marking each person with a bounding box is object detection.',
  },
  {
    id: 'cv-005', topicId: 'vision-solution-types', difficulty: 'medium',
    question: 'Which output is unique to object detection compared with image classification?',
    options: ['A confidence score', 'A bounding box with coordinates', 'A class label', 'A probability'],
    correctAnswer: 1,
    explanation: 'Bounding-box coordinates that locate each object are unique to object detection.',
  },
  {
    id: 'cv-006', topicId: 'vision-solution-types', difficulty: 'medium',
    question: 'Detecting the location of human faces in a photo (without identifying who they are) is called:',
    options: ['Facial detection', 'Facial identification', 'OCR', 'Image classification'],
    correctAnswer: 0,
    explanation: 'Facial detection locates faces; identification/verification determines WHO the person is.',
  },
  {
    id: 'cv-007', topicId: 'vision-solution-types', difficulty: 'hard',
    question: 'An app must read the license-plate number from a car photo. Which capability is needed?',
    options: ['OCR', 'Image classification', 'Clustering', 'Sentiment analysis'],
    correctAnswer: 0,
    explanation: 'Reading text (the plate number) from an image is OCR.',
  },
  {
    id: 'cv-008', topicId: 'vision-solution-types', difficulty: 'medium',
    question: 'Which scenario is image classification rather than object detection?',
    options: [
      'Drawing boxes around each fruit in a basket',
      'Labeling a photo overall as "fruit basket"',
      'Counting the number of apples and their positions',
      'Locating each defect on a product',
    ],
    correctAnswer: 1,
    explanation: 'A single overall label for the image is classification; the others involve locating multiple objects (detection).',
  },
  {
    id: 'cv-009', topicId: 'vision-solution-types', difficulty: 'easy',
    question: 'Analyzing facial attributes such as estimated emotion or whether glasses are present is part of which area?',
    options: ['Facial analysis', 'OCR', 'Regression', 'Key phrase extraction'],
    correctAnswer: 0,
    explanation: 'Examining facial attributes is facial analysis, a computer vision capability.',
  },
  {
    id: 'cv-010', topicId: 'vision-solution-types', difficulty: 'hard',
    question: 'A factory wants to both identify defective items and pinpoint where each defect is on the product image. Which task is appropriate?',
    options: ['Image classification', 'Object detection', 'OCR', 'Translation'],
    correctAnswer: 1,
    explanation: 'Pinpointing the location of each defect requires bounding boxes, i.e., object detection.',
  },

  // ── Azure services ──────────────────────────────────────────────
  {
    id: 'cv-011', topicId: 'vision-services', difficulty: 'easy',
    question: 'Which Azure service provides prebuilt image analysis, tagging, captioning, and OCR?',
    options: ['Azure AI Vision', 'Azure AI Language', 'Azure Machine Learning', 'Azure AI Speech'],
    correctAnswer: 0,
    explanation: 'Azure AI Vision offers prebuilt image analysis (tags, captions, objects) and OCR/Read.',
  },
  {
    id: 'cv-012', topicId: 'vision-services', difficulty: 'easy',
    question: 'Which Azure service is purpose-built to detect faces and verify or identify people?',
    options: ['Azure AI Face', 'Azure AI Vision', 'Azure AI Language', 'Azure OpenAI'],
    correctAnswer: 0,
    explanation: 'Azure AI Face provides face detection, verification, identification, and attribute analysis.',
  },
  {
    id: 'cv-013', topicId: 'vision-services', difficulty: 'medium',
    question: 'You need to train an image-classification model on your OWN labeled product photos with minimal code. Which service is best?',
    options: ['Custom Vision', 'Azure AI Language', 'Azure AI Speech', 'Translator'],
    correctAnswer: 0,
    explanation: 'Custom Vision lets you train custom image classification or object-detection models on your own images.',
  },
  {
    id: 'cv-014', topicId: 'vision-services', difficulty: 'medium',
    question: 'Which Azure AI Vision feature reads printed and handwritten text from images and documents?',
    options: ['The Read (OCR) capability', 'Sentiment analysis', 'Speech-to-text', 'Clustering'],
    correctAnswer: 0,
    explanation: 'The Read/OCR capability of Azure AI Vision extracts printed and handwritten text.',
  },
  {
    id: 'cv-015', topicId: 'vision-services', difficulty: 'medium',
    question: 'A bank wants to verify that a selfie matches the photo on an ID. Which service should it use?',
    options: ['Azure AI Face', 'Azure AI Vision tags', 'Azure AI Language', 'Azure Machine Learning Designer'],
    correctAnswer: 0,
    explanation: 'Face verification (1:1 matching) is provided by Azure AI Face.',
  },
  {
    id: 'cv-016', topicId: 'vision-services', difficulty: 'hard',
    question: 'Which statement best distinguishes Azure AI Vision from Custom Vision?',
    options: [
      'Azure AI Vision requires you to train your own model; Custom Vision is prebuilt',
      'Azure AI Vision is prebuilt and general-purpose; Custom Vision trains on your own images',
      'They are identical services',
      'Custom Vision only does OCR',
    ],
    correctAnswer: 1,
    explanation: 'Azure AI Vision is prebuilt/general-purpose; Custom Vision is for training models on your own labeled images.',
  },
  {
    id: 'cv-017', topicId: 'vision-services', difficulty: 'medium',
    question: 'Generating a descriptive caption for an image automatically is a feature of which service?',
    options: ['Azure AI Vision', 'Azure AI Speech', 'Translator', 'Azure AI Face'],
    correctAnswer: 0,
    explanation: 'Azure AI Vision can generate captions and tags describing image content.',
  },
  {
    id: 'cv-018', topicId: 'vision-services', difficulty: 'easy',
    question: 'Azure AI Vision and Azure AI Face are part of which broader Azure offering?',
    options: ['Azure AI services (Cognitive Services)', 'Azure Storage', 'Azure DevOps', 'Azure Virtual Machines'],
    correctAnswer: 0,
    explanation: 'Vision and Face are part of Azure AI services (formerly Azure Cognitive Services).',
  },
  {
    id: 'cv-019', topicId: 'vision-solution-types', difficulty: 'easy',
    question: 'Which of the following is a computer vision workload?',
    options: ['Sentiment analysis of tweets', 'Detecting objects in a video stream', 'Translating text to Spanish', 'Forecasting sales numbers'],
    correctAnswer: 1,
    explanation: 'Detecting objects in images/video is a computer vision workload.',
  },
  {
    id: 'cv-020', topicId: 'vision-services', difficulty: 'hard',
    question: 'A retailer wants to identify specific known employees entering a secure area. Which Azure AI Face capability is required?',
    options: ['Face identification', 'Face detection only', 'OCR', 'Image tagging'],
    correctAnswer: 0,
    explanation: 'Identifying WHO a person is (against a set of known people) is face identification, not just detection.',
  },
]

export const computerVisionQuestions = buildQuestions(
  'computer-vision',
  'Describe features of computer vision workloads on Azure',
  seeds,
)
