import type { Metadata } from 'next';
import { Orbitron, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ParticlesBackground from '@/components/ParticlesBackground';

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: 'FormFarm – Future of Form Collection',
  description:
    'FormFarm is a powerful form backend service that lets developers collect form submissions without building a backend. Create unlimited forms and manage submissions easily.',
  keywords: [
    'form backend',
    'formspree alternative',
    'form api',
    'collect form submissions',
    'developer form service',
    'formfarm',
  ],
  authors: [{ name: 'FormFarm' }],
  icons: {
    icon: '/images/FormFarm.png',
    apple: '/images/FormFarm.png',
  },
  openGraph: {
    title: 'FormFarm – Future of Form Collection',
    description: 'Create unlimited forms and collect submissions without backend.',
    url: 'https://formfarm.free.nf/',
    type: 'website',
    images: [{ url: '/images/FormFarm.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FormFarm – Future of Form Collection',
    description: 'Create forms and collect submissions instantly.',
    images: ['/images/FormFarm.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable}`}>
      <body>
        <ParticlesBackground />
        <Navbar />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
