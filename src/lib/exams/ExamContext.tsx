import { createContext, useContext, ReactNode } from 'react'
import { useKV } from '@github/spark/hooks'
import { ExamDefinition } from './types'
import { EXAMS, DEFAULT_EXAM_ID, getExamById } from './registry'

interface ExamContextValue {
  /** The currently selected exam's full definition (always available). */
  exam: ExamDefinition
  /** All registered exams (available + coming soon). */
  exams: ExamDefinition[]
  /** Persisted id of the selected exam. */
  selectedExamId: string
  /** Switch the active exam (ignored if the exam has no content). */
  setSelectedExamId: (id: string) => void
}

const ExamContext = createContext<ExamContextValue | undefined>(undefined)

export function ExamProvider({ children }: { children: ReactNode }) {
  const [selectedExamId, setSelectedExamId] = useKV<string>('selected-exam-id', DEFAULT_EXAM_ID)

  const exam = getExamById(selectedExamId ?? DEFAULT_EXAM_ID) ?? getExamById(DEFAULT_EXAM_ID)!

  const handleSetExam = (id: string) => {
    const target = getExamById(id)
    if (target && target.available) {
      setSelectedExamId(id)
    }
  }

  return (
    <ExamContext.Provider
      value={{
        exam,
        exams: EXAMS,
        selectedExamId: exam.id,
        setSelectedExamId: handleSetExam,
      }}
    >
      {children}
    </ExamContext.Provider>
  )
}

/** Access the currently selected exam and its content. */
export function useExam(): ExamContextValue {
  const ctx = useContext(ExamContext)
  if (!ctx) {
    throw new Error('useExam must be used within an ExamProvider')
  }
  return ctx
}
