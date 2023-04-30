import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Routing Example Page Title',
  description: 'metadata in page files overrides metadata in layout files',
};

const RoutingExample = () => {
  return (
    <div>
      <h1>Routing Example</h1>
      <p>This is the parent page. There is another nested example page</p>
      <Link href="/routingExample/anything">Dynamic</Link>
      <Link href="/routingExample/nestedExample">Nested</Link>
    </div>
  );
};

export default RoutingExample;
