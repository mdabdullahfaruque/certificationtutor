import { Topic, Question } from './types'

export async function generateAZ204Topics(): Promise<Topic[]> {
  const prompt = window.spark.llmPrompt`You are an expert Azure developer and certified trainer for the AZ-204 exam. Generate comprehensive study content for the AZ-204 Microsoft Azure Developer Associate certification exam.

Create a complete JSON object (not an array) with a single property "topics" containing an array of ALL major topics from the official Microsoft AZ-204 exam guide. Each topic should have:
- id: kebab-case unique identifier
- title: Clear topic name
- domain: one of: develop-compute, develop-storage, implement-security, monitor-optimize, connect-consume
- description: Concise 1-sentence description
- difficulty: 1 (easy), 2 (medium), or 3 (hard)
- estimatedTime: minutes needed (20-60)
- completed: false
- cards: Array of 5-8 flashcards with:
  - id: unique identifier
  - front: Question or concept (clear and specific)
  - back: Detailed answer with practical information
  - code: (optional) relevant code example in C#, JavaScript, or Azure CLI
  - tags: array of 2-3 relevant keywords

Cover these essential AZ-204 topics comprehensively:
1. Azure Functions (triggers, bindings, durable functions)
2. Azure App Service (deployment, scaling, slots)
3. Azure Container Instances & Container Apps
4. Azure Container Registry
5. Cosmos DB (partitioning, consistency, change feed)
6. Azure Blob Storage (tiers, lifecycle, SAS)
7. Azure Storage security and encryption
8. Microsoft Identity Platform & MSAL
9. Azure Key Vault (secrets, certificates, managed identities)
10. Managed Identities (system vs user-assigned)
11. Azure App Configuration
12. Azure Cache for Redis
13. Application Insights & monitoring
14. CDN and optimization
15. API Management
16. Event Grid
17. Event Hubs
18. Service Bus (queues, topics, sessions)
19. Azure Queue Storage

Make flashcards practical, exam-focused, and include real-world scenarios. Code examples should be syntactically correct and follow Azure best practices.

Return ONLY valid JSON in this exact format:
{
  "topics": [array of topic objects]
}`

  const response = await window.spark.llm(prompt, 'gpt-4o', true)
  const data = JSON.parse(response)
  return data.topics
}

export async function generateAZ204Questions(): Promise<Question[]> {
  const prompt = window.spark.llmPrompt`You are an expert at creating Azure AZ-204 certification exam questions. Generate comprehensive practice questions that mirror the actual exam format.

Create a complete JSON object (not an array) with a single property "questions" containing an array of 50+ practice questions for the AZ-204 exam. Each question should have:
- id: unique identifier (q1, q2, etc.)
- question: Clear, scenario-based question text
- options: Array of 4 plausible answer choices
- correctAnswer: Index (0-3) of the correct option
- explanation: Detailed explanation of why the answer is correct (2-3 sentences)
- domain: one of: develop-compute, develop-storage, implement-security, monitor-optimize, connect-consume
- difficulty: 'easy', 'medium', or 'hard'
- scenario: (optional) longer scenario text if needed for context
- tags: array of 2-4 relevant technology keywords

Questions should cover:
- Azure Functions (all trigger types, Durable Functions patterns)
- App Service (deployment slots, scaling, configuration)
- Containers (ACI, ACA, ACR, Docker)
- Cosmos DB (partition keys, consistency levels, RU optimization)
- Blob Storage (access tiers, lifecycle policies, SAS tokens)
- Microsoft Identity (MSAL, OAuth 2.0, Microsoft Graph)
- Key Vault (secrets, certificates, access policies)
- Managed Identities (when to use each type)
- App Configuration (feature flags, Key Vault references)
- Redis Cache (patterns, eviction policies)
- Application Insights (instrumentation, KQL queries, distributed tracing)
- API Management (policies, products, subscriptions)
- Event Grid (event schema, handlers, filters)
- Event Hubs (partitions, consumer groups, capture)
- Service Bus (sessions, dead-letter queues, message sequencing)

Make questions realistic with:
- Real-world scenarios
- Multiple valid-sounding options
- Explanations that teach concepts
- Mix of conceptual and implementation questions
- Appropriate difficulty distribution (30% easy, 50% medium, 20% hard)

Return ONLY valid JSON in this exact format:
{
  "questions": [array of question objects]
}`

  const response = await window.spark.llm(prompt, 'gpt-4o', true)
  const data = JSON.parse(response)
  return data.questions
}
