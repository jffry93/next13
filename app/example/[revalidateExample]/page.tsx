import { delay } from '@/app/helpers/delayAmount';

const userID = 'jffry93';

const fetchRepoByName = async (name: string) => {
  const response = await fetch(
    `https://api.github.com/repos/${userID}/${name}`,
    {
      next: {
        // caches for 60 seconds
        // refetches after 60 seconds
        revalidate: 60,
      },
    }
  );
  return await response.json();
};

const RevalidateExample = async ({
  params,
}: {
  params: { revalidateExample: string };
}) => {
  await delay(1000);

  const repo = await fetchRepoByName(params.revalidateExample);

  console.log('😀', repo);

  return (
    <div>
      <h1>Server Page Example</h1>
    </div>
  );
};

export default RevalidateExample;
