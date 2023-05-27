import Link from 'next/link';
import Image from 'next/image';
import { SignInButton, UserButton, currentUser } from '@clerk/nextjs';
import { createUser } from './clerk';

const navigation = [
  { name: 'Movies', href: '/movies' },
  { name: 'History', href: '/history' },
];

const Navbar = async () => {
  const userData = await currentUser();
  if (userData) {
    createUser();
  }

  return (
    <nav className="mt-16 animate-fade-in">
      <ul className="flex items-center justify-center gap-4">
        <Link
          href={'/'}
          className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
        >
          <Image
            alt="animated popcorn gif"
            src="/popcorn_animate.gif"
            width={40}
            height={40}
          />
        </Link>

        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
          >
            {item.name}
          </Link>
        ))}
        {userData ? (
          <UserButton />
        ) : (
          <SignInButton afterSignInUrl={'/movies'} afterSignUpUrl="movies">
            <button className="text-sm duration-500 text-zinc-500 hover:text-zinc-300">
              Login
            </button>
          </SignInButton>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
