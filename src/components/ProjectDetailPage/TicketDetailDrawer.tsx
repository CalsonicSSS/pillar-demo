import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, AlertTriangle, FileText, Brain, Link, Tag, X, Loader2, Send } from 'lucide-react';
import { IssueTicket } from '@/data/ticketData';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AIChatSection, MarkdownComponents } from '@/components/AIChat/AIChatSection';
// import { getClaudeResponse } from '@/services/claude';
import { useToast } from '@/hooks/use-toast';
import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Textarea } from '../ui/textarea';
import { getClaudeStreamingResponse } from '@/services/claude';

interface TicketDrawerProps {
  ticket: IssueTicket;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TicketDrawer({ ticket: initialTicket, open, onOpenChange }: TicketDrawerProps) {
  const [ticket, setTicket] = useState(initialTicket);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const handleSolutionUpdate = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    try {
      await getClaudeStreamingResponse(input, ticket, (streamedContent) => {
        setTicket((prev) => ({
          ...prev,
          aiSuggestedSolution: {
            ...prev.aiSuggestedSolution,
            content: streamedContent,
          },
        }));
      });
      setInput('');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSolutionUpdate();
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger className='hidden' />
      <DrawerContent className='max-h-[96vh]'>
        <div className='mx-auto w-full'>
          <div className='h-[90vh] flex flex-col select-text antialiased'>
            {/* Header */}
            <div className='px-6 py-4'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-3'>
                  <div className='relative'>
                    <Image src={ticket.source.channelIcon} alt={ticket.source.channel} width={24} height={24} className='rounded' />
                  </div>
                  <Badge variant='outline' className='select-text'>
                    {ticket.id}
                  </Badge>
                  <Badge
                    className={cn(
                      'select-text',
                      ticket.priority === 'high' ? 'bg-red-500/15 text-red-700' : ticket.priority === 'medium' ? 'bg-yellow-500/15 text-yellow-700' : 'bg-blue-500/15 text-blue-700'
                    )}
                  >
                    {ticket.priority}
                  </Badge>
                </div>
                <DrawerClose asChild>
                  <Button variant='ghost' size='icon' className='h-8 w-8 rounded-full hover:bg-muted'>
                    <X className='h-4 w-4' />
                    <span className='sr-only'>Close</span>
                  </Button>
                </DrawerClose>
              </div>
              <h2 className='text-xl font-semibold mb-2 select-text'>{ticket.title}</h2>
              <p className='text-muted-foreground select-text'>{ticket.summary}</p>
            </div>

            {/* Main Content */}
            <ScrollArea className='flex-1'>
              <Tabs defaultValue='communications'>
                <div className='sticky top-0 bg-background z-10 px-6 py-4'>
                  <TabsList>
                    <TabsTrigger value='communications'>
                      <div className='flex items-center gap-2'>
                        <MessageSquare className='w-4 h-4' />
                        Communications
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value='analysis'>
                      <div className='flex items-center gap-2'>
                        <Brain className='w-4 h-4' />
                        AI Analysis & Suggestion
                      </div>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className='p-6 rounded-lg bg-muted/50 m-6'>
                  <TabsContent value='communications' className='m-0'>
                    <div className='flex gap-6'>
                      {/* Communications Column - 2/3 width */}
                      <div className='flex-[2] space-y-6'>
                        {ticket.communications.map((comm) => (
                          <Card key={comm.id}>
                            <CardContent className='p-4'>
                              <div className='flex items-start gap-4'>
                                <Avatar className='w-8 h-8 flex-shrink-0'>
                                  <AvatarImage src={ticket.requester.avatar} />
                                  <AvatarFallback>
                                    {comm.sender
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className='flex-1 min-w-0'>
                                  <div className='flex items-center justify-between mb-2'>
                                    <div>
                                      <span className='font-medium select-text'>{comm.sender}</span>
                                      <span className='text-sm text-muted-foreground ml-2 select-text'>{new Date(comm.timestamp).toLocaleString()}</span>
                                    </div>
                                    <Badge variant='outline' className='select-text'>
                                      {comm.type}
                                    </Badge>
                                  </div>
                                  <div className='text-sm whitespace-pre-wrap select-text break-words'>{comm.content}</div>
                                  {comm.attachments && comm.attachments.length > 0 && (
                                    <div className='mt-3 pt-3 border-t'>
                                      <div className='text-sm text-muted-foreground mb-2'>Attachments:</div>
                                      <div className='flex flex-wrap gap-2'>
                                        {comm.attachments.map((att, idx) => (
                                          <Button key={idx} variant='outline' size='sm' className='h-auto py-1 font-medium'>
                                            <FileText className='w-4 h-4 mr-2' />
                                            <div className='text-left'>
                                              <div className='text-xs font-medium select-text'>{att.name}</div>
                                              <div className='text-[10px] text-muted-foreground select-text'>{att.size}</div>
                                            </div>
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Documents Column - 1/3 width */}
                      <div className='flex-1'>
                        <Card>
                          <CardContent className='p-4'>
                            <h3 className='text-sm font-medium mb-4'>Related Documents</h3>
                            <div className='space-y-3'>
                              {ticket.attachedDocs.map((doc, idx) => (
                                <div key={idx} className='flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors'>
                                  <FileText className='w-8 h-8 text-blue-500 flex-shrink-0' />
                                  <div className='flex-1 min-w-0'>
                                    <div className='font-medium text-sm mb-1 truncate'>{doc.name}</div>
                                    <div className='text-xs text-muted-foreground'>
                                      {doc.size} • Uploaded by {doc.uploadedBy}
                                    </div>
                                    <div className='text-xs text-muted-foreground mt-1'>{new Date(doc.uploadedAt).toLocaleString()}</div>
                                  </div>
                                  <Button variant='ghost' size='sm' className='h-8'>
                                    View
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value='analysis' className='m-0'>
                    <div className='grid grid-cols-3 gap-6 pb-16'>
                      {/* Added padding bottom for chat input */}
                      <div className='col-span-2 space-y-6'>
                        <Card>
                          <CardContent className='p-4'>
                            <h3 className='text-sm font-medium mb-3'>AI Suggested Solution</h3>
                            <div className='relative'>
                              <AIChatSection content={ticket.aiSuggestedSolution.content} />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className='space-y-6'>
                        <Card>
                          <CardContent className='p-4'>
                            <h3 className='text-sm font-medium mb-3'>Key Points</h3>
                            <ul className='space-y-2'>
                              {ticket.aiAnalysis.keyPoints.map((point, idx) => (
                                <li key={idx} className='flex items-start gap-2 text-sm'>
                                  <AlertTriangle className='w-4 h-4 text-yellow-500 mt-0.5' />
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className='p-4'>
                            <h3 className='text-sm font-medium mb-3'>Technical Context</h3>
                            <ul className='space-y-2'>
                              {ticket.aiAnalysis.technicalContext.map((ctx, idx) => (
                                <li key={idx} className='flex items-start gap-2 text-sm'>
                                  <div className='w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5' />
                                  {ctx}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className='p-4'>
                            <h3 className='text-sm font-medium mb-3'>Business Impact</h3>
                            <p className='text-sm'>{ticket.aiAnalysis.businessImpact}</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className='p-4'>
                            <h3 className='text-sm font-medium mb-3'>Effort Estimate</h3>
                            <p className='text-sm'>{ticket.aiAnalysis.estimatedEffort}</p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className='p-4'>
                            <h3 className='text-sm font-medium mb-3'>Related Items</h3>
                            <div className='space-y-4'>
                              <div>
                                <div className='text-sm text-muted-foreground mb-2'>Tags</div>
                                <div className='flex flex-wrap gap-1'>
                                  {ticket.tags.map((tag, idx) => (
                                    <Badge key={idx} variant='secondary'>
                                      <Tag className='w-3 h-3 mr-1' />
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              {ticket.relatedTickets && (
                                <div>
                                  <div className='text-sm text-muted-foreground mb-2'>Related Tickets</div>
                                  <div className='space-y-1'>
                                    {ticket.relatedTickets.map((ticketId, idx) => (
                                      <Button key={idx} variant='ghost' className='w-full justify-start h-auto py-1.5'>
                                        <Link className='w-4 h-4 mr-2' />
                                        {ticketId}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    <div className='absolute bottom-0 left-0 right-0 bg-background/70 backdrop-blur-sm border-t'>
                      <div className='container mx-auto'>
                        {' '}
                        {/* Added container wrapper */}
                        <div className='flex items-end gap-2 p-4 mx-auto' style={{ maxWidth: '66.666%' }}>
                          {' '}
                          {/* Changed to style prop for exact width */}
                          <Textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder='Ask for refinements or clarifications...'
                            className='min-h-[44px] max-h-[200px] resize-none'
                            rows={1}
                          />
                          <Button onClick={handleSolutionUpdate} disabled={isLoading} size='icon' className='flex-shrink-0'>
                            {isLoading ? <Loader2 className='h-4 w-4 animate-spin' /> : <Send className='h-4 w-4' />}
                          </Button>
                        </div>
                      </div>
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
