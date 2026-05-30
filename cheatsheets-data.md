# AZ-204 Comprehensive Cheat Sheets Database

## Azure Compute - Container Solutions

### Azure Container Instances (ACI)
- **Purpose**: Run containers without managing servers
- **Key Commands**:
  ```bash
  az container create --resource-group myRG --name mycontainer --image nginx --dns-name-label myapp --ports 80
  ```
- **When to Use**: Simple containerized workloads, burst scenarios, dev/test
- **Pricing Model**: Per second billing for CPU and memory
- **Limitations**: No built-in load balancing, limited scaling options
- **Networking**: Can use VNet integration, public IP, or private IP

### Azure Container Apps
- **Purpose**: Serverless container platform with auto-scaling
- **Key Features**: Built-in load balancing, HTTPS ingress, Dapr integration, auto-scaling to zero
- **Scaling**: KEDA-based (HTTP, CPU, memory, custom metrics)
- **Revisions**: Traffic splitting between versions (A/B testing, blue-green)
- **When to Use**: Microservices, API endpoints, event-driven apps, background jobs
- **Code Example**:
  ```bash
  az containerapp create --name myapp --resource-group myRG --environment myenv --image myimage:latest --target-port 80 --ingress external
  ```

### Azure Container Registry (ACR)
- **SKUs**: Basic (dev/test), Standard (production), Premium (geo-replication, private link)
- **Authentication**: Admin user, service principal, managed identity, Azure AD token
- **Key Commands**:
  ```bash
  az acr create --name myregistry --resource-group myRG --sku Premium
  az acr login --name myregistry
  docker tag myimage myregistry.azurecr.io/myimage:v1
  docker push myregistry.azurecr.io/myimage:v1
  ```
- **Features**: Vulnerability scanning, content trust, geo-replication, webhooks
- **Tasks**: Automated builds on commit (ACR Tasks)

---

## Azure Compute - App Service

### App Service Plans
- **Tiers**: Free/Shared (shared compute), Basic (dedicated, no auto-scale), Standard (auto-scale, slots), Premium (enhanced performance), Isolated (dedicated network)
- **Scaling**: Scale up (change tier), Scale out (add instances)
- **Auto-scale Rules**: Schedule-based, metric-based (CPU, memory, HTTP queue, custom)
- **Key Point**: All apps in same plan share compute resources

### Deployment Slots
- **Purpose**: Zero-downtime deployments, testing in production
- **Slot Settings**: Sticky (stay with slot) vs Swappable
- **Swap Process**: Warms up target slot before swap, validates, then swaps
- **Common Slots**: Production, Staging, UAT
- **Code Example**:
  ```bash
  az webapp deployment slot create --name myapp --resource-group myRG --slot staging
  az webapp deployment slot swap --name myapp --resource-group myRG --slot staging --target-slot production
  ```

### App Service Security
- **Authentication**: Built-in auth with Azure AD, Google, Facebook, Twitter
- **Managed Identity**: System-assigned (tied to app lifecycle), User-assigned (independent)
- **Custom Domains**: Add custom domain, bind SSL/TLS certificate
- **TLS/SSL**: Managed certificate (free), upload certificate, import from Key Vault
- **IP Restrictions**: Whitelist/blacklist by IP or subnet
- **Code Example**:
  ```csharp
  var credential = new DefaultAzureCredential();
  var client = new SecretClient(new Uri("https://myvault.vault.azure.net/"), credential);
  ```

### App Service Configuration
- **App Settings**: Environment variables, connection strings
- **Diagnostic Logging**: Application logging, web server logging, detailed error messages, failed request tracing
- **Log Levels**: Verbose, Information, Warning, Error, Critical
- **Log Destinations**: File system (temporary), Blob storage (long-term), Azure Monitor

---

## Azure Compute - Functions

### Function Triggers
- **HTTP**: REST APIs, webhooks (authorization levels: anonymous, function, admin)
- **Timer**: CRON expressions (`0 */5 * * * *` = every 5 minutes)
- **Blob**: Fires when blob added/updated in container
- **Queue**: Processes messages from Storage Queue or Service Bus
- **Event Grid**: Reacts to Azure events
- **Event Hub**: Stream processing
- **Cosmos DB**: Change feed processing

