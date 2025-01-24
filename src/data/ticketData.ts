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
    title: 'Performance Degradation in Product Search API',
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
        sender: 'Nina Patel',
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
        sender: 'Emma Thompson',
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
];
