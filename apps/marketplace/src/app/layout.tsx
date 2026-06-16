import type { Metadata, Viewport } from 'next';
import { ToastProvider } from '@/hooks/useToast';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#154230',
};

export const metadata: Metadata = {
  title: 'LEVERAGE Marketplace | Global B2B Trade Platform',
  description: 'Browse products from verified global suppliers. Connect, trade, and grow your business.',
  keywords: 'B2B marketplace, global trade, wholesale, suppliers, products',
  openGraph: {
    title: 'LEVERAGE Marketplace',
    description: 'Global B2B Marketplace - Connect with verified suppliers worldwide',
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
      <body className="antialiased bg-[#f7f5f1]">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}