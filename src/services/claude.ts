// src/services/claude.ts
import { IssueTicket } from '@/data/ticketData';
import Anthropic from '@anthropic-ai/sdk';

const CLAUDE_API_KEY = process.env.NEXT_PUBLIC_CLAUDE_API_KEY;
const anthropic = new Anthropic({
  apiKey: CLAUDE_API_KEY,
  dangerouslyAllowBrowser: true,
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

export async function getClaudeStreamingResponse(message: string, ticket: IssueTicket, onStreamChunk: (chunk: string) => void) {
  try {
    const stream = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
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

    let accumulatedResponse = '';

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
        accumulatedResponse += chunk.delta.text;
        onStreamChunk(accumulatedResponse);
      }
    }

    return accumulatedResponse;
  } catch (error) {
    console.error('Error streaming from Claude:', error);
    throw error;
  }
}

// Keep the non-streaming version as fallback
export async function getClaudeResponse(message: string, ticket: IssueTicket) {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4000,
      temperature: 0.3,
      system: generateSystemPrompt(ticket),
      messages: [
        {
          role: 'user',
          content: [{ type: 'text', text: message }],
        },
      ],
    });

    return response.content[0].type === 'text' ? response.content[0].text : '';
  } catch (error) {
    console.error('Error calling Claude:', error);
    throw error;
  }
}
