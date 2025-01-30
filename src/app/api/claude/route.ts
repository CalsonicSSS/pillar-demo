// app/api/claude/route.ts
import { NextRequest } from 'next/server';
import { IssueTicket } from '@/data/ticketData';
import Anthropic from '@anthropic-ai/sdk';

const NEXT_PUBLIC_CLAUDE_API_KEY = process.env.NEXT_PUBLIC_CLAUDE_API_KEY;

if (!NEXT_PUBLIC_CLAUDE_API_KEY) {
  throw new Error('NEXT_PUBLIC_CLAUDE_API_KEY is not defined');
}

const anthropic = new Anthropic({
  apiKey: NEXT_PUBLIC_CLAUDE_API_KEY,
});

function generateSystemPrompt(ticket: IssueTicket) {
  return `You are an AI assistant helping with a technical project for Global Retail Inc's digital transformation initiative.

Current Context:
- Project: ${ticket.title}
- Priority: ${ticket.priority}
- Status: ${ticket.status}
- Current Issue: ${ticket.summary}

Technical Background:
${ticket.aiAnalysis.technicalContext.join('\n')}

Business Impact:
${ticket.aiAnalysis.businessImpact}

Previous Solution Summary:
${ticket.aiSuggestedSolution.summary}

Instructions:
1. Provide specific, actionable technical solutions
2. Include code examples where relevant
3. Consider both immediate fixes and long-term improvements
4. Ensure solutions align with the project's technical context
5. Format response using markdown with appropriate code blocks
6. Focus on performance, scalability, and maintainability

Respond in a clear, structured format using markdown.`;
}

export async function POST(req: NextRequest) {
  try {
    const { message, ticket } = await req.json();

    const stream = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      temperature: 0.3,
      system: generateSystemPrompt(ticket),
      messages: [
        {
          role: 'user',
          content: [{ type: 'text', text: message }],
        },
      ],
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          let accumulatedResponse = '';
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              accumulatedResponse += chunk.delta.text;
              controller.enqueue(encoder.encode(JSON.stringify({ content: accumulatedResponse }) + '\n'));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error in Claude API route:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
