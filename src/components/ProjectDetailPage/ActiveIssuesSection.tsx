import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { IssueTicketCard } from './IssueTicketCard';
import { activeTickets } from '@/data/ticketData';
import { IssueTicket } from '@/data/ticketData';
import { TicketDrawer } from './TicketDetailDrawer';

export function ActiveIssuesSection() {
  const [selectedTicket, setSelectedTicket] = useState<IssueTicket | null>(null);
  const [open, setOpen] = useState(false);

  const handleTicketClick = (ticketId: string) => {
    const ticket = activeTickets.find((t) => t.id === ticketId);
    if (ticket) {
      setSelectedTicket(ticket);
      setOpen(true);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Only clear the selected ticket after the drawer closes
      setTimeout(() => {
        setSelectedTicket(null);
      }, 300); // Match this with your drawer's transition duration
    }
  };

  return (
    <div className='mt-10'>
      {/* Section Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-semibold mb-1'>Active Tickets</h2>
          <p className='text-muted-foreground'>{activeTickets.length} unresolved issues requiring attention</p>
        </div>
        <div className='flex gap-3'>
          <Button variant='outline' size='sm'>
            <Filter className='w-4 h-4 mr-2' />
            Filter
          </Button>
          <Button variant='outline' size='sm'>
            <SlidersHorizontal className='w-4 h-4 mr-2' />
            Sort
          </Button>
        </div>
      </div>

      {/* Issues Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5'>
        {activeTickets.map((ticket) => (
          <IssueTicketCard key={ticket.id} ticket={ticket} onClick={() => handleTicketClick(ticket.id)} />
        ))}
      </div>

      {/* Ticket Detail Drawer */}
      {selectedTicket && <TicketDrawer ticket={selectedTicket} open={open} onOpenChange={handleOpenChange} />}
    </div>
  );
}
