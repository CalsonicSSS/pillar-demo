import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { projectStatusData } from '@/data/mockProjectData';
import { CheckCircle, Clock, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const VendorSheet = () => {
  return (
    <div className='space-y-8'>
      <h3 className='text-lg font-semibold mb-4'>Vendor Partners</h3>
      <ScrollArea className='h-[88vh] px-5'>
        {projectStatusData.vendorPartners.map((vendor, idx) => (
          <div key={idx} className='mb-8 rounded-lg border p-6'>
            {/* Company Header */}
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-4'>
                <Image src={vendor.companyLogo} alt={vendor.companyName} width={150} height={150} className='w-32 h-26 rounded-full' />
                <div>
                  <h4 className='text-xl font-semibold'>{vendor.companyName}</h4>
                  <div className='flex gap-2 mt-2'>
                    <Badge variant='outline' className='flex items-center gap-1'>
                      <MapPin className='h-3 w-3' />
                      {vendor.teamLead.location}
                    </Badge>
                    <Badge variant='outline' className='flex items-center gap-1'>
                      <Clock className='h-3 w-3' />
                      {vendor.teamLead.timezone}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <p className='text-sm text-muted-foreground'>Contract Value</p>
                <p className='font-semibold mt-2'>{vendor.contractValue}</p>
              </div>
            </div>

            {/* Work Scope & Milestones */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
              <Card className='p-4'>
                <h5 className='font-medium mb-2'>Work Scope</h5>
                <p className='text-sm text-muted-foreground'>{vendor.workScope}</p>
                <div className='mt-4'>
                  <h6 className='text-sm font-medium mb-2'>Deliverables</h6>
                  <ul className='text-sm space-y-1'>
                    {vendor.deliverables.map((item, i) => (
                      <li key={i} className='flex items-center gap-2'>
                        <CheckCircle className='h-4 w-4 text-green-500' />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
              <Card className='p-4'>
                <h5 className='font-medium mb-2'>Milestones</h5>
                <div className='space-y-3'>
                  <div>
                    <p className='text-sm text-muted-foreground'>Last Completed</p>
                    <p className='text-sm'>{vendor.lastMilestone}</p>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Next Up</p>
                    <p className='text-sm'>{vendor.nextMilestone}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Team Lead */}
            <div className='mb-6'>
              <h5 className='font-medium mb-4'>Team Lead</h5>
              <div className='flex gap-4 items-start'>
                <Image src={vendor.teamLead.avatar} alt={vendor.teamLead.name} width={80} height={80} className='w-20 h-20 rounded-full' />
                <div className='flex-1'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h6 className='font-medium'>{vendor.teamLead.name}</h6>
                      <p className='text-sm text-muted-foreground'>{vendor.teamLead.position}</p>
                    </div>
                  </div>
                  <div className='mt-3 flex gap-3'>
                    <Badge variant='outline' className='flex items-center gap-2'>
                      <Mail className='h-4 w-4' />
                      {vendor.teamLead.email}
                    </Badge>
                    <Badge variant='outline' className='flex items-center gap-2'>
                      <Phone className='h-4 w-4' />
                      {vendor.teamLead.phone}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className='mb-6'>
              <h5 className='font-medium mb-3'>Team Members</h5>
              <div className='grid grid-cols-2 gap-4'>
                {vendor.team.map((member, i) => (
                  <div key={i} className='flex items-center gap-3 p-3 border rounded-lg'>
                    <Avatar className='h-8 w-8'>
                      <AvatarFallback>
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium'>{member.name}</p>
                      <p className='text-xs text-muted-foreground'>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Contact */}
            <div>
              <h5 className='font-medium mb-3'>Support Contact</h5>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <p className='text-sm text-muted-foreground'>Support Email</p>
                  <p className='text-sm'>{vendor.contactInfo.supportEmail}</p>
                  <p className='text-sm text-muted-foreground mt-2'>Support Phone</p>
                  <p className='text-sm'>{vendor.contactInfo.supportPhone}</p>
                </div>
                <div className='space-y-2'>
                  <p className='text-sm text-muted-foreground'>Emergency Contact</p>
                  <p className='text-sm'>{vendor.contactInfo.emergencyContact}</p>
                  <p className='text-sm text-muted-foreground mt-2'>Office Address</p>
                  <p className='text-sm'>{vendor.contactInfo.officeAddress}</p>
                </div>
              </div>
            </div>

            {/* Last Interaction */}
            <div className='mt-6 pt-4 border-t flex items-center gap-2 text-sm text-muted-foreground'>
              <Clock className='h-4 w-4' />
              <span>Last interaction: {new Date(vendor.lastInteraction).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default VendorSheet;
