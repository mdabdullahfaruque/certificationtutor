import { Topic } from './types'

export const COMPREHENSIVE_TOPICS: Topic[] = [
  {
    id: 'azure-functions-basics',
    title: 'Azure Functions Fundamentals',
    domain: 'develop-compute',
    description: 'Master serverless compute with Azure Functions including triggers, bindings, and hosting plans',
    completed: false,
    difficulty: 2,
    estimatedTime: 45,
    cards: [
      {
        id: 'af-1',
        front: 'What is Azure Functions?',
        back: 'Azure Functions is a serverless compute service that lets you run event-triggered code without having to explicitly provision or manage infrastructure. It supports multiple languages and scales automatically.',
        tags: ['basics', 'serverless']
      },
      {
        id: 'af-2',
        front: 'What are the main Azure Functions trigger types?',
        back: 'HTTP Trigger, Timer Trigger, Blob Trigger, Queue Trigger, Event Hub Trigger, Event Grid Trigger, Cosmos DB Trigger, Service Bus Trigger. Each trigger has specific use cases and configuration options.',
        tags: ['triggers']
      },
      {
        id: 'af-3',
        front: 'What is Durable Functions and what patterns does it support?',
        back: 'Durable Functions is an extension that lets you write stateful functions in a serverless environment. It supports patterns: Function Chaining, Fan-out/Fan-in, Async HTTP APIs, Monitoring, and Human Interaction.',
        code: `const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
  const x = yield context.df.callActivity("F1");
  const y = yield context.df.callActivity("F2", x);
  return yield context.df.callActivity("F3", y);
});`,
        tags: ['durable', 'orchestration']
      },
      {
        id: 'af-4',
        front: 'What are the Azure Functions hosting plans and their differences?',
        back: 'Consumption Plan (pay-per-execution, auto-scale, 5min timeout), Premium Plan (pre-warmed instances, VNet, unlimited duration), Dedicated Plan (App Service, predictable pricing, always-on).',
        tags: ['hosting', 'plans']
      },
      {
        id: 'af-5',
        front: 'How do you configure function app settings and secrets?',
        back: 'Use Application Settings in Azure Portal, or local.settings.json for local development. For secrets, use Key Vault references: @Microsoft.KeyVault(SecretUri=https://myvault.vault.azure.net/secrets/mysecret/)',
        code: `{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "MySecret": "@Microsoft.KeyVault(SecretUri=...)"
  }
}`,
        tags: ['configuration', 'security']
      },
      {
        id: 'af-6',
        front: 'What is the difference between function bindings (input vs output)?',
        back: 'Input bindings provide data to the function (read). Output bindings send data from the function (write). Bindings are declared in function.json or via attributes/decorators, simplifying data access without boilerplate code.',
        tags: ['bindings']
      }
    ]
  },
  {
    id: 'app-service-deployment',
    title: 'Azure App Service & Deployment',
    domain: 'develop-compute',
    description: 'Deploy and configure web apps using App Service, deployment slots, and scaling',
    completed: false,
    difficulty: 2,
    estimatedTime: 50,
    cards: [
      {
        id: 'as-1',
        front: 'What is Azure App Service and what application types does it support?',
        back: 'Azure App Service is a fully managed platform for building, deploying, and scaling web apps. Supports: Web Apps, API Apps, Mobile Apps, Function Apps. Languages: .NET, Java, Node.js, Python, PHP, Ruby.',
        tags: ['basics', 'app-service']
      },
      {
        id: 'as-2',
        front: 'What are deployment slots and their benefits?',
        back: 'Deployment slots are live apps with their own hostnames. Benefits: zero-downtime deployments, test in production, instant rollback, warm-up before swap, traffic routing for A/B testing. Only available in Standard tier+.',
        tags: ['deployment', 'slots']
      },
      {
        id: 'as-3',
        front: 'How do you perform a slot swap and what gets swapped vs not swapped?',
        back: 'Swapped: app content, configurations, connection strings (if slot-specific). NOT swapped: Publishing endpoints, custom domain names, SSL certificates, scale settings, WebJobs schedulers, IP restrictions.',
        code: `az webapp deployment slot swap \\
  --resource-group myRG \\
  --name myapp \\
  --slot staging \\
  --target-slot production`,
        tags: ['deployment', 'swap']
      },
      {
        id: 'as-4',
        front: 'What are App Service Plans and their pricing tiers?',
        back: 'App Service Plan defines compute resources. Tiers: Free/Shared (shared infrastructure), Basic (dedicated, no auto-scale), Standard (auto-scale, slots, backups), Premium (enhanced performance), Isolated (dedicated network, max scale).',
        tags: ['plans', 'pricing']
      },
      {
        id: 'as-5',
        front: 'How do you configure autoscaling in App Service?',
        back: 'Standard tier+. Scale based on: metrics (CPU, memory, HTTP queue, custom), schedule. Configure: minimum/maximum instances, scale-out/scale-in rules, cooldown period. Use Azure Monitor for advanced scenarios.',
        code: `az monitor autoscale create \\
  --resource-group myRG \\
  --resource myapp \\
  --resource-type Microsoft.Web/serverfarms \\
  --min-count 2 \\
  --max-count 10 \\
  --count 2`,
        tags: ['scaling', 'autoscale']
      },
      {
        id: 'as-6',
        front: 'What deployment methods are available for App Service?',
        back: 'Git (local, GitHub, Bitbucket, Azure Repos), ZIP deploy, FTP, Azure CLI (az webapp up), Visual Studio, VS Code, Docker container, ARM templates, Azure DevOps/GitHub Actions CI/CD.',
        tags: ['deployment', 'methods']
      },
      {
        id: 'as-7',
        front: 'How do you enable and configure diagnostic logging?',
        back: 'Application Logging (Windows: filesystem/blob, Linux: filesystem only), Web Server Logging, Detailed Error Messages, Failed Request Tracing. Stream logs in real-time or download. Send to Log Analytics, Storage, Event Hubs.',
        code: `az webapp log config \\
  --name myapp \\
  --resource-group myRG \\
  --application-logging filesystem \\
  --level information`,
        tags: ['logging', 'diagnostics']
      }
    ]
  },
  {
    id: 'container-solutions',
    title: 'Container Solutions (ACI, ACA, ACR)',
    domain: 'develop-compute',
    description: 'Work with Azure Container Instances, Container Apps, and Container Registry',
    completed: false,
    difficulty: 2,
    estimatedTime: 55,
    cards: [
      {
        id: 'cont-1',
        front: 'What is Azure Container Instances (ACI) and when should you use it?',
        back: 'ACI offers fastest way to run containers without managing VMs. Use for: simple applications, task automation, build jobs, CI/CD, batch processing. Not for: complex orchestration (use AKS/ACA instead).',
        tags: ['aci', 'containers']
      },
      {
        id: 'cont-2',
        front: 'What is Azure Container Apps and how does it differ from ACI?',
        back: 'ACA is a serverless container platform with built-in: auto-scaling (0 to many), traffic splitting, versioning, Dapr integration, managed certificates. Better for microservices. ACI is simpler, single container focused.',
        tags: ['aca', 'containers']
      },
      {
        id: 'cont-3',
        front: 'How do you deploy a container to ACI using Azure CLI?',
        back: 'Use az container create with required parameters: resource group, name, image, CPU/memory, ports, environment variables, restart policy.',
        code: `az container create \\
  --resource-group myRG \\
  --name mycontainer \\
  --image mcr.microsoft.com/azuredocs/aci-helloworld \\
  --cpu 1 --memory 1 \\
  --ports 80 \\
  --environment-variables 'KEY'='value' \\
  --restart-policy OnFailure`,
        tags: ['aci', 'deployment']
      },
      {
        id: 'cont-4',
        front: 'What is Azure Container Registry (ACR) and its key features?',
        back: 'ACR is a managed Docker registry service. Features: geo-replication, webhooks, task scheduling, image scanning, RBAC integration, content trust, private link, tiered service levels (Basic, Standard, Premium).',
        tags: ['acr', 'registry']
      },
      {
        id: 'cont-5',
        front: 'How do you build and push images to ACR?',
        back: 'Build directly in ACR using ACR Tasks (no local Docker needed), or build locally and push. ACR Tasks supports automated builds on source code commits.',
        code: `# Build in ACR
az acr build --registry myregistry --image myapp:v1 .

# Or build locally and push
docker build -t myapp:v1 .
docker tag myapp:v1 myregistry.azurecr.io/myapp:v1
az acr login --name myregistry
docker push myregistry.azurecr.io/myapp:v1`,
        tags: ['acr', 'docker']
      },
      {
        id: 'cont-6',
        front: 'How do ACI and ACA authenticate with ACR?',
        back: 'Methods: 1) Managed Identity (recommended), 2) Service Principal, 3) Admin account (not recommended for production). Use --assign-identity and --acr-identity for managed identity authentication.',
        code: `az container create \\
  --resource-group myRG \\
  --name mycontainer \\
  --image myregistry.azurecr.io/myapp:v1 \\
  --assign-identity \\
  --acr-identity [system]`,
        tags: ['authentication', 'acr']
      }
    ]
  },
  {
    id: 'cosmos-db-essentials',
    title: 'Cosmos DB Essentials',
    domain: 'develop-storage',
    description: 'Master Azure Cosmos DB partitioning, consistency levels, and operations',
    completed: false,
    difficulty: 3,
    estimatedTime: 60,
    cards: [
      {
        id: 'cos-1',
        front: 'What is Azure Cosmos DB and what are its key features?',
        back: 'Globally distributed, multi-model NoSQL database. Features: turnkey global distribution, elastic scale, single-digit ms latency, 5 consistency models, comprehensive SLAs, multiple APIs (SQL, MongoDB, Cassandra, Gremlin, Table).',
        tags: ['basics', 'cosmos']
      },
      {
        id: 'cos-2',
        front: 'What is a partition key and why is it critical?',
        back: 'Partition key routes data to logical partitions for horizontal scaling. Choose a property with: high cardinality, even distribution, common in queries. Bad choice causes hot partitions. Cannot be changed after creation.',
        code: `{
  "id": "user123",
  "userId": "user123",  // Good partition key: high cardinality
  "email": "user@example.com",
  "country": "US"  // Bad: low cardinality (hot partitions)
}`,
        tags: ['partitioning', 'performance']
      },
      {
        id: 'cos-3',
        front: 'What are the 5 Cosmos DB consistency levels and their trade-offs?',
        back: 'Strong (linearizable, highest latency), Bounded Staleness (configurable lag), Session (default, read your own writes), Consistent Prefix (ordered), Eventual (lowest latency, highest availability). Higher consistency = higher latency + lower availability.',
        tags: ['consistency']
      },
      {
        id: 'cos-4',
        front: 'How do you optimize RU (Request Unit) consumption?',
        back: 'Strategies: choose right partition key, index only necessary properties, use appropriate consistency level, avoid cross-partition queries, batch operations, cache data, use direct mode connectivity, optimize document size.',
        code: `const { resources } = await container.items
  .query({
    query: "SELECT * FROM c WHERE c.userId = @userId",
    parameters: [{ name: "@userId", value: "user123" }]
  })
  .fetchAll(); // Single-partition query: low RU cost`,
        tags: ['optimization', 'ru']
      },
      {
        id: 'cos-5',
        front: 'What is the Cosmos DB Change Feed and its use cases?',
        back: 'Persistent log of changes to container in order they occur. Use cases: event-driven architectures, real-time analytics, data synchronization, audit trails, materialized views. Processed using: Azure Functions, Change Feed Processor SDK.',
        code: `const changeFeedIterator = container.items.readChangeFeed({
  startTime: new Date()
});

while (changeFeedIterator.hasMoreResults) {
  const response = await changeFeedIterator.readNext();
  // Process changed documents
}`,
        tags: ['change-feed', 'streaming']
      },
      {
        id: 'cos-6',
        front: 'How do you implement stored procedures in Cosmos DB?',
        back: 'Written in JavaScript, execute server-side within database transaction. Benefits: atomic operations, reduced network roundtrips, business logic close to data. Limited to single partition.',
        code: `function createDocument(doc) {
  const context = getContext();
  const collection = context.getCollection();
  const link = collection.getSelfLink();
  
  collection.createDocument(link, doc, 
    function(err, created) {
      if (err) throw err;
      context.getResponse().setBody(created);
    }
  );
}`,
        tags: ['stored-procedures', 'server-side']
      },
      {
        id: 'cos-7',
        front: 'What indexing policies are available and how do they affect performance?',
        back: 'Automatic indexing by default. Policies: include/exclude paths, index types (range, spatial, composite). Trade-off: more indexing = faster queries but slower writes + higher RU cost. Exclude large properties not used in queries.',
        code: `{
  "indexingMode": "consistent",
  "automatic": true,
  "includedPaths": [{"path": "/*"}],
  "excludedPaths": [
    {"path": "/largeText/*"},
    {"path": "/_etag/?"}
  ]
}`,
        tags: ['indexing', 'performance']
      },
      {
        id: 'cos-8',
        front: 'How do you handle conflicts in multi-region Cosmos DB?',
        back: 'Conflict resolution policies: Last Write Wins (LWW) using _ts or custom path, Custom (stored procedure), Manual (conflict feed). Configure per container. Multi-master writes enable low-latency writes from any region.',
        tags: ['conflicts', 'multi-region']
      }
    ]
  }
]
