import { Question } from './types'

export interface ParsedQuestion {
  id: string
  domain: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  scenario?: string
}

export async function loadQuestionsFromMarkdown(): Promise<Question[]> {
  try {
    const response = await fetch('/questions-database.md')
    const text = await response.text()
    return parseMarkdownQuestions(text)
  } catch (error) {
    console.error('Failed to load questions from markdown:', error)
    return []
  }
}

export function parseMarkdownQuestions(markdownText: string): Question[] {
  const questions: Question[] = []
  
  const questionBlocks = markdownText.split(/---\s*\n\s*##\s+Question\s+\d+/g).filter(Boolean)
  
  questionBlocks.forEach((block, index) => {
    if (!block.trim() || block.trim().startsWith('#')) return
    
    try {
      const domainMatch = block.match(/\*\*Domain:\*\*\s*(.+)/i)
      const topicMatch = block.match(/\*\*Topic:\*\*\s*(.+)/i)
      const difficultyMatch = block.match(/\*\*Difficulty:\*\*\s*(\w+)/i)
      const questionMatch = block.match(/\*\*Question:\*\*\s*\n([\s\S]+?)\n\s*\*\*Options:\*\*/i)
      const optionsMatch = block.match(/\*\*Options:\*\*\s*\n([\s\S]+?)\n\s*\*\*Correct Answer:\*\*/i)
      const correctAnswerMatch = block.match(/\*\*Correct Answer:\*\*\s*([A-D])/i)
      const explanationMatch = block.match(/\*\*Explanation:\*\*\s*\n([\s\S]+?)(?:\n\s*\*\*Scenario:\*\*|\n\s*---|\n\s*$)/i)
      const scenarioMatch = block.match(/\*\*Scenario:\*\*\s*\n([\s\S]+?)(?:\n\s*---|\n\s*$)/i)
      
      if (!questionMatch || !optionsMatch || !correctAnswerMatch) {
        console.warn(`Skipping malformed question block ${index + 1}`)
        return
      }
      
      const options = optionsMatch[1]
        .split('\n')
        .filter(line => /^[A-D]\)/.test(line.trim()))
        .map(line => line.replace(/^[A-D]\)\s*/, '').trim())
      
      const correctAnswerLetter = correctAnswerMatch[1]
      const correctAnswerIndex = correctAnswerLetter.charCodeAt(0) - 'A'.charCodeAt(0)
      
      const domain = domainMatch?.[1]?.trim() || 'general'
      const topic = topicMatch?.[1]?.trim() || 'General'
      const difficulty = (difficultyMatch?.[1]?.trim().toLowerCase() || 'medium') as 'easy' | 'medium' | 'hard'
      
      questions.push({
        id: `q-${Date.now()}-${index}`,
        question: questionMatch[1].trim(),
        options,
        correctAnswer: correctAnswerIndex,
        explanation: explanationMatch?.[1]?.trim() || '',
        domain,
        domainId: domain,
        topicId: topic.toLowerCase().replace(/\s+/g, '-'),
        difficulty,
        scenario: scenarioMatch?.[1]?.trim(),
        tags: [domain, topic],
      })
    } catch (error) {
      console.error(`Error parsing question block ${index + 1}:`, error)
    }
  })
  
  return questions
}

export async function appendQuestionToMarkdown(question: ParsedQuestion): Promise<void> {
  const questionText = formatQuestionAsMarkdown(question)
  
  console.log('Question to append:', questionText)
}

export function formatQuestionAsMarkdown(q: ParsedQuestion): string {
  const options = q.options
    .map((opt, idx) => `${String.fromCharCode(65 + idx)}) ${opt}`)
    .join('\n')
  
  const correctAnswerLetter = String.fromCharCode(65 + q.correctAnswer)
  
  let markdown = `---

## Question ${q.id}

**Domain:** ${q.domain}
**Topic:** ${q.topic}
**Difficulty:** ${q.difficulty}

**Question:**
${q.question}

**Options:**
${options}

**Correct Answer:** ${correctAnswerLetter}

**Explanation:**
${q.explanation}
`

  if (q.scenario) {
    markdown += `
**Scenario:**
${q.scenario}
`
  }

  markdown += '\n'
  
  return markdown
}

export async function extractQuestionsFromPDFText(pdfText: string): Promise<ParsedQuestion[]> {
  const prompt = spark.llmPrompt`You are an expert at parsing exam questions from text. Extract all questions from the following text and return them in a structured JSON format.

Text content:
${pdfText}

Return a JSON object with a single "questions" property containing an array of question objects. Each question must have:
- question: the question text
- options: array of 4 answer choices (strings)
- correctAnswer: index of correct answer (0-3)
- explanation: explanation of the correct answer
- domain: Azure domain (compute, storage, security, monitoring, integration)
- topic: specific topic name
- difficulty: easy, medium, or hard
- scenario: optional scenario text if present

Return ONLY valid JSON with no additional text. Example format:
{
  "questions": [
    {
      "question": "What is...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": 2,
      "explanation": "C is correct because...",
      "domain": "compute",
      "topic": "Azure Functions",
      "difficulty": "medium",
      "scenario": "You are building..."
    }
  ]
}`

  try {
    const response = await spark.llm(prompt, 'gpt-4o', true)
    const parsed = JSON.parse(response)
    
    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error('Invalid response format')
    }
    
    return parsed.questions.map((q: any, index: number) => ({
      id: `imported-${Date.now()}-${index}`,
      domain: q.domain || 'general',
      topic: q.topic || 'General',
      difficulty: q.difficulty || 'medium',
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      scenario: q.scenario,
    }))
  } catch (error) {
    console.error('Failed to parse PDF content:', error)
    throw new Error('Failed to extract questions from PDF text')
  }
}
