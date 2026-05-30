# AZ-204 Exam Questions Database

This file serves as the question database for AZ-204 exam practice. Questions are stored in a structured markdown format for easy parsing.

---

## Question 1

**Domain:** compute
**Topic:** Azure Functions
**Difficulty:** medium

**Question:**
You need to create an Azure Function that processes messages from an Azure Storage Queue. The function should automatically scale based on queue length. Which trigger type should you use?

**Options:**
A) HTTP Trigger
B) Timer Trigger  
C) Queue Storage Trigger
D) Blob Storage Trigger

**Correct Answer:** C

**Explanation:**
Queue Storage Trigger is specifically designed to monitor Azure Storage Queues and automatically trigger function execution when new messages arrive. It provides automatic scaling based on queue length through the host's scale controller. HTTP triggers are for REST APIs, Timer triggers are for scheduled tasks, and Blob triggers monitor blob containers.

**Scenario:**
You are developing a cloud solution for processing customer orders. Orders are placed in an Azure Storage Queue for asynchronous processing. The processing time varies, and the system needs to handle traffic spikes during peak hours.

---

## Question 2

**Domain:** compute
**Topic:** Azure App Service
**Difficulty:** easy

**Question:**
What is the minimum App Service plan tier that supports deployment slots?

**Options:**
A) Free (F1)
B) Basic (B1)
C) Standard (S1)
D) Premium (P1v2)

**Correct Answer:** C

**Explanation:**
Deployment slots are only available starting from the Standard (S1) tier and above. Free and Basic tiers do not support deployment slots. This feature allows you to host different versions of your app for testing, staging, and production swaps with zero downtime.

---

## Question 3

**Domain:** storage
**Topic:** Azure Blob Storage
**Difficulty:** hard

**Question:**
You are implementing a solution to automatically move blobs from the Hot access tier to the Cool access tier after 30 days, and then to Archive tier after 90 days. Which Azure feature should you configure?

**Options:**
A) Blob Versioning
B) Blob Lifecycle Management
C) Blob Snapshot
D) Blob Replication

**Correct Answer:** B

**Explanation:**
Blob Lifecycle Management allows you to create rule-based policies to transition blobs between access tiers (Hot, Cool, Archive) or delete them based on conditions like age. This is the correct solution for automatic tier management. Versioning tracks changes, snapshots create point-in-time copies, and replication copies data across regions.

**Scenario:**
Your company stores application logs in Azure Blob Storage. Recent logs need fast access, but older logs are accessed infrequently. To optimize costs, you need to automatically move logs to cheaper storage tiers as they age.

---

## Question 4

**Domain:** compute
**Topic:** Azure Container Instances
**Difficulty:** medium

**Question:**
You need to deploy a containerized application that runs for a few minutes once a day. The solution must minimize costs. What should you use?

**Options:**
A) Azure Kubernetes Service (AKS)
B) Azure App Service
C) Azure Container Instances
D) Azure Virtual Machines

**Correct Answer:** C

**Explanation:**
Azure Container Instances (ACI) is ideal for short-running containerized tasks because you only pay for the execution time (per second billing). AKS has ongoing cluster costs, App Service requires a hosting plan, and VMs run continuously unless explicitly stopped.

---

## Question 5

**Domain:** security
**Topic:** Azure Key Vault
**Difficulty:** medium

**Question:**
Your application needs to retrieve secrets from Azure Key Vault. What authentication method is recommended for Azure-hosted applications?

**Options:**
A) Connection strings with access keys
B) Managed Identity
C) Service Principal with certificate
D) Shared Access Signature (SAS)

**Correct Answer:** B

**Explanation:**
Managed Identity is the recommended approach for Azure-hosted applications as it eliminates the need to store credentials in code or configuration. The Azure platform automatically manages the identity and handles token rotation. Service principals require credential management, and connection strings/keys pose security risks.

