// components/ProjectDetailPage/CompletedWorkSection/index.tsx
import { useState } from 'react';
import { CompletedWork, completedWorks } from '@/data/mockCompletedWorkData';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Server,
  Rocket,
  Shield,
  Zap,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { CompletedWorkDrawer } from './CompletedWorkDrawer';

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
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setSelectedWork(null);
      }, 300);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Completed Work</h2>
          <p className="text-muted-foreground">
            Timeline of delivered solutions and implementations
          </p>
        </div>
      </div>

      <ScrollArea className="relative">
        <div className="space-y-8 relative pl-8 pb-8">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[19px] top-[24px] bottom-0 w-px bg-border" />

          {completedWorks.map((work, index) => {
            const TypeIcon = typeConfig[work.type].icon;
            return (
              <div key={work.id} className="relative">
                {/* Timeline Node */}
                <div className="absolute -left-8 w-4 h-4 rounded-full bg-background border-2 border-primary mt-1.5" />
                
                <Card
                  className="ml-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedWork(work);
                    setOpen(true);
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        variant="secondary"
                        className={typeConfig[work.type].color}
                      >
                        <TypeIcon className="w-3 h-3 mr-1" />
                        {work.type.charAt(0).toUpperCase() + work.type.slice(1)}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(work.completedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">{work.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {work.summary}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {work.impact.metrics?.map((metric, idx) => (
                        <Badge key={idx} variant="outline">
                          {metric.label}: {metric.value}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {selectedWork && (
        <CompletedWorkDrawer
          work={selectedWork}
          open={open}
          onOpenChange={handleOpenChange}
        />
      )}
    </div>
  );
}

// components/ProjectDetailPage/CompletedWorkSection/CompletedWorkDrawer.tsx
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  CheckCircle2,
  FileText,
  Users,
  Building2,
  X,
  Download,
  Link,
  ChartBar,
} from 'lucide-react';
import { CompletedWork } from '@/data/mockCompletedWorkData';

interface CompletedWorkDrawerProps {
  work: CompletedWork;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CompletedWorkDrawer({
  work,
  open,
  onOpenChange,
}: CompletedWorkDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[96vh]">
        <div className="mx-auto w-full">
          <div className="h-[90vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline" className="select-text">
                  {work.id}
                </Badge>
                <DrawerClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-muted"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </DrawerClose>
              </div>
              <h2 className="text-xl font-semibold mb-2">{work.title}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>
                  Completed on{" "}
                  {new Date(work.completedDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Main Content */}
            <ScrollArea className="flex-1">
              <div className="p-6 grid grid-cols-3 gap-6">
                {/* Left Column - Stakeholders */}
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Client Stakeholders