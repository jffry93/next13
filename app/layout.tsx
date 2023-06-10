import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LocalFont from 'next/font/local';

import React from 'react';
import { Analytics } from './components/analytics';
import Navbar from './components/navbar';
import Particles from './components/particles';
import ClerkProvider from './components/libs/clerk/clerk';
import { currentUser } from '@clerk/nextjs';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'movie night',
    template: '%s | movienight.com',
  },
  description: "A platform to track movies you've watched and want to watch.",
  openGraph: {
    title: 'movienight.com',
    description: "A platform to track movies you've watched and want to watch.",
    url: 'https://movienight.com',
    siteName: 'movienight.com',
    images: [
      {
        url: 'https://movienight.com/og.png',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en-CA',
    type: 'website',
  },
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
  twitter: {
    title: 'Movie Night',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/popcorn.png',
  },
};
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const calSans = LocalFont({
  src: '../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await currentUser();

  return (
    <>
      <ClerkProvider>
        <html
          lang="en"
          className={[inter.variable, calSans.variable].join(' ')}
        >
          <body
            className={`bg-black ${
              process.env.NODE_ENV === 'development'
                ? 'debug-screens'
                : undefined
            }`}
          >
            <div
              className={`flex flex-col items-center ${
                !userData && 'justify-center'
              } w-screen h-screen min-h-full ${!userData && 'overflow-hidden'}`}
            >
              <div
                className={`fixed w-screen h-screen min-h-full overflow-hidden
                 bg-gradient-to-tl from-black via-zinc-600/20 to-black`}
              >
                <Particles
                  className="fixed inset-0 -z-10 animate-fade-in"
                  quantity={100}
                />
              </div>
              {/* @ts-expect-error Server Component */}
              {userData && <Navbar />}
              {children}
            </div>
          </body>
        </html>
      </ClerkProvider>
      <Analytics />
    </>
  );
}
