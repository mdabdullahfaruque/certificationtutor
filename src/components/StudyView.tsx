import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { BookOpen, Play, CheckCircle, Clock } from '@phosphor-icons/react'
import { UserProgress, Topic } from '@/lib/types'
import { AZ204_DOMAINS } from '@/lib/az204-domains'
import { generateTopicContent, generateFlashCards } from '@/lib/content-generator'
import { toast } from 'sonner'

interface StudyViewProps {
  progress: UserProgress
  setProgress: (value: UserProgress | ((oldValue?: UserProgress) => UserProgress)) => void
}

export function StudyView({ progress, setProgress }: StudyViewProps) {
  const [selectedDomain, setSelectedDomain] = useState(AZ204_DOMAINS[0])
  const [loadingTopic, setLoadingTopic] = useState<string | null>(null)
  const [generatedTopics, setGeneratedTopics] = useState<Record<string, Topic>>({})

  const handleStartTopic = async (topicTitle: string, index: number) => {
    const topicId = `${selectedDomain.id}-topic-${index}`
    
    if (generatedTopics[topicId]) {
      toast.info('Opening topic...')
      return
    }

    setLoadingTopic(topicId)
    
    try {
      const content = await generateTopicContent(selectedDomain.name, topicTitle)
      const cards = await generateFlashCards(topicId, topicTitle, selectedDomain.name, 6)
      
      const newTopic: Topic = {
        id: topicId,
        title: topicTitle,
        domain: selectedDomain.name,
        domainId: selectedDomain.id,
        description: content.description,
        keyPoints: content.keyPoints,
        realWorldScenarios: content.realWorldScenarios,
        commonMistakes: content.commonMistakes,
        difficulty: Math.floor(Math.random() * 3) + 1,
        estimatedTime: 20 + Math.floor(Math.random() * 25),
      }
      
      setGeneratedTopics(prev => ({
        ...prev,
        [topicId]: newTopic
      }))
      
      toast.success('Topic content generated!', {
        description: `${cards.length} study cards created`
      })
    } catch (error) {
      toast.error('Failed to generate content', {
        description: 'Please try again'
      })
    } finally {
      setLoadingTopic(null)
    }
  }

  const completedInDomain = progress.completedTopics.filter(topicId => 
    topicId.startsWith(selectedDomain.id)
  ).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Study Materials</h1>
        <p className="text-muted-foreground">
          AI-generated content tailored to official AZ-204 exam objectives
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {AZ204_DOMAINS.map(domain => {
          const completedCount = progress.completedTopics.filter(topicId => 
            topicId.startsWith(domain.id)
          ).length
          
          return (
            <Button
              key={domain.id}
              variant={selectedDomain.id === domain.id ? 'default' : 'outline'}
              onClick={() => setSelectedDomain(domain)}
              className="flex-col h-auto py-3 px-4"
            >
              <span className="font-semibold text-sm">{domain.name.replace('Develop ', '').replace('Implement ', '')}</span>
              <span className="text-xs opacity-70">{domain.weight}</span>
              {completedCount > 0 && (
                <Badge variant="secondary" className="mt-1 text-xs">{completedCount}/{domain.topics.length}</Badge>
              )}
            </Button>
          )
        })}
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">{selectedDomain.name}</h2>
            <p className="text-muted-foreground">{selectedDomain.description}</p>
          </div>
          <Badge className="text-lg px-4 py-2">{selectedDomain.weight}</Badge>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedInDomain} / {selectedDomain.topics.length} topics
            </span>
          </div>
          <Progress value={(completedInDomain / selectedDomain.topics.length) * 100} className="h-2" />
        </div>

        {selectedDomain.examTips.length > 0 && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-accent">💡</span> Exam Tips
            </h3>
            <ul className="space-y-1 text-sm">
              {selectedDomain.examTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Topics</h3>
        {selectedDomain.topics.map((topic, index) => {
          const topicId = `${selectedDomain.id}-topic-${index}`
          const isCompleted = progress.completedTopics.includes(topicId)
          const isLoading = loadingTopic === topicId
          const topicData = generatedTopics[topicId]

          return (
            <Card 
              key={index} 
              className={`p-6 transition-all hover:shadow-lg ${isCompleted ? 'bg-accent/5 border-accent/30' : ''}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${isCompleted ? 'bg-accent/20' : 'bg-muted'}`}>
                      {isCompleted ? (
                        <CheckCircle size={20} weight="fill" className="text-accent" />
                      ) : (
                        <BookOpen size={20} weight="duotone" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{topic}</h4>
                      {topicData && (
                        <p className="text-sm text-muted-foreground mt-1">{topicData.description}</p>
                      )}
                    </div>
                  </div>
                  
                  {topicData && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <h5 className="text-sm font-semibold mb-2">Key Points:</h5>
                        <ul className="space-y-1">
                          {topicData.keyPoints.slice(0, 3).map((point, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {topicData.realWorldScenarios.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold mb-2">Real-World Scenarios:</h5>
                          <p className="text-sm text-muted-foreground">{topicData.realWorldScenarios[0]}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  {isCompleted ? (
                    <Badge className="bg-accent">Completed</Badge>
                  ) : isLoading ? (
                    <Button disabled>
                      <Clock className="animate-spin mr-2" size={16} />
                      Generating...
                    </Button>
                  ) : topicData ? (
                    <Button>
                      <Play size={16} className="mr-2" weight="fill" />
                      Study
                    </Button>
                  ) : (
                    <Button onClick={() => handleStartTopic(topic, index)}>
                      <Play size={16} className="mr-2" weight="fill" />
                      Start
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
