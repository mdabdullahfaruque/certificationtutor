import { ExamDefinition } from '@/lib/exams/types'
import { AZ204_DOMAINS } from './domains'
import { AZ204_CHEAT_SHEETS } from './cheatsheets'
import { AZ204_QUESTIONS } from './questions'
import { AZ204_RESOURCES } from './resources'

export const AZ204_EXAM: ExamDefinition = {
  id: 'az-204',
  code: 'AZ-204',
  title: 'AZ-204',
  fullName: 'Developing Solutions for Microsoft Azure',
  provider: 'Microsoft',
  description:
    'Validates your ability to design, build, test, and maintain cloud applications and services on Microsoft Azure as an Azure Developer Associate.',
  passingScore: 700,
  scoreScale: 1000,
  questionCount: '40-60',
  durationMinutes: 100,
  officialUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/',
  retirementDate: '2026-07-31',
  available: true,
  domains: AZ204_DOMAINS,
  cheatSheets: AZ204_CHEAT_SHEETS,
  questions: AZ204_QUESTIONS,
  resources: AZ204_RESOURCES,
}
