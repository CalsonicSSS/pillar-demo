// types/completedWork.ts

export interface CompletedWork {
  id: string;
  title: string;
  completedDate: string;
  type: 'feature' | 'infrastructure' | 'security' | 'optimization' | 'documentation';
  summary: string;
  stakeholders: {
    client: Array<{
      name: string;
      role: string;
      email: string;
      avatar?: string;
    }>;
    internal: Array<{
      name: string;
      role: string;
      email: string;
      avatar?: string;
    }>;
    vendors?: Array<{
      name: string;
      company: string;
      role: string;
      email: string;
      avatar?: string;
    }>;
  };
  deliverables: Array<{
    name: string;
    type: 'document' | 'code' | 'design' | 'configuration';
    url: string;
    size?: string;
  }>;
  impact: {
    benefits: string[];
    metrics?: {
      label: string;
      value: string;
    }[];
  };
  relatedTickets?: string[];
}

// mockCompletedWorkData.ts
export const completedWorks: CompletedWork[] = [
  {
    id: 'CW001',
    title: 'Cloud Infrastructure Migration Phase 1',
    completedDate: '2024-03-15',
    type: 'infrastructure',
    summary: 'Successfully migrated core application services to AWS cloud infrastructure with zero downtime',
    stakeholders: {
      client: [
        {
          name: 'Sarah Chen',
          role: 'IT Director',
          email: 'sarah.chen@globalretail.com',
          avatar: '/avatars/sarah.jpg',
        },
      ],
      internal: [
        {
          name: 'Michael Torres',
          role: 'Cloud Architect',
          email: 'm.torres@agency.com',
          avatar: '/avatars/michael.jpg',
        },
      ],
      vendors: [
        {
          name: 'John Smith',
          company: 'AWS Professional Services',
          role: 'Senior Solutions Architect',
          email: 'john.smith@aws.com',
        },
      ],
    },
    deliverables: [
      {
        name: 'Migration Architecture Documentation',
        type: 'document',
        url: '/docs/migration-arch.pdf',
        size: '2.4 MB',
      },
      {
        name: 'Infrastructure as Code Repository',
        type: 'code',
        url: '/code/infra-phase1.zip',
        size: '1.1 MB',
      },
    ],
    impact: {
      benefits: ['Reduced infrastructure costs by 35%', 'Improved application response time by 60%', 'Enhanced system scalability and reliability'],
      metrics: [
        { label: 'Cost Savings', value: '35%' },
        { label: 'Performance Improvement', value: '60%' },
      ],
    },
    relatedTickets: ['TICKET-123', 'TICKET-124'],
  },
  {
    id: 'CW002',
    title: 'E-commerce Platform Modernization',
    completedDate: '2024-02-28',
    type: 'feature',
    summary: 'Upgraded e-commerce platform with modern microservices architecture and enhanced user experience',
    stakeholders: {
      client: [
        {
          name: 'Emily Wong',
          role: 'Digital Commerce Manager',
          email: 'emily.wong@globalretail.com',
          avatar: '/avatars/emily.jpg',
        },
      ],
      internal: [
        {
          name: 'David Kumar',
          role: 'Technical Lead',
          email: 'd.kumar@agency.com',
          avatar: '/avatars/david.jpg',
        },
      ],
    },
    deliverables: [
      {
        name: 'Technical Architecture Overview',
        type: 'document',
        url: '/docs/ecommerce-arch.pdf',
        size: '3.2 MB',
      },
      {
        name: 'User Experience Documentation',
        type: 'document',
        url: '/docs/ux-guidelines.pdf',
        size: '1.8 MB',
      },
    ],
    impact: {
      benefits: ['Increased conversion rate by 25%', 'Reduced page load time by 40%', 'Improved mobile experience'],
      metrics: [
        { label: 'Conversion Rate', value: '+25%' },
        { label: 'Load Time', value: '-40%' },
      ],
    },
  },
  {
    id: 'CW003',
    title: 'Security Enhancement Implementation',
    completedDate: '2024-02-15',
    type: 'security',
    summary: 'Implemented comprehensive security measures including zero-trust architecture and enhanced monitoring',
    stakeholders: {
      client: [
        {
          name: 'Robert Chen',
          role: 'CISO',
          email: 'r.chen@globalretail.com',
          avatar: '/avatars/robert.jpg',
        },
      ],
      internal: [
        {
          name: 'Alice Johnson',
          role: 'Security Engineer',
          email: 'a.johnson@agency.com',
          avatar: '/avatars/alice.jpg',
        },
      ],
    },
    deliverables: [
      {
        name: 'Security Architecture Document',
        type: 'document',
        url: '/docs/security-arch.pdf',
        size: '4.1 MB',
      },
      {
        name: 'Security Policies and Procedures',
        type: 'document',
        url: '/docs/security-policies.pdf',
        size: '2.3 MB',
      },
    ],
    impact: {
      benefits: ['Enhanced system security posture', 'Achieved compliance with industry standards', 'Reduced security incidents by 80%'],
      metrics: [
        { label: 'Security Incidents', value: '-80%' },
        { label: 'Compliance Score', value: '98%' },
      ],
    },
  },
];
