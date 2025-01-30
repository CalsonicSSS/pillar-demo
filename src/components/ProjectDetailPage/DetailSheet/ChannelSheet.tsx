import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { projectStatusData } from '@/data/mockProjectData';
import { CalendarDays, Clock, MessageCircle, Ticket } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

const ChannelsSheet = () => {
  return (
    <div className='space-y-8'>
      <h3 className='text-lg font-semibold mb-4'>Engagement Channels</h3>
      <ScrollArea className='h-[88vh] px-5'>
        {projectStatusData.engagementChannels.map((channel, idx) => (
          <div key={idx} className='mb-8 rounded-lg border p-6'>
            {/* Channel Header */}
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-4'>
                <div className='h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center'>
                  <Image src={channel.icon} alt={channel.type} width={32} height={32} />
                </div>
                <div>
                  <h4 className='text-xl font-semibold'>{channel.name}</h4>
                  <p className='text-sm text-muted-foreground'>{channel.channelId}</p>
                </div>
              </div>
              <Badge variant='outline' className='capitalize'>
                {channel.status}
              </Badge>
            </div>

            {/* Engagement Metrics */}
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6'>
              {Object.entries(channel.engagementMetrics).map(([key, value], i) => (
                <Card key={i} className='p-4'>
                  <p className='text-sm text-muted-foreground capitalize'>{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  <p className='text-lg font-semibold mt-1'>{value}</p>
                </Card>
              ))}
            </div>

            {/* Activity Section */}
            <div className='grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6'>
              {/* Activity Chart */}
              {channel.activityTrend && (
                <Card className='px-3 pt-5'>
                  <h5 className='font-medium mb-4'>Activity Trend (Last 7 Days)</h5>
                  <div className='h-[280px]'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <LineChart data={channel.activityTrend}>
                        <XAxis dataKey='date' tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { weekday: 'short' })} />
                        <YAxis />
                        <Tooltip />
                        <Line type='monotone' dataKey={Object.keys(channel.activityTrend[0]).find((key) => key !== 'date')} stroke='#2563eb' strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}

              {/* Channel Specific Content */}
              <Card className='p-4'>
                {channel.type === 'teams' ? (
                  <div>
                    <h5 className='font-medium mb-4'>Upcoming Meetings</h5>
                    <div className='space-y-4'>
                      {channel.upcomingMeetings?.map((meeting, i) => (
                        <div key={i} className='flex items-start gap-4 p-3 rounded-lg border'>
                          <CalendarDays className='h-5 w-5 text-muted-foreground flex-shrink-0 mt-1' />
                          <div>
                            <p className='font-medium'>{meeting.title}</p>
                            <p className='text-sm text-muted-foreground'>
                              {new Date(meeting.date).toLocaleString()} · {meeting.duration}
                            </p>
                            <Badge variant='secondary' className='mt-2'>
                              {meeting.attendees} attendees
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : channel.type === 'ticket-system' ? (
                  <div>
                    <h5 className='font-medium mb-4'>Recent Tickets</h5>
                    <div className='space-y-3'>
                      {channel.recentTickets?.map((ticket, i) => (
                        <div key={i} className='flex items-start gap-4 p-3 rounded-lg border'>
                          <Ticket className='h-5 w-5 text-muted-foreground flex-shrink-0 mt-1' />
                          <div className='flex-1'>
                            <div className='flex items-start justify-between'>
                              <div>
                                <p className='font-medium'>{ticket.title}</p>
                                <p className='text-sm text-muted-foreground'>
                                  {ticket.id} · Assigned to {ticket.assignee}
                                </p>
                              </div>
                              <Badge
                                className={
                                  ticket.priority === 'High'
                                    ? 'bg-red-100 text-red-800'
                                    : ticket.priority === 'Medium'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                                }
                              >
                                {ticket.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <h5 className='font-medium mb-4'>Recent Topics</h5>
                    <div className='space-y-3'>
                      {channel.recentTopics?.map((topic, i) => (
                        <div key={i} className='flex items-center gap-3 p-3 rounded-lg border'>
                          <MessageCircle className='h-5 w-5 text-muted-foreground flex-shrink-0' />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Primary Contacts */}
            {/* <div>
              <h5 className='font-medium mb-3'>Primary Contacts</h5>
              <div className='flex gap-4'>
                {channel.primaryContacts.map((contact, i) => (
                  <div key={i} className='flex items-center gap-3'>
                    <Avatar>
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>
                        {contact.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='font-medium'>{contact.name}</p>
                      <p className='text-sm text-muted-foreground'>{contact.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Last Activity */}
            <div className='mt-6 pt-4 border-t flex items-center gap-2 text-sm text-muted-foreground'>
              <Clock className='h-4 w-4' />
              <span>Last activity: {new Date(channel.lastActivity).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChannelsSheet;
