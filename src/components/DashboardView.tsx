import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Fire, Trophy, Target, Lightning, Brain, Calendar as CalendarIcon, GraduationCap, ArrowSquareOut } from '@phosphor-icons/react'
import { UserProgress } from '@/lib/types'
import { useExam } from '@/lib/exams/ExamContext'
import { motion } from 'framer-motion'

interface DashboardViewProps {
  progress: UserProgress
  setProgress: (value: UserProgress | ((oldValue?: UserProgress) => UserProgress)) => void
}

export function DashboardView({ progress }: DashboardViewProps) {
  const { exam } = useExam()
  const domains = exam.domains
  const daysUntilExam = Math.max(0, Math.ceil(
    (new Date(progress.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  ))
  
  const totalTopics = domains.reduce((sum, domain) => sum + domain.topics.length, 0)
  const overallProgress = totalTopics > 0 ? (progress.completedTopics.length / totalTopics) * 100 : 0
  const readinessScore = Math.min(95, Math.round(overallProgress * 0.7 + progress.sessions.length * 2 + progress.streak * 0.5))

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your Learning Journey</h1>
        <p className="text-muted-foreground">
          {daysUntilExam} days until exam · Level {progress.level} · {progress.completedTopics.length} topics mastered
        </p>
      </div>

      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <Fire className="text-accent" size={32} weight="fill" />
            <span className="text-3xl font-bold text-accent">{progress.streak}</span>
          </div>
          <h3 className="font-semibold text-sm text-muted-foreground">Day Streak</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Keep learning daily!
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <Trophy className="text-primary" size={32} weight="fill" />
            <span className="text-3xl font-bold text-primary">{progress.totalPoints}</span>
          </div>
          <h3 className="font-semibold text-sm text-muted-foreground">Total Points</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Level {progress.level}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <Target size={32} weight="duotone" className="text-purple-500" />
            <span className="text-3xl font-bold text-purple-500">{readinessScore}%</span>
          </div>
          <h3 className="font-semibold text-sm text-muted-foreground">Exam Readiness</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {readinessScore >= 70 ? 'You\'re ready!' : 'Keep practicing'}
          </p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <CalendarIcon size={32} weight="duotone" className="text-orange-500" />
            <span className="text-3xl font-bold text-orange-500">{daysUntilExam}</span>
          </div>
          <h3 className="font-semibold text-sm text-muted-foreground">Days Left</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {new Date(progress.examDate).toLocaleDateString()}
          </p>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Overall Progress</h2>
            <span className="text-2xl font-bold text-primary">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {progress.completedTopics.length} of {totalTopics} topics completed
          </p>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <h2 className="text-2xl font-semibold mb-4">Domain Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {domains.map((domain) => {
            const completedInDomain = progress.completedTopics.filter(topicId => 
              topicId.startsWith(domain.id)
            ).length
            const domainProgress = (completedInDomain / domain.topics.length) * 100

            return (
              <Card key={domain.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{domain.name}</h3>
                    <Badge variant="outline" className="text-xs">{domain.weight}</Badge>
                  </div>
                  <span className="text-lg font-bold text-primary">{Math.round(domainProgress)}%</span>
                </div>
                <Progress value={domainProgress} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  {completedInDomain} of {domain.topics.length} topics
                </p>
              </Card>
            )
          })}
        </div>
      </motion.div>

      {progress.weakAreas.length > 0 && (
        <motion.div variants={item}>
          <Card className="p-6 border-destructive/20 bg-destructive/5">
            <div className="flex items-center gap-2 mb-4">
              <Lightning size={24} weight="fill" className="text-destructive" />
              <h2 className="text-xl font-semibold">Areas to Review</h2>
            </div>
            <div className="space-y-2">
              {progress.weakAreas.slice(0, 5).map((area) => (
                <div key={area.topicId} className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <div>
                    <p className="font-medium">{area.topicTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {area.incorrectCount} incorrect attempts
                    </p>
                  </div>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      <motion.div variants={item}>
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <Brain size={32} weight="fill" className="text-primary" />
            <div>
              <h2 className="text-xl font-semibold">AI-Powered Learning</h2>
              <p className="text-sm text-muted-foreground">Personalized content generated just for you</p>
            </div>
          </div>
          <p className="text-sm mb-4">
            This platform uses advanced AI to generate study materials, flashcards, and practice questions 
            tailored to the official AZ-204 exam objectives. Every topic includes real-world scenarios and 
            hands-on examples that mirror what you'll see on exam day.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Dynamic content generation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Scenario-based questions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>Spaced repetition</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span>Weak area detection</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {exam.resources && exam.resources.length > 0 && (
        <motion.div variants={item}>
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap size={32} weight="fill" className="text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Official Study Resources</h2>
                <p className="text-sm text-muted-foreground">
                  Curated Microsoft Learn paths, the free practice assessment, and the exam sandbox
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exam.resources.map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-3 rounded-lg border bg-background hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {resource.title}
                      </span>
                      <Badge variant="outline" className="text-[10px] capitalize shrink-0">
                        {resource.type.replace('-', ' ')}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                  </div>
                  <ArrowSquareOut
                    size={16}
                    className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5"
                  />
                </a>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
