import { AZ204Domain } from './types'

export const AZ204_DOMAINS: AZ204Domain[] = [
  {
    id: 'develop-compute',
    name: 'Develop Azure compute solutions',
    weight: '25-30%',
    description: 'Implement containerized solutions, Azure App Service web apps, and Azure Functions',
    topics: [
      'Implement containerized solutions',
      'Provision and manage Azure Container Instances',
      'Provision and manage Azure Container Apps',
      'Manage container registries using Azure Container Registry',
      'Implement Azure App Service Web Apps',
      'Create and configure App Service plans',
      'Configure deployment slots',
      'Secure App Service apps',
      'Configure custom domains and TLS/SSL bindings',
      'Enable diagnostic logging',
      'Implement autoscaling rules',
      'Implement Azure Functions',
      'Create and deploy Azure Functions',
      'Implement input and output bindings',
      'Implement function triggers including timer data operations HTTP and webhooks',
      'Implement Azure Durable Functions'
    ],
    examTips: [
      'Know when to use Container Instances vs Container Apps vs AKS',
      'Understand deployment slots for zero-downtime deployments',
      'Master Function triggers and bindings - heavily tested',
      'Know Durable Functions orchestration patterns',
      'Understand App Service plan tiers and scaling options'
    ],
    officialDocUrl: 'https://learn.microsoft.com/en-us/azure/app-service/'
  },
  {
    id: 'develop-storage',
    name: 'Develop for Azure storage',
    weight: '15-20%',
    description: 'Develop solutions that use Azure Cosmos DB and Blob storage',
    topics: [
      'Develop solutions that use Azure Cosmos DB',
      'Perform operations on containers and items',
      'Set consistency levels for operations',
      'Implement change feed notifications',
      'Create Cosmos DB containers with appropriate partition keys',
      'Implement Cosmos DB SQL queries',
      'Implement stored procedures triggers and user-defined functions',
      'Develop solutions that use Azure Blob Storage',
      'Set and retrieve properties and metadata',
      'Perform operations on data by using the appropriate SDK',
      'Implement storage policies and data lifecycle management',
      'Implement static website hosting',
      'Configure blob versioning and immutability'
    ],
    examTips: [
      'Partition key selection is critical - understand hot partitions',
      'Know the 5 consistency levels and when to use each',
      'Understand change feed for event-driven architectures',
      'Master blob lifecycle management policies',
      'Know SAS token generation and permissions'
    ],
    officialDocUrl: 'https://learn.microsoft.com/en-us/azure/cosmos-db/'
  },
  {
    id: 'implement-security',
    name: 'Implement Azure security',
    weight: '20-25%',
    description: 'Implement user authentication and authorization, secure cloud solutions, and implement secure Azure solutions',
    topics: [
      'Implement user authentication and authorization',
      'Authenticate and authorize users by using Microsoft Identity platform',
      'Authenticate and authorize users and apps by using Microsoft Entra ID',
      'Create and implement shared access signatures',
      'Implement solutions that interact with Microsoft Graph',
      'Implement secure Azure solutions',
      'Secure app configuration data using App Configuration and Azure Key Vault',
      'Develop code that uses keys secrets and certificates',
      'Implement Managed Identities for Azure resources',
      'Implement Azure RBAC and custom RBAC roles',
      'Secure app configuration by using Azure App Configuration'
    ],
    examTips: [
      'Master MSAL (Microsoft Authentication Library) implementation',
      'Know OAuth 2.0 and OpenID Connect flows',
      'Understand Managed Identity (system vs user-assigned)',
      'Key Vault operations are heavily tested',
      'Know SAS token types and when to use each'
    ],
    officialDocUrl: 'https://learn.microsoft.com/en-us/azure/key-vault/'
  },
  {
    id: 'monitor-optimize',
    name: 'Monitor troubleshoot and optimize Azure solutions',
    weight: '15-20%',
    description: 'Implement caching for solutions, troubleshoot solutions using Application Insights',
    topics: [
      'Implement caching for solutions',
      'Configure cache and expiration policies for Azure Cache for Redis',
      'Implement secure and optimized application cache patterns including data sizing sessionstate and caching configurations',
      'Troubleshoot solutions by using Application Insights',
      'Configure an app or service to use Application Insights',
      'Monitor and analyze metrics logs and traces',
      'Implement Application Insights web tests and alerts',
      'Query Application Insights data with KQL (Kusto Query Language)',
      'Implement distributed tracing with Application Map'
    ],
    examTips: [
      'Know Redis cache patterns (cache-aside, write-through, etc.)',
      'Master KQL for querying Application Insights',
      'Understand Application Insights SDK integration',
      'Know how to configure telemetry and custom metrics',
      'Understand distributed tracing across services'
    ],
    officialDocUrl: 'https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/'
  },
  {
    id: 'connect-consume',
    name: 'Connect to and consume Azure services and third-party services',
    weight: '15-20%',
    description: 'Implement API Management, develop event-based and message-based solutions',
    topics: [
      'Implement API Management',
      'Create and document APIs',
      'Implement policies for APIs including rate limiting quotas and transformation',
      'Secure APIs by using subscriptions and certificates',
      'Develop event-based solutions',
      'Implement solutions that use Azure Event Grid',
      'Implement solutions that use Azure Event Hub',
      'Develop message-based solutions',
      'Implement solutions that use Azure Service Bus',
      'Implement solutions that use Azure Queue Storage queues'
    ],
    examTips: [
      'Know when to use Event Grid vs Event Hubs vs Service Bus',
      'Understand APIM policies (inbound, outbound, backend)',
      'Master Service Bus sessions and dead-letter queues',
      'Know Event Grid event schema and filtering',
      'Understand partitioning in Event Hubs'
    ],
    officialDocUrl: 'https://learn.microsoft.com/en-us/azure/api-management/'
  }
]
