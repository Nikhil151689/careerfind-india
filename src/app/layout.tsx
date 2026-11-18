import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ADSENSE_CONFIG, isAdSenseActive } from '@/lib/adsense';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careerfindindia.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CareerFind India - Verified Indian Jobs, Fresher Drives & Govt Openings',
    template: '%s | CareerFind India',
  },
  description:
    'Search 10,000+ verified jobs across India: IT & Software, B.Tech freshers, Work from home, Data Analysts, Bank PO and Government recruitment drives.',
  keywords: [
    'Jobs in India',
    'Fresher jobs',
    'TCS NQT',
    'Infosys off campus',
    'IT jobs Bengaluru',
    'Work from home jobs India',
    'Government jobs',
    'Bank PO jobs',
    'Internships India',
    'Software engineer vacancies',
  ],
  authors: [{ name: 'CareerFind India Team' }],
  creator: 'CareerFind India',
  publisher: 'CareerFind India',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'CareerFind India',
    title: 'CareerFind India - Verified Indian Jobs & Campus Recruitment',
    description:
      'Search verified Indian recruitment drives: IT & Software, B.Tech freshers, Work from home, and Government exams.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerFind India - Verified Indian Jobs & Campus Recruitment',
    description:
      'Search verified Indian recruitment drives: IT & Software, B.Tech freshers, Work from home, and Government exams.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdApproved = isAdSenseActive();

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Real Google AdSense Script - Only injected when client ID is provided */}
        {isAdApproved && (
          <Script
            id="adsbygoogle-init"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.clientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
