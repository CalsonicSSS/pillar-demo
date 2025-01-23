import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ReactNode, useState } from 'react';

interface StatusCardProps {
  title: string;
  icon: ReactNode;
  summary: string;
  metrics: {
    label: string;
    value: string | number;
  }[];
  sheetContent: ReactNode;
}

export function StatusCard({ title, icon, summary, metrics, sheetContent }: StatusCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card className='cursor-pointer hover:shadow-md transition-shadow' onClick={() => setIsOpen(true)}>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
            {icon}
          </div>
          <p className='text-sm text-muted-foreground'>{summary}</p>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            {metrics.map((metric, index) => (
              <div key={index} className='flex justify-between items-center text-sm'>
                <span className='text-muted-foreground'>{metric.label}</span>
                <span className='font-medium'>{metric.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className='sm:max-w-2xl'>{sheetContent}</SheetContent>
      </Sheet>
    </>
  );
}
