'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Project = {
  id: number;
  title: string;
  client: string;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  teamSize: number;
  description: string;
  unresolvedRequests: number;
};

const ProjectCard = ({ id, title, client, status, progress, startDate, endDate, description, unresolvedRequests }: Project) => {
  const router = useRouter();

  return (
    <Card key={id} className='hover:shadow-lg transition-shadow cursor-pointer' onClick={() => router.push(`/projects/${id}`)}>
      <CardHeader>
        <div className='flex items-center justify-start mb-2'>
          <Badge className={`${status === 'active' ? '' : 'bg-green-500 text-white'} mr-3`} variant={status === 'active' ? 'default' : 'secondary'}>
            {status === 'active' ? 'Active' : 'Completed'}
          </Badge>
          <div className='flex items-center space-x-2'>
            {status === 'active' && unresolvedRequests > 0 && (
              <Badge
                variant='outline'
                className='bg-red-200 text-red-600 animate-pulse' // Add the animation class here
              >
                {unresolvedRequests} Unresolved
              </Badge>
            )}
          </div>
        </div>

        <div>
          <div>
            <CardTitle className='text-xl font-semibold mb-2'>{title}</CardTitle>
            <CardDescription className='text-sm'>{client}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-slate-600 dark:text-slate-400 mb-4'>{description}</p>
        <div className='space-y-4'>
          <div>
            <div className='flex justify-between text-sm mb-1'>
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className='h-2' />
          </div>
          <div className='flex justify-between text-sm text-slate-600 dark:text-slate-400'>
            <div className='flex items-center'>
              <CalendarDays className='h-4 w-4 mr-1' />
              <span>
                {new Date(startDate).toLocaleDateString()} - {endDate === 'present' ? 'present' : new Date(endDate).toLocaleDateString()}
              </span>
            </div>
            {/* <div className='flex items-center'>
              <Users className='h-4 w-4 mr-1' />
              <span>{teamSize} team members</span>
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
