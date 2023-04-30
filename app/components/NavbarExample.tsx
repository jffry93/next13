import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="row">
      <h3>Logo</h3>
      <div>
        <Link href="/">Home</Link>
        <Link href="/example">Example</Link>
        <Link href="/serverPageExample">Server</Link>
        <Link href="/routingExample">Routing</Link>
      </div>
    </div>
  );
};

export default Navbar;
