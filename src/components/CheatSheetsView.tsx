import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookBookmark, Code, Lightning, ShieldCheck, ChartBar, PlugsConnected, MagnifyingGlass } from '@phosphor-icons/react'

interface CheatSheetSection {
  id: string
  title: string
  icon: React.ReactNode
  category: string
  topics: CheatSheetTopic[]
}

interface CheatSheetTopic {
  id: string
  title: string
  content: string[]
  codeExamples?: CodeExample[]
  keyPoints?: string[]
}

interface CodeExample {
  language: string
  code: string
  description?: string
}

const CHEATSHEET_DATA: CheatSheetSection[] = [
  {
    id: 'compute',
    title: 'Azure Compute Solutions',
    icon: <Code size={20} weight="duotone" />,
    category: 'Compute',
    topics: [
      {
        id: 'aci',
        title: 'Azure Container Instances (ACI)',
        content: [
          'Run containers without managing servers',
          'Per-second billing for CPU and memory',
          'No built-in load balancing',
          'Good for: Simple workloads, burst scenarios, dev/test'
        ],
        keyPoints: [
          'Fastest way to run a container in Azure',
          'VNet integration available',
          'Can mount Azure Files shares',
          'Limited to Linux and Windows containers'
        ],
        codeExamples: [{
          language: 'bash',
          code: 'az container create --resource-group myRG --name mycontainer --image nginx --dns-name-label myapp --ports 80'
        }]
      },
      {
        id: 'container-apps',
        title: 'Azure Container Apps',
        content: [
          'Serverless container platform with auto-scaling',
          'Built-in load balancing and HTTPS ingress',
          'KEDA-based scaling (HTTP, CPU, memory, custom)',
          'Revisions for traffic splitting (A/B testing)'
        ],
        keyPoints: [
          'Can scale to zero',
          'Dapr integration for microservices',
          'Multiple revision modes',
          'Best for: Microservices, APIs, event-driven apps'
        ],
        codeExamples: [{
          language: 'bash',
          code: 'az containerapp create --name myapp --resource-group myRG --environment myenv --image myimage:latest --target-port 80 --ingress external'
        }]
      },
      {
        id: 'acr',
        title: 'Azure Container Registry (ACR)',
        content: [
          'SKUs: Basic (dev/test), Standard (production), Premium (geo-replication)',
          'Authentication: Admin user, service principal, managed identity, Azure AD',
          'Features: Vulnerability scanning, content trust, webhooks, ACR Tasks'
        ],
        keyPoints: [
          'Premium required for geo-replication',
          'Supports OCI artifacts',
          'Can trigger builds on git commit',
          'Private Docker registry'
        ],
        codeExamples: [{
          language: 'bash',
          code: `az acr create --name myregistry --resource-group myRG --sku Premium
az acr login --name myregistry
docker tag myimage myregistry.azurecr.io/myimage:v1
docker push myregistry.azurecr.io/myimage:v1`
        }]
      },
      {
        id: 'app-service',
        title: 'App Service Plans & Deployment',
        content: [
          'Tiers: Free/Shared, Basic, Standard (auto-scale), Premium, Isolated',
          'Scale up: Change tier | Scale out: Add instances',
          'Deployment slots: Zero-downtime deployments',
          'Auto-scale: Schedule-based or metric-based'
        ],
        keyPoints: [
          'All apps in same plan share resources',
          'Deployment slots swap with warm-up',
          'Sticky settings stay with slot',
          'Custom domains and SSL/TLS support'
        ],
        codeExamples: [{
          language: 'bash',
          code: `az webapp deployment slot create --name myapp --resource-group myRG --slot staging
az webapp deployment slot swap --name myapp --resource-group myRG --slot staging --target-slot production`
        }]
      },
      {
        id: 'functions',
        title: 'Azure Functions - Triggers & Bindings',
        content: [
          'Triggers: HTTP, Timer, Blob, Queue, Event Grid, Event Hub, Cosmos DB',
          'Input Bindings: Read data (Blob, Table, Cosmos DB)',
          'Output Bindings: Write data (Blob, Queue, Table, Event Hub)',
          'Hosting: Consumption (auto-scale), Premium (pre-warmed), Dedicated'
        ],
        keyPoints: [
          'Timer uses CRON expressions',
          'HTTP auth levels: anonymous, function, admin',
          'Bindings reduce boilerplate code',
          'Durable Functions for orchestrations'
        ],
        codeExamples: [{
          language: 'csharp',
          code: `[FunctionName("ProcessOrder")]
public static async Task Run(
    [QueueTrigger("orders")] string orderMessage,
    [Blob("receipts/{rand-guid}.txt")] TextWriter receipt,
    [CosmosDB("store", "orders", ConnectionStringSetting = "CosmosDb")] IAsyncCollector<Order> orders)
{
    var order = JsonSerializer.Deserialize<Order>(orderMessage);
    await orders.AddAsync(order);
    await receipt.WriteLineAsync($"Order {order.Id} processed");
}`
        }]
      },
      {
        id: 'durable-functions',
        title: 'Durable Functions Patterns',
        content: [
          'Function Chaining: Sequential execution',
          'Fan-out/Fan-in: Parallel execution then aggregate',
          'Async HTTP APIs: Long-running operations with status check',
          'Monitor: Recurring process until condition met',
          'Human Interaction: Wait for external event'
        ],
        keyPoints: [
          'Orchestrator must be deterministic',
          'Activity functions do the work',
          'Client functions start orchestrations',
          'State automatically persisted'
        ],
        codeExamples: [{
          language: 'csharp',
          code: `[FunctionName("OrderWorkflow")]
public static async Task<string> Run([OrchestrationTrigger] IDurableOrchestrationContext context)
{
    var order = context.GetInput<Order>();
    await context.CallActivityAsync("ProcessPayment", order);
    await context.CallActivityAsync("ShipOrder", order);
    await context.CallActivityAsync("SendConfirmation", order);
    return "Order completed";
}`
        }]
      }
    ]
  },
  {
    id: 'storage',
    title: 'Azure Storage Solutions',
    icon: <BookBookmark size={20} weight="duotone" />,
    category: 'Storage',
    topics: [
      {
        id: 'cosmos-consistency',
        title: 'Cosmos DB - Consistency Levels',
        content: [
          '1. Strong: Linearizable reads (highest consistency, lowest availability)',
          '2. Bounded Staleness: Reads lag by K versions or T time',
          '3. Session: Consistent within user session (DEFAULT, most common)',
          '4. Consistent Prefix: Never see out-of-order writes',
          '5. Eventual: Lowest consistency, highest availability'
        ],
        keyPoints: [
          'Session is default and recommended for most apps',
          'Strong has highest latency and RU cost',
          'Choose based on consistency vs availability tradeoff',
          'Can override per request'
        ]
      },
      {
        id: 'cosmos-partition',
        title: 'Cosmos DB - Partition Keys',
        content: [
          'Critical: Determines data distribution and query performance',
          'Good key: High cardinality, even distribution, in most queries',
          'Bad: Boolean fields, timestamps (hot partitions)',
          'Good: UserID, TenantID, ProductCategory',
          'Synthetic keys: Combine fields (e.g., ${category}-${region})'
        ],
        keyPoints: [
          'Cannot change after container creation',
          'All queries without partition key are cross-partition',
          'Logical partition max: 20 GB',
          'Physical partition: 10,000 RU/s'
        ]
      },
      {
        id: 'cosmos-changefeed',
        title: 'Cosmos DB - Change Feed',
        content: [
          'React to document changes in real-time',
          'Use cases: Event-driven apps, cache invalidation, data sync',
          'Processing: Change feed processor, Azure Functions binding',
          'Guaranteed order within partition key'
        ],
        keyPoints: [
          'Only captures inserts and updates (not deletes)',
          'Lease container required',
          'Multiple consumers supported',
          'Can start from beginning or specific time'
        ],
        codeExamples: [{
          language: 'csharp',
          code: `var processor = container.GetChangeFeedProcessorBuilder<Order>("orderProcessor", HandleChangesAsync)
    .WithInstanceName("orderInstance1")
    .WithLeaseContainer(leaseContainer)
    .Build();
await processor.StartAsync();`
        }]
      },
      {
        id: 'blob-tiers',
        title: 'Blob Storage - Access Tiers',
        content: [
          'Hot: Frequently accessed (highest storage cost, lowest access cost)',
          'Cool: Infrequently accessed, 30-day minimum',
          'Cold: Rarely accessed, 90-day minimum',
          'Archive: Offline, hours to rehydrate, lowest cost'
        ],
        keyPoints: [
          'Can change tier at blob level',
          'Early deletion fees apply',
          'Archive requires rehydration before access',
          'Lifecycle management automates tier changes'
        ]
      },
      {
        id: 'blob-lifecycle',
        title: 'Blob Storage - Lifecycle Management',
        content: [
          'Automatically move blobs between tiers or delete',
          'Rules based on: last modified, created, accessed',
          'Actions: tierToCool, tierToArchive, delete',
          'Filters: blobTypes, prefixMatch, blobIndexMatch'
        ],
        keyPoints: [
          'Runs once per day',
          'Can save significant costs',
          'Applies to block blobs and append blobs',
          'Support for blob versions and snapshots'
        ],
        codeExamples: [{
          language: 'json',
          code: `{
  "rules": [{
    "name": "archiveOldLogs",
    "type": "Lifecycle",
    "definition": {
      "filters": { 
        "blobTypes": ["blockBlob"], 
        "prefixMatch": ["logs/"] 
      },
      "actions": {
        "baseBlob": {
          "tierToCool": { "daysAfterModificationGreaterThan": 30 },
          "tierToArchive": { "daysAfterModificationGreaterThan": 90 },
          "delete": { "daysAfterModificationGreaterThan": 365 }
        }
      }
    }
  }]
}`
        }]
      },
      {
        id: 'sas-tokens',
        title: 'Shared Access Signatures (SAS)',
        content: [
          'Service SAS: Specific service (Blob, File, Queue, Table)',
          'Account SAS: Multiple services',
          'User Delegation SAS: Azure AD credentials (recommended)',
          'Permissions: Read, Write, Delete, List, Add, Create, Update'
        ],
        keyPoints: [
          'Always use HTTPS',
          'Set expiration time',
          'Use user delegation SAS with Azure AD',
          'Can revoke with stored access policy'
        ],
        codeExamples: [{
          language: 'csharp',
          code: `var sasBuilder = new BlobSasBuilder {
    BlobContainerName = "images",
    BlobName = "photo.jpg",
    Resource = "b",
    StartsOn = DateTimeOffset.UtcNow,
    ExpiresOn = DateTimeOffset.UtcNow.AddHours(1)
};
sasBuilder.SetPermissions(BlobSasPermissions.Read);
var sasToken = sasBuilder.ToSasQueryParameters(credential).ToString();`
        }]
      }
    ]
  },
  {
    id: 'security',
    title: 'Azure Security',
    icon: <ShieldCheck size={20} weight="duotone" />,
    category: 'Security',
    topics: [
      {
        id: 'oauth-flows',
        title: 'OAuth 2.0 Flows',
        content: [
          'Authorization Code: Web apps (most secure, requires client secret)',
          'Client Credentials: Service-to-service (no user context)',
          'On-Behalf-Of: Middle tier calling downstream API',
          'Device Code: Devices without browser',
          'PKCE: SPAs and mobile apps (no client secret)'
        ],
        keyPoints: [
          'Never use Implicit flow (deprecated)',
          'Always use PKCE for public clients',
          'Client Credentials for daemon apps',
          'Tokens cached by MSAL'
        ]
      },
      {
        id: 'msal',
        title: 'MSAL (Microsoft Authentication Library)',
        content: [
          'AcquireTokenInteractive: Browser popup/redirect',
          'AcquireTokenSilent: From cache (preferred)',
          'AcquireTokenByClientCredential: Service-to-service',
          'Token cache: Stores access and refresh tokens'
        ],
        keyPoints: [
          'Always try silent first, fallback to interactive',
          'Handle MsalUiRequiredException',
          'Use scopes, not resources',
          'Available for .NET, JavaScript, Python, Java, iOS, Android'
        ],
        codeExamples: [{
          language: 'csharp',
          code: `var app = PublicClientApplicationBuilder.Create(clientId)
    .WithAuthority(AzureCloudInstance.AzurePublic, tenantId)
    .Build();

var result = await app.AcquireTokenInteractive(scopes)
    .WithPrompt(Prompt.SelectAccount)
    .ExecuteAsync();

var accessToken = result.AccessToken;`
        }]
      },
      {
        id: 'microsoft-graph',
        title: 'Microsoft Graph API',
        content: [
          'Unified API for Microsoft 365, Azure AD, security',
          'Endpoints: /me, /users, /groups, /mail, /calendar, /drive, /teams',
          'Permissions: Delegated (user context), Application (daemon)',
          'Use $select, $filter, $expand, $orderby for queries'
        ],
        keyPoints: [
          'Rate limits apply',
          'Use delta query for changes',
          'Batch requests for efficiency',
          'SDK available for multiple languages'
        ],
        codeExamples: [{
          language: 'csharp',
          code: `var graphClient = new GraphServiceClient(
    new DelegateAuthenticationProvider(async (request) => {
        request.Headers.Authorization = 
            new AuthenticationHeaderValue("Bearer", accessToken);
    }));
    
var user = await graphClient.Me.Request().GetAsync();
var messages = await graphClient.Me.Messages
    .Request()
    .Top(10)
    .GetAsync();`
        }]
      },
      {
        id: 'key-vault',
        title: 'Azure Key Vault',
        content: [
          'Secrets: Connection strings, API keys, passwords',
          'Keys: Encryption keys (RSA, EC), signing keys',
          'Certificates: SSL/TLS, automatic renewal',
          'Access: Access policies (legacy) or RBAC (recommended)'
        ],
        keyPoints: [
          'Soft delete enabled by default',
          'Purge protection for production',
          'Use managed identity for authentication',
          'Versioning for secrets/keys'
        ],
        codeExamples: [{
          language: 'csharp',
          code: `var client = new SecretClient(
    new Uri("https://myvault.vault.azure.net/"), 
    new DefaultAzureCredential());

await client.SetSecretAsync("ConnectionString", "Server=...");
var secret = await client.GetSecretAsync("ConnectionString");
var value = secret.Value.Value;`
        }]
      },
      {
        id: 'managed-identity',
        title: 'Managed Identity',
        content: [
          'System-Assigned: Tied to resource, deleted with resource',
          'User-Assigned: Independent, can be shared across resources',
          'No credentials in code, Azure handles tokens',
          'Supported: App Service, Functions, VMs, Container Instances, AKS'
        ],
        keyPoints: [
          'DefaultAzureCredential tries multiple auth methods',
          'Works locally with Azure CLI or Visual Studio',
          'Assign RBAC roles to managed identity',
          'No secret rotation needed'
        ],
        codeExamples: [{
          language: 'csharp',
          code: `var credential = new DefaultAzureCredential();
var blobClient = new BlobServiceClient(
    new Uri("https://storage.blob.core.windows.net"), 
    credential);`
        }]
      }
    ]
  },
  {
    id: 'monitoring',
    title: 'Monitoring & Optimization',
    icon: <ChartBar size={20} weight="duotone" />,
    category: 'Monitoring',
    topics: [
      {
        id: 'app-insights',
        title: 'Application Insights - Telemetry',
        content: [
          'Requests: HTTP requests, duration, response codes',
          'Dependencies: External calls (SQL, HTTP, Redis)',
          'Exceptions: Unhandled and custom exceptions',
          'Events: Custom application events',
          'Traces: Diagnostic logs',
          'Metrics: Performance counters, custom metrics'
        ],
        keyPoints: [
          'Automatic instrumentation for ASP.NET',
          'Manual tracking with SDK',
          'Live metrics for real-time monitoring',
          'Smart detection for anomalies'
        ],
        codeExamples: [{
          language: 'csharp',
          code: `var telemetry = new TelemetryClient();
telemetry.TrackEvent("OrderPlaced", 
    new Dictionary<string, string> { ["OrderId"] = orderId });
telemetry.TrackMetric("QueueLength", queueLength);
telemetry.TrackException(ex);
telemetry.TrackDependency("SQL", "GetCustomer", startTime, duration, success);`
        }]
      },
      {
        id: 'kql',
        title: 'KQL (Kusto Query Language)',
        content: [
          'Basic: requests | where timestamp > ago(1h)',
          'Aggregation: requests | summarize count() by resultCode',
          'Performance: requests | where duration > 1000 | top 10 by duration',
          'Join: requests | join (dependencies) on operation_Id'
        ],
        keyPoints: [
          'Pipe operator | chains commands',
          'ago() for relative time',
          'summarize for aggregations',
          'project to select columns'
        ]
      },
      {
        id: 'redis-cache',
        title: 'Azure Cache for Redis',
        content: [
          'Cache-Aside: App checks cache, loads from DB on miss',
          'Write-Through: App writes to cache, cache writes to DB',
          'Write-Behind: Async write to DB',
          'SKUs: Basic (no SLA), Standard (replication), Premium (clustering)'
        ],
        keyPoints: [
          'Data types: String, Hash, List, Set, Sorted Set',
          'Eviction policies: allkeys-lru, volatile-ttl, noeviction',
          'Set expiration with TTL',
          'Premium supports persistence and clustering'
        ],
        codeExamples: [{
          language: 'csharp',
          code: `var redis = ConnectionMultiplexer.Connect(
    "mycache.redis.cache.windows.net:6380,password=...,ssl=True");
var db = redis.GetDatabase();

await db.StringSetAsync("user:123", 
    JsonSerializer.Serialize(user), 
    TimeSpan.FromMinutes(30));
    
var cached = await db.StringGetAsync("user:123");`
        }]
      }
    ]
  },
  {
    id: 'integration',
    title: 'Integration Services',
    icon: <PlugsConnected size={20} weight="duotone" />,
    category: 'Integration',
    topics: [
      {
        id: 'apim-policies',
        title: 'API Management - Policies',
        content: [
          'Inbound: Before forwarding to backend (auth, rate limit, transform)',
          'Backend: Modify request to backend',
          'Outbound: Process response before returning',
          'On-Error: Handle errors'
        ],
        keyPoints: [
          'XML-based policy definitions',
          'Policy expressions use C#',
          'Can access context object',
          'Policies applied in order'
        ],
        codeExamples: [{
          language: 'xml',
          code: `<policies>
  <inbound>
    <rate-limit calls="100" renewal-period="60" />
    <set-header name="X-Custom" exists-action="override">
      <value>@(context.Request.Headers.GetValueOrDefault("Authorization",""))</value>
    </set-header>
  </inbound>
  <outbound>
    <cache-store duration="60" />
  </outbound>
</policies>`
        }]
      },
      {
        id: 'event-grid',
        title: 'Azure Event Grid',
        content: [
          'Event Sources: Azure resources, custom applications',
          'Topics: System topics (Azure resources), Custom topics',
          'Event Subscriptions: Route events to handlers',
          'Handlers: Functions, Logic Apps, Webhooks, Event Hubs'
        ],
        keyPoints: [
          'Push-based (not polling)',
          'At-least-once delivery',
          'Advanced filtering on event data',
          'CloudEvents schema support'
        ]
      },
      {
        id: 'service-bus',
        title: 'Azure Service Bus',
        content: [
          'Queues: Point-to-point, FIFO, single consumer',
          'Topics: Publish-subscribe, multiple subscriptions',
          'Sessions: Guarantee FIFO, message correlation',
          'Dead-Letter Queue: Failed messages'
        ],
        keyPoints: [
          'Transactions across multiple entities',
          'Duplicate detection',
          'Message TTL and scheduled delivery',
          'Premium: VNet, larger messages, geo-DR'
        ],
        codeExamples: [{
          language: 'csharp',
          code: `var client = new ServiceBusClient(connectionString);
var sender = client.CreateSender("orders");
await sender.SendMessageAsync(new ServiceBusMessage("Order data") {
    SessionId = "session1",
    TimeToLive = TimeSpan.FromHours(1)
});

var processor = client.CreateProcessor("orders");
processor.ProcessMessageAsync += async args => {
    await ProcessOrder(args.Message.Body.ToString());
    await args.CompleteMessageAsync(args.Message);
};
await processor.StartProcessingAsync();`
        }]
      },
      {
        id: 'event-hubs',
        title: 'Azure Event Hubs',
        content: [
          'Purpose: Massive event ingestion (millions/sec)',
          'Partitions: Parallel processing, ordered within partition',
          'Consumer Groups: Multiple independent consumers',
          'Checkpointing: Track processing progress'
        ],
        keyPoints: [
          'Use for: Telemetry, log aggregation, real-time analytics',
          'Capture to Blob/Data Lake',
          'Kafka protocol compatible',
          'Partition key for ordering'
        ]
      },
      {
        id: 'messaging-comparison',
        title: 'Event Grid vs Event Hubs vs Service Bus',
        content: [
          'Event Grid: Reactive programming, discrete events, many publishers/subscribers',
          'Event Hubs: Big data streaming, telemetry, high throughput',
          'Service Bus: Enterprise messaging, transactions, guaranteed delivery',
          'Storage Queues: Simple, large queues, cheap'
        ],
        keyPoints: [
          'Event Grid: React to state changes',
          'Event Hubs: Stream processing',
          'Service Bus: Command/message patterns',
          'Can combine services'
        ]
      }
    ]
  }
]

export function CheatSheetsView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredSections = CHEATSHEET_DATA.filter(section => {
    if (activeCategory !== 'all' && section.category !== activeCategory) return false
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return section.title.toLowerCase().includes(query) ||
        section.topics.some(topic => 
          topic.title.toLowerCase().includes(query) ||
          topic.content.some(c => c.toLowerCase().includes(query))
        )
    }
    
    return true
  })

  const categories = ['all', ...Array.from(new Set(CHEATSHEET_DATA.map(s => s.category)))]

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary rounded-lg">
              <BookBookmark size={24} weight="duotone" className="text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">AZ-204 Cheat Sheets</CardTitle>
              <CardDescription>Comprehensive reference for all exam topics</CardDescription>
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
            {categories.map(cat => (
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
        {filteredSections.map(section => (
          <Card key={section.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg">
                  {section.icon}
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {section.title}
                    <Badge variant="secondary">{section.topics.length} topics</Badge>
                  </CardTitle>
                  <CardDescription>Domain: {section.category}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="multiple" className="w-full">
                {section.topics.map(topic => (
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
