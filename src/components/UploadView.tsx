import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Upload, FilePdf, CheckCircle, Sparkle, FileText, Download } from '@phosphor-icons/react'
import { UserProgress } from '@/lib/types'
import { extractQuestionsFromPDFText, formatQuestionAsMarkdown } from '@/lib/questions-db'
import { toast } from 'sonner'

interface UploadViewProps {
  progress: UserProgress
  setProgress: (value: UserProgress | ((oldValue?: UserProgress) => UserProgress)) => void
}

export function UploadView({ progress, setProgress }: UploadViewProps) {
  const [pdfText, setPdfText] = useState('')
  const [processing, setProcessing] = useState(false)
  const [extracted, setExtracted] = useState<number | null>(null)
  const [extractedQuestions, setExtractedQuestions] = useState<string>('')
  const [uploadedQuestions] = useKV<number>('uploaded-questions-count', 0)

  const handleParse = async () => {
    if (!pdfText.trim()) {
      toast.error('Please paste some content first')
      return
    }

    setProcessing(true)
    try {
      const questions = await extractQuestionsFromPDFText(pdfText)
      
      if (questions.length === 0) {
        toast.error('No questions found', {
          description: 'The AI could not extract questions from the provided text'
        })
        setExtracted(0)
      } else {
        const markdownContent = questions.map(q => formatQuestionAsMarkdown(q)).join('\n')
        setExtractedQuestions(markdownContent)
        setExtracted(questions.length)
        
        toast.success(`Extracted ${questions.length} questions!`, {
          description: 'Copy the markdown below and append it to questions-database.md'
        })
      }
    } catch (error) {
      toast.error('Failed to parse content')
    } finally {
      setProcessing(false)
    }
  }

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(extractedQuestions)
    toast.success('Copied to clipboard!', {
      description: 'Paste into questions-database.md file'
    })
  }

  const handleDownloadMarkdown = () => {
    const blob = new Blob([extractedQuestions], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `extracted-questions-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('Downloaded!', {
      description: 'Append the content to questions-database.md'
    })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Upload PDF Content</h1>
        <p className="text-muted-foreground">
          Paste text from your exam PDF files and AI will extract questions into markdown format
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FilePdf size={32} className="text-primary" weight="duotone" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">PDF Question Extraction</h2>
              <p className="text-sm text-muted-foreground">
                AI will parse your exam questions and convert them to structured markdown
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
              setExtractedQuestions('')
            }}>
              Clear
            </Button>
          </div>

          {extracted !== null && extracted > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <CheckCircle size={24} weight="fill" className="text-accent" />
                <span className="font-semibold">Extracted {extracted} questions!</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Generated Markdown</h3>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleCopyMarkdown}>
                      <FileText size={16} className="mr-2" />
                      Copy
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleDownloadMarkdown}>
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={extractedQuestions}
                  readOnly
                  className="min-h-[300px] font-mono text-xs bg-muted"
                />
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm">
                  <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Next Step:</p>
                  <p className="text-blue-700 dark:text-blue-300">
                    Append this markdown content to the <code className="px-1 py-0.5 bg-blue-100 dark:bg-blue-900 rounded">questions-database.md</code> file in the root directory, then practice the questions!
                  </p>
                </div>
              </div>
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
                <span>Open your exam PDF and copy all the text content (Ctrl+A, then Ctrl+C)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">2.</span>
                <span>Paste it into the text area above</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">3.</span>
                <span>AI extracts questions, options, answers, and explanations automatically</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">4.</span>
                <span>Copy or download the markdown and append it to questions-database.md</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">5.</span>
                <span>Practice the imported questions in the Practice tab!</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
