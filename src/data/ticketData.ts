export interface IssueTicket {
  id: string;
  title: string;
  status: 'New' | 'In progress' | 'Pending review';
  priority: 'high' | 'medium' | 'low';
  source: {
    channel: 'Slack' | 'Gmail' | 'Teams' | 'Ticket-system';
    channelIcon: string;
    threadId?: string;
    url?: string;
  };
  createdAt: string;
  updatedAt: string;
  requester: {
    name: string;
    email: string;
    role: string;
    avatar: string;
    company: string;
  };
  assignee?: {
    name: string;
    email: string;
    role: string;
    avatar: string;
  };
  summary: string;
  detailedDescription: string;
  communications: {
    id: string;
    type: 'email' | 'slack' | 'teams';
    sender: string;
    timestamp: string;
    content: string;
    attachments?: {
      name: string;
      type: string;
      size: string;
      url: string;
    }[];
  }[];
  attachedDocs: {
    name: string;
    type: 'pdf' | 'doc' | 'xlsx' | 'ppt';
    size: string;
    uploadedAt: string;
    uploadedBy: string;
    url: string;
  }[];
  aiAnalysis: {
    suggestedPriority: 'high' | 'medium' | 'low';
    keyPoints: string[];
    technicalContext: string[];
    businessImpact: string;
    estimatedEffort: string;
  };
  aiSuggestedSolution: {
    type: 'code' | 'documentation' | 'configuration' | 'response';
    summary: string;
    content: string;
    additionalNotes?: string[];
  };
  tags: string[];
  relatedTickets?: string[];
}

