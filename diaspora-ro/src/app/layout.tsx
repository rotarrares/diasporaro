import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { PWAInit } from '@/components/pwa/PWAInit';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { UpdateNotification } from '@/components/pwa/UpdateNotification';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export const metadata: Metadata = {
  title: 'DiasporaRO - Ghidul tău pentru munca în UE',
  description: 'Află în 2 minute unde plătești taxe, unde ești asigurat și ce acte ai nevoie.',
  keywords: ['diaspora română', 'muncă UE', 'taxe', 'asigurări sociale', 'pensie', 'formular A1'],
  authors: [{ name: 'DiasporaRO' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DiasporaRO',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2D5A87',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <PWAInit />
        {children}
        <Footer />
        <CookieBanner />
        <InstallPrompt />
        <UpdateNotification />
      </body>
    </html>
  );
}
