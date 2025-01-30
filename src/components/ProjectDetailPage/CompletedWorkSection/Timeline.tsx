import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface TimelineProps {
  children: ReactNode;
  className?: string;
}

interface TimelineItemProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn('relative ml-4', className)}>
      {/* Adjusted the line position to be exactly centered */}
      <div className='absolute left-0 top-[24px] h-[calc(100%-24px)] w-[1px] bg-border' style={{ transform: 'translateX(-50%)' }} />
      <div className='space-y-12 relative'>{children}</div>
    </div>
  );
}

export function TimelineItem({ children, active = false, className }: TimelineItemProps) {
  return (
    <div className={cn('relative pl-8', className)}>
      {/* Adjusted dot positioning for perfect center alignment */}
      <div
        className={cn('absolute left-0 top-[22px] h-3 w-3 rounded-full border-2 bg-background', active ? 'border-primary' : 'border-border')}
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div className='pt-2'>{children}</div>
    </div>
  );
}
