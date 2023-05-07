import Image from 'next/image';
import { delay } from '../helpers/delayAmount';
import ServerComponentExample from '../components/ServerExample';
import { Suspense } from 'react'; // allows for lazy loading of components

const userID = 'jffry93';

interface AvatarDataProps {
  avatar_url: string;
  login: string;
}
const AvatarData = (props: AvatarDataProps) => {
  return (
    <div>
      <Image
        src={props.avatar_url}
        width={100}
        height={100}
        alt={''}
        className="rounded-full"
      />
      <h1>User : {props.login}</h1>
    </div>
  );
};

async function getResponseExample() {
  const response = await fetch(`https://api.github.com/users/${userID}/repos`);
  const data = await response.json();
  return data;
}

export const metadata = {
  title: 'Routing Example Page Title',
  description: 'metadata in page files overrides metadata in layout files',
};

const ServerPageExample = async () => {
  await delay(1000);

  const repos = await getResponseExample();

  const { owner } = repos[0];

  return (
    <div>
      <h1>Server Page Example</h1>
      <p>This is the parent page. There is another nested example page</p>
      <h3>
        {userID} has {repos.length} public repos
      </h3>
      <AvatarData {...owner} />
      <Suspense fallback={<div>Loading...</div>}>
				{/* @ts-expect-error Server Component */}
        <ServerComponentExample name={repos[0].name} delay={0} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
				{/* @ts-expect-error Server Component */}
        <ServerComponentExample name={repos[0].name} delay={1000} />
      </Suspense>
    </div>
  );
};

export default ServerPageExample;
