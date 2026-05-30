import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/sonner'
import { Sparkle, House, BookOpen, ClipboardText, Upload as UploadIcon } from '@phosphor-icons/react'
import { UserProgress } from '@/lib/types'
import { AZ204_DOMAINS } from '@/lib/az204-domains'
import { toast } from 'sonner'

import { DashboardView } from '@/components/DashboardView'
import { StudyView } from '@/components/StudyView'
import { PracticeView } from '@/components/PracticeView'
import { UploadView } from '@/components/UploadView'

function App() {
  const [progress, setProgress] = useKV<UserProgress>('user-progress-v2', {
    examDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    currentDay: 1,
    streak: 0,
    lastVisit: new Date().toISOString(),
    totalPoints: 0,
    level: 1,
    completedTopics: [],
    masteredDomains: [],
    weakAreas: [],
    dailyGoals: [],
    sessions: [],
    cardReviews: {},
    topicProgress: {},
  })

  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    if (!progress) return

    const lastVisit = new Date(progress.lastVisit)
    const today = new Date()
    const daysDiff = Math.floor((today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24))

    if (daysDiff >= 1) {
      setProgress((current) => {
        if (!current) return progress

        const newStreak = daysDiff === 1 ? current.streak + 1 : 1
        
        if (daysDiff === 1) {
          toast.success(`🔥 ${newStreak} day streak!`, {
            description: 'Keep up the great work!'
          })
        }

        return {
          ...current,
          lastVisit: today.toISOString(),
          streak: newStreak,
        }
      })
    }
  }, [])

  const daysUntilExam = progress ? Math.max(0, Math.ceil(
    (new Date(progress.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )) : 30

  if (!progress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-mesh">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    )
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
                <h1 className="text-xl font-bold">AZ-204 Exam Mastery</h1>
                <p className="text-xs text-muted-foreground">AI-Powered Azure Certification Prep</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-muted-foreground">Exam in</div>
                <div className="text-lg font-bold text-primary">{daysUntilExam} days</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Streak</div>
                <div className="text-lg font-bold text-accent">🔥 {progress.streak}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Level</div>
                <div className="text-lg font-bold text-primary">{progress.level}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-14">
            <TabsTrigger value="dashboard" className="flex flex-col gap-1">
              <House size={20} />
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
              <UploadIcon size={20} />
              <span className="text-xs">Upload</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardView progress={progress} setProgress={setProgress} />
          </TabsContent>

          <TabsContent value="study" className="space-y-6">
            <StudyView progress={progress} setProgress={setProgress} />
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <PracticeView progress={progress} setProgress={setProgress} />
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <UploadView progress={progress} setProgress={setProgress} />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-20 py-8 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-2">About AZ-204</h3>
              <p className="text-sm text-muted-foreground">
                Microsoft Azure Developer Associate certification validates your expertise in designing, 
                building, testing, and maintaining cloud applications.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Exam Coverage</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {AZ204_DOMAINS.map(domain => (
                  <li key={domain.id}>• {domain.name} ({domain.weight})</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Study Tips</h3>
              <p className="text-sm text-muted-foreground">
                Practice daily, focus on hands-on scenarios, and review weak areas regularly. 
                This platform uses AI to generate personalized content tailored to the official exam objectives.
              </p>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground border-t pt-6">
            <p>AI-Powered Azure AZ-204 Certification Prep Platform</p>
            <p className="mt-2">Study smart. Practice hard. Pass confidently. 🚀</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
