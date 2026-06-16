import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LEVERAGE Marketplace | Global B2B Trade Platform',
  description: 'Browse products from verified global suppliers. Connect, trade, and grow your business.',
  keywords: 'B2B marketplace, global trade, wholesale, suppliers, products',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