export const activeTickets: IssueTicket[] = [
  {
    id: 'GRT-2024-089',
    title: 'Performance slowed in Product Search',
    status: 'In progress',
    priority: 'high',
    source: {
      channel: 'Gmail',
      channelIcon: '/channelIcons/gmail_icon.png',
      threadId: '1234567890',
    },
    createdAt: '2024-03-19T14:23:00Z',
    updatedAt: '2024-03-20T09:15:00Z',
    requester: {
      name: 'Michael Rodriguez',
      email: 'm.rodriguez@globalretail.com',
      role: 'Technical Lead',
      avatar: '/profiles/michael_rodriguez.jpg',
      company: 'Global Retail Inc',
    },
    assignee: {
      name: 'Nina Patel',
      email: 'n.patel@agency.com',
      role: 'Solution Architect',
      avatar: '/profiles/nina_patel.jpg',
    },
    summary: "Significant latency increase observed in product search API responses, impacting the e-commerce platform's performance during peak hours.",
    detailedDescription:
      "We're seeing response times spike to 3-4 seconds during peak hours (2-5 PM EST) for product search queries, especially those with multiple filters. This is causing a notable increase in cart abandonment rates. Our monitoring shows the degradation started approximately 48 hours ago.",
    communications: [
      {
        id: 'comm-001',
        type: 'email',
        sender: 'Michael Rodriguez',
        timestamp: '2024-03-19T14:23:00Z',
        content:
          "Team, we're seeing concerning performance metrics from our product search API. Response times have increased significantly over the past 48 hours. @Nina, can we investigate this ASAP? I've attached the performance logs and monitoring screenshots.",
        attachments: [
          {
            name: 'search_performance_logs.xlsx',
            type: 'xlsx',
            size: '2.4 MB',
            url: '/docs/search_performance_logs.xlsx',
          },
          {
            name: 'monitoring_screenshots.pdf',
            type: 'pdf',
            size: '1.2 MB',
            url: '/docs/monitoring_screenshots.pdf',
          },
        ],
      },
      {
        id: 'comm-002',
        type: 'email',
        sender: 'Michael Rodriguez',
        timestamp: '2024-03-19T14:45:00Z',
        content: 'Looking into this now. Can you confirm if any recent deployments or data updates coincided with the performance degradation?',
      },
      {
        id: 'comm-003',
        type: 'email',
        sender: 'Michael Rodriguez',
        timestamp: '2024-03-19T15:00:00Z',
        content: 'We deployed an update to the product catalog indexing service on Monday. No other significant changes in the past week.',
      },
      {
        id: 'comm-004',
        type: 'email',
        sender: 'Michael Rodriguez',
        timestamp: '2024-03-19T16:30:00Z',
        content: `Nina,
  
  Just got out of an emergency meeting with our e-commerce team. The situation has escalated - we're now seeing a 25% drop in successful searches during peak hours. Our customer service team is also reporting an increase in complaints.
  
  Key concerns:
  - Search response times now reaching 5+ seconds in some cases
  - Multiple timeout errors being reported
  - Category filtering completely fails occasionally
  
  Is there any update on the investigation? We need to determine if we should consider rolling back the Monday deployment.
  
  I've asked the team to prepare a detailed report of all affected functionalities, which I'll share as soon as it's ready.
  
  Best,
  Michael`,
        attachments: [
          {
            name: 'customer_impact_report.pdf',
            type: 'pdf',
            size: '3.1 MB',
            url: '/docs/customer_impact_report.pdf',
          },
        ],
      },
      {
        id: 'comm-005',
        type: 'email',
        sender: 'Michael Rodriguez',
        timestamp: '2024-03-19T17:15:00Z',
        content: `Hi Nina and team,
  
  Following up on Michael's email - this is severely impacting our digital sales performance. Our real-time analytics show that we're potentially losing $50k+ in sales per hour during peak times due to abandoned searches and failed checkouts.
  
  We need:
  1. Immediate mitigation plan
  2. Timeline for resolution
  3. Hourly status updates
  
  Please treat this as our top priority. I've pulled in additional resources from our side to help with testing or validation if needed.
  
  Best regards,
  Emma Thompson
  VP of E-commerce
  Global Retail Inc`,
        attachments: [
          {
            name: 'sales_impact_analysis.xlsx',
            type: 'xlsx',
            size: '1.8 MB',
            url: '/docs/sales_impact_analysis.xlsx',
          },
        ],
      },
    ],
    attachedDocs: [
      {
        name: 'Performance Analysis Report',
        type: 'pdf',
        size: '4.2 MB',
        uploadedAt: '2024-03-19T16:00:00Z',
        uploadedBy: 'Nina Patel',
        url: '/docs/performance_analysis.pdf',
      },
      {
        name: 'Current Architecture Diagram',
        type: 'pdf',
        size: '1.8 MB',
        uploadedAt: '2024-03-19T16:30:00Z',
        uploadedBy: 'Nina Patel',
        url: '/docs/architecture_diagram.pdf',
      },
    ],
    aiAnalysis: {
      suggestedPriority: 'high',
      keyPoints: [
        'Response times increased from avg 800ms to 3-4s during peak hours',
        'Coincides with recent product catalog indexing service update',
        'Primarily affects filtered search queries',
        'Impacting business metrics (cart abandonment rate increase)',
      ],
      technicalContext: [
        'Current Elasticsearch cluster setup may need optimization',
        'Query optimization opportunities identified',
        'Caching strategy could be improved',
        'Potential memory leaks in indexing service',
      ],
      businessImpact: 'High impact on user experience and conversion rates. Cart abandonment rate has increased by 15% during peak hours.',
      estimatedEffort: 'Medium (2-3 days for implementation and testing)',
    },
    aiSuggestedSolution: {
      type: 'code',
      summary: 'Implement query optimization and enhanced caching strategy',
      content: `Optimization suggestions:
  
  1. Implement Redis caching for frequently accessed search results:
  \`\`\`typescript
  const searchProducts = async (query: SearchQuery): Promise<SearchResults> => {
    const cacheKey = generateSearchCacheKey(query);
    const cachedResults = await redisClient.get(cacheKey);
    
    if (cachedResults) {
      return JSON.parse(cachedResults);
    }
  
    const results = await executeElasticsearchQuery(query);
    await redisClient.setex(cacheKey, 3600, JSON.stringify(results));
    
    return results;
  };
  \`\`\`
  
  2. Optimize Elasticsearch query:
  \`\`\`json
  {
    "query": {
      "bool": {
        "should": [
          {
            "multi_match": {
              "query": "{{searchTerm}}",
              "fields": ["name^3", "description"],
              "type": "phrase_prefix"
            }
          }
        ],
        "filter": [
          {
            "terms": {
              "category": "{{categories}}"
            }
          }
        ]
      }
    },
    "sort": [
      "_score",
      { "popularity": "desc" }
    ],
    "_source": ["id", "name", "price", "thumbnail"]
  }
  \`\`\``,
      additionalNotes: ['Implement rate limiting for complex queries', 'Add monitoring for cache hit/miss rates', 'Consider implementing circuit breaker for filtered searches'],
    },
    tags: ['performance', 'api', 'elasticsearch', 'critical', 'e-commerce'],
    relatedTickets: ['GRT-2024-082', 'GRT-2024-075'],
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  {
    id: 'GRT-2024-090',
    title: 'Digital Workflow Integration Requirements for Sales Team',
    status: 'New',
    priority: 'medium',
    source: {
      channel: 'Teams',
      channelIcon: '/channelIcons/teams_icon.png',
      threadId: 'T234589',
      url: 'teams://channel/digitalTransformation/threads/T234589',
    },
    createdAt: '2024-03-20T10:15:00Z',
    updatedAt: '2024-03-20T10:15:00Z',
    requester: {
      name: 'Emma Thompson',
      email: 'e.thompson@globalretail.com',
      role: 'VP of E-commerce',
      avatar: '/profiles/emma_thompson.png',
      company: 'Global Retail Inc',
    },
    summary: 'Urgent request for integration of new digital sales workflow tools with existing CRM system to support Q2 sales transformation initiative.',
    detailedDescription:
      'Following our digital transformation roadmap, we need to accelerate the integration of our new sales workflow tools. The sales team is currently managing multiple systems manually, creating efficiency bottlenecks. We need a solution that unifies our Salesforce CRM with the new e-commerce platform and automates the lead-to-order process.',
    communications: [
      {
        id: 'comm-001',
        type: 'teams',
        sender: 'Emma Thompson',
        timestamp: '2024-03-20T10:15:00Z',
        content: `@ProjectTeam Following up from our steering committee meeting, we need to prioritize the sales workflow integration. Key requirements:

1. Automated sync between e-commerce platform and Salesforce
2. Single sign-on for sales team across all platforms
3. Unified dashboard for sales pipeline and e-commerce metrics
4. Mobile-first approach for field sales team

The board has approved additional budget for this initiative. Can we schedule a deep dive session to discuss technical approach?`,
        attachments: [
          {
            name: 'sales_workflow_current_state.ppt',
            type: 'ppt',
            size: '5.8 MB',
            url: '/docs/sales_workflow_current_state.ppt',
          },
        ],
      },
      {
        id: 'comm-002',
        type: 'teams',
        sender: 'Emma Thompson',
        timestamp: '2024-03-20T11:30:00Z',
        content: `Adding some context on urgency:
- Current manual process takes 45 mins per lead
- Sales team spending 30% of time on data entry
- Missing cross-sell opportunities due to data silos
- Q2 sales targets require 40% improvement in lead processing time

Attaching the current process documentation and ROI analysis.`,
        attachments: [
          {
            name: 'workflow_roi_analysis.xlsx',
            type: 'xlsx',
            size: '2.1 MB',
            url: '/docs/workflow_roi_analysis.xlsx',
          },
        ],
      },
    ],
    attachedDocs: [
      {
        name: 'Current Sales Process Flow',
        type: 'pdf',
        size: '3.5 MB',
        uploadedAt: '2024-03-20T10:15:00Z',
        uploadedBy: 'Emma Thompson',
        url: '/docs/sales_process_flow.pdf',
      },
      {
        name: 'Integration Requirements Spec',
        type: 'doc',
        size: '1.2 MB',
        uploadedAt: '2024-03-20T11:30:00Z',
        uploadedBy: 'Emma Thompson',
        url: '/docs/integration_requirements.doc',
      },
    ],
    aiAnalysis: {
      suggestedPriority: 'high',
      keyPoints: [
        'Integration needed between e-commerce platform and Salesforce CRM',
        'Current process heavily manual with significant time waste',
        'Mobile accessibility is crucial for field sales team',
        'SSO implementation required across platforms',
      ],
      technicalContext: [
        'Salesforce API integration required',
        'OAuth 2.0 implementation for SSO',
        'Real-time data sync architecture needed',
        'Mobile-responsive dashboard development',
      ],
      businessImpact: 'High potential ROI with 40% efficiency gain target. Direct impact on Q2 sales targets and team productivity.',
      estimatedEffort: 'Large (4-6 weeks for full implementation)',
    },
    aiSuggestedSolution: {
      type: 'documentation',
      summary: 'Proposed Integration Architecture and Implementation Plan',
      content: `# Integration Solution Architecture

1. Authentication Layer (Week 1-2):
- Implement OAuth 2.0 for SSO
- Set up JWT token management
- Configure role-based access control

2. Data Integration Layer (Week 2-3):
- Salesforce REST API integration
- Real-time webhooks for e-commerce events
- Message queue for asynchronous processing

3. Frontend Development (Week 3-4):
- React Native mobile dashboard
- Real-time metrics visualization
- Offline capability for field sales

4. Testing & Deployment (Week 5-6):
- Load testing for sync operations
- End-to-end integration testing
- Phased rollout plan

## Immediate Next Steps:
1. Schedule technical deep dive with Salesforce team
2. Begin OAuth 2.0 implementation
3. Set up development environment
4. Create detailed project timeline`,
      additionalNotes: [
        'Consider pilot rollout with selected sales team members',
        'Plan for comprehensive user training',
        'Set up monitoring for integration performance',
        'Document API rate limits and optimization strategies',
      ],
    },
    tags: ['integration', 'salesforce', 'workflow-automation', 'mobile', 'high-priority'],
    relatedTickets: ['GRT-2024-085', 'GRT-2024-088'],
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  {
    id: 'GRT-2024-091',
    title: 'Data Privacy Compliance Update for Customer Analytics Dashboard',
    status: 'New',
    priority: 'medium',
    source: {
      channel: 'Slack',
      channelIcon: '/channelIcons/slack_icon.png',
      threadId: 'SL789012',
      url: 'slack://channel/digital-transform/threads/SL789012',
    },
    createdAt: '2024-03-21T09:30:00Z',
    updatedAt: '2024-03-21T09:30:00Z',
    requester: {
      name: 'Sarah Chen',
      email: 's.chen@globalretail.com',
      role: 'Chief Privacy Officer',
      avatar: '/profiles/sarah_chen.jpg',
      company: 'Global Retail Inc',
    },
    summary: 'Urgent updates needed for customer analytics dashboard to comply with new data privacy regulations and internal governance policies.',
    detailedDescription:
      'Our legal team has identified several areas in the current customer analytics dashboard that need immediate attention to ensure compliance with updated privacy regulations. We need to implement new data anonymization protocols and update our data retention policies in the analytics system.',
    communications: [
      {
        id: 'comm-001',
        type: 'slack',
        sender: 'Sarah Chen',
        timestamp: '2024-03-21T09:30:00Z',
        content: `@channel Important: Following our legal review, we need immediate updates to our customer analytics dashboard:

Key Requirements:
1. Enhanced data anonymization for customer profiles
2. Implementation of automated data retention rules
3. New consent management integration
4. Audit logging for all data access
5. Updated data export controls

Legal deadline for compliance: April 15th. Attaching the compliance requirements document.`,
        attachments: [
          {
            name: 'privacy_compliance_requirements.pdf',
            type: 'pdf',
            size: '3.2 MB',
            url: '/docs/privacy_compliance_requirements.pdf',
          },
        ],
      },
      {
        id: 'comm-002',
        type: 'slack',
        sender: 'Sarah Chen',
        timestamp: '2024-03-21T10:45:00Z',
        content: `Additional context from legal team:
- New regulations require explicit consent tracking for each data point
- Need capability to handle "right to be forgotten" requests automatically
- Must implement geographic data restrictions
- Required to maintain comprehensive audit trails

I've scheduled a meeting with legal for tomorrow at 2 PM to discuss the details. Can someone from the technical team join?`,
        attachments: [
          {
            name: 'legal_advisory_notes.pdf',
            type: 'pdf',
            size: '1.8 MB',
            url: '/docs/legal_advisory_notes.pdf',
          },
        ],
      },
    ],
    attachedDocs: [
      {
        name: 'Data Privacy Impact Assessment',
        type: 'pdf',
        size: '4.7 MB',
        uploadedAt: '2024-03-21T09:30:00Z',
        uploadedBy: 'Sarah Chen',
        url: '/docs/privacy_impact_assessment.pdf',
      },
      {
        name: 'Current Data Flow Diagram',
        type: 'ppt',
        size: '2.3 MB',
        uploadedAt: '2024-03-21T10:45:00Z',
        uploadedBy: 'Sarah Chen',
        url: '/docs/data_flow_diagram.ppt',
      },
    ],
    aiAnalysis: {
      suggestedPriority: 'high',
      keyPoints: [
        'Compliance deadline of April 15th',
        'Multiple new privacy features required',
        'Affects core analytics functionality',
        'Legal and regulatory requirements driver',
      ],
      technicalContext: [
        'Data anonymization algorithms needed',
        'Consent management system integration required',
        'Audit logging system implementation',
        'Geographic data filtering capabilities',
      ],
      businessImpact: 'Critical compliance requirement with potential legal and financial risks if not implemented by deadline.',
      estimatedEffort: 'Large (3-4 weeks for full implementation)',
    },
    aiSuggestedSolution: {
      type: 'code',
      summary: 'Implementation plan for privacy-compliant data handling',
      content: `// Data Anonymization Implementation

interface AnonymizationConfig {
  fields: string[];
  method: 'hash' | 'mask' | 'generalize';
  retentionPeriod: number;
}

const customerDataAnonymizer = async (data: CustomerData, config: AnonymizationConfig): Promise<AnonymizedData> => {
  const anonymized = await Promise.all(
    data.map(async (record) => {
      // Apply field-specific anonymization
      const anonymizedRecord = {};
      for (const field of config.fields) {
        if (record[field]) {
          anonymizedRecord[field] = await anonymizeField(
            record[field],
            config.method
          );
        }
      }
      
      // Add audit trail
      anonymizedRecord.metadata = {
        anonymizedAt: new Date().toISOString(),
        retentionExpiry: calculateRetentionDate(config.retentionPeriod),
        consentStatus: await validateConsent(record.customerId)
      };
      
      return anonymizedRecord;
    })
  );

  // Log audit trail
  await logAuditTrail({
    action: 'data_anonymization',
    recordCount: data.length,
    timestamp: new Date().toISOString()
  });

  return anonymized;
};

// Consent Management Integration
interface ConsentStatus {
  customerId: string;
  consents: {
    [key: string]: {
      granted: boolean;
      timestamp: string;
      expiryDate?: string;
    };
  };
  geographicRestrictions?: string[];
}

const consentManager = {
  async validateConsent(customerId: string): Promise<ConsentStatus> {
    // Implement consent validation logic
  },
  
  async updateConsent(customerId: string, updates: Partial<ConsentStatus>): Promise<void> {
    // Implement consent update logic
  },
  
  async handleDeletionRequest(customerId: string): Promise<void> {
    // Implement right to be forgotten
  }
};`,
      additionalNotes: [
        'Implement rate limiting for batch operations',
        'Add monitoring for consent status changes',
        'Create automated compliance reports',
        'Set up alert system for retention period violations',
      ],
    },
    tags: ['compliance', 'privacy', 'data-governance', 'high-priority', 'legal-requirement'],
    relatedTickets: ['GRT-2024-087', 'GRT-2024-089'],
  },

  // //////////////////////////////////////////////////////////////////////////////////////////////////////////

  {
    id: 'GRT-2024-092',
    title: 'E-commerce Platform: Bulk Import Feature Request',
    status: 'New',
    priority: 'low',
    source: {
      channel: 'Gmail',
      channelIcon: '/channelIcons/gmail_icon.png',
      threadId: '9876543210',
    },
    createdAt: '2024-03-21T13:45:00Z',
    updatedAt: '2024-03-21T13:45:00Z',
    requester: {
      name: 'Michael Rodriguez',
      email: 'm.rodriguez@globalretail.com',
      role: 'Technical Lead',
      avatar: '/profiles/michael_rodriguez.jpg',
      company: 'Global Retail Inc',
    },
    summary: 'Need to implement bulk product import functionality for the new e-commerce platform to support catalog expansion.',
    detailedDescription:
      'The merchandising team needs the ability to bulk import product data via CSV/Excel files. Current manual entry process is too time-consuming for our expanding catalog.',
    communications: [
      {
        id: 'comm-001',
        type: 'email',
        sender: 'Michael Rodriguez',
        timestamp: '2024-03-21T13:45:00Z',
        content:
          'Hi team, The merchandising team is struggling with the manual product entry process. They need a way to upload multiple products at once. Can we add a bulk import feature that supports CSV/Excel uploads with basic validation?',
        attachments: [
          {
            name: 'sample_product_data.xlsx',
            type: 'xlsx',
            size: '1.2 MB',
            url: '/docs/sample_product_data.xlsx',
          },
        ],
      },
    ],
    attachedDocs: [
      {
        name: 'Product Import Requirements',
        type: 'pdf',
        size: '0.8 MB',
        uploadedAt: '2024-03-21T13:45:00Z',
        uploadedBy: 'Michael Rodriguez',
        url: '/docs/product_import_requirements.pdf',
      },
    ],
    aiAnalysis: {
      suggestedPriority: 'medium',
      keyPoints: ['Bulk import functionality needed', 'Support for CSV/Excel formats', 'Basic validation requirements', 'Aimed at improving merchandising efficiency'],
      technicalContext: ['File upload handling required', 'Data validation implementation', 'Database batch processing'],
      businessImpact: 'Significant time savings for merchandising team. Currently spending 4-5 hours daily on manual entry.',
      estimatedEffort: 'Medium (1-2 weeks for implementation)',
    },
    aiSuggestedSolution: {
      type: 'code',
      summary: 'Implement bulk import feature with validation',
      content: `// Basic implementation structure for bulk import
const handleBulkImport = async (file: File): Promise<ImportResult> => {
  const data = await parseExcelFile(file);
  const validationResults = validateProductData(data);
  
  if (validationResults.hasErrors) {
    return {
      success: false,
      errors: validationResults.errors
    };
  }
  
  return await batchInsertProducts(data);
};`,
      additionalNotes: ['Add progress tracking', 'Implement error reporting'],
    },
    tags: ['feature-request', 'e-commerce', 'data-import'],
    relatedTickets: ['GRT-2024-085'],
  },
  {
    id: 'GRT-2024-093',
    title: 'Update Data Retention Settings in Analytics Dashboard',
    status: 'New',
    priority: 'low',
    source: {
      channel: 'Slack',
      channelIcon: '/channelIcons/slack_icon.png',
      threadId: 'SL789014',
    },
    createdAt: '2024-03-21T15:20:00Z',
    updatedAt: '2024-03-21T15:20:00Z',
    requester: {
      name: 'Sarah Chen',
      email: 's.chen@globalretail.com',
      role: 'Chief Privacy Officer',
      avatar: '/profiles/sarah_chen.jpg',
      company: 'Global Retail Inc',
    },
    summary: 'Quick update needed to data retention settings in the analytics dashboard to align with updated policy.',
    detailedDescription: 'Need to update the data retention period from 24 months to 18 months in the analytics dashboard to comply with new internal policy.',
    communications: [
      {
        id: 'comm-001',
        type: 'slack',
        sender: 'Sarah Chen',
        timestamp: '2024-03-21T15:20:00Z',
        content:
          '@dev-team Quick request: We need to update the data retention period in the analytics dashboard from 24 to 18 months. This is part of our new data minimization policy. Can you help implement this change?',
      },
    ],
    attachedDocs: [
      {
        name: 'Updated Retention Policy',
        type: 'pdf',
        size: '0.5 MB',
        uploadedAt: '2024-03-21T15:20:00Z',
        uploadedBy: 'Sarah Chen',
        url: '/docs/updated_retention_policy.pdf',
      },
    ],
    aiAnalysis: {
      suggestedPriority: 'medium',
      keyPoints: ['Simple configuration change needed', 'Affects data retention period', 'Part of data minimization policy'],
      technicalContext: ['Configuration update required', 'Data cleanup job modification'],
      businessImpact: 'Ensures compliance with internal data retention policies.',
      estimatedEffort: 'Small (1-2 days for implementation)',
    },
    aiSuggestedSolution: {
      type: 'configuration',
      summary: 'Update retention period configuration',
      content: `// Update retention period configuration
config.analytics.retentionPeriod = 18 * 30; // 18 months in days

// Update cleanup job schedule
const cleanupSchedule = {
  frequency: 'daily',
  retentionPeriod: 18,
  enabled: true
};`,
      additionalNotes: ['Schedule data cleanup job', 'Update documentation'],
    },
    tags: ['configuration', 'data-retention', 'compliance'],
    relatedTickets: ['GRT-2024-091'],
  },
];
