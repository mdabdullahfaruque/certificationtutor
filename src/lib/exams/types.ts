import { Question } from '@/lib/types'

/**
 * Generic, provider-agnostic exam model.
 *
 * Every certification (AZ-204 today, AZ-104 / AZ-305 / AWS / etc. tomorrow)
 * is described by a single `ExamDefinition`. The UI never imports exam-specific
 * data directly — it reads everything from the currently selected exam via the
 * ExamContext. To add a new exam you only add a new folder under
 * `src/lib/exams/<exam-id>/` and register it in `registry.ts`.
 */

export interface ExamDomain {
  /** Stable slug, e.g. `develop-compute`. */
  id: string
  /** Display name of the functional group. */
  name: string
  /** Official weighting, e.g. `25-30%`. */
  weight: string
  description: string
  /** Skills measured / sub-topics for this domain. */
  topics: string[]
  /** High-yield reminders for this domain. */
  examTips: string[]
  officialDocUrl: string
}

export interface CheatSheetCodeExample {
  language: string
  code: string
  description?: string
}

/**
 * A single, self-contained reference card. Designed for fast recall:
 * `content` = the core facts, `keyPoints` = exam triggers,
 * `compareWith` = the "when X vs Y" decisions the exam loves,
 * `mnemonic` = a memory hook.
 */
export interface CheatSheetTopic {
  id: string
  title: string
  content: string[]
  keyPoints?: string[]
  codeExamples?: CheatSheetCodeExample[]
  /** Side-by-side decision matrix to disambiguate similar services. */
  compareWith?: { label: string; points: string[] }
  /** A short memory hook to make the card stick. */
  mnemonic?: string
}

export interface CheatSheetSection {
  id: string
  title: string
  category: string
  /** Maps to an icon in the CheatSheetsView (keeps data React-free). */
  iconKey: 'compute' | 'storage' | 'security' | 'monitor' | 'integration' | 'general'
  summary?: string
  topics: CheatSheetTopic[]
}

/** A curated, official study resource (learning path, docs, practice test). */
export interface ExamResource {
  title: string
  url: string
  description: string
  type: 'learning-path' | 'practice' | 'study-guide' | 'docs' | 'video' | 'lab'
}

export interface ExamDefinition {
  /** Stable slug used in storage keys and the exam switcher, e.g. `az-204`. */
  id: string
  /** Official exam code, e.g. `AZ-204`. */
  code: string
  /** Short title for headers. */
  title: string
  fullName: string
  provider: string
  description: string
  /** Passing score on the provider's scale (e.g. 700). */
  passingScore: number
  /** Max score on the provider's scale (e.g. 1000). */
  scoreScale: number
  /** Typical number of questions on the real exam, e.g. `40-60`. */
  questionCount: string
  durationMinutes: number
  officialUrl: string
  retirementDate?: string
  /** Whether content is ready; lets us list "coming soon" exams. */
  available: boolean
  domains: ExamDomain[]
  cheatSheets: CheatSheetSection[]
  questions: Question[]
  /** Curated official study resources (optional). */
  resources?: ExamResource[]
}

/** Backwards-compatible alias for the original AZ-204-specific type. */
export type AZ204Domain = ExamDomain
