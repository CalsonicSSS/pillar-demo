import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { projectStatusData } from '@/data/mockData';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

const ClientInfoSheet = () => {
  return (
    <div className='space-y-8'>
      <h3 className='text-lg font-semibold mb-4'>Client Stakeholders</h3>
      <ScrollArea className='h-[88vh] px-5'>
        {projectStatusData.clientInfo.stakeholders.map((stakeholder, idx) => (
          <div key={idx} className='mb-8 rounded-lg border p-6'>
            <div className='flex gap-6'>
              {/* Left Panel - Avatar and Name */}
              <div className='flex flex-col items-start'>
                <div className='relative'>
                  <Image src={stakeholder.avatar} alt={stakeholder.name} width={150} height={150} className='w-32 h-32 rounded-full object-cover' />
                  <div className='absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white' />
                </div>
                <h4 className='mt-3 font-semibold text-lg'>{stakeholder.name}</h4>
                <p className='text-sm text-muted-foreground'>{stakeholder.position}</p>
                {/* Engagement Channels */}
                <div className='grid grid-cols-2 gap-3 mt-4'>
                  {stakeholder.engagedChannels.map((channel, idx) => (
                    <div key={idx} className='flex items-center gap-1'>
                      <Image src={channel.icon} alt={channel.channelName} width={20} height={20} />
                      <span className='text-sm'>{channel.channelName}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Panel - Details */}
              <div className='flex-1 space-y-4'>
                {/* Contact Info Section */}
                <div>
                  <h5 className='text-sm font-medium text-muted-foreground mb-3'>Contact Information</h5>
                  <div className='space-y-3'>
                    <div className='flex items-center gap-3 flex-wrap'>
                      <Badge variant='outline' className='flex items-center gap-2 px-3 py-1.5 h-8'>
                        <Mail className='h-4 w-4 text-muted-foreground flex-shrink-0' />
                        <span className='font-medium truncate max-w-[200px]'>{stakeholder.email}</span>
                      </Badge>
                      <Badge variant='outline' className='flex items-center gap-2 px-3 py-1.5 h-8'>
                        <Phone className='h-4 w-4 text-muted-foreground flex-shrink-0' />
                        <span className='font-medium'>{stakeholder.phone}</span>
                      </Badge>
                    </div>
                    <div className='flex items-center gap-3 flex-wrap'>
                      <Badge variant='outline' className='flex items-center gap-2 px-3 py-1.5 h-8'>
                        <MapPin className='h-4 w-4 text-muted-foreground flex-shrink-0' />
                        <span className='font-medium'>{stakeholder.location}</span>
                      </Badge>
                      <Badge variant='outline' className='flex items-center gap-2 px-3 py-1.5 h-8'>
                        <Clock className='h-4 w-4 text-muted-foreground flex-shrink-0' />
                        <span className='font-medium'>{stakeholder.timezone}</span>
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Project Involvement */}
                <div>
                  <h5 className='text-sm font-medium text-muted-foreground mb-2'>Project Involvement</h5>
                  <p className='text-sm'>{stakeholder.projectInvolvement}</p>
                </div>

                {/* Bio */}
                {/* <div>
                    <h5 className='text-sm font-medium text-muted-foreground mb-2'>Bio</h5>
                    <p className='text-sm'>{stakeholder.bio}</p>
                  </div> */}

                {/* Last Interaction */}
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Clock className='h-4 w-4' />
                  <span>Last interaction: {new Date(stakeholder.lastInteraction).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ClientInfoSheet;