### Function Bindings
- **Input Bindings**: Read data (Blob, Table, Cosmos DB, HTTP)
- **Output Bindings**: Write data (Blob, Queue, Table, Cosmos DB, Event Hub)
- **Code Example**:
  ```csharp
  [FunctionName("ProcessOrder")]
  public static async Task Run(
      [QueueTrigger("orders")] string orderMessage,
      [Blob("receipts/{rand-guid}.txt")] TextWriter receipt,
      [CosmosDB("store", "orders", ConnectionStringSetting = "CosmosDb")] IAsyncCollector<Order> orders)
  {
      var order = JsonSerializer.Deserialize<Order>(orderMessage);
      await orders.AddAsync(order);
      await receipt.WriteLineAsync($"Order {order.Id} processed");
  }
  ```

### Durable Functions
- **Patterns**: Function chaining, fan-out/fan-in, async HTTP APIs, monitoring, human interaction
- **Orchestrator**: Coordinates execution, must be deterministic
- **Activity Functions**: Do the actual work
- **Client Functions**: Start orchestrations
- **Code Example**:
  ```csharp
  [FunctionName("OrderWorkflow")]
  public static async Task<string> Run([OrchestrationTrigger] IDurableOrchestrationContext context)
  {
      var order = context.GetInput<Order>();
      await context.CallActivityAsync("ProcessPayment", order);
      await context.CallActivityAsync("ShipOrder", order);
      await context.CallActivityAsync("SendConfirmation", order);
      return "Order completed";
  }
  ```

### Function Hosting Plans
- **Consumption**: Pay per execution, auto-scale, 5-minute timeout (default)
- **Premium**: Pre-warmed instances, VNet connectivity, unlimited duration
- **Dedicated**: Run on App Service plan, predictable pricing
- **Key Differences**: Cold start, scaling, pricing, VNet support

---

## Azure Storage - Cosmos DB

### Consistency Levels
1. **Strong**: Linearizable reads, highest consistency, lowest availability
2. **Bounded Staleness**: Reads lag by K versions or T time
3. **Session**: Consistent within user session (default, most common)
4. **Consistent Prefix**: Reads never see out-of-order writes
5. **Eventual**: Lowest consistency, highest availability

### Partition Keys
- **Critical**: Determines data distribution and query performance
- **Good Partition Key**: High cardinality, even distribution, appears in most queries
- **Bad Examples**: Boolean fields, timestamps (creates hot partitions)
- **Good Examples**: UserID, TenantID, ProductCategory
- **Synthetic Keys**: Combine fields (e.g., `${category}-${region}`)

### Change Feed
- **Purpose**: React to document changes in real-time
- **Use Cases**: Event-driven architectures, cache invalidation, data synchronization
- **Processing**: Change feed processor, Azure Functions binding
- **Code Example**:
  ```csharp
  var processor = container.GetChangeFeedProcessorBuilder<Order>("orderProcessor", HandleChangesAsync)
      .WithInstanceName("orderInstance1")
      .WithLeaseContainer(leaseContainer)
      .Build();
  await processor.StartAsync();
  ```

### Cosmos DB Operations
- **SDK Operations**: Create, Read, Update, Delete (CRUD), Query
- **Stored Procedures**: Server-side JavaScript, ACID transactions
- **Triggers**: Pre-triggers (before operation), Post-triggers (after operation)
- **UDFs**: User-defined functions for queries
- **Code Example**:
  ```csharp
  var container = cosmosClient.GetContainer("store", "products");
  var response = await container.CreateItemAsync(product, new PartitionKey(product.Category));
  var query = container.GetItemQueryIterator<Product>("SELECT * FROM c WHERE c.price < 100");
  ```

### Cosmos DB SQL Queries
- **Basic**: `SELECT * FROM c WHERE c.category = 'Electronics'`
- **Joins**: `SELECT p.name, t.tagName FROM products p JOIN t IN p.tags`
- **Aggregates**: `SELECT COUNT(1) FROM c WHERE c.inStock = true`
- **Cross-partition**: Queries without partition key are expensive

---

## Azure Storage - Blob Storage

### Blob Types
- **Block Blobs**: Text and binary files, up to 190.7 TB
- **Append Blobs**: Optimized for append operations (logs)
- **Page Blobs**: Random access, VHD files, up to 8 TB

### Access Tiers
- **Hot**: Frequently accessed, highest storage cost, lowest access cost
- **Cool**: Infrequently accessed, 30-day minimum, lower storage cost
- **Cold**: Rarely accessed, 90-day minimum
- **Archive**: Offline, lowest cost, hours to rehydrate

### Lifecycle Management
- **Rules**: Automatically move blobs between tiers or delete
- **Example Policy**:
  ```json
  {
    "rules": [{
      "name": "archiveOldLogs",
      "type": "Lifecycle",
      "definition": {
        "filters": { "blobTypes": ["blockBlob"], "prefixMatch": ["logs/"] },
        "actions": {
          "baseBlob": {
            "tierToCool": { "daysAfterModificationGreaterThan": 30 },
            "tierToArchive": { "daysAfterModificationGreaterThan": 90 },
            "delete": { "daysAfterModificationGreaterThan": 365 }
          }
        }
      }
    }]
  }
  ```

### SAS Tokens
- **Types**: Service SAS (specific service), Account SAS (multiple services), User delegation SAS (Azure AD)
- **Permissions**: Read, Write, Delete, List, Add, Create, Update, Process
- **Best Practice**: Use user delegation SAS with Azure AD
- **Code Example**:
  ```csharp
  var sasBuilder = new BlobSasBuilder {
      BlobContainerName = "images",
      BlobName = "photo.jpg",
      Resource = "b",
      StartsOn = DateTimeOffset.UtcNow,
      ExpiresOn = DateTimeOffset.UtcNow.AddHours(1)
  };
  sasBuilder.SetPermissions(BlobSasPermissions.Read);
  var sasToken = sasBuilder.ToSasQueryParameters(credential).ToString();
  ```

### Blob Operations
- **SDK Methods**: UploadAsync, DownloadAsync, DeleteAsync, ExistsAsync
- **Properties**: Content type, cache control, content encoding
- **Metadata**: Custom key-value pairs
- **Code Example**:
  ```csharp
  var blobClient = new BlobClient(connectionString, "container", "file.txt");
  await blobClient.UploadAsync(stream, new BlobHttpHeaders { ContentType = "text/plain" });
  await blobClient.SetMetadataAsync(new Dictionary<string, string> { ["author"] = "John" });
  var properties = await blobClient.GetPropertiesAsync();
  ```

---

## Security - Microsoft Identity Platform

### OAuth 2.0 Flows
- **Authorization Code**: Web apps, most secure, requires client secret
- **Implicit**: SPAs (deprecated, use PKCE instead)
- **Client Credentials**: Service-to-service, no user context
- **On-Behalf-Of**: Middle tier calling downstream API
- **Device Code**: Devices without browser

### MSAL (Microsoft Authentication Library)
- **Acquire Token**: Interactive (browser popup/redirect), Silent (from cache), Client credentials
- **Token Cache**: Stores access tokens and refresh tokens
- **Code Example**:
  ```csharp
  var app = PublicClientApplicationBuilder.Create(clientId)
      .WithAuthority(AzureCloudInstance.AzurePublic, tenantId)
      .Build();
  
  var result = await app.AcquireTokenInteractive(scopes)
      .WithPrompt(Prompt.SelectAccount)
      .ExecuteAsync();
  
  var accessToken = result.AccessToken;
  ```

### Microsoft Graph
- **Purpose**: Unified API for Microsoft 365, Azure AD, security
- **Endpoints**: Users, groups, mail, calendar, files, teams
- **Permissions**: Delegated (user context), Application (daemon apps)
- **Code Example**:
  ```csharp
  var graphClient = new GraphServiceClient(new DelegateAuthenticationProvider(async (request) => {
      request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
  }));
  var user = await graphClient.Me.Request().GetAsync();
  var messages = await graphClient.Me.Messages.Request().Top(10).GetAsync();
  ```

---

## Security - Key Vault & Managed Identity

### Key Vault Operations
- **Secrets**: Connection strings, API keys, passwords
- **Keys**: Encryption keys, signing keys (RSA, EC)
- **Certificates**: SSL/TLS certificates, automatic renewal
- **Access Policies vs RBAC**: Access policies (legacy), RBAC (recommended)
- **Code Example**:
  ```csharp
  var client = new SecretClient(new Uri("https://myvault.vault.azure.net/"), new DefaultAzureCredential());
  await client.SetSecretAsync("ConnectionString", "Server=...");
  var secret = await client.GetSecretAsync("ConnectionString");
  var value = secret.Value.Value;
  ```

