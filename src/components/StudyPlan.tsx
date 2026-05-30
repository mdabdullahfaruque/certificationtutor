import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BookOpen, Clock, CheckCircle } from '@phosphor-icons/react'
import { Topic } from '@/lib/types'
import { SAMPLE_TOPICS } from '@/lib/az204-data'

interface StudyPlanProps {
  completedTopics: string[]
  onSelectTopic: (topic: Topic) => void
}

export function StudyPlan({ completedTopics, onSelectTopic }: StudyPlanProps) {
  const groupedByDomain = SAMPLE_TOPICS.reduce((acc, topic) => {
    if (!acc[topic.domain]) {
      acc[topic.domain] = []
    }
    acc[topic.domain].push(topic)
    return acc
  }, {} as Record<string, Topic[]>)

  const domainNames: Record<string, string> = {
    'develop-compute': 'Develop Azure compute solutions',
    'develop-storage': 'Develop for Azure storage',
    'implement-security': 'Implement Azure security',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Study Plan</h1>
        <p className="text-muted-foreground">
          Master all topics to ace your AZ-204 exam
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {Object.entries(groupedByDomain).map(([domain, topics]) => (
          <AccordionItem key={domain} value={domain} className="border rounded-lg">
            <AccordionTrigger className="px-6 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <span className="font-semibold text-lg">
                  {domainNames[domain] || domain}
                </span>
                <Badge variant="secondary">
                  {topics.filter(t => completedTopics.includes(t.id)).length} / {topics.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="space-y-3 mt-2">
                {topics.map((topic) => {
                  const isCompleted = completedTopics.includes(topic.id)
                  
                  return (
                    <Card
                      key={topic.id}
                      className={`p-4 transition-all hover:shadow-md ${
                        isCompleted ? 'bg-accent/10 border-accent/30' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{topic.title}</h3>
                            {isCompleted && (
                              <CheckCircle
                                size={20}
                                weight="fill"
                                className="text-accent"
                              />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {topic.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BookOpen size={16} />
                              <span>{topic.cards.length} cards</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={16} />
                              <span>{topic.estimatedTime} min</span>
                            </div>
                            <Badge
                              variant={
                                topic.difficulty === 1
                                  ? 'secondary'
                                  : topic.difficulty === 2
                                  ? 'default'
                                  : 'destructive'
                              }
                            >
                              {topic.difficulty === 1
                                ? 'Easy'
                                : topic.difficulty === 2
                                ? 'Medium'
                                : 'Hard'}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          onClick={() => onSelectTopic(topic)}
                          variant={isCompleted ? 'outline' : 'default'}
                        >
                          {isCompleted ? 'Review' : 'Study'}
                        </Button>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
