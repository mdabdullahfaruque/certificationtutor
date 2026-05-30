import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { Dashboard } from '@/components/Dashboard'
import { StudyPlan } from '@/components/StudyPlan'
import { StudyCards } from '@/components/StudyCards'
import { PracticeExam } from '@/components/PracticeExam'
import { PDFUpload } from '@/components/PDFUpload'
import { SquaresFour, BookOpen, ClipboardText, Upload, Sparkle } from '@phosphor-icons/react'
import { UserProgress, Topic, ExamResult, DailyGoal } from '@/lib/types'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

function App() {
  const [progress, setProgress] = useKV<UserProgress>('user-progress', {
    examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    currentDay: 1,
    streak: 0,
    totalPoints: 0,
    completedTopics: [],
    masteredDomains: [],
    weakAreas: [],
    dailyGoals: [],
    sessions: []
  })

  const [examResults, setExamResults] = useKV<ExamResult[]>('exam-results', [])
  const [currentView, setCurrentView] = useState<'list' | 'cards'>('list')
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)

  useEffect(() => {
    const lastVisit = localStorage.getItem('lastVisit')
    const today = new Date().toDateString()
    
    if (lastVisit !== today) {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()
      
      setProgress((current) => {
        if (!current) return {
          examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          currentDay: 1,
          streak: 1,
          totalPoints: 0,
          completedTopics: [],
          masteredDomains: [],
          weakAreas: [],
          dailyGoals: [],
          sessions: []
        }
        return {
          ...current,
          streak: lastVisit === yesterday ? current.streak + 1 : 1
        }
      })
      
      localStorage.setItem('lastVisit', today)
    }
  }, [setProgress])

  useEffect(() => {
    if (progress && progress.dailyGoals.length === 0) {
      generateStudyPlan()
    }
  }, [])

  const generateStudyPlan = () => {
    const goals: DailyGoal[] = []
    const startDate = new Date()
    
    for (let day = 1; day <= 30; day++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + day - 1)
      
      goals.push({
        day,
        date: date.toISOString(),
        topics: [`topic-${day}`],
        questionsTarget: 10,
        completed: false
      })
    }
    
    setProgress((current) => {
      if (!current) return {
        examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        currentDay: 1,
        streak: 0,
        totalPoints: 0,
        completedTopics: [],
        masteredDomains: [],
        weakAreas: [],
        dailyGoals: goals,
        sessions: []
      }
      return {
        ...current,
        dailyGoals: goals
      }
    })
  }

  const handleTopicComplete = () => {
    if (!selectedTopic) return

    setProgress((current) => {
      if (!current) return {
        examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        currentDay: 1,
        streak: 0,
        totalPoints: selectedTopic.difficulty * 50,
        completedTopics: [selectedTopic.id],
        masteredDomains: [],
        weakAreas: [],
        dailyGoals: [],
        sessions: []
      }
      
      const newCompleted = [...current.completedTopics]
      if (!newCompleted.includes(selectedTopic.id)) {
        newCompleted.push(selectedTopic.id)
        
        const pointsEarned = selectedTopic.difficulty * 50
        const newTotal = current.totalPoints + pointsEarned
        
        toast.success(`🎉 Topic completed! +${pointsEarned} points`, {
          description: `You now have ${newTotal} total points`
        })
        
        return {
          ...current,
          completedTopics: newCompleted,
          totalPoints: newTotal
        }
      }
      return current
    })
    
    setSelectedTopic(null)
    setCurrentView('list')
  }

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic)
    setCurrentView('cards')
  }

  const handleExamComplete = (result: ExamResult) => {
    setExamResults((current) => [...(current || []), result])
    
    setProgress((current) => {
      const pointsEarned = Math.round(result.score * 10)
      
      if (!current) return {
        examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        currentDay: 1,
        streak: 0,
        totalPoints: pointsEarned,
        completedTopics: [],
        masteredDomains: [],
        weakAreas: [],
        dailyGoals: [],
        sessions: []
      }
      
      return {
        ...current,
        totalPoints: current.totalPoints + pointsEarned
      }
    })
    
    if (result.passed) {
      toast.success('🏆 Exam Passed!', {
        description: `You scored ${Math.round(result.score)}%. Great job!`
      })
    } else {
      toast.error('Keep practicing!', {
        description: `You scored ${Math.round(result.score)}%. You need 70% to pass.`
      })
    }
  }

  if (!progress) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen gradient-mesh">
      <Toaster />
      
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Sparkle size={24} weight="fill" className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">AZ-204 Prep</h1>
                <p className="text-xs text-muted-foreground">Master Azure Development</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Streak</div>
                <div className="text-lg font-bold text-accent">🔥 {progress.streak} days</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Points</div>
                <div className="text-lg font-bold text-primary">{progress.totalPoints}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentView === 'cards' && selectedTopic ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <StudyCards
              topic={selectedTopic}
              onComplete={handleTopicComplete}
              onBack={() => {
                setSelectedTopic(null)
                setCurrentView('list')
              }}
            />
          </motion.div>
        ) : (
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-14">
              <TabsTrigger value="dashboard" className="flex flex-col gap-1">
                <SquaresFour size={20} />
                <span className="text-xs">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="study" className="flex flex-col gap-1">
                <BookOpen size={20} />
                <span className="text-xs">Study</span>
              </TabsTrigger>
              <TabsTrigger value="practice" className="flex flex-col gap-1">
                <ClipboardText size={20} />
                <span className="text-xs">Practice</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex flex-col gap-1">
                <Upload size={20} />
                <span className="text-xs">Upload</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <Dashboard progress={progress} />
            </TabsContent>

            <TabsContent value="study" className="space-y-6">
              <StudyPlan
                completedTopics={progress.completedTopics}
                onSelectTopic={handleSelectTopic}
              />
            </TabsContent>

            <TabsContent value="practice" className="space-y-6">
              <PracticeExam onComplete={handleExamComplete} />
            </TabsContent>

            <TabsContent value="upload" className="space-y-6">
              <PDFUpload />
            </TabsContent>
          </Tabs>
        )}
      </main>

      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>AZ-204 Azure Developer Associate Certification Prep</p>
          <p className="mt-2">Study smart, not hard. Good luck on your exam! 🚀</p>
        </div>
      </footer>
    </div>
  )
}

export default App