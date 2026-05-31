import { CheatSheetSection } from '@/lib/exams/types'

/**
 * AZ-204 theory cheat sheets — built for fast recall.
 * Each card uses: content (core facts), keyPoints (exam triggers),
 * compareWith (the "X vs Y" decisions the exam loves), and a mnemonic hook.
 * Grouped to mirror the five official functional areas.
 */
export const AZ204_CHEAT_SHEETS: CheatSheetSection[] = [
  // ───────────────────────────── COMPUTE ─────────────────────────────
  {
    id: 'compute',
    title: 'Azure Compute Solutions',
    category: 'Compute',
    iconKey: 'compute',
    summary: 'Containers (ACI, ACA, ACR), App Service, and Azure Functions — pick the right host and master triggers/bindings.',
    topics: [
      {
        id: 'compute-choosing',
        title: 'Choosing a Compute Host (decision map)',
        content: [
          'The exam constantly asks "which service fits this requirement?" — anchor on these triggers.',
          'ACI: single/few containers, fast burst, per-second billing, no orchestration.',
          'Container Apps (ACA): serverless microservices, scale-to-zero, KEDA event scaling, Dapr, revisions.',
          'AKS: full Kubernetes control, complex orchestration, you manage upgrades/scaling primitives.',
          'App Service: managed web apps/APIs, slots, easy CI/CD, no container expertise needed.',
          'Functions: event-driven, short-lived, pay-per-execution, bindings remove boilerplate.',
        ],
        keyPoints: [
          '"Scale to zero" + "microservices" + "KEDA/Dapr" → Container Apps.',
          '"Run a single container quickly" / "burst" → Container Instances.',
          '"Full Kubernetes / fine-grained control" → AKS.',
          '"Event/timer/queue triggered, serverless" → Azure Functions.',
        ],
        compareWith: {
          label: 'ACI vs Container Apps vs AKS',
          points: [
            'ACI: no autoscaling, no built-in load balancer, simplest, per-second billing.',
            'Container Apps: KEDA autoscale incl. scale-to-zero, HTTPS ingress + LB, Dapr, revisions/traffic split.',
            'AKS: maximum control, you own the control-plane config, best for large/complex systems.',
          ],
        },
        mnemonic: 'Instances=Immediate, Apps=Autoscale, Kubernetes=Kontrol.',
      },
      {
        id: 'acr',
        title: 'Azure Container Registry (ACR)',
        content: [
          'Private OCI/Docker registry. SKUs: Basic (dev/test), Standard (prod), Premium (geo-replication, private link, content trust, larger throughput).',
          'Auth options: Microsoft Entra identity (recommended), admin user (single account, dev only), service principal, managed identity.',
          'ACR Tasks build images in the cloud and can trigger on git commit, base-image update, or schedule.',
        ],
        keyPoints: [
          'Geo-replication & private link require Premium.',
          'Disable the admin account in production — use managed identity / Entra.',
          'az acr build runs a Docker build on ACR without a local Docker daemon.',
        ],
        codeExamples: [
          {
            language: 'bash',
            description: 'Create, build in the cloud, and push',
            code: `az acr create -n myregistry -g myRG --sku Premium
# Build remotely (no local Docker needed) and push
az acr build -r myregistry -t myapp:v1 .
# Or push manually
az acr login -n myregistry
docker tag myapp myregistry.azurecr.io/myapp:v1
docker push myregistry.azurecr.io/myapp:v1`,
          },
        ],
        mnemonic: 'Premium = Private link + Pinning (content trust) + Planet (geo-replication).',
      },
      {
        id: 'container-apps',
        title: 'Azure Container Apps (ACA)',
        content: [
          'Serverless containers on a managed environment (built on AKS + KEDA + Dapr + Envoy).',
          'Scaling rules: HTTP concurrency, CPU/memory, or any KEDA scaler (queues, Event Hubs, Kafka). Can scale to zero.',
          'Revisions: immutable snapshots of a container app version; single or multiple revision mode for blue/green & traffic splitting.',
          'Dapr sidecar provides service invocation, state, pub/sub, bindings.',
        ],
        keyPoints: [
          'Scale to zero is the headline differentiator vs App Service.',
          'Use multiple revision mode to split traffic by percentage (A/B, canary).',
          'Ingress: external (internet) or internal (VNet only); supports HTTP and TCP.',
        ],
        codeExamples: [
          {
            language: 'bash',
            description: 'Create an app with external ingress and KEDA queue scaling',
            code: `az containerapp create -n myapp -g myRG \\
  --environment myenv \\
  --image myregistry.azurecr.io/myapp:v1 \\
  --target-port 80 --ingress external \\
  --min-replicas 0 --max-replicas 10 \\
  --scale-rule-name queue-rule --scale-rule-type azure-queue \\
  --scale-rule-metadata queueName=jobs queueLength=5`,
          },
        ],
        mnemonic: 'ACA = "A Container Autoscaler" with KEDA + Dapr + Revisions.',
      },
      {
        id: 'app-service',
        title: 'App Service Plans, Scaling & TLS',
        content: [
          'Plan tiers: Free/Shared (no custom domain SSL on Free, no slots, no scale-out), Basic, Standard (autoscale, 5 slots), Premium v3 (more slots, better perf, VNet), Isolated (ASE, dedicated).',
          'Scale up = bigger SKU (more CPU/RAM/features). Scale out = more instances (manual or autoscale rules).',
          'Autoscale: metric-based (CPU%, queue length) or schedule-based; define min/max/default and scale-out/in rules.',
          'TLS/SSL: bring your own cert, App Service Managed Certificate (free), or import from Key Vault.',
        ],
        keyPoints: [
          'Deployment slots require Standard tier or higher.',
          'All apps in the same plan share the same compute (and bill).',
          'Use "HTTPS Only" + minimum TLS version setting to enforce secure transport.',
        ],
        compareWith: {
          label: 'Scale up vs Scale out',
          points: [
            'Scale up: change the pricing tier (vertical) — unlocks features + more power per instance.',
            'Scale out: add instances (horizontal) — handles more concurrent load, can be automatic.',
          ],
        },
        mnemonic: 'UP = bigger box, OUT = more boxes.',
      },
      {
        id: 'deployment-slots',
        title: 'Deployment Slots & Swap',
        content: [
          'Slots are live apps with their own hostnames (e.g. staging). Deploy + warm up there, then swap into production with zero downtime.',
          'Swap exchanges the content/config between slots and pre-warms the target before routing traffic.',
          'Slot-specific ("sticky") settings stay with the slot during a swap: app settings/connection strings marked "deployment slot setting", plus things like custom domains, TLS, scale settings, and Always On.',
        ],
        keyPoints: [
          'Mark environment-specific config as "slot setting" so it does NOT travel during a swap.',
          'Test in staging, then swap → production for instant rollback (swap back).',
          'Use auto-swap for continuous deployment to a slot.',
        ],
        mnemonic: 'Sticky settings STAY; everything else SWAPS.',
      },
      {
        id: 'functions-hosting',
        title: 'Azure Functions — Hosting Plans',
        content: [
          'Consumption: true serverless, scale-to-zero, pay-per-execution, 5-min default timeout (max 10), cold starts.',
          'Premium (Elastic): pre-warmed instances (no cold start), VNet, unlimited duration, higher cost.',
          'Dedicated (App Service plan): run on existing plan, predictable cost, useful when you already pay for a plan.',
          'Flex Consumption: newer, fast scale + VNet + per-instance concurrency control.',
        ],
        keyPoints: [
          '"Avoid cold starts + need VNet" → Premium/Flex.',
          'Consumption timeout default 5 min, max 10 min — long jobs need Premium/Durable.',
          'host.json configures runtime behavior; local.settings.json is local-only (never deployed).',
        ],
        compareWith: {
          label: 'Consumption vs Premium vs Dedicated',
          points: [
            'Consumption: cheapest, scales to zero, cold starts, limited duration.',
            'Premium: no cold start, VNet, unlimited duration, pre-warmed.',
            'Dedicated: reuse an App Service plan, predictable flat cost.',
          ],
        },
        mnemonic: 'Cold & Cheap = Consumption; Pre-warmed & Pricey = Premium.',
      },
      {
        id: 'functions-bindings',
        title: 'Functions — Triggers & Bindings',
        content: [
          'Trigger = what starts the function (exactly ONE per function). Bindings = declarative input/output connections (zero or many).',
          'Common triggers: HTTP, Timer (CRON), Blob, Queue, Service Bus, Event Hub, Event Grid, Cosmos DB change feed.',
          'Bindings remove SDK boilerplate: declare in/out and the runtime handles the connection.',
          'Connections are referenced by app-setting name (e.g. "Connection": "MyStorageConn").',
        ],
        keyPoints: [
          'A function has exactly one trigger; output bindings can be multiple.',
          'Timer trigger uses 6-field NCRONTAB ({second} {minute} {hour} {day} {month} {day-of-week}).',
          'Blob trigger is not instant under Consumption (polling); use Event Grid trigger for low latency.',
          'Cosmos DB trigger is powered by the change feed.',
        ],
        codeExamples: [
          {
            language: 'csharp',
            description: 'Queue trigger with Cosmos DB output binding (in-process model)',
            code: `[FunctionName("SaveOrder")]
public void Run(
    [QueueTrigger("orders", Connection = "StorageConn")] string msg,
    [CosmosDB(databaseName: "shop", containerName: "orders",
              Connection = "CosmosConn")] out dynamic doc,
    ILogger log)
{
    doc = new { id = Guid.NewGuid(), body = msg };
}`,
          },
        ],
        mnemonic: 'ONE trigger in, MANY bindings out.',
      },
      {
        id: 'durable-functions',
        title: 'Durable Functions — Patterns',
        content: [
          'Stateful orchestration on top of Functions. Three function types: Client (starts it), Orchestrator (defines workflow, must be deterministic), Activity (does the work).',
          'Orchestrator code must be deterministic — no DateTime.Now, no random, no direct I/O; use context APIs.',
          'State is persisted automatically; orchestrations can run for a long time and survive restarts.',
        ],
        keyPoints: [
          'Function chaining: run activities in sequence, passing output forward.',
          'Fan-out/fan-in: run activities in parallel, then aggregate.',
          'Async HTTP API: start work, poll status endpoint.',
          'Monitor: recurring check until a condition. Human interaction: wait for external event with timeout.',
        ],
        compareWith: {
          label: 'The 5 Durable patterns',
          points: [
            'Chaining → sequential steps.',
            'Fan-out/fan-in → parallel then aggregate.',
            'Async HTTP API → long job + status polling.',
            'Monitor → poll a condition on a schedule.',
            'Human interaction → wait for approval/external event.',
          ],
        },
        mnemonic: 'COAMH: Chaining, fan-Out, Async, Monitor, Human.',
      },
    ],
  },

  // ───────────────────────────── STORAGE ─────────────────────────────
  {
    id: 'storage',
    title: 'Azure Storage Solutions',
    category: 'Storage',
    iconKey: 'storage',
    summary: 'Cosmos DB (partitioning, consistency, change feed) and Blob Storage (tiers, lifecycle, SAS).',
    topics: [
      {
        id: 'cosmos-partitioning',
        title: 'Cosmos DB — Partitioning & RUs',
        content: [
          'Logical partition = all items with the same partition key value (max 20 GB). Physical partitions are managed by Cosmos.',
          'Request Units (RU/s) are the currency of throughput: provisioned (manual/autoscale) or serverless.',
          'A good partition key has high cardinality and spreads both storage and request volume evenly.',
        ],
        keyPoints: [
          'Hot partition = too many requests to one key value → throttling (429).',
          'Cross-partition queries cost more RUs; include the partition key to make queries efficient.',
          'A 429 "Request rate too large" means increase RU/s or back off and retry.',
        ],
        mnemonic: 'Good key = High cardinality + Even spread (no hot partition).',
      },
      {
        id: 'cosmos-consistency',
        title: 'Cosmos DB — Consistency Levels',
        content: [
          'Five levels trade consistency for latency/availability/throughput.',
          'Strong: linearizable, reads see the latest committed write (single-region cost in latency).',
          'Bounded Staleness: lag bounded by K versions or T time.',
          'Session (default): consistent within a client session (read-your-own-writes).',
          'Consistent Prefix: never see out-of-order writes, but may lag.',
          'Eventual: lowest latency/cost, no ordering guarantee.',
        ],
        keyPoints: [
          'Default = Session and it fits most apps.',
          'Stronger = more latency + RU cost + reduced availability for multi-region writes.',
          'You can relax consistency per-request below the account default (not strengthen above).',
        ],
        compareWith: {
          label: 'Order (strongest → weakest)',
          points: [
            'Strong > Bounded Staleness > Session > Consistent Prefix > Eventual.',
            'Pick the weakest level that still meets correctness for best performance/cost.',
          ],
        },
        mnemonic: 'Stupid Brave Students Can Eat — Strong, Bounded, Session, Consistent prefix, Eventual.',
      },
      {
        id: 'cosmos-changefeed',
        title: 'Cosmos DB — Change Feed',
        content: [
          'Persistent, ordered (per partition) log of creates and updates, in modification order.',
          'Read via Change Feed Processor (SDK), Azure Functions Cosmos DB trigger, or pull model.',
          'Use cases: event sourcing, real-time materialized views, replication, triggering downstream processing.',
        ],
        keyPoints: [
          'Does NOT capture deletes — use a soft-delete flag + TTL if you need delete events.',
          'Change Feed Processor uses a lease container to track progress and enable parallel consumers.',
          'Azure Functions Cosmos DB trigger is the easiest consumer.',
        ],
        mnemonic: 'Change feed = Creates & Updates only (no Deletes).',
      },
      {
        id: 'blob-tiers',
        title: 'Blob Storage — Access Tiers',
        content: [
          'Hot: frequent access, highest storage cost, lowest access cost.',
          'Cool: infrequently accessed, ≥30 days; lower storage, higher access cost.',
          'Cold: rarely accessed, ≥90 days; cheaper storage than Cool.',
          'Archive: offline, cheapest storage, ≥180 days; must rehydrate before reading (hours).',
        ],
        keyPoints: [
          'Hot/Cool/Cold can be set at account or blob level; Archive is blob-level only.',
          'Archive rehydration: set tier to Hot/Cool with Standard or High priority.',
          'Early deletion fees apply if you remove Cool/Cold/Archive blobs before their minimum days.',
        ],
        compareWith: {
          label: 'Tier by access frequency',
          points: [
            'Hot → frequent. Cool → monthly (30d). Cold → quarterly (90d). Archive → yearly/compliance (180d, offline).',
          ],
        },
        mnemonic: 'Hotter = pay to STORE; Colder = pay to READ.',
      },
      {
        id: 'blob-lifecycle',
        title: 'Blob Storage — Lifecycle, Metadata & Static Sites',
        content: [
          'Lifecycle management: JSON rules to tier-down or delete blobs based on age (last modified / last accessed).',
          'Properties = system-defined (Content-Type, ETag); Metadata = your custom name/value pairs (x-ms-meta-*).',
          'Static website hosting serves from the special $web container with an index + error document.',
          'Blob versioning + soft delete + immutability (WORM) protect data.',
        ],
        keyPoints: [
          'Lifecycle actions: tierToCool, tierToCold, tierToArchive, delete; based on daysAfterModificationGreaterThan.',
          'Metadata is retrieved with properties but set separately; keys are case-insensitive.',
          'Static website endpoint differs from the blob endpoint; front with CDN/Front Door for custom domain + HTTPS.',
        ],
        codeExamples: [
          {
            language: 'csharp',
            description: 'Set metadata and upload with the v12 SDK',
            code: `var container = new BlobContainerClient(conn, "images");
var blob = container.GetBlobClient("logo.png");
await blob.UploadAsync(stream, overwrite: true);
await blob.SetMetadataAsync(new Dictionary<string,string> {
    ["category"] = "branding", ["owner"] = "marketing"
});`,
          },
        ],
        mnemonic: 'Properties = system; Metadata = mine.',
      },
    ],
  },

  // ───────────────────────────── SECURITY ─────────────────────────────
  {
    id: 'security',
    title: 'Azure Security & Identity',
    category: 'Security',
    iconKey: 'security',
    summary: 'Microsoft identity platform (MSAL/OAuth), managed identities, Key Vault, App Configuration, SAS, and Microsoft Graph.',
    topics: [
      {
        id: 'identity-flows',
        title: 'Microsoft Identity Platform — OAuth Flows',
        content: [
          'Entra ID issues tokens via OAuth 2.0 / OpenID Connect. MSAL is the library that acquires them.',
          'Authorization Code: interactive user sign-in for web/SPA/mobile (SPAs add PKCE).',
          'Client Credentials: app-only, no user (daemons/services) using a secret or certificate.',
          'On-Behalf-Of (OBO): an API calls a downstream API as the original user.',
          'Device Code: input-constrained devices (CLI, IoT) — user authorizes on another device.',
        ],
        keyPoints: [
          '"Daemon/background, no user" → Client Credentials.',
          '"API forwards the user identity to another API" → On-Behalf-Of.',
          'ID token = authentication (who); Access token = authorization (what you can call).',
          'Scopes/permissions: delegated (on behalf of a signed-in user) vs application (app-only, needs admin consent).',
        ],
        compareWith: {
          label: 'Which flow?',
          points: [
            'User signs in interactively → Authorization Code (+ PKCE for SPA).',
            'No user / service-to-service → Client Credentials.',
            'API → downstream API as user → On-Behalf-Of.',
            'No browser on device → Device Code.',
          ],
        },
        mnemonic: 'No user = Client Credentials; pass the user along = OBO.',
      },
      {
        id: 'managed-identity',
        title: 'Managed Identities',
        content: [
          'Entra identity for Azure resources so code authenticates WITHOUT storing credentials.',
          'System-assigned: 1:1 with a resource, created/deleted with it.',
          'User-assigned: standalone resource, assignable to many resources, independent lifecycle.',
          'DefaultAzureCredential picks up the managed identity automatically in Azure.',
        ],
        keyPoints: [
          '"Share one identity across multiple apps" → user-assigned.',
          '"Tie identity to a single resource lifecycle" → system-assigned.',
          'Grant the identity RBAC roles on target resources (e.g. Key Vault Secrets User).',
          'Behind the scenes it uses the IMDS endpoint to fetch tokens.',
        ],
        codeExamples: [
          {
            language: 'csharp',
            description: 'Use a managed identity to read a Key Vault secret',
            code: `var client = new SecretClient(
    new Uri("https://myvault.vault.azure.net"),
    new DefaultAzureCredential());
KeyVaultSecret secret = await client.GetSecretAsync("DbPassword");`,
          },
        ],
        mnemonic: 'System = Single resource; User = Universal/shared.',
      },
      {
        id: 'key-vault',
        title: 'Azure Key Vault',
        content: [
          'Stores secrets, keys (crypto operations / HSM-backed), and certificates.',
          'Authorization: Azure RBAC (recommended) or legacy access policies — for the data plane.',
          'Soft-delete (recoverable) and purge protection (cannot hard-delete during retention) protect against loss.',
          'App Service/Functions can reference secrets directly via Key Vault references in app settings.',
        ],
        keyPoints: [
          'Standard tier = software keys; Premium = HSM-backed keys.',
          'Use managed identity + RBAC; never put the vault URL secret in code.',
          'Rotation: certificates can auto-rotate; secrets via Event Grid notifications + automation.',
        ],
        compareWith: {
          label: 'Key Vault vs App Configuration',
          points: [
            'Key Vault → secrets, keys, certificates (sensitive, encrypted, audited).',
            'App Configuration → non-secret config + feature flags; can reference Key Vault for secrets.',
          ],
        },
        mnemonic: 'Vault = Secrets/Keys/Certs; App Config = settings + feature flags.',
      },
      {
        id: 'app-configuration',
        title: 'Azure App Configuration',
        content: [
          'Central store for application settings and feature flags, separate from code.',
          'Key-values support labels (e.g. dev/prod) and content types; supports point-in-time snapshots.',
          'Feature management library reads feature flags to toggle behavior without redeploying.',
          'Reference Key Vault secrets from App Configuration to keep secrets in the vault.',
        ],
        keyPoints: [
          'Use labels to keep per-environment values under the same key.',
          'Feature flags enable progressive rollout / kill switches.',
          'Combine with managed identity for secretless access.',
        ],
        mnemonic: 'App Config = Configuration + Capabilities (feature flags).',
      },
      {
        id: 'sas',
        title: 'Shared Access Signatures (SAS)',
        content: [
          'A signed URL granting scoped, time-limited access to Storage without sharing account keys.',
          'User delegation SAS: signed with an Entra credential (most secure) — Blob only.',
          'Service SAS: access to one service (Blob/Queue/Table/File), signed with account key.',
          'Account SAS: access across multiple services, signed with account key.',
        ],
        keyPoints: [
          'Prefer user delegation SAS (no account key, revocable via the Entra credential).',
          'Stored access policy lets you revoke/change a service SAS server-side.',
          'Scope tightly: permissions (r/w/d/l), start/expiry, allowed IPs, HTTPS-only.',
        ],
        compareWith: {
          label: 'SAS types',
          points: [
            'User delegation → Entra-signed, most secure, Blob only.',
            'Service → one service, account-key signed.',
            'Account → multiple services, account-key signed.',
          ],
        },
        mnemonic: 'User delegation = no key = best.',
      },
      {
        id: 'microsoft-graph',
        title: 'Microsoft Graph',
        content: [
          'Single REST endpoint (https://graph.microsoft.com) for Microsoft 365 / Entra data: users, groups, mail, calendar, files.',
          'Auth with Entra tokens; permission types: delegated (signed-in user) vs application (app-only).',
          'SDKs available; supports query params $select, $filter, $expand, and batching.',
        ],
        keyPoints: [
          'Use $select to limit returned properties (performance).',
          'Application permissions need admin consent.',
          'Throttling returns 429 with Retry-After — honor it.',
        ],
        mnemonic: 'Graph = one endpoint for all M365/Entra data.',
      },
    ],
  },

  // ───────────────────────── MONITOR / OPTIMIZE ─────────────────────────
  {
    id: 'monitor',
    title: 'Monitor, Troubleshoot & Optimize',
    category: 'Monitoring',
    iconKey: 'monitor',
    summary: 'Application Insights instrumentation, availability tests/alerts, and Azure Cache for Redis patterns.',
    topics: [
      {
        id: 'app-insights',
        title: 'Application Insights',
        content: [
          'APM service (part of Azure Monitor) for distributed apps: metrics, logs, traces, dependencies, live metrics.',
          'Instrument via auto-instrumentation (codeless) or the SDK; data keyed by connection string.',
          'Application Map visualizes components and dependency health; transaction search follows a single request end-to-end.',
        ],
        keyPoints: [
          'Use connection string (instrumentation key alone is deprecated).',
          'TrackEvent/TrackMetric/TrackTrace/TrackException/TrackDependency for custom telemetry.',
          'Sampling reduces volume/cost: adaptive (default), fixed-rate, or ingestion sampling.',
        ],
        compareWith: {
          label: 'Telemetry types',
          points: [
            'Requests & Dependencies → performance + failures.',
            'Traces & Exceptions → diagnostics.',
            'Custom Events & Metrics → business KPIs.',
          ],
        },
        mnemonic: 'AI sees Requests, Dependencies, Exceptions, Traces, Metrics.',
      },
      {
        id: 'availability-alerts',
        title: 'Availability Tests & Alerts',
        content: [
          'Availability tests ping your app from multiple Azure regions to measure uptime/responsiveness.',
          'Standard test: configurable URL ping (status code, content match, TLS). Custom: TrackAvailability() from code.',
          'Alerts fire on metrics/logs/availability; routed via action groups (email, SMS, webhook, Logic App, Functions).',
        ],
        keyPoints: [
          'Test from several regions and alert when X of Y locations fail (avoid false positives).',
          'Alert rule = condition (signal + threshold) + action group.',
          'Use availability tests for synthetic monitoring of public endpoints.',
        ],
        mnemonic: 'Test from many regions → Alert via action group.',
      },
      {
        id: 'redis-cache',
        title: 'Azure Cache for Redis',
        content: [
          'In-memory cache for low-latency reads, session state, and as a message broker (pub/sub).',
          'Tiers: Basic (single node, no SLA), Standard (replicated, SLA), Premium (clustering, persistence, VNet), plus Enterprise.',
          'Eviction policies (maxmemory-policy): noeviction, allkeys-lru, volatile-lru, allkeys-lfu, volatile-ttl, etc.',
        ],
        keyPoints: [
          'Cache-aside (lazy loading): on miss, load from DB then populate cache with a TTL — the default pattern.',
          'Always set expiration (TTL) to avoid stale data and unbounded growth.',
          'Premium adds clustering (scale-out), data persistence (RDB/AOF), and VNet injection.',
        ],
        compareWith: {
          label: 'Caching patterns',
          points: [
            'Cache-aside → app loads on miss (most common).',
            'Write-through → write to cache and DB together (consistency).',
            'Session store → keep user session in Redis for stateless web tiers.',
          ],
        },
        mnemonic: 'Miss → DB → fill cache (with TTL) = Cache-aside.',
      },
    ],
  },

  // ───────────────────────── CONNECT / CONSUME ─────────────────────────
  {
    id: 'integration',
    title: 'API Management, Events & Messaging',
    category: 'Integration',
    iconKey: 'integration',
    summary: 'APIM policies, and choosing/using Event Grid, Event Hubs, Service Bus, and Queue Storage.',
    topics: [
      {
        id: 'messaging-choice',
        title: 'Events vs Messages — Choosing a Service',
        content: [
          'The #1 integration question: Event Grid vs Event Hubs vs Service Bus vs Queue Storage.',
          'Event = lightweight notification that something happened (publisher does not expect processing).',
          'Message = data with intent that a consumer must process (often transactional).',
        ],
        keyPoints: [
          'Event Grid → reactive, discrete events, fan-out to many handlers, near real-time.',
          'Event Hubs → massive telemetry/streaming ingestion (millions/sec), big-data pipelines.',
          'Service Bus → enterprise messaging: ordering (sessions), transactions, dead-lettering, topics.',
          'Queue Storage → simple, cheap, large-scale queue, basic FIFO-ish, up to 64 KB messages.',
        ],
        compareWith: {
          label: 'Pick by intent',
          points: [
            '"React to a discrete event / fan-out" → Event Grid.',
            '"Stream high-volume telemetry/logs" → Event Hubs.',
            '"Reliable business messages, ordering, transactions" → Service Bus.',
            '"Simple decoupling queue, cheap" → Queue Storage.',
          ],
        },
        mnemonic: 'Grid reacts, Hubs stream, Bus transacts, Queue decouples.',
      },
      {
        id: 'apim',
        title: 'Azure API Management (APIM)',
        content: [
          'Gateway that publishes, secures, transforms, and observes APIs. Components: gateway, developer portal, management plane.',
          'Products bundle APIs and define access (subscriptions + keys); subscriptions gate who can call.',
          'Policies are XML applied in scopes: inbound, backend, outbound, on-error. Use <base /> to inherit parent scope.',
          'Tiers: Consumption (serverless), Developer (no SLA), Basic/Standard/Premium (Premium = multi-region, VNet).',
        ],
        keyPoints: [
          'Common policies: rate-limit / quota, ip-filter, validate-jwt, set-header, rewrite-uri, cache-store/cache-lookup, mock-response.',
          'Secure backends with subscription keys, JWT validation (validate-jwt), client certificates, or managed identity.',
          'Premium tier enables multi-region deployment and VNet integration.',
        ],
        codeExamples: [
          {
            language: 'xml',
            description: 'Inbound policy: validate JWT and rate-limit',
            code: `<inbound>
  <base />
  <validate-jwt header-name="Authorization" failed-validation-httpcode="401">
    <openid-config url="https://login.microsoftonline.com/{tenant}/v2.0/.well-known/openid-configuration" />
    <required-claims>
      <claim name="aud"><value>api://my-api</value></claim>
    </required-claims>
  </validate-jwt>
  <rate-limit-by-key calls="100" renewal-period="60"
    counter-key="@(context.Subscription.Id)" />
</inbound>`,
          },
        ],
        mnemonic: 'Policy scopes flow: IN → BACKEND → OUT → ERROR.',
      },
      {
        id: 'event-grid',
        title: 'Azure Event Grid',
        content: [
          'Serverless event routing with pub/sub. Concepts: sources, topics (system/custom/partner), subscriptions, handlers.',
          'Push delivery to handlers (Functions, Logic Apps, Webhooks, Event Hubs, Service Bus, Storage Queues).',
          'At-least-once delivery with retries + dead-lettering; filtering by event type, subject prefix/suffix, or advanced fields.',
        ],
        keyPoints: [
          'Uses the CloudEvents/Event Grid schema; built-in system topics for Azure services (e.g. Blob Created).',
          'Webhook endpoints must complete a validation handshake on subscription.',
          'Configure retry policy + dead-letter destination for undeliverable events.',
        ],
        mnemonic: 'Grid = pub/sub routing with filters + dead-letter.',
      },
      {
        id: 'event-hubs',
        title: 'Azure Event Hubs',
        content: [
          'Big-data streaming/event ingestion (telemetry, logs, IoT). Partitions enable parallel, ordered streams.',
          'Consumer groups give each downstream reader an independent view; consumers track position via checkpoints (offsets).',
          'Capture can auto-archive events to Blob/Data Lake. AMQP/Kafka protocols supported.',
        ],
        keyPoints: [
          'Ordering is guaranteed only within a partition.',
          'Throughput Units (or Processing Units for Premium) scale ingress/egress.',
          'Checkpointing prevents reprocessing and enables resume after failure.',
        ],
        compareWith: {
          label: 'Event Hubs vs Event Grid',
          points: [
            'Event Hubs → high-throughput streaming, consumers pull and checkpoint.',
            'Event Grid → discrete event routing, push to handlers with filtering.',
          ],
        },
        mnemonic: 'Hubs = Highways for streams (Partitions + Checkpoints).',
      },
      {
        id: 'service-bus',
        title: 'Azure Service Bus',
        content: [
          'Enterprise message broker. Queues (point-to-point) and Topics/Subscriptions (pub/sub with filters).',
          'Features: sessions (FIFO + state), dead-letter queue (DLQ), duplicate detection, scheduled/deferred messages, transactions.',
          'Receive modes: Peek-Lock (process then complete/abandon) vs Receive-and-Delete (at-most-once).',
        ],
        keyPoints: [
          'Sessions guarantee ordered, single-consumer processing per session ID.',
          'Messages go to the DLQ on max delivery count, expiration (TTL), or explicit dead-letter.',
          'Standard tier = topics + shared capacity; Premium = dedicated, predictable, larger messages, geo-DR.',
        ],
        compareWith: {
          label: 'Receive modes',
          points: [
            'Peek-Lock → safest: lock, process, then Complete (or Abandon/Dead-letter).',
            'Receive-and-Delete → fastest but message is gone even if processing fails.',
          ],
        },
        mnemonic: 'Bus DLQ triggers: Dead on Count, Expiry, or explicit Dead-letter.',
      },
      {
        id: 'queue-storage',
        title: 'Azure Queue Storage',
        content: [
          'Simple, durable queue in a Storage account for decoupling components at scale.',
          'Messages up to 64 KB; queue can hold millions of messages (limited by account capacity).',
          'Get-message makes a message invisible (visibility timeout); delete it after successful processing.',
        ],
        keyPoints: [
          'No built-in ordering guarantee, sessions, or topics — use Service Bus for those.',
          'Poison messages: track dequeue count and move aside after N attempts (no native DLQ).',
          'Cheapest option when you just need a basic, massive queue.',
        ],
        compareWith: {
          label: 'Queue Storage vs Service Bus queues',
          points: [
            'Queue Storage → simple, cheap, huge scale, 64 KB messages, no advanced features.',
            'Service Bus → ordering (sessions), transactions, DLQ, duplicate detection, larger messages.',
          ],
        },
        mnemonic: 'Need ordering/transactions/DLQ? Leave the Storage queue for Service Bus.',
      },
    ],
  },
]
