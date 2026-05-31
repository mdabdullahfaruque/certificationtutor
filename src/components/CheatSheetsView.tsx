import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  BookBookmark,
  MagnifyingGlass,
  Lightning,
  Cpu,
  Database,
  ShieldCheck,
  ChartLine,
  Plugs,
  Brain,
  ArrowsLeftRight,
} from '@phosphor-icons/react'
import { useExam } from '@/lib/exams/ExamContext'
import { CheatSheetSection } from '@/lib/exams/types'

const ICON_MAP: Record<CheatSheetSection['iconKey'], JSX.Element> = {
  compute: <Cpu size={20} weight="duotone" />,
  storage: <Database size={20} weight="duotone" />,
  security: <ShieldCheck size={20} weight="duotone" />,
  monitor: <ChartLine size={20} weight="duotone" />,
  integration: <Plugs size={20} weight="duotone" />,
  general: <BookBookmark size={20} weight="duotone" />,
}

export function CheatSheetsView() {
  const { exam } = useExam()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const sections = exam.cheatSheets

  const filteredSections = sections.filter((section) => {
    if (activeCategory !== 'all' && section.category !== activeCategory) return false

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        section.title.toLowerCase().includes(query) ||
        section.topics.some(
          (topic) =>
            topic.title.toLowerCase().includes(query) ||
            topic.content.some((c) => c.toLowerCase().includes(query)) ||
            (topic.keyPoints?.some((k) => k.toLowerCase().includes(query)) ?? false)
        )
      )
    }

    return true
  })

  const categories = ['all', ...Array.from(new Set(sections.map((s) => s.category)))]

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary rounded-lg">
              <BookBookmark size={24} weight="duotone" className="text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">{exam.code} Cheat Sheets</CardTitle>
              <CardDescription>Interrelated reference cards for fast recall across all exam domains</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search topics, commands, concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                className="cursor-pointer capitalize"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {filteredSections.map((section) => (
          <Card key={section.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg text-primary-foreground">
                  {ICON_MAP[section.iconKey] ?? ICON_MAP.general}
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {section.title}
                    <Badge variant="secondary">{section.topics.length} topics</Badge>
                  </CardTitle>
                  <CardDescription>{section.summary ?? `Domain: ${section.category}`}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="multiple" className="w-full">
                {section.topics.map((topic) => (
                  <AccordionItem key={topic.id} value={topic.id}>
                    <AccordionTrigger className="px-6 hover:bg-muted/30">
                      <div className="flex items-center gap-2">
                        <Lightning size={16} weight="fill" className="text-accent" />
                        <span className="font-semibold">{topic.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          {topic.content.map((item, idx) => (
                            <div key={idx} className="flex gap-2 text-sm">
                              <span className="text-primary font-bold">•</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {topic.keyPoints && topic.keyPoints.length > 0 && (
                          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                            <h4 className="font-semibold text-sm mb-2 text-accent-foreground flex items-center gap-2">
                              <Lightning size={16} weight="fill" className="text-accent" />
                              Key Points
                            </h4>
                            <ul className="space-y-1">
                              {topic.keyPoints.map((point, idx) => (
                                <li key={idx} className="text-sm flex gap-2">
                                  <span className="text-accent">→</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {topic.compareWith && topic.compareWith.points.length > 0 && (
                          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                            <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                              <ArrowsLeftRight size={16} weight="bold" className="text-primary" />
                              {topic.compareWith.label}
                            </h4>
                            <ul className="space-y-1">
                              {topic.compareWith.points.map((point, idx) => (
                                <li key={idx} className="text-sm flex gap-2">
                                  <span className="text-primary">vs</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {topic.codeExamples && topic.codeExamples.length > 0 && (
                          <div className="space-y-2">
                            {topic.codeExamples.map((example, idx) => (
                              <div key={idx} className="space-y-1">
                                {example.description && (
                                  <p className="text-sm text-muted-foreground">{example.description}</p>
                                )}
                                <div className="bg-secondary/50 border rounded-lg p-4 overflow-x-auto">
                                  <pre className="text-xs font-mono">
                                    <code>{example.code}</code>
                                  </pre>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {topic.mnemonic && (
                          <div className="bg-secondary/40 border-l-4 border-accent rounded p-3 flex gap-2 items-start">
                            <Brain size={18} weight="duotone" className="text-accent shrink-0 mt-0.5" />
                            <p className="text-sm italic">{topic.mnemonic}</p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No cheat sheets found matching your search.</p>
        </Card>
      )}
    </div>
  )
}
