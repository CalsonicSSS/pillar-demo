// components/ProjectDetailPage/CompletedWorkSection.tsx

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CompletedWorkDrawer } from './CompletedWorkDrawer';
import { CheckCircle2, Server, Rocket, Shield, FileText, Zap, ChevronRight } from 'lucide-react';
import { CompletedWork, completedWorks } from '@/data/mockCompletedWorkData';
import { Timeline, TimelineItem } from '@/components/ProjectDetailPage/CompletedWorkSection/Timeline';

const typeConfig = {
  feature: {
    icon: Rocket,
    color: 'bg-purple-500/15 text-purple-700 dark:text-purple-400',
  },
  infrastructure: {
    icon: Server,
    color: 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
  },
  security: {
    icon: Shield,
    color: 'bg-red-500/15 text-red-700 dark:text-red-400',
  },
  optimization: {
    icon: Zap,
    color: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
  },
  documentation: {
    icon: FileText,
    color: 'bg-green-500/15 text-green-700 dark:text-green-400',
  },
};

export function CompletedWorkSection() {
  const [selectedWork, setSelectedWork] = useState<CompletedWork | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setDrawerOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setSelectedWork(null);
      }, 300);
    }
  };

  return (
    <div className='mt-10'>
      {/* Section Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-semibold mb-1'>Completed Work</h2>
          <p className='text-muted-foreground'>Timeline of delivered solutions and implementations</p>
        </div>
      </div>

      {/* Timeline */}
      <ScrollArea className='relative'>
        <Timeline>
          {completedWorks.map((work, index) => {
            const TypeIcon = typeConfig[work.type].icon;

            return (
              <TimelineItem key={work.id}>
                <Card
                  className='hover:shadow-md transition-shadow cursor-pointer'
                  onClick={() => {
                    setSelectedWork(work);
                    setDrawerOpen(true);
                  }}
                >
                  <CardContent className='p-4'>
                    {/* Header with Type Badge and Date */}
                    <div className='flex items-center justify-between mb-3'>
                      <Badge variant='secondary' className={typeConfig[work.type].color}>
                        <TypeIcon className='w-3 h-3 mr-1' />
                        {work.type.charAt(0).toUpperCase() + work.type.slice(1)}
                      </Badge>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <CheckCircle2 className='w-4 h-4 text-green-500' />
                        {new Date(work.completedDate).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Title and Summary */}
                    <div className='flex items-start justify-between'>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold mb-1'>{work.title}</h3>
                        <p className='text-sm text-muted-foreground line-clamp-2'>{work.summary}</p>
                      </div>
                      <ChevronRight className='w-5 h-5 text-muted-foreground mt-1 flex-shrink-0' />
                    </div>

                    {/* Impact Metrics */}
                    {work.impact.metrics && (
                      <div className='mt-4 flex flex-wrap gap-2'>
                        {work.impact.metrics.map((metric, idx) => (
                          <Badge key={idx} variant='outline'>
                            {metric.label}: {metric.value}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Stakeholders Avatars */}
                    <div className='mt-4 flex items-center justify-between'>
                      <div className='flex -space-x-2'>
                        {work.stakeholders.client.slice(0, 3).map((person, idx) => (
                          <div key={idx} className='relative'>
                            <div className='w-8 h-8 rounded-full overflow-hidden border-2 border-background'>
                              {person.avatar ? (
                                <img src={person.avatar} alt={person.name} className='w-full h-full object-cover' />
                              ) : (
                                <div className='w-full h-full bg-primary/10 flex items-center justify-center text-xs font-medium'>
                                  {person.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        {work.stakeholders.client.length > 3 && (
                          <div className='w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background'>
                            +{work.stakeholders.client.length - 3}
                          </div>
                        )}
                      </div>

                      {/* Deliverables Count */}
                      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <FileText className='w-4 h-4' />
                        {work.deliverables.length} deliverables
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TimelineItem>
            );
          })}
        </Timeline>
      </ScrollArea>

      {/* Drawer */}
      {selectedWork && <CompletedWorkDrawer work={selectedWork} open={drawerOpen} onOpenChange={handleOpenChange} />}
    </div>
  );
}
