import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Play, CheckCircle, XCircle, FileText, Sparkle, ArrowLeft } from '@phosphor-icons/react'
import { UserProgress, Question } from '@/lib/types'
import { loadQuestionsFromMarkdown } from '@/lib/questions-db'
import { toast } from 'sonner'

interface PracticeViewProps {
  progress: UserProgress
  setProgress: (value: UserProgress | ((oldValue?: UserProgress) => UserProgress)) => void
}

export function PracticeView({ progress, setProgress }: PracticeViewProps) {
  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [examComplete, setExamComplete] = useState(false)
  const [loading, setLoading] = useState(true)
  const [practicingAll, setPracticingAll] = useState(false)

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
    setLoading(true)
    try {
      const loaded = await loadQuestionsFromMarkdown()
      setAllQuestions(loaded)
      
      if (loaded.length === 0) {
        toast.info('No questions found', {
          description: 'Upload and extract questions from PDFs in the Upload tab first'
        })
      }
    } catch (error) {
      toast.error('Failed to load questions')
    } finally {
      setLoading(false)
    }
  }

  const startPractice = (filterDomain?: string) => {
    let questionsToUse = allQuestions

    if (filterDomain) {
      questionsToUse = allQuestions.filter(q => q.domain === filterDomain || q.domainId === filterDomain)
    }

    if (questionsToUse.length === 0) {
      toast.error('No questions available', {
        description: filterDomain 
          ? `No questions found for this domain. Upload questions first.`
          : 'Add questions from the Upload tab first'
      })
      return
    }

    const shuffled = [...questionsToUse].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, Math.min(10, shuffled.length))
    
    setQuestions(selected)
    setAnswers(new Array(selected.length).fill(null))
    setPracticingAll(!filterDomain)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setExamComplete(false)
    
    toast.success('Practice started!', {
      description: `${selected.length} questions loaded`
    })
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Sparkle size={32} className="animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    const domains = Array.from(new Set(allQuestions.map(q => q.domain || q.domainId)))
    
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Practice Questions</h1>
          <p className="text-muted-foreground">
            {allQuestions.length > 0 
              ? `${allQuestions.length} questions available from your database`
              : 'No questions available yet'
            }
          </p>
        </div>

        {allQuestions.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No Questions Yet</h2>
            <p className="text-muted-foreground mb-6">
              Upload and extract questions from your PDF files in the Upload tab to get started with practice
            </p>
            <Button onClick={loadQuestions} variant="outline">
              <Sparkle size={16} className="mr-2" />
              Refresh
            </Button>
          </Card>
        ) : (
          <>
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10">
              <h2 className="text-xl font-semibold mb-4">Practice All Questions</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Practice from all {allQuestions.length} questions in random order
              </p>
              <Button onClick={() => startPractice()} className="w-full sm:w-auto">
                <Play size={16} className="mr-2" weight="fill" />
                Start Practice (10 Random Questions)
              </Button>
            </Card>

            {domains.length > 0 && (
              <>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Practice by Domain</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {domains.map(domain => {
                    const domainQuestions = allQuestions.filter(q => 
                      q.domain === domain || q.domainId === domain
                    )
                    
                    return (
                      <Card key={domain} className="p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold mb-2 capitalize">{domain}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {domainQuestions.length} question{domainQuestions.length !== 1 ? 's' : ''} available
                        </p>
                        <Badge variant="outline" className="mb-4">
                          {domainQuestions.filter(q => q.difficulty === 'easy').length} Easy / {' '}
                          {domainQuestions.filter(q => q.difficulty === 'medium').length} Medium / {' '}
                          {domainQuestions.filter(q => q.difficulty === 'hard').length} Hard
                        </Badge>
                        <Button 
                          className="w-full" 
                          onClick={() => startPractice(domain)}
                          disabled={domainQuestions.length === 0}
                        >
                          <Play size={16} className="mr-2" weight="fill" />
                          Practice {domain}
                        </Button>
                      </Card>
                    )
                  })}
                </div>
              </>
            )}
          </>
        )}
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
          <h2 className="text-3xl font-bold mb-4">Practice Complete!</h2>
          <div className="text-6xl font-bold mb-4 text-primary">{Math.round(score)}%</div>
          <p className="text-xl mb-6">
            {correctAnswers} out of {questions.length} correct
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button onClick={() => {
              setQuestions([])
              setExamComplete(false)
            }}>
              <ArrowLeft size={16} className="mr-2" />
              Back to Practice
            </Button>
            <Button variant="outline" onClick={() => {
              setCurrentIndex(0)
              setShowExplanation(true)
              setExamComplete(false)
            }}>
              <FileText size={16} className="mr-2" />
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
        <Button variant="outline" size="sm" onClick={() => setQuestions([])}>
          <ArrowLeft size={16} className="mr-2" />
          Exit
        </Button>
      </div>

      <Progress value={progress_percent} className="h-2" />

      <Card className="p-8">
        <div className="mb-4">
          <Badge variant="outline" className="mr-2">{currentQuestion.domain || currentQuestion.domainId}</Badge>
          <Badge variant={
            currentQuestion.difficulty === 'easy' ? 'default' :
            currentQuestion.difficulty === 'hard' ? 'destructive' : 'secondary'
          }>
            {currentQuestion.difficulty}
          </Badge>
        </div>

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
              {currentIndex < questions.length - 1 ? 'Next Question' : 'Complete Practice'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
