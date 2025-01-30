import { Drawer, DrawerContent, DrawerClose } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, FileText, Users2, Building2, X, ChartBar, Link, FileCode, Download } from 'lucide-react';
import { CompletedWork } from '@/data/mockCompletedWorkData';

interface CompletedWorkDrawerProps {
  work: CompletedWork;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CompletedWorkDrawer({ work, open, onOpenChange }: CompletedWorkDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className='max-h-[96vh]'>
        <div className='mx-auto w-full'>
          <div className='h-[90vh] flex flex-col'>
            {/* Header */}
            <div className='px-6 py-4 border-b'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline' className='select-text'>
                    {work.id}
                  </Badge>
                  <Badge variant='secondary'>
                    <CheckCircle2 className='w-3 h-3 mr-1 text-green-500' />
                    Completed
                  </Badge>
                </div>
                <DrawerClose asChild>
                  <Button variant='ghost' size='icon' className='h-8 w-8 rounded-full hover:bg-muted'>
                    <X className='h-4 w-4' />
                    <span className='sr-only'>Close</span>
                  </Button>
                </DrawerClose>
              </div>
              <h2 className='text-xl font-semibold mb-2'>{work.title}</h2>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <span>Completed on {new Date(work.completedDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Main Content */}
            <ScrollArea className='flex-1'>
              <Tabs defaultValue='overview' className='w-full'>
                <div className='sticky top-0 bg-background z-10 px-6 border-b'>
                  <TabsList className='my-2'>
                    <TabsTrigger value='overview'>
                      <ChartBar className='w-4 h-4 mr-2' />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value='stakeholders'>
                      <Users2 className='w-4 h-4 mr-2' />
                      Stakeholders
                    </TabsTrigger>
                    <TabsTrigger value='Docs'>
                      <FileText className='w-4 h-4 mr-2' />
                      Docs
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className='p-6'>
                  {/* Overview Tab */}
                  <TabsContent value='overview' className='m-0 space-y-6'>
                    {/* Summary Card */}
                    <Card>
                      <CardContent className='p-4'>
                        <h3 className='text-sm font-medium mb-3'>Summary</h3>
                        <p className='text-sm text-muted-foreground'>{work.summary}</p>
                      </CardContent>
                    </Card>

                    {/* Business Impact */}
                    <Card>
                      <CardContent className='p-4 space-y-4'>
                        <h3 className='text-sm font-medium'>Work Result</h3>

                        {/* Impact Metrics Grid */}
                        <div className='grid grid-cols-2 gap-4'>
                          {work.impact.metrics?.map((metric, idx) => (
                            <div key={idx} className='p-4 rounded-lg border bg-muted/50'>
                              <div className='text-sm text-muted-foreground mb-1'>{metric.label}</div>
                              <div className='text-2xl font-semibold'>{metric.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Benefits List */}
                        <div>
                          <h4 className='text-sm font-medium mb-2'>Key Benefits</h4>
                          <ul className='space-y-2'>
                            {work.impact.benefits.map((benefit, idx) => (
                              <li key={idx} className='flex items-start gap-2 text-sm'>
                                <div className='w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5' />
                                <span className='text-muted-foreground'>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Related Tickets */}
                    {work.relatedTickets && (
                      <Card>
                        <CardContent className='p-4'>
                          <h3 className='text-sm font-medium mb-3'>Related Tickets</h3>
                          <div className='space-y-2'>
                            {work.relatedTickets.map((ticketId, idx) => (
                              <Button key={idx} variant='ghost' className='w-full justify-start h-auto py-2'>
                                <Link className='w-4 h-4 mr-2' />
                                {ticketId}
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  {/* Stakeholders Tab */}
                  <TabsContent value='stakeholders' className='m-0 space-y-6'>
                    {/* Client Stakeholders */}
                    <Card>
                      <CardContent className='p-4'>
                        <h3 className='text-sm font-medium mb-4 flex items-center gap-2'>
                          <Users2 className='w-4 h-4' />
                          Client Stakeholders
                        </h3>
                        <div className='space-y-4'>
                          {work.stakeholders.client.map((person, idx) => (
                            <div key={idx} className='flex items-center gap-3'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage src={person.avatar} />
                                <AvatarFallback>
                                  {person.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className='font-medium text-sm'>{person.name}</div>
                                <div className='text-xs text-muted-foreground'>{person.role}</div>
                                <div className='text-xs text-muted-foreground'>{person.email}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Internal Team */}
                    <Card>
                      <CardContent className='p-4'>
                        <h3 className='text-sm font-medium mb-4 flex items-center gap-2'>
                          <Users2 className='w-4 h-4' />
                          Internal Team
                        </h3>
                        <div className='space-y-4'>
                          {work.stakeholders.internal.map((person, idx) => (
                            <div key={idx} className='flex items-center gap-3'>
                              <Avatar className='h-8 w-8'>
                                <AvatarImage src={person.avatar} />
                                <AvatarFallback>
                                  {person.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className='font-medium text-sm'>{person.name}</div>
                                <div className='text-xs text-muted-foreground'>{person.role}</div>
                                <div className='text-xs text-muted-foreground'>{person.email}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Vendor Partners */}
                    {work.stakeholders.vendors && (
                      <Card>
                        <CardContent className='p-4'>
                          <h3 className='text-sm font-medium mb-4 flex items-center gap-2'>
                            <Building2 className='w-4 h-4' />
                            Vendor Partners
                          </h3>
                          <div className='space-y-4'>
                            {work.stakeholders.vendors.map((vendor, idx) => (
                              <div key={idx} className='flex items-center gap-3'>
                                <Avatar className='h-8 w-8'>
                                  <AvatarImage src={vendor.avatar} />
                                  <AvatarFallback>
                                    {vendor.name
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className='font-medium text-sm'>{vendor.name}</div>
                                  <div className='text-xs text-muted-foreground'>
                                    {vendor.company} • {vendor.role}
                                  </div>
                                  <div className='text-xs text-muted-foreground'>{vendor.email}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  {/* Deliverables Tab */}
                  <TabsContent value='Docs' className='m-0'>
                    <div className='grid grid-cols-2 gap-4'>
                      {work.deliverables.map((deliverable, idx) => (
                        <Card key={idx}>
                          <CardContent className='p-4'>
                            <div className='flex items-start justify-between'>
                              <div className='flex items-start gap-3'>
                                {deliverable.type === 'code' ? <FileCode className='w-8 h-8 text-blue-500' /> : <FileText className='w-8 h-8 text-blue-500' />}
                                <div>
                                  <div className='font-medium text-sm mb-1'>{deliverable.name}</div>
                                  <div className='text-xs text-muted-foreground'>
                                    {deliverable.type} • {deliverable.size}
                                  </div>
                                </div>
                              </div>
                              <Button size='icon' variant='ghost'>
                                <Download className='w-4 h-4' />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </ScrollArea>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
