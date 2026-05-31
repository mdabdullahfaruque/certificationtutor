import { ExamDefinition } from './types'
import { AZ204_EXAM } from './az-204'

/**
 * Central registry of all certification exams the app supports.
 *
 * To add a new exam:
 *   1. Create `src/lib/exams/<exam-id>/` with domains.ts, cheatsheets.ts, and
 *      questions/ following the AZ-204 pattern.
 *   2. Export an `ExamDefinition` from that folder's index.ts.
 *   3. Add it to the EXAMS array below.
 * The UI updates automatically — no component changes required.
 */
export const EXAMS: ExamDefinition[] = [
  AZ204_EXAM,
  // Placeholder entries advertise upcoming exams without content yet.
  {
    id: 'az-104',
    code: 'AZ-104',
    title: 'AZ-104',
    fullName: 'Microsoft Azure Administrator',
    provider: 'Microsoft',
    description: 'Implement, manage, and monitor an organization\'s Microsoft Azure environment.',
    passingScore: 700,
    scoreScale: 1000,
    questionCount: '40-60',
    durationMinutes: 120,
    officialUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/',
    available: false,
    domains: [],
    cheatSheets: [],
    questions: [],
  },
  {
    id: 'az-305',
    code: 'AZ-305',
    title: 'AZ-305',
    fullName: 'Designing Microsoft Azure Infrastructure Solutions',
    provider: 'Microsoft',
    description: 'Design cloud and hybrid solutions that run on Microsoft Azure.',
    passingScore: 700,
    scoreScale: 1000,
    questionCount: '40-60',
    durationMinutes: 120,
    officialUrl: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/',
    available: false,
    domains: [],
    cheatSheets: [],
    questions: [],
  },
]

export const DEFAULT_EXAM_ID = 'az-204'

export function getExamById(id: string): ExamDefinition | undefined {
  return EXAMS.find((e) => e.id === id)
}

/** Exams that have content ready to study. */
export function getAvailableExams(): ExamDefinition[] {
  return EXAMS.filter((e) => e.available)
}
