import { projectStatusData } from '@/data/mockData';
import { Mail, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const TeamSheet = () => {
  return (
    <div className='space-y-6 p-2'>
      <h3 className='text-lg font-semibold'>Internal Team</h3>

      {/* Project Leadership */}
      <div>
        <h4 className='text-sm text-muted-foreground mb-4'>Project Leadership</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {projectStatusData.internalTeam
            .filter((member) => member.role.includes('PM') || member.role.includes('Lead'))
            .map((member, idx) => (
              <div key={idx} className='rounded-lg border bg-card p-4'>
                <div className='flex items-start gap-3'>
                  <Avatar className='h-10 w-10'>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className='bg-secondary'>
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h5 className='font-medium'>{member.name}</h5>
                        <p className='text-sm text-muted-foreground'>{member.role}</p>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm text-muted-foreground'>{member.department}</p>
                        <p className='text-xs text-muted-foreground'>Joined {new Date(member.joinedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className='flex gap-2 mt-3'>
                      <Button variant='secondary' size='sm' className='h-8'>
                        <Mail className='h-4 w-4 mr-2' />
                        Email
                      </Button>
                      <Button variant='secondary' size='sm' className='h-8'>
                        <MessageSquare className='h-4 w-4 mr-2' />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Team Members */}
      <div>
        <h4 className='text-sm text-muted-foreground mb-4'>Team Members</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {projectStatusData.internalTeam
            .filter((member) => !member.role.includes('Manager') && !member.role.includes('Lead'))
            .map((member, idx) => (
              <div key={idx} className='rounded-lg border bg-card p-4'>
                <div className='flex items-center gap-3'>
                  <Avatar className='h-10 w-10'>
                    <AvatarFallback className='bg-secondary'>
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex-1'>
                    <div className='flex justify-between items-start mb-1'>
                      <div>
                        <h5 className='font-medium'>{member.name}</h5>
                        <p className='text-sm text-muted-foreground'>{member.role}</p>
                      </div>
                      <p className='text-sm text-muted-foreground'>{member.department}</p>
                    </div>
                  </div>
                </div>
                <div className='mt-2 pt-2 border-t flex justify-between items-center'>
                  <p className='text-sm text-muted-foreground'>Since {new Date(member.joinedDate).toLocaleDateString()}</p>
                  <Button variant='ghost' size='sm' className='h-7 px-2'>
                    <Mail className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSheet;
