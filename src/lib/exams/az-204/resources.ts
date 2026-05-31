import { ExamResource } from '@/lib/exams/types'

/**
 * Curated official AZ-204 study resources from Microsoft Learn.
 * Verified against the certification page (last updated 2026-01-14).
 * These complement the in-app cheat sheets and practice questions.
 */
export const AZ204_RESOURCES: ExamResource[] = [
  {
    title: 'Official AZ-204 Study Guide',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-204',
    description: 'The authoritative skills-measured outline. Read this first and last — every exam question maps to it.',
    type: 'study-guide',
  },
  {
    title: 'Free Official Practice Assessment',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/practice/assessment?assessment-type=practice&assessmentId=35&practice-assessment-type=certification',
    description: 'Microsoft\'s free practice test — matches the real exam\'s style, wording, and difficulty. Take it before booking.',
    type: 'practice',
  },
  {
    title: 'Exam Sandbox (demo experience)',
    url: 'https://go.microsoft.com/fwlink/?linkid=2226877',
    description: 'Interact with the real exam UI and question types before exam day so nothing is a surprise.',
    type: 'practice',
  },
  {
    title: 'Course AZ-204T00: Develop Solutions for Microsoft Azure',
    url: 'https://learn.microsoft.com/en-us/training/courses/az-204t00/',
    description: 'The full official course bundling every learning path below.',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Implement Azure App Service web apps',
    url: 'https://learn.microsoft.com/training/paths/create-azure-app-service-web-apps/',
    description: 'App Service plans, deployment slots, configuration, autoscaling, and authentication (4 modules).',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Implement Azure Functions',
    url: 'https://learn.microsoft.com/training/paths/implement-azure-functions/',
    description: 'Triggers, input/output bindings, and Durable Functions patterns (2 modules).',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Develop solutions that use Blob storage',
    url: 'https://learn.microsoft.com/training/paths/develop-solutions-that-use-blob-storage/',
    description: 'Blob SDK operations, properties/metadata, lifecycle management (3 modules).',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Develop solutions that use Azure Cosmos DB',
    url: 'https://learn.microsoft.com/training/paths/az-204-develop-solutions-that-use-azure-cosmos-db/',
    description: 'Partitioning, consistency levels, the SDK, and change feed (2 modules).',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Implement containerized solutions',
    url: 'https://learn.microsoft.com/training/paths/az-204-implement-iaas-solutions/',
    description: 'Azure Container Registry, Container Instances, and Container Apps (3 modules).',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Implement user authentication and authorization',
    url: 'https://learn.microsoft.com/training/paths/az-204-implement-authentication-authorization/',
    description: 'Microsoft identity platform, MSAL, shared access signatures, and Microsoft Graph (4 modules).',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Implement secure Azure solutions',
    url: 'https://learn.microsoft.com/training/paths/az-204-implement-secure-cloud-solutions/',
    description: 'Key Vault, managed identities, and Azure App Configuration (3 modules).',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Develop message-based & event-based solutions',
    url: 'https://learn.microsoft.com/en-us/training/paths/az-204-develop-message-based-solutions/',
    description: 'Service Bus, Queue Storage, Event Grid, and Event Hubs.',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Implement API Management',
    url: 'https://learn.microsoft.com/en-us/training/modules/explore-api-management/',
    description: 'Gateways, products, subscriptions, and inbound/outbound policies.',
    type: 'learning-path',
  },
  {
    title: 'Learning Path: Instrument solutions to support monitoring and logging',
    url: 'https://learn.microsoft.com/en-us/training/paths/az-204-instrument-solutions-support-monitoring-logging/',
    description: 'Application Insights, availability tests, and Azure Cache for Redis.',
    type: 'learning-path',
  },
  {
    title: 'AZ-204 Exam Readiness Zone (video series)',
    url: 'https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-az-204-develop-azure-compute-solutions-1-of-5/',
    description: 'Microsoft experts walk through each domain with tips and strategies (5-part series).',
    type: 'video',
  },
  {
    title: 'Azure SDK & service documentation',
    url: 'https://learn.microsoft.com/en-us/azure/?product=developer-tools',
    description: 'Deep-dive reference docs for every service on the exam when a cheat sheet card isn\'t enough.',
    type: 'docs',
  },
]
