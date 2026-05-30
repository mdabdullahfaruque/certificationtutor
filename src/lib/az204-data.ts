import { AZ204Domain, Topic, Question } from './types'

export const AZ204_DOMAINS: AZ204Domain[] = [
  {
    id: 'develop-compute',
    name: 'Develop Azure compute solutions',
    weight: '25-30%',
    description: 'Implement containerized solutions, Azure App Service, and Azure Functions',
    topics: [
      'Implement containerized solutions',
      'Azure Container Registry',
      'Azure Container Instances', 
      'Azure Container Apps',
      'Create and configure Azure App Service',
      'App Service plans and scaling',
      'Deploy apps using deployment slots',
      'Configure app settings and connection strings',
      'Enable diagnostics logging',
      'Implement Azure Functions',
      'Function triggers and bindings',
      'Durable Functions patterns',
      'Function app configuration and scaling'
    ]
  },
  {
    id: 'develop-storage',
    name: 'Develop for Azure storage',
    weight: '15-20%',
    description: 'Work with Cosmos DB, Blob Storage, and Azure Storage',
    topics: [
      'Develop solutions using Azure Cosmos DB',
      'Cosmos DB partitioning strategies',
      'Consistency levels',
      'Change feed and triggers',
      'Stored procedures and UDFs',
      'Develop solutions using Blob storage',
      'Set and retrieve blob properties',
      'Blob lifecycle management',
      'Hot, Cool, and Archive tiers',
      'Shared Access Signatures (SAS)',
      'Azure Storage encryption',
      'Implement storage redundancy'
    ]
  },
  {
    id: 'implement-security',
    name: 'Implement Azure security',
    weight: '20-25%',
    description: 'Secure solutions with Key Vault, Managed Identities, and App Configuration',
    topics: [
      'Implement user authentication with Microsoft Identity',
      'Microsoft Authentication Library (MSAL)',
      'OAuth 2.0 and OpenID Connect',
      'Shared Access Signatures',
      'Microsoft Graph API integration',
      'Implement secure Azure solutions',
      'Azure Key Vault secrets and certificates',
      'Managed identities (system and user-assigned)',
      'App Configuration and Key Vault references',
      'Azure RBAC and custom roles',
      'Implement security in Azure Functions',
      'Secure app settings and connection strings'
    ]
  },
  {
    id: 'monitor-optimize',
    name: 'Monitor, troubleshoot, and optimize',
    weight: '15-20%',
    description: 'Implement caching, Application Insights, and CDN',
    topics: [
      'Implement caching for solutions',
      'Azure Cache for Redis',
      'CDN caching strategies',
      'Troubleshoot solutions using Application Insights',
      'Configure instrumentation',
      'Analyze logs and metrics',
      'Implement distributed tracing',
      'Application Map and dependency tracking',
      'Query logs using Kusto (KQL)',
      'Implement autoscaling',
      'Configure alerts and action groups'
    ]
  },
  {
    id: 'connect-consume',
    name: 'Connect to and consume Azure services',
    weight: '15-20%',
    description: 'Work with API Management, Event Grid, Service Bus, and Event Hubs',
    topics: [
      'Implement API Management',
      'Create and configure APIs',
      'Implement policies for rate limiting',
      'Secure APIs using subscriptions and certificates',
      'Develop event-based solutions',
      'Azure Event Grid schema and topics',
      'Event Grid event handlers',
      'Azure Event Hubs for big data streaming',
      'Event Hubs consumer groups and partitions',
      'Develop message-based solutions',
      'Azure Service Bus queues and topics',
      'Service Bus message sessions and dead-letter queues',
      'Azure Queue Storage operations'
    ]
  }
]

