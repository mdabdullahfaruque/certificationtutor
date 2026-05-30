import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Clock, CheckCircle, XCircle, Trophy, Info } from '@phosphor-icons/react'
import { Question, ExamResult } from '@/lib/types'
import { SAMPLE_QUESTIONS } from '@/lib/az204-data'
import { motion, AnimatePresence } from 'framer-motion'

interface PracticeExamProps {
  onComplete: (result: ExamResult) => void
}

export function PracticeExam({ onComplete }: PracticeExamProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isTimedMode] = useState(false)

  const questions = SAMPLE_QUESTIONS
  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: answerIndex }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowExplanation(false)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowExplanation(false)
    }
  }

  const handleSubmit = () => {
    const correctAnswers = questions.filter(
      (q, idx) => answers[idx] === q.correctAnswer
    ).length

    const domainScores: Record<string, number> = {}
    questions.forEach((q, idx) => {
      if (!domainScores[q.domain]) {
        domainScores[q.domain] = 0
      }
      if (answers[idx] === q.correctAnswer) {
        domainScores[q.domain]++
      }
    })

    const result: ExamResult = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      score: (correctAnswers / questions.length) * 100,
      totalQuestions: questions.length,
      correctAnswers,
      timeSpent: timeElapsed,
      domainScores,
      passed: (correctAnswers / questions.length) >= 0.7
    }

    setShowResults(true)
    onComplete(result)
  }

  const getResultColor = () => {
    const score = (Object.keys(answers).filter(
      (idx) => answers[parseInt(idx)] === questions[parseInt(idx)].correctAnswer
    ).length / questions.length) * 100

    if (score >= 80) return 'text-accent'
    if (score >= 70) return 'text-yellow-500'
    return 'text-destructive'
  }

  if (showResults) {
    const correctAnswers = questions.filter(
      (q, idx) => answers[idx] === q.correctAnswer
    ).length
    const score = (correctAnswers / questions.length) * 100
    const passed = score >= 70

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        <Card className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Trophy
              size={80}
              weight="fill"
              className={`mx-auto mb-4 ${passed ? 'text-accent' : 'text-muted-foreground'}`}
            />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">
            {passed ? 'Great Job!' : 'Keep Practicing!'}
          </h1>
          <p className="text-muted-foreground mb-6">
            {passed
              ? 'You passed! Keep up the excellent work.'
              : 'You need 70% to pass. Review weak areas and try again.'}
          </p>
          <div className={`text-6xl font-bold mb-6 ${getResultColor()}`}>
            {Math.round(score)}%
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <div className="text-2xl font-bold">{correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{questions.length - correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
          </div>
          <Button
            onClick={() => {
              setCurrentQuestion(0)
              setAnswers({})
              setTimeElapsed(0)
              setShowResults(false)
            }}
            className="bg-primary text-primary-foreground"
          >
            Try Again
          </Button>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Practice Exam</h1>
          <p className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={20} />
          <span className="font-mono font-semibold">{formatTime(timeElapsed)}</span>
        </div>
      </div>

      <Progress value={progress} className="h-2" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex gap-2 mb-4">
              <Badge variant="secondary">{question.domain}</Badge>
              <Badge
                variant={
                  question.difficulty === 'easy'
                    ? 'secondary'
                    : question.difficulty === 'medium'
                    ? 'default'
                    : 'destructive'
                }
              >
                {question.difficulty}
              </Badge>
            </div>

            {question.scenario && (
              <div className="bg-muted p-4 rounded-lg mb-4">
                <p className="text-sm font-medium mb-2">Scenario:</p>
                <p className="text-sm">{question.scenario}</p>
              </div>
            )}

            <h2 className="text-xl font-semibold mb-6">{question.question}</h2>

            <RadioGroup
              value={answers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswer(parseInt(value))}
            >
              <div className="space-y-3">
                {question.options.map((option, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-muted ${
                      answers[currentQuestion] === idx
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                    onClick={() => handleAnswer(idx)}
                  >
                    <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                    <Label
                      htmlFor={`option-${idx}`}
                      className="flex-1 cursor-pointer text-base leading-relaxed"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {answers[currentQuestion] !== undefined && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowExplanation(true)}
              >
                <Info className="mr-2" />
                Show Explanation
              </Button>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
          Previous
        </Button>

        <div className="flex gap-2">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full ${
                answers[idx] !== undefined
                  ? 'bg-accent'
                  : idx === currentQuestion
                  ? 'bg-primary'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Button onClick={handleNext} className="bg-primary text-primary-foreground">
          {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </div>

      <Dialog open={showExplanation} onOpenChange={setShowExplanation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {answers[currentQuestion] === question.correctAnswer ? (
                <>
                  <CheckCircle className="text-accent" weight="fill" />
                  Correct!
                </>
              ) : (
                <>
                  <XCircle className="text-destructive" weight="fill" />
                  Incorrect
                </>
              )}
            </DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <div>
                <p className="font-semibold mb-2">Your answer:</p>
                <p className="text-foreground">{question.options[answers[currentQuestion]]}</p>
              </div>
              {answers[currentQuestion] !== question.correctAnswer && (
                <div>
                  <p className="font-semibold mb-2 text-accent">Correct answer:</p>
                  <p className="text-foreground">{question.options[question.correctAnswer]}</p>
                </div>
              )}
              <div>
                <p className="font-semibold mb-2">Explanation:</p>
                <p className="text-foreground">{question.explanation}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
