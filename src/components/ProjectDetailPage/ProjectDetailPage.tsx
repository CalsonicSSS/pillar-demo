'use client';

import { Users2, Building2, MessageCircle, UserRoundCog } from 'lucide-react';
import { StatusCard } from '@/components/ProjectDetailPage/ProjectStatusCard';
import { projectStatusData } from '@/data/mockData';
import ClientInfoSheet from './DetailSheet/ClientSheet';
import VendorSheet from './DetailSheet/VendorSheet';
import ChannelsSheet from './DetailSheet/ChannelSheet';
import TeamSheet from './DetailSheet/TeamSheet';
import { IssueTicketCard } from './IssueTicketCard';
import { activeTickets } from '@/data/ticketData';
import { ActiveIssuesSection } from './ActiveIssuesSection';

export default function ProjectDetailPage() {
  return (
    <div className='space-y-8'>
      <div>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold mb-2'>Digital Transformation Strategy</h1>
        </div>
        <p className='text-slate-600 dark:text-slate-400'>Global Retail Inc</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatusCard
          title='Client Information'
          icon={<Users2 className='h-6 w-6 text-muted-foreground' />}
          summary='Key stakeholders and client contacts'
          metrics={[
            { label: 'Stakeholders', value: projectStatusData.clientInfo.stakeholders.length },
            { label: 'Primary Contact', value: 'Sarah Chen' },
          ]}
          sheetContent={<ClientInfoSheet />}
        />

        <StatusCard
          title='Vendor Partners'
          icon={<Building2 className='h-6 w-6 text-muted-foreground' />}
          summary='External partners and vendors'
          metrics={[
            { label: 'Active Partners', value: projectStatusData.vendorPartners.length },
            { label: 'Primary Vendor', value: 'CloudTech Solutions' },
          ]}
          sheetContent={<VendorSheet />}
        />

        <StatusCard
          title='Engagement Channels'
          icon={<MessageCircle className='h-6 w-6 text-muted-foreground' />}
          summary='Active communication channels'
          metrics={[
            { label: 'Active Channels', value: projectStatusData.engagementChannels.length },
            { label: 'Primary Channel', value: 'Gmail' },
          ]}
          sheetContent={<ChannelsSheet />}
        />

        <StatusCard
          title='Internal Team'
          icon={<UserRoundCog className='h-6 w-6 text-muted-foreground' />}
          summary='Agency team members assigned'
          metrics={[
            { label: 'Team Size', value: projectStatusData.internalTeam.length },
            { label: 'Departments', value: '4' },
          ]}
          sheetContent={<TeamSheet />}
        />
      </div>

      <ActiveIssuesSection />
    </div>
  );
}
