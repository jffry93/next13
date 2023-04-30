// must add use client to use client side rendering
'use client';
import { useState } from 'react';

const ClientExample = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Client Example</h2>
      <p>
        This is an example of a client component. I am able to use react hooks
        here and the user can interact with elements in this component.
      </p>
      <h2>Count : {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default ClientExample;
