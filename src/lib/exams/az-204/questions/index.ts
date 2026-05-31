import { Question } from '@/lib/types'
import { computeQuestions } from './compute'
import { storageQuestions } from './storage'
import { securityQuestions } from './security'
import { monitorQuestions } from './monitor'
import { connectQuestions } from './connect'

/** All AZ-204 practice questions (350+), aggregated across the five domains. */
export const AZ204_QUESTIONS: Question[] = [
  ...computeQuestions,
  ...storageQuestions,
  ...securityQuestions,
  ...monitorQuestions,
  ...connectQuestions,
]
