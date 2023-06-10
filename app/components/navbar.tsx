import Link from 'next/link';
import Image from 'next/image';
import { SignInButton, UserButton, currentUser } from '@clerk/nextjs';
import { createUser } from './libs/clerk/clerk';
import { MovieSearchbar } from './searchbar';

const Navbar = async () => {
  const navigation = [];

  const userData = await currentUser();
  if (userData) {
    createUser();
    navigation.push({ name: 'Movies', href: '/movies' });
    navigation.push({ name: 'History', href: '/history' });
  }

  return (
    <nav className="relative z-10 w-full px-4 animate-fade-in">
      <ul
        className={`flex items-center justify-between w-full ${
          userData ? 'max-w-6xl' : 'max-w-sm'
        } gap-4 py-2 m-auto custom-padding-x`}
      >
        <Link
          href={'/'}
          className="text-sm duration-500 text-zinc-200 hover:text-zinc-300"
        >
          <Image
            alt="animated popcorn gif"
            src="/popcorn_animate.gif"
            width={40}
            height={40}
          />
        </Link>
        <div className="flex items-center justify-end w-full gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-200 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
          {userData ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton afterSignInUrl={'/movies'} afterSignUpUrl="movies">
              <button className="text-sm duration-500 text-zinc-500 hover:text-zinc-300">
                Login
              </button>
            </SignInButton>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
