import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookBookmark, Code } from '@phosphor-icons/react'
import { Topic, FlashCard } from '@/lib/types'

interface StudyCardsProps {
  topic: Topic
  onComplete: () => void
  onBack: () => void
}

export function StudyCards({ topic, onComplete, onBack }: StudyCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [direction, setDirection] = useState(0)

  const currentCard = topic.cards[currentIndex]
  const progress = ((currentIndex + 1) / topic.cards.length) * 100

  const handleNext = () => {
    if (currentIndex < topic.cards.length - 1) {
      setDirection(1)
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2" />
          Back to Topics
        </Button>
        <div className="flex items-center gap-2">
          <BookBookmark size={20} />
          <span className="text-sm font-medium">
            {currentIndex + 1} / {topic.cards.length}
          </span>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
        <p className="text-muted-foreground">{topic.description}</p>
        <div className="flex gap-2 mt-3">
          {currentCard.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="w-full bg-muted rounded-full h-2">
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="relative min-h-[400px] flex items-center justify-center perspective-1000">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 100 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Card
              className="p-8 cursor-pointer min-h-[400px] flex flex-col justify-center relative hover:shadow-lg transition-shadow"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div
                    key="front"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute top-4 right-4">
                      <Badge>Question</Badge>
                    </div>
                    <div className="text-2xl font-semibold text-center">
                      {currentCard.front}
                    </div>
                    <div className="text-center mt-8 text-sm text-muted-foreground">
                      Click to reveal answer
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-accent text-accent-foreground">Answer</Badge>
                    </div>
                    <div className="text-lg leading-relaxed">
                      {currentCard.back}
                    </div>
                    {currentCard.code && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                          <Code size={16} />
                          <span>Code Example</span>
                        </div>
                        <pre className="bg-secondary text-secondary-foreground p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{currentCard.code}</code>
                        </pre>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="mr-2" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {currentIndex === topic.cards.length - 1 ? 'Complete Topic' : 'Next'}
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  )
}
