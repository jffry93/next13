import React from 'react';
import { delay } from '../helpers/delayAmount';

interface PropType {
  name: string;
  delay: number;
}

const fetchResponse = async (name: string) => {
  const response = await fetch(`https://api.github.com/repos/jffry93/${name}`);
  return await response.json();
};

const ServerComponentExample = async (
  props: PropType
): Promise<JSX.Element> => {
  await delay(props.delay); // triggers the pages loading.tsx file
  const data = await fetchResponse(props.name);

  return (
    <div>
      <h1>Server Component Example</h1>
      <h2>Title: {data.name}</h2>
      <h2>description: {data.description}</h2>
    </div>
  );
};

export default ServerComponentExample;
