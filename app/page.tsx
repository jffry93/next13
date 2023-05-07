import Link from 'next/link';
import React from 'react';
import Particles from './components/particles';
import Image from 'next/image';

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Home() {
  return (
    <>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
        movie night
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="text-center animate-fade-in">
        <div className="mt-16">
          <h2 className="text-sm text-zinc-500 ">
            A platform to track movies you&apos;ve watched and want to watch.
          </h2>
        </div>
        <Link
          href="/signup"
          className="text-sm text-transparent text-zinc-300 from-cyan-400 hover:text-transparent hover:bg-gradient-to-r from-indigo-500 to-blue-400 bg-clip-text"
          data-text="Create an account"
        >
          Create an account
        </Link>
      </div>
    </>
  );
}
