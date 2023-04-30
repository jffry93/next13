import React from 'react';
import { delay } from '../helpers/delayAmount';
import Link from 'next/link';

export const metadata = {
  title: 'Example Page Title',
  description: 'metadata in page files overrides metadata in layout files',
};

const Example = async () => {
  // await delay(2000);

  return (
    <div>
      <p>This is an example of a next 13 page and all the different features</p>
      <h1>Revalidate example links</h1>

      <Link href={'/example/chat-app'}>Chat App</Link>
      <Link href={'/example/actor-portfolio'}>Actor Portfolio</Link>
    </div>
  );
};

export default Example;
