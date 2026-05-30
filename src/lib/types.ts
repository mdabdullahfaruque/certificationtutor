export interface Topic {
  id: string
  title: string
  domain: string
  description: string
  cards: FlashCard[]
  completed: boolean
  difficulty: number
  estimatedTime: number
}

export interface FlashCard {
  id: string
  front: string
  back: string
  code?: string
  tags: string[]
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  domain: string
  difficulty: 'easy' | 'medium' | 'hard'
  scenario?: string
  tags: string[]
}

export interface StudySession {
  date: string
  topicsCompleted: string[]
  questionsAnswered: number
  correctAnswers: number
  timeSpent: number
}

export interface UserProgress {
  examDate: string
  currentDay: number
  streak: number
  totalPoints: number
  completedTopics: string[]
  masteredDomains: string[]
  weakAreas: string[]
  dailyGoals: DailyGoal[]
  sessions: StudySession[]
}

export interface DailyGoal {
  day: number
  date: string
  topics: string[]
  questionsTarget: number
  completed: boolean
}

export interface ExamResult {
  id: string
  date: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  domainScores: Record<string, number>
  passed: boolean
}

export interface AZ204Domain {
  id: string
  name: string
  weight: string
  description: string
  topics: string[]
}
