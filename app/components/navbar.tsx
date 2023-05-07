import Link from 'next/link';
import Image from 'next/image';

const navigation = [
  { name: 'Movies', href: '/movies' },
  { name: 'Contact', href: '/contact' },
  { name: 'Login', href: '/login' },
];
const Navbar = () => {
  return (
    <nav className="my-16 animate-fade-in">
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
      </ul>
    </nav>
  );
};

export default Navbar;
