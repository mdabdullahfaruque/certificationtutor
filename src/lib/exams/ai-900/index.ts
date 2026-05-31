import { ExamDefinition } from '@/lib/exams/types'
import { AI900_DOMAINS } from './domains'
import { AI900_CHEAT_SHEETS } from './cheatsheets'
import { AI900_QUESTIONS } from './questions'
import { AI900_RESOURCES } from './resources'

export const AI900_EXAM: ExamDefinition = {
  id: 'ai-900',
  code: 'AI-900',
  title: 'AI-900',
  fullName: 'Microsoft Azure AI Fundamentals',
  provider: 'Microsoft',
  description:
    'Validates foundational knowledge of machine learning and AI concepts and the related Microsoft Azure services, including computer vision, NLP, and generative AI.',
  passingScore: 700,
  scoreScale: 1000,
  questionCount: '40-60',
  durationMinutes: 45,
  officialUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/',
  available: true,
  domains: AI900_DOMAINS,
  cheatSheets: AI900_CHEAT_SHEETS,
  questions: AI900_QUESTIONS,
  resources: AI900_RESOURCES,
}
