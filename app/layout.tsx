import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KPI Library - Analytics Dashboard Components',
  description: 'A comprehensive library of KPIs, data visualizations, layouts, and storyboards for building powerful analytics dashboards',
  keywords: ['KPI', 'analytics', 'dashboard', 'data visualization', 'charts', 'metrics'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
