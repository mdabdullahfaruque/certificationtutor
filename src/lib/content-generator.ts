import { Topic, FlashCard, Question, ScenarioQuestion } from './types'

export async function generateTopicContent(domain: string, topicTitle: string): Promise<{
  description: string
  keyPoints: string[]
  realWorldScenarios: string[]
  commonMistakes: string[]
}> {
  const prompt = spark.llmPrompt`You are an Azure AZ-204 exam expert. Generate comprehensive learning content for the following topic:

Domain: ${domain}
Topic: ${topicTitle}

Provide the content in the following JSON format:
{
  "description": "2-3 sentence overview explaining what this topic is and why it matters for AZ-204",
  "keyPoints": ["5-7 critical points developers must know for the exam"],
  "realWorldScenarios": ["3-4 real-world scenarios where this is used in Azure development"],
  "commonMistakes": ["3-4 common mistakes developers make with this topic on the exam"]
}

Be specific, practical, and focused on what appears in the AZ-204 certification exam.`

  const response = await spark.llm(prompt, 'gpt-4o', true)
  return JSON.parse(response)
}

export async function generateFlashCards(topicId: string, topicTitle: string, domain: string, count: number = 8): Promise<FlashCard[]> {
  const prompt = spark.llmPrompt`You are an Azure AZ-204 exam expert. Create ${count} flashcards for studying this topic:

Topic: ${topicTitle}
Domain: ${domain}

Generate flashcards that cover:
- Key concepts and definitions
- Code patterns and syntax
- Configuration options
- Best practices
- Common pitfalls

Return ONLY a JSON object with a "cards" property containing an array of flashcard objects:
{
  "cards": [
    {
      "front": "Question or concept to recall",
      "back": "Answer with explanation",
      "code": "Optional code example if relevant (use null if not needed)",
      "tags": ["relevant", "tags"],
      "difficulty": "easy|medium|hard"
    }
  ]
}

Make questions exam-focused and practical. Include code examples for 30-40% of cards.`

  const response = await spark.llm(prompt, 'gpt-4o', true)
  const parsed = JSON.parse(response)
  
  return parsed.cards.map((card: any, index: number) => ({
    id: `${topicId}-card-${index + 1}`,
    topicId,
    front: card.front,
    back: card.back,
    code: card.code || undefined,
    tags: card.tags,
    difficulty: card.difficulty,
    reviewCount: 0,
  }))
}

export async function generatePracticeQuestions(
  topicId: string, 
  topicTitle: string, 
  domain: string,
  domainId: string,
  count: number = 10
): Promise<Question[]> {
  const prompt = spark.llmPrompt`You are an Azure AZ-204 exam expert. Create ${count} practice questions for:

Topic: ${topicTitle}
Domain: ${domain}

Questions should:
- Mirror actual AZ-204 exam format
- Include scenario-based questions (50% of questions)
- Test practical knowledge, not just memorization
- Have 4 options each
- Include detailed explanations

Return ONLY a JSON object with a "questions" property:
{
  "questions": [
    {
      "question": "Clear, specific question text",
      "scenario": "Optional scenario context (use null if not scenario-based)",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Why the correct answer is right and others are wrong",
      "difficulty": "easy|medium|hard",
      "tags": ["relevant", "tags"]
    }
  ]
}

Mix difficulty levels: 30% easy, 50% medium, 20% hard.`

  const response = await spark.llm(prompt, 'gpt-4o', true)
  const parsed = JSON.parse(response)
  
  return parsed.questions.map((q: any, index: number) => ({
    id: `${topicId}-q-${index + 1}`,
    question: q.question,
    scenario: q.scenario || undefined,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    domain,
    domainId,
    topicId,
    difficulty: q.difficulty,
    tags: q.tags,
  }))
}

export async function generateScenarioQuestion(
  topicTitle: string,
  domain: string,
  domainId: string
): Promise<ScenarioQuestion> {
  const prompt = spark.llmPrompt`You are an Azure AZ-204 exam expert. Create one complex scenario-based question for:

Topic: ${topicTitle}
Domain: ${domain}

Create a realistic, multi-part scenario that tests:
- Understanding of requirements
- Ability to choose the right Azure services
- Knowledge of configuration and implementation
- Best practices

Return ONLY a JSON object:
{
  "scenario": "Detailed scenario description (2-3 paragraphs)",
  "requirement": "What needs to be accomplished",
  "constraints": ["constraint 1", "constraint 2"],
  "existingSetup": "Current system description if relevant (or null)",
  "question": "Specific question about what to implement",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Comprehensive explanation of the solution",
  "stepByStepSolution": ["Step 1", "Step 2", "Step 3"],
  "tags": ["relevant", "tags"]
}`

  const response = await spark.llm(prompt, 'gpt-4o', true)
  const parsed = JSON.parse(response)
  
  return {
    id: `scenario-${Date.now()}`,
    scenario: parsed.scenario,
    scenarioContext: {
      requirement: parsed.requirement,
      constraints: parsed.constraints,
      existingSetup: parsed.existingSetup || undefined,
    },
    question: parsed.question,
    options: parsed.options,
    correctAnswer: parsed.correctAnswer,
    explanation: parsed.explanation,
    domain,
    domainId,
    topicId: `${domainId}-scenario`,
    difficulty: 'hard',
    tags: parsed.tags,
    stepByStepSolution: parsed.stepByStepSolution,
  }
}

export async function parsePDFQuestions(pdfText: string): Promise<Question[]> {
  const prompt = spark.llmPrompt`Extract practice questions from this exam PDF text. 

PDF Content:
${pdfText}

Extract all questions, answers, and explanations. Return ONLY a JSON object:
{
  "questions": [
    {
      "question": "Question text",
      "scenario": "Scenario if present (or null)",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation text (extract or infer)",
      "difficulty": "easy|medium|hard",
      "domain": "Infer the AZ-204 domain this belongs to",
      "tags": ["relevant", "tags"]
    }
  ]
}

If you cannot extract proper questions, return an empty questions array.`

  try {
    const response = await spark.llm(prompt, 'gpt-4o', true)
    const parsed = JSON.parse(response)
    
    return parsed.questions.map((q: any, index: number) => ({
      id: `pdf-q-${Date.now()}-${index}`,
      question: q.question,
      scenario: q.scenario || undefined,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      domain: q.domain,
      domainId: inferDomainId(q.domain),
      topicId: `pdf-topic-${index}`,
      difficulty: q.difficulty,
      tags: q.tags,
    }))
  } catch (error) {
    console.error('Error parsing PDF:', error)
    return []
  }
}

function inferDomainId(domainName: string): string {
  const domainMap: Record<string, string> = {
    'compute': 'develop-compute',
    'storage': 'develop-storage',
    'security': 'implement-security',
    'monitor': 'monitor-optimize',
    'connect': 'connect-consume',
  }
  
  const normalized = domainName.toLowerCase()
  for (const [key, id] of Object.entries(domainMap)) {
    if (normalized.includes(key)) return id
  }
  
  return 'develop-compute'
}
