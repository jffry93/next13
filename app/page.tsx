import Link from 'next/link';

import ClientExample from './components/ClientExample';

const Homepage = () => {
  return (
    <div>
      <h1>Next 13 Example</h1>
      <p>This is a boilerplate to reference different ways to use Next 13</p>
      <ClientExample />
    </div>
  );
};

export default Homepage;
