import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Upload, FilePdf, CheckCircle, XCircle, Sparkle } from '@phosphor-icons/react'
import { UserProgress } from '@/lib/types'
import { parsePDFQuestions } from '@/lib/content-generator'
import { toast } from 'sonner'

interface UploadViewProps {
  progress: UserProgress
  setProgress: (value: UserProgress | ((oldValue?: UserProgress) => UserProgress)) => void
}

export function UploadView({ progress, setProgress }: UploadViewProps) {
  const [pdfText, setPdfText] = useState('')
  const [processing, setProcessing] = useState(false)
  const [extracted, setExtracted] = useState<number | null>(null)

  const handleParse = async () => {
    if (!pdfText.trim()) {
      toast.error('Please paste some content first')
      return
    }

    setProcessing(true)
    try {
      const questions = await parsePDFQuestions(pdfText)
      
      if (questions.length === 0) {
        toast.error('No questions found', {
          description: 'The AI could not extract questions from the provided text'
        })
      } else {
        setExtracted(questions.length)
        toast.success(`Extracted ${questions.length} questions!`, {
          description: 'Questions have been added to your practice pool'
        })
      }
    } catch (error) {
      toast.error('Failed to parse content')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Upload Study Materials</h1>
        <p className="text-muted-foreground">
          Paste content from your PDFs or study materials and let AI extract practice questions
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FilePdf size={32} className="text-primary" weight="duotone" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">PDF Content</h2>
              <p className="text-sm text-muted-foreground">
                Copy and paste text from your Udemy course PDFs or other study materials
              </p>
            </div>
          </div>

          <Textarea
            placeholder="Paste your PDF content here...&#10;&#10;Example:&#10;Question 1: You need to implement Azure Functions. Which trigger should you use?&#10;A) HTTP Trigger&#10;B) Timer Trigger&#10;C) Blob Trigger&#10;D) Queue Trigger&#10;&#10;Answer: A&#10;Explanation: HTTP triggers are used for web APIs..."
            value={pdfText}
            onChange={(e) => setPdfText(e.target.value)}
            className="min-h-[400px] font-mono text-sm"
          />

          <div className="flex gap-3">
            <Button onClick={handleParse} disabled={processing || !pdfText.trim()}>
              {processing ? (
                <>
                  <Sparkle className="animate-spin mr-2" size={16} />
                  Processing with AI...
                </>
              ) : (
                <>
                  <Upload size={16} className="mr-2" />
                  Extract Questions
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => {
              setPdfText('')
              setExtracted(null)
            }}>
              Clear
            </Button>
          </div>

          {extracted !== null && (
            <div className="flex items-center gap-2 p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <CheckCircle size={24} weight="fill" className="text-accent" />
              <span className="font-semibold">Successfully extracted {extracted} questions!</span>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex items-start gap-3">
          <Sparkle size={24} className="text-primary mt-1" weight="fill" />
          <div>
            <h3 className="font-semibold mb-2">How it works</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">1.</span>
                <span>Open your PDF and copy the text content (questions, answers, explanations)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">2.</span>
                <span>Paste it into the text area above</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">3.</span>
                <span>Our AI will automatically extract and structure the questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">4.</span>
                <span>Questions are added to your practice pool and categorized by topic</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
