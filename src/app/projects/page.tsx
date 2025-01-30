'use client';

import React, { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { projects } from '@/data/mockProjectData';

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all'); // State for filter

  // Filter projects based on the selected option
  const filteredProjects = projects.filter((project) => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

  return (
    <>
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold mb-2'>Projects Overview</h1>
          <div className='flex space-x-4'>
            <Button>Create New Project</Button>
            <Select onValueChange={(value: string) => setFilter(value)} defaultValue='all'>
              <SelectTrigger>
                <SelectValue placeholder='Filter Projects' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All</SelectItem>
                <SelectItem value='active'>Active</SelectItem>
                <SelectItem value='completed'>Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className='text-slate-600 dark:text-slate-400'>Manage and track all your ongoing and completed projects</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredProjects
          .sort((a, b) => b.unresolvedRequests - a.unresolvedRequests) // Sort in descending order based on unresolvedRequests
          .map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
      </div>
    </>
  );
};

export default ProjectsPage;
