'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef } from 'react';

// Custom components for ReactMarkdown
export const MarkdownComponents = {
  code({ node, inline, className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    // Convert children to string and get line count
    const content = Array.isArray(children) ? children.join('') : String(children || '');
    const lineCount = content.split('\n').length;

    if (!inline && language) {
      return (
        <div className='rounded-lg overflow-hidden my-4'>
          <div className='bg-muted/80 px-4 py-1.5 flex items-center justify-between'>
            <span className='text-xs font-medium'>{language}</span>
            <Badge variant='outline' className='text-[10px] px-1.5'>
              {lineCount} lines
            </Badge>
          </div>
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{
              margin: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            {content}
          </SyntaxHighlighter>
        </div>
      );
    }

    return inline ? (
      <code className='bg-muted px-1.5 py-0.5 rounded text-sm' {...props}>
        {children}
      </code>
    ) : (
      <pre className='bg-muted p-4 rounded-lg overflow-x-auto'>
        <code className='text-sm' {...props}>
          {children}
        </code>
      </pre>
    );
  },
  // Keep other markdown components the same
  h1: (props: any) => <h1 className='text-2xl font-bold mt-6 mb-4' {...props} />,
  h2: (props: any) => <h2 className='text-xl font-bold mt-6 mb-3' {...props} />,
  h3: (props: any) => <h3 className='text-lg font-bold mt-5 mb-2' {...props} />,
  p: (props: any) => <p className='mb-4 leading-relaxed' {...props} />,
  ul: (props: any) => <ul className='mb-4 list-disc pl-6 space-y-2' {...props} />,
  ol: (props: any) => <ol className='mb-4 list-decimal pl-6 space-y-2' {...props} />,
  li: (props: any) => <li className='leading-relaxed' {...props} />,
  blockquote: (props: any) => <blockquote className='border-l-4 border-muted pl-4 italic my-4' {...props} />,
};

interface AIChatSectionProps {
  content: string;
}

export function AIChatSection({ content }: AIChatSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [content]); // Trigger on content changes

  return (
    <div ref={scrollRef} className='relative flex flex-col h-[700px] overflow-y-auto scroll-smooth'>
      <div className='flex-1'>
        <ReactMarkdown components={MarkdownComponents} className='prose prose-sm max-w-none dark:prose-invert'>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
