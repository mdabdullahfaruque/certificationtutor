import { ExamResource } from '@/lib/exams/types'

/**
 * Curated official AI-900 study resources from Microsoft Learn.
 * Verified against the certification page (skills updated 2025-05-02).
 */
export const AI900_RESOURCES: ExamResource[] = [
  {
    title: 'Official AI-900 Study Guide',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-900',
    description: 'The authoritative skills-measured outline. Every exam question maps to it.',
    type: 'study-guide',
  },
  {
    title: 'Free Official Practice Assessment',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/practice/assessment?assessment-type=practice&assessmentId=26',
    description: 'Microsoft\'s free practice test — matches the real exam\'s style and difficulty. Take it before booking.',
    type: 'practice',
  },
  {
    title: 'Exam sandbox (demo experience)',
    url: 'https://go.microsoft.com/fwlink/?linkid=2226877',
    description: 'Interact with the real exam UI and question types before exam day.',
    type: 'practice',
  },
  {
    title: 'Learning Path: Get started with AI on Azure',
    url: 'https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/',
    description: 'Foundational AI concepts, workload types, and responsible AI principles.',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Fundamentals of machine learning',
    url: 'https://learn.microsoft.com/en-us/training/paths/create-machine-learn-models/',
    description: 'Regression, classification, clustering, and core ML concepts.',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Fundamental AI Concepts',
    url: 'https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/',
    description: 'Understand AI workloads and Microsoft\'s responsible AI guidelines.',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Fundamentals of Computer Vision',
    url: 'https://learn.microsoft.com/en-us/training/paths/explore-computer-vision-microsoft-azure/',
    description: 'Image classification, object detection, OCR, and Azure AI Vision/Face.',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Fundamentals of Text Analysis with the Language Service',
    url: 'https://learn.microsoft.com/en-us/training/paths/explore-natural-language-processing/',
    description: 'Key phrases, entities, sentiment, and Azure AI Language/Speech.',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Fundamentals of generative AI',
    url: 'https://learn.microsoft.com/en-us/training/paths/introduction-generative-ai/',
    description: 'How generative models work, scenarios, responsible AI, and Azure OpenAI.',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Get started with Azure OpenAI Service',
    url: 'https://learn.microsoft.com/en-us/training/paths/develop-ai-solutions-azure-openai/',
    description: 'GPT, DALL·E, embeddings, prompt engineering, and Azure AI Foundry.',
    type: 'learning-path',
  },
  {
    title: 'Responsible AI overview',
    url: 'https://learn.microsoft.com/en-us/azure/ai-services/responsible-use-of-ai-overview',
    description: 'Deeper reference on the six responsible AI principles and how to apply them.',
    type: 'docs',
  },
  {
    title: 'The AI Show (video series)',
    url: 'https://learn.microsoft.com/en-us/shows/ai-show/',
    description: 'Microsoft experts demo Azure AI services and concepts.',
    type: 'video',
  },
]