### Managed Identity
- **System-Assigned**: Tied to resource lifecycle, deleted with resource
- **User-Assigned**: Independent lifecycle, can be shared across resources
- **Authentication**: No credentials in code, Azure handles tokens
- **Supported Services**: App Service, Functions, VMs, Container Instances, AKS
- **Code Example**:
  ```csharp
  var credential = new DefaultAzureCredential();
  var blobClient = new BlobServiceClient(new Uri("https://storage.blob.core.windows.net"), credential);
  ```

### Azure RBAC
- **Built-in Roles**: Owner, Contributor, Reader, specific service roles
- **Custom Roles**: Define precise permissions with JSON
- **Scope**: Management group, subscription, resource group, resource
- **Assignment**: Identity + Role + Scope
- **Common Roles**: Key Vault Secrets User, Storage Blob Data Contributor, Cosmos DB Account Reader

---

## Monitoring - Application Insights

### Telemetry Types
- **Requests**: HTTP requests, duration, response codes
- **Dependencies**: External calls (SQL, HTTP, Redis)
- **Exceptions**: Unhandled and custom exceptions
- **Events**: Custom application events
- **Traces**: Diagnostic logs
- **Metrics**: Performance counters, custom metrics

### KQL Queries
- **Basic**: `requests | where timestamp > ago(1h)`
- **Aggregation**: `requests | summarize count() by resultCode`
- **Performance**: `requests | where duration > 1000 | top 10 by duration`
- **Exceptions**: `exceptions | where timestamp > ago(24h) | summarize count() by type`
- **Custom**: `customEvents | where name == "OrderPlaced" | project timestamp, customDimensions`

### Application Insights SDK
- **Code Example**:
  ```csharp
  var telemetry = new TelemetryClient();
  telemetry.TrackEvent("OrderPlaced", new Dictionary<string, string> { ["OrderId"] = orderId });
  telemetry.TrackMetric("QueueLength", queueLength);
  telemetry.TrackException(ex);
  telemetry.TrackDependency("SQL", "GetCustomer", startTime, duration, success);
  ```

### Distributed Tracing
- **Purpose**: Track requests across multiple services
- **Application Map**: Visualizes service dependencies
- **Operation ID**: Correlates related telemetry
- **Configuration**: Automatic for HTTP, manual for messaging

---

## Monitoring - Azure Cache for Redis

### Cache Patterns
- **Cache-Aside**: App checks cache, loads from DB on miss, writes to cache
- **Write-Through**: App writes to cache, cache writes to DB
- **Write-Behind**: Async write to DB, improves write performance
- **Read-Through**: Cache loads from DB automatically

### Redis Operations
- **Data Types**: String, Hash, List, Set, Sorted Set
- **Common Commands**: GET, SET, HGET, HSET, LPUSH, SADD, ZADD
- **Expiration**: TTL (time to live), EXPIRE command
- **Code Example**:
  ```csharp
  var redis = ConnectionMultiplexer.Connect("mycache.redis.cache.windows.net:6380,password=...,ssl=True");
  var db = redis.GetDatabase();
  await db.StringSetAsync("user:123", JsonSerializer.Serialize(user), TimeSpan.FromMinutes(30));
  var cached = await db.StringGetAsync("user:123");
  ```

### Redis Configuration
- **SKUs**: Basic (dev/test), Standard (replication), Premium (clustering, persistence)
- **Eviction Policies**: allkeys-lru (remove least recently used), volatile-ttl, noeviction
- **Data Persistence**: RDB snapshots, AOF (append-only file)
- **Clustering**: Partition data across multiple nodes (Premium only)

---

## Integration - API Management

### APIM Policies
- **Inbound**: Process before forwarding to backend (authentication, rate limiting, transformation)
- **Backend**: Modify request to backend
- **Outbound**: Process response before returning to client
- **On-Error**: Handle errors

### Common Policies
- **Rate Limiting**:
  ```xml
  <rate-limit calls="100" renewal-period="60" />
  <quota calls="10000" renewal-period="86400" />
  ```
