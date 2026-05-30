import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Fire, Trophy, Target, Lightning, Calendar } from '@phosphor-icons/react'
import { UserProgress, AZ204Domain } from '@/lib/types'
import { AZ204_DOMAINS } from '@/lib/az204-data'

interface DashboardProps {
  progress: UserProgress
}

export function Dashboard({ progress }: DashboardProps) {
  const daysUntilExam = Math.ceil(
    (new Date(progress.examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  )
  
  const overallProgress = (progress.completedTopics.length / 30) * 100
  const readinessScore = Math.min(95, Math.round(overallProgress * 0.9 + progress.sessions.length * 2))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your AZ-204 Journey</h1>
        <p className="text-muted-foreground">
          {daysUntilExam} days until exam · Day {progress.currentDay} of 30
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center justify-between mb-3">
            <Fire className="text-accent" size={32} weight="fill" />
            <span className="text-3xl font-bold text-accent">{progress.streak}</span>
          </div>
          <h3 className="font-semibold text-sm text-muted-foreground">Day Streak</h3>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <Trophy className="text-primary" size={32} weight="fill" />
            <span className="text-3xl font-bold text-primary">{progress.totalPoints}</span>
          </div>
          <h3 className="font-semibold text-sm text-muted-foreground">Total Points</h3>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Target size={32} weight="duotone" />
            <span className="text-3xl font-bold">{readinessScore}%</span>
          </div>
          <h3 className="font-semibold text-sm text-muted-foreground">Readiness Score</h3>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Lightning size={32} weight="fill" className="text-yellow-500" />
            <span className="text-3xl font-bold">{progress.completedTopics.length}</span>
          </div>
          <h3 className="font-semibold text-sm text-muted-foreground">Topics Completed</h3>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">Overall Progress</h2>
            <p className="text-sm text-muted-foreground">
              Keep going! You're doing great
            </p>
          </div>
          <span className="text-2xl font-bold">{Math.round(overallProgress)}%</span>
        </div>
        <Progress value={overallProgress} className="h-3" />
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Domain Mastery</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {AZ204_DOMAINS.map((domain: AZ204Domain) => {
            const isMastered = progress.masteredDomains.includes(domain.id)
            const isWeak = progress.weakAreas.includes(domain.id)
            
            return (
              <Card key={domain.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{domain.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{domain.weight}</p>
                  </div>
                  {isMastered && (
                    <Badge className="bg-accent text-accent-foreground">
                      Mastered
                    </Badge>
                  )}
                  {isWeak && (
                    <Badge variant="destructive">
                      Needs Focus
                    </Badge>
                  )}
                </div>
                <div className="space-y-1">
                  {domain.topics.map((topic, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground">
                      • {topic}
                    </div>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {progress.dailyGoals.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={24} />
            <h2 className="text-xl font-semibold">Today's Goals</h2>
          </div>
          <div className="space-y-3">
            {progress.dailyGoals.slice(0, 3).map((goal) => (
              <div key={goal.day} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Day {goal.day}</div>
                  <div className="text-sm text-muted-foreground">
                    {goal.topics.length} topics · {goal.questionsTarget} questions
                  </div>
                </div>
                {goal.completed && (
                  <Badge className="bg-accent text-accent-foreground">
                    ✓ Done
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