export const SAMPLE_TOPICS: Topic[] = [
  {
    id: 'azure-functions-basics',
    title: 'Azure Functions Fundamentals',
    domain: 'develop-compute',
    description: 'Master serverless compute with Azure Functions',
    completed: false,
    difficulty: 2,
    estimatedTime: 45,
    cards: [
      {
        id: 'af-1',
        front: 'What is Azure Functions?',
        back: 'Azure Functions is a serverless compute service that lets you run event-triggered code without having to explicitly provision or manage infrastructure.',
        tags: ['basics', 'serverless']
      },
      {
        id: 'af-2',
        front: 'What are the main trigger types?',
        back: 'HTTP, Timer, Blob, Queue, Event Hub, Event Grid, Cosmos DB, Service Bus',
        tags: ['triggers']
      },
      {
        id: 'af-3',
        front: 'What is Durable Functions?',
        back: 'Extension that lets you write stateful functions in a serverless environment, enabling orchestration patterns like function chaining, fan-out/fan-in, and async HTTP APIs.',
        code: 'const df = require("durable-functions");\n\nmodule.exports = df.orchestrator(function* (context) {\n  const x = yield context.df.callActivity("F1");\n  const y = yield context.df.callActivity("F2", x);\n  return yield context.df.callActivity("F3", y);\n});',
        tags: ['durable', 'orchestration']
      }
    ]
  },
  {
    id: 'cosmos-db-basics',
    title: 'Cosmos DB Essentials',
    domain: 'develop-storage',
    description: 'Learn globally distributed NoSQL database',
    completed: false,
    difficulty: 3,
    estimatedTime: 60,
    cards: [
      {
        id: 'cd-1',
        front: 'What is a partition key in Cosmos DB?',
        back: 'A partition key is a property path that distributes data across logical partitions for scalability. Choose a property with high cardinality and even distribution.',
        tags: ['partitioning', 'performance']
      },
      {
        id: 'cd-2',
        front: 'What are the consistency levels?',
        back: 'Strong, Bounded Staleness, Session (default), Consistent Prefix, and Eventual - ordered from strongest to weakest consistency.',
        tags: ['consistency']
      },
      {
        id: 'cd-3',
        front: 'How to optimize RU consumption?',
        back: 'Use partition keys effectively, index only necessary properties, use appropriate consistency level, implement caching, and batch operations when possible.',
        code: 'const { resources } = await container.items\n  .query({\n    query: "SELECT * FROM c WHERE c.category = @category",\n    parameters: [{ name: "@category", value: "electronics" }]\n  })\n  .fetchAll();',
        tags: ['optimization', 'RU']
      }
    ]
  },
  {
    id: 'managed-identities',
    title: 'Managed Identities',
    domain: 'implement-security',
    description: 'Secure authentication without credentials',
    completed: false,
    difficulty: 2,
    estimatedTime: 40,
    cards: [
      {
        id: 'mi-1',
        front: 'What is a Managed Identity?',
        back: 'An Azure AD identity automatically managed by Azure that applications can use to authenticate to Azure services without storing credentials in code.',
        tags: ['security', 'authentication']
      },
      {
        id: 'mi-2',
        front: 'System-assigned vs User-assigned?',
        back: 'System-assigned: tied to resource lifecycle, deleted with resource. User-assigned: standalone resource, can be shared across multiple resources.',
        tags: ['types']
      },
      {
        id: 'mi-3',
        front: 'How to use in code?',
        back: 'Use Azure.Identity library with DefaultAzureCredential or ManagedIdentityCredential to automatically authenticate.',
        code: 'using Azure.Identity;\nusing Azure.Security.KeyVault.Secrets;\n\nvar client = new SecretClient(\n  new Uri("https://myvault.vault.azure.net/"),\n  new DefaultAzureCredential()\n);\n\nvar secret = await client.GetSecretAsync("secretName");',
        tags: ['implementation', 'code']
      }
    ]
  }
]

export const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'You are developing an Azure Function that processes messages from a queue. The function must process messages in batches of 10. Which trigger binding should you use?',
    options: [
      'Queue trigger with batch size set to 10',
      'Service Bus trigger with maxMessageCount set to 10',
      'Event Hub trigger with cardinality set to Many',
      'Storage Blob trigger'
    ],
    correctAnswer: 0,
    explanation: 'Queue trigger supports batch processing with the batch size configuration. Set "batchSize": 10 in host.json to process 10 messages at once.',
    domain: 'develop-compute',
    difficulty: 'medium',
    tags: ['azure-functions', 'queue', 'triggers']
  },
  {
    id: 'q2',
    question: 'Your company stores sensitive connection strings. You need to ensure the application can access these secrets without storing them in configuration files. What should you use?',
    options: [
      'Environment variables',
      'Azure Key Vault with Managed Identity',
      'Azure Storage Account',
      'appsettings.json file'
    ],
    correctAnswer: 1,
    explanation: 'Azure Key Vault with Managed Identity is the best practice for storing secrets. Managed Identity eliminates the need to store credentials in code, and Key Vault provides centralized secret management with auditing.',
    domain: 'implement-security',
    difficulty: 'easy',
    tags: ['key-vault', 'managed-identity', 'security']
  },
  {
    id: 'q3',
    scenario: 'You are developing a web application that stores user profile images. The application must: 1) Serve images quickly to users worldwide 2) Reduce bandwidth costs 3) Automatically compress images',
    question: 'Which combination of Azure services should you use?',
    options: [
      'Blob Storage with Azure CDN and image optimization enabled',
      'Cosmos DB with geo-replication',
      'Azure Files with Azure Front Door',
      'Table Storage with Azure Traffic Manager'
    ],
    correctAnswer: 0,
    explanation: 'Blob Storage is ideal for unstructured data like images. Azure CDN caches content at edge locations globally for fast delivery and reduced bandwidth. CDN also supports image optimization features like compression and format conversion.',
    domain: 'develop-storage',
    difficulty: 'medium',
    tags: ['blob-storage', 'cdn', 'optimization']
  },
  {
    id: 'q4',
    question: 'You need to implement distributed tracing for a microservices application to track requests across services. What should you use?',
    options: [
      'Azure Monitor Logs only',
      'Application Insights with correlation IDs',
      'Azure Event Grid',
      'Azure Service Health'
    ],
    correctAnswer: 1,
    explanation: 'Application Insights provides distributed tracing through correlation IDs (operation_Id and operation_ParentId) that track requests across multiple services, creating an end-to-end transaction view.',
    domain: 'monitor-optimize',
    difficulty: 'medium',
    tags: ['application-insights', 'monitoring', 'distributed-tracing']
  },
  {
    id: 'q5',
    scenario: 'Your application uses Cosmos DB with the Session consistency level. Users report seeing stale data when switching between regions.',
    question: 'What is the cause of this issue?',
    options: [
      'Session consistency only guarantees consistency within the same session/client',
      'Cosmos DB replication lag is too high',
      'The partition key is incorrectly configured',
      'The database needs to be restarted'
    ],
    correctAnswer: 0,
    explanation: 'Session consistency guarantees that a client session will read its own writes, but different clients or sessions may see different versions. For cross-region consistency, use Bounded Staleness or Strong consistency.',
    domain: 'develop-storage',
    difficulty: 'hard',
    tags: ['cosmos-db', 'consistency', 'distributed-systems']
  }
]
