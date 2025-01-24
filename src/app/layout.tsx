import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Sidebar } from '@/components/Sidebar';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Agency Portal',
  description: 'Client engagement support system',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true} className={`${inter.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}>
        <Toaster />
        <SidebarProvider defaultOpen>
          <div className='flex min-h-screen overflow-hidden w-full'>
            <Sidebar />
            <main className='w-full p-10 overflow-auto'>{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
