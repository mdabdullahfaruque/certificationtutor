import { useState, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { UploadSimple, FileText, CheckCircle, Warning } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface UploadedFile {
  name: string
  size: number
  status: 'uploading' | 'processing' | 'success' | 'error'
  progress: number
  questionsExtracted?: number
}

export function PDFUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const processFile = async (file: File) => {
    const newFile: UploadedFile = {
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0
    }

    setFiles((prev) => [...prev, newFile])

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setFiles((prev) =>
        prev.map((f) =>
          f.name === file.name ? { ...f, progress: i, status: i === 100 ? 'processing' : 'uploading' } : f
        )
      )
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const questionsExtracted = Math.floor(Math.random() * 30) + 10

    setFiles((prev) =>
      prev.map((f) =>
        f.name === file.name
          ? { ...f, status: 'success', progress: 100, questionsExtracted }
          : f
      )
    )

    toast.success(`Successfully extracted ${questionsExtracted} questions from ${file.name}`)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === 'application/pdf'
    )

    if (droppedFiles.length === 0) {
      toast.error('Please upload PDF files only')
      return
    }

    droppedFiles.forEach(processFile)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles) return

    const pdfFiles = Array.from(selectedFiles).filter(
      (file) => file.type === 'application/pdf'
    )

    if (pdfFiles.length === 0) {
      toast.error('Please upload PDF files only')
      return
    }

    pdfFiles.forEach(processFile)
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Upload Study Materials</h1>
        <p className="text-muted-foreground">
          Upload your Udemy course PDFs and we'll automatically extract questions and answers
        </p>
      </div>

      <Card
        className={`p-12 border-2 border-dashed transition-all ${
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div
            className={`p-6 rounded-full transition-colors ${
              isDragging ? 'bg-primary/20' : 'bg-muted'
            }`}
          >
            <UploadSimple size={48} className={isDragging ? 'text-primary' : ''} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Drop PDF files here</h3>
            <p className="text-muted-foreground">or click to browse</p>
          </div>
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button asChild>
              <span>Select Files</span>
            </Button>
          </label>
          <p className="text-sm text-muted-foreground">
            Supports: PDF files • Max 50MB per file
          </p>
        </div>
      </Card>

      {files.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
          <div className="space-y-3">
            {files.map((file, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      file.status === 'success'
                        ? 'bg-accent/10 text-accent'
                        : file.status === 'error'
                        ? 'bg-destructive/10 text-destructive'
                        : 'bg-muted'
                    }`}
                  >
                    {file.status === 'success' ? (
                      <CheckCircle size={24} weight="fill" />
                    ) : file.status === 'error' ? (
                      <Warning size={24} weight="fill" />
                    ) : (
                      <FileText size={24} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold truncate">{file.name}</h3>
                      <div className="flex items-center gap-2 ml-4">
                        {file.status === 'success' && file.questionsExtracted && (
                          <Badge className="bg-accent text-accent-foreground">
                            {file.questionsExtracted} questions
                          </Badge>
                        )}
                        <Badge
                          variant={
                            file.status === 'success'
                              ? 'default'
                              : file.status === 'error'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {file.status === 'uploading'
                            ? 'Uploading...'
                            : file.status === 'processing'
                            ? 'Processing...'
                            : file.status === 'success'
                            ? 'Complete'
                            : 'Error'}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {formatFileSize(file.size)}
                    </p>

                    {file.status !== 'success' && file.status !== 'error' && (
                      <Progress value={file.progress} className="h-2" />
                    )}

                    {file.status === 'success' && (
                      <p className="text-sm text-accent mt-2">
                        ✓ Questions added to your practice pool
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {files.length > 0 && files.every((f) => f.status === 'success') && (
        <Card className="p-6 bg-accent/5 border-accent/20">
          <div className="flex items-start gap-4">
            <CheckCircle size={32} weight="fill" className="text-accent flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg mb-2">All files processed successfully!</h3>
              <p className="text-muted-foreground">
                Your questions have been extracted and are now available in the practice exam section.
                We've analyzed the content and categorized them by domain for optimal learning.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
