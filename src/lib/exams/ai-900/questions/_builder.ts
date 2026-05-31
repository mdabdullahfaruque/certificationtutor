import { Question } from '@/lib/types'

/** Compact seed shape — domain/domainId/tags are filled in by buildQuestions. */
export interface QSeed {
  id: string
  topicId: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options: string[]
  /** Zero-based index of the correct option. */
  correctAnswer: number
  explanation: string
  scenario?: string
  tags?: string[]
}

/** Expands compact seeds into full Question objects for a given domain. */
export function buildQuestions(domainId: string, domain: string, seeds: QSeed[]): Question[] {
  return seeds.map((s) => ({
    id: s.id,
    question: s.question,
    options: s.options,
    correctAnswer: s.correctAnswer,
    explanation: s.explanation,
    domain,
    domainId,
    topicId: s.topicId,
    difficulty: s.difficulty,
    scenario: s.scenario,
    tags: s.tags ?? [domain, s.topicId],
  }))
}
