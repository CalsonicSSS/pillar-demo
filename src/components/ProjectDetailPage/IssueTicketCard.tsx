import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AlertTriangle, ChevronUp, ChevronsUp, Clock, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { IssueTicket } from '@/data/ticketData';

const priorityConfig = {
  high: {
    color: 'bg-red-500/15 text-red-700 dark:text-red-400',
    icon: AlertTriangle,
  },
  medium: {
    color: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
    icon: ChevronsUp,
  },
  low: {
    color: 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
    icon: ChevronUp,
  },
};

const statusConfig = {
  New: {
    label: 'New',
    color: 'bg-purple-500/15 text-purple-700 dark:text-purple-400',
  },
  'In progress': {
    label: 'In Progress',
    color: 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
  },
  'Pending review': {
    label: 'Pending Review',
    color: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
  },
};

interface IssueTicketCardProps {
  ticket: IssueTicket;
  onClick: () => void;
}

export function IssueTicketCard({ ticket, onClick }: IssueTicketCardProps) {
  const PriorityIcon = priorityConfig[ticket.priority].icon;
  const formattedDate = new Date(ticket.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className='group hover:shadow-md transition-all duration-300 cursor-pointer' onClick={onClick}>
      <CardContent className='p-5'>
        {/* Source & Date */}
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center gap-2'>
            <Image src={ticket.source.channelIcon} alt={ticket.source.channel} width={16} height={16} />
            <div className='flex items-center gap-1 text-xs text-muted-foreground'>
              <Clock className='w-4 h-4' />
              <span className='text-xs'>{new Date(ticket.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <Badge className={priorityConfig[ticket.priority].color} variant='secondary'>
            <PriorityIcon className='w-3 h-3 mr-1' />
            {ticket.priority}
          </Badge>
        </div>

        {/* Title */}
        <div className='mb-4'>
          <h3 className='text-base font-semibold mb-2'>{ticket.title}</h3>
          <p className='text-sm text-muted-foreground line-clamp-2'>{ticket.summary}</p>
        </div>

        {/* People */}
        <div className='flex items-center justify-between mt-6'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-7 w-7 border-2 border-background'>
              <AvatarImage src={ticket.requester.avatar} alt={ticket.requester.name} />
              <AvatarFallback>
                {ticket.requester.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className='flex items-center gap-1 text-muted-foreground'>
              <MessageSquare className='w-4 h-4' />
              <span className='text-xs'>{ticket.communications.length}</span>
            </div>
            {/* {ticket.assignee && (
              <Avatar className='h-7 w-7 border-2 border-background'>
                <AvatarImage src={ticket.assignee.avatar} alt={ticket.assignee.name} />
                <AvatarFallback>
                  {ticket.assignee.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            )} */}
          </div>
          <Badge variant='secondary' className={`${statusConfig[ticket.status].color}`}>
            {statusConfig[ticket.status].label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
