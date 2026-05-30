import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Play, CheckCircle, XCircle, Clock } from '@phosphor-icons/react'
import { UserProgress, Question, ExamResult } from '@/lib/types'
import { AZ204_DOMAINS } from '@/lib/az204-domains'
import { generatePracticeQuestions } from '@/lib/content-generator'
import { toast } from 'sonner'

interface PracticeViewProps {
  progress: UserProgress
  setProgress: (value: UserProgress | ((oldValue?: UserProgress) => UserProgress)) => void
}

export function PracticeView({ progress, setProgress }: PracticeViewProps) {
  const [examMode, setExamMode] = useState<'practice' | 'exam' | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [examComplete, setExamComplete] = useState(false)
  const [loading, setLoading] = useState(false)

  const startPractice = async (domain: string) => {
    setLoading(true)
    try {
      const domainObj = AZ204_DOMAINS.find(d => d.id === domain)
      if (!domainObj) return

      const generatedQuestions = await generatePracticeQuestions(
        domain,
        domainObj.topics[0],
        domainObj.name,
        domain,
        10
      )
      
      setQuestions(generatedQuestions)
      setAnswers(new Array(generatedQuestions.length).fill(null))
      setExamMode('practice')
      setCurrentIndex(0)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setExamComplete(false)
      
      toast.success('Practice started!', {
        description: `${generatedQuestions.length} questions loaded`
      })
    } catch (error) {
      toast.error('Failed to generate questions')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (answer: number) => {
    setSelectedAnswer(answer)
    const newAnswers = [...answers]
    newAnswers[currentIndex] = answer
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(answers[currentIndex + 1])
      setShowExplanation(false)
    } else {
      completeExam()
    }
  }

  const completeExam = () => {
    const correctAnswers = answers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0)
    }, 0)

    const score = (correctAnswers / questions.length) * 100
    const passed = score >= 70

    setExamComplete(true)

    const newSession = {
      id: `session-${Date.now()}`,
      date: new Date().toISOString(),
      topicsStudied: Array.from(new Set(questions.map(q => q.topicId))),
      questionsAnswered: questions.length,
      correctAnswers,
      timeSpent: 0,
      cardsReviewed: 0,
      pointsEarned: Math.round(score),
    }

    setProgress((current) => {
      if (!current) return progress

      return {
        ...current,
        sessions: [...current.sessions, newSession],
        totalPoints: current.totalPoints + newSession.pointsEarned,
      }
    })

    if (passed) {
      toast.success('Excellent work!', {
        description: `You scored ${Math.round(score)}%`
      })
    } else {
      toast.info('Keep practicing!', {
        description: `You scored ${Math.round(score)}%. You need 70% to pass.`
      })
    }
  }

  if (!examMode) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Practice Exams</h1>
          <p className="text-muted-foreground">
            Test your knowledge with AI-generated questions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AZ204_DOMAINS.map(domain => (
            <Card key={domain.id} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{domain.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{domain.description}</p>
              <Badge variant="outline" className="mb-4">{domain.weight}</Badge>
              <Button 
                className="w-full" 
                onClick={() => startPractice(domain.id)}
                disabled={loading}
              >
                <Play size={16} className="mr-2" weight="fill" />
                Start Practice (10 Questions)
              </Button>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (examComplete) {
    const correctAnswers = answers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0)
    }, 0)
    const score = (correctAnswers / questions.length) * 100

    return (
      <div className="space-y-6">
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Exam Complete!</h2>
          <div className="text-6xl font-bold mb-4 text-primary">{Math.round(score)}%</div>
          <p className="text-xl mb-6">
            {correctAnswers} out of {questions.length} correct
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setExamMode(null)}>Back to Practice</Button>
            <Button variant="outline" onClick={() => {
              setCurrentIndex(0)
              setShowExplanation(true)
              setExamComplete(false)
            }}>
              Review Answers
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]
  const progress_percent = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Question {currentIndex + 1} of {questions.length}
        </h2>
        <Button variant="outline" size="sm" onClick={() => setExamMode(null)}>
          Exit
        </Button>
      </div>

      <Progress value={progress_percent} className="h-2" />

      <Card className="p-8">
        {currentQuestion.scenario && (
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Scenario:</h3>
            <p className="text-sm">{currentQuestion.scenario}</p>
          </div>
        )}

        <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

        <RadioGroup value={selectedAnswer?.toString()} onValueChange={(v) => handleAnswerSelect(parseInt(v))}>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === currentQuestion.correctAnswer
              const showResult = showExplanation

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                    showResult
                      ? isCorrect
                        ? 'border-accent bg-accent/10'
                        : isSelected
                        ? 'border-destructive bg-destructive/10'
                        : 'border-border'
                      : isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={showExplanation} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                  {showResult && isCorrect && <CheckCircle size={24} weight="fill" className="text-accent" />}
                  {showResult && isSelected && !isCorrect && <XCircle size={24} weight="fill" className="text-destructive" />}
                </div>
              )
            })}
          </div>
        </RadioGroup>

        {!showExplanation && (
          <div className="mt-6 flex gap-3">
            <Button onClick={() => setShowExplanation(true)} disabled={selectedAnswer === null}>
              Check Answer
            </Button>
          </div>
        )}

        {showExplanation && (
          <div className="mt-6 space-y-4">
            <div className={`p-4 rounded-lg ${
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-accent/10 border border-accent/20'
                : 'bg-destructive/10 border border-destructive/20'
            }`}>
              <h4 className="font-semibold mb-2">
                {selectedAnswer === currentQuestion.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
              </h4>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>

            <Button onClick={handleNext}>
              {currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Exam'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
