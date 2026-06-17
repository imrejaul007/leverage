import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import Preloader from '@/components/Preloader';
import { GlobalEffectsProvider } from '@/components/GlobalEffects';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'LEVERAGE | Global Trade Operating System',
  description: 'The complete B2B marketplace for importers, exporters, manufacturers, and freight forwarders. AI-powered compliance, integrated logistics, and seamless trade documentation.',
  keywords: ['B2B marketplace', 'trade', 'import', 'export', 'logistics', 'freight', 'compliance', 'documentation'],
  authors: [{ name: 'LEVERAGE' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'LEVERAGE',
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
      <body className="font-sans antialiased">
        <Providers>
          <AuthProvider>
            <GlobalEffectsProvider>
              <Preloader />
              {children}
            </GlobalEffectsProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
