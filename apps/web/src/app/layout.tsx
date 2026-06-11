import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';
import Preloader from '@/components/Preloader';
import { GlobalEffectsProvider } from '@/components/GlobalEffects';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Leverge | Global Trade Operating System',
  description: 'The complete B2B marketplace for importers, exporters, manufacturers, and freight forwarders. AI-powered compliance, integrated logistics, and seamless trade documentation.',
  keywords: ['B2B marketplace', 'trade', 'import', 'export', 'logistics', 'freight', 'compliance', 'documentation'],
  authors: [{ name: 'Leverge' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Leverge',
    description: 'Global Trade Operating System',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <GlobalEffectsProvider>
            <Preloader />
            {children}
          </GlobalEffectsProvider>
        </Providers>
      </body>
    </html>
  );
}