**Scenario:**
You are building a web application hosted in Azure App Service that needs to access database connection strings and API keys stored securely in Azure Key Vault.

---

## Question 6

**Domain:** integration
**Topic:** Azure Service Bus
**Difficulty:** hard

**Question:**
You need to ensure that messages in an Azure Service Bus queue are processed exactly once, even if processing fails. What feature should you configure?

**Options:**
A) Sessions
B) Dead-letter queue
C) Duplicate detection
D) Message deferral

**Correct Answer:** A

**Explanation:**
Sessions provide first-in-first-out (FIFO) guarantee and ensure messages are processed exactly once within a session. Sessions lock messages for a specific receiver. Dead-letter queues store unprocessable messages, duplicate detection prevents duplicate sends, and deferral allows postponing message processing.

**Scenario:**
Your financial transaction processing system must guarantee that each payment transaction is processed exactly once and in the correct order, even if the processing service crashes and restarts.

---

## Question 7

**Domain:** monitoring
**Topic:** Application Insights
**Difficulty:** easy

**Question:**
Which Application Insights feature allows you to trace a request across multiple services in a distributed system?

**Options:**
A) Metrics Explorer
B) Distributed Tracing
C) Live Metrics Stream
D) Availability Tests

**Correct Answer:** B

**Explanation:**
Distributed Tracing (also called end-to-end transaction tracing) allows you to follow a request as it flows through multiple services and dependencies. It creates a visual map showing latency and failures at each hop. Live Metrics shows real-time data, Availability Tests monitor uptime, and Metrics Explorer visualizes metrics.

---

## Question 8

**Domain:** storage
**Topic:** Azure Cosmos DB
**Difficulty:** hard

**Question:**
You need to configure Azure Cosmos DB to provide strong consistency for reads within a single region but allow eventual consistency for reads from other regions. Which consistency level should you use?

**Options:**
A) Strong
B) Bounded Staleness
C) Session
D) Eventual

**Correct Answer:** C

**Explanation:**
Session consistency provides strong consistency for reads within a client session (which is typically within the same region) but allows eventual consistency outside the session. Strong consistency is too restrictive and expensive, Bounded Staleness guarantees lag bounds globally, and Eventual is the weakest consistency level.

**Scenario:**
Your globally distributed e-commerce application needs to ensure users see their own writes immediately (like shopping cart updates) but can tolerate slightly stale data when viewing product catalogs from other regions.

---

## Question 9

**Domain:** compute
**Topic:** Azure Functions Durable Functions
**Difficulty:** hard

**Question:**
You need to implement a long-running workflow that coordinates multiple Azure Functions and maintains state. What should you use?

**Options:**
A) Azure Logic Apps
B) Azure Durable Functions
C) Azure Service Bus with correlation IDs
D) Azure Event Grid

**Correct Answer:** B

**Explanation:**
Azure Durable Functions extends Azure Functions to write stateful workflows in code. It provides orchestration, manages state automatically, and supports patterns like chaining, fan-out/fan-in, and human interaction. Logic Apps is workflow-based (low-code), Service Bus requires manual state management, and Event Grid is for event routing.

**Scenario:**
You need to build an order processing workflow that calls multiple services (inventory check, payment processing, shipment), maintains state between calls, and can resume after failures.

---

## Question 10

**Domain:** security
**Topic:** Azure AD Authentication
**Difficulty:** medium

**Question:**
Your web API needs to validate JWT tokens issued by Azure AD. Which claim in the token should you validate to ensure it was issued for your API?

**Options:**
A) iss (issuer)
B) aud (audience)
C) sub (subject)
D) exp (expiration)

**Correct Answer:** B

**Explanation:**
The aud (audience) claim identifies the intended recipient of the token. Your API should validate that the aud claim matches your API's identifier to prevent token reuse attacks. The iss (issuer) identifies who issued the token, sub identifies the user, and exp is the expiration time - all important but not for verifying the token's intended recipient.

---


