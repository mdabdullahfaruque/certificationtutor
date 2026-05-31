import { Question } from '@/lib/types'
import { aiWorkloadsQuestions } from './ai-workloads'
import { machineLearningQuestions } from './machine-learning'
import { computerVisionQuestions } from './computer-vision'
import { nlpQuestions } from './nlp'
import { generativeAiQuestions } from './generative-ai'

/** All AI-900 practice questions, aggregated across the five domains. */
export const AI900_QUESTIONS: Question[] = [
  ...aiWorkloadsQuestions,
  ...machineLearningQuestions,
  ...computerVisionQuestions,
  ...nlpQuestions,
  ...generativeAiQuestions,
]
