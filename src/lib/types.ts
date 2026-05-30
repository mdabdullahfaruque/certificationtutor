export interface Topic {
  id: string
  title: string
  domain: string
  domainId: string
  description: string
  keyPoints: string[]
  realWorldScenarios: string[]
  commonMistakes: string[]
  difficulty: number
  estimatedTime: number
  prerequisiteTopics?: string[]
}

export interface FlashCard {
  id: string
  topicId: string
  front: string
  back: string
  code?: string
  tags: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  nextReview?: string
  reviewCount: number
  lastReviewed?: string
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  domain: string
  domainId: string
  topicId: string
  difficulty: 'easy' | 'medium' | 'hard'
  scenario?: string
  tags: string[]
  detailedExplanation?: string
  relatedTopics?: string[]
  microsoftDocUrl?: string
}

export interface StudySession {
  id: string
  date: string
  topicsStudied: string[]
  questionsAnswered: number
  correctAnswers: number
  timeSpent: number
  cardsReviewed: number
  pointsEarned: number
}

export interface UserProgress {
  examDate: string
  currentDay: number
  streak: number
  lastVisit: string
  totalPoints: number
  level: number
  completedTopics: string[]
  masteredDomains: string[]
  weakAreas: WeakArea[]
  dailyGoals: DailyGoal[]
  sessions: StudySession[]
  cardReviews: Record<string, CardReview>
  topicProgress: Record<string, TopicProgress>
}

export interface WeakArea {
  topicId: string
  topicTitle: string
  domainId: string
  incorrectCount: number
  lastAttempt: string
  needsReview: boolean
}

export interface TopicProgress {
  topicId: string
  cardsCompleted: number
  totalCards: number
  questionsCorrect: number
  questionsTotal: number
  timeSpent: number
  masteryLevel: number
  lastStudied?: string
}

export interface CardReview {
  cardId: string
  ease: number
  interval: number
  nextReview: string
  reviewCount: number
}

export interface DailyGoal {
  day: number
  date: string
  topics: string[]
  questionsTarget: number
  cardsTarget: number
  completed: boolean
  pointsEarned: number
}

export interface ExamResult {
  id: string
  date: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  domainScores: Record<string, DomainScore>
  passed: boolean
  weakestDomains: string[]
  strongestDomains: string[]
}

export interface DomainScore {
  correct: number
  total: number
  percentage: number
}

export interface AZ204Domain {
  id: string
  name: string
  weight: string
  description: string
  topics: string[]
  examTips: string[]
  officialDocUrl: string
}

export interface ScenarioQuestion extends Question {
  scenario: string
  scenarioContext: {
    requirement: string
    constraints: string[]
    existingSetup?: string
  }
  stepByStepSolution: string[]
}

export interface UploadedPDF {
  id: string
  filename: string
  uploadDate: string
  status: 'processing' | 'completed' | 'failed'
  extractedQuestions: number
  parsedContent?: ParsedPDFContent
}

export interface ParsedPDFContent {
  questions: Question[]
  topics: string[]
  pageCount: number
}
