import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Layout } from '@/components/layout/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Zettabyte Dashboard',
  description: 'Modern dashboard built with Next.js 15, TypeScript, and Framer Motion',
  keywords: ['dashboard', 'nextjs', 'typescript', 'framer-motion'],
  authors: [{ name: 'Zettabyte Technology Inc.' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