- **Transformation**:
  ```xml
  <set-header name="X-Custom-Header" exists-action="override">
      <value>@(context.Request.Headers.GetValueOrDefault("Authorization",""))</value>
  </set-header>
  <set-body>@(context.Request.Body.As<string>().Replace("old","new"))</set-body>
  ```
- **Caching**:
  ```xml
  <cache-lookup vary-by-developer="false" vary-by-developer-groups="false" />
  <cache-store duration="60" />
  ```

### API Security
- **Subscription Keys**: Header or query string
- **OAuth 2.0**: Validate JWT tokens
- **Client Certificates**: Mutual TLS
- **IP Filtering**: Whitelist/blacklist
- **CORS**: Cross-origin resource sharing

---

## Integration - Event Grid

### Event Grid Concepts
- **Event Sources**: Azure resources, custom applications
- **Topics**: Endpoint where events are sent
- **Event Subscriptions**: Route events to handlers
- **Event Handlers**: Functions, Logic Apps, Webhooks, Event Hubs

### Event Schema
```json
{
  "topic": "/subscriptions/{sub-id}/resourceGroups/myRG/providers/Microsoft.Storage/storageAccounts/myaccount",
  "subject": "/blobServices/default/containers/mycontainer/blobs/file.txt",
  "eventType": "Microsoft.Storage.BlobCreated",
  "eventTime": "2024-01-15T10:30:00Z",
  "id": "unique-id",
  "data": { "api": "PutBlob", "contentType": "text/plain" }
}
```

### Event Filtering
- **Subject Filtering**: Prefix or suffix matching
- **Advanced Filtering**: Filter on event data properties
- **Code Example**:
  ```json
  {
    "filter": {
      "subjectBeginsWith": "/blobServices/default/containers/images/",
      "advancedFilters": [
        { "operatorType": "NumberGreaterThan", "key": "data.contentLength", "value": 1048576 }
      ]
    }
  }
  ```

---

## Integration - Service Bus

### Service Bus Concepts
- **Queues**: Point-to-point, FIFO, single consumer
- **Topics**: Publish-subscribe, multiple subscriptions
- **Subscriptions**: Topic filters and rules
- **Dead-Letter Queue**: Failed messages for later inspection

### Service Bus Features
- **Sessions**: Guarantee FIFO processing, message correlation
- **Transactions**: Atomic operations across multiple entities
- **Duplicate Detection**: Detect and remove duplicate messages
- **TTL**: Message time-to-live
- **Scheduled Messages**: Delay message delivery

### Code Example
```csharp
var client = new ServiceBusClient(connectionString);
var sender = client.CreateSender("orders");
await sender.SendMessageAsync(new ServiceBusMessage("Order data") {
    SessionId = "session1",
    MessageId = Guid.NewGuid().ToString(),
    TimeToLive = TimeSpan.FromHours(1)
});

var processor = client.CreateProcessor("orders", new ServiceBusProcessorOptions {
    AutoCompleteMessages = false,
    MaxConcurrentCalls = 10
});
processor.ProcessMessageAsync += async args => {
    await ProcessOrder(args.Message.Body.ToString());
    await args.CompleteMessageAsync(args.Message);
};
await processor.StartProcessingAsync();
```

---

## Integration - Event Hubs

### Event Hubs Concepts
- **Purpose**: Massive event ingestion, millions of events per second
- **Partitions**: Parallel processing, ordered within partition
- **Consumer Groups**: Multiple independent consumers
- **Checkpointing**: Track processing progress

### Event Hubs vs Service Bus
- **Event Hubs**: High throughput, streaming, event sourcing
- **Service Bus**: Guaranteed delivery, sessions, transactions, complex routing
- **Use Event Hubs**: Telemetry, log aggregation, real-time analytics
- **Use Service Bus**: Order processing, workflows, command/messaging patterns

### Code Example
```csharp
var producer = new EventHubProducerClient(connectionString, "telemetry");
var batch = await producer.CreateBatchAsync();
batch.TryAdd(new EventData(Encoding.UTF8.GetBytes("Event data")));
await producer.SendAsync(batch);

var consumer = new EventProcessorClient(
    storageClient, "consumerGroup", connectionString, "telemetry");
consumer.ProcessEventAsync += async args => {
    await ProcessEvent(args.Data.EventBody.ToString());
    await args.UpdateCheckpointAsync();
};
await consumer.StartProcessingAsync();
```
