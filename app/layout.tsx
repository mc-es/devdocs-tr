import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { ThemeProvider } from '@/components/theme';
import { cn } from '@/lib/cn';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevDocs TR',
  description: 'Free and open source API documentation browser with Turkish translations.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement => (
  <html lang="en" suppressHydrationWarning>
    <body className={cn(geistSans.variable, geistMono.variable, 'antialiased')}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
