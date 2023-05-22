import { prisma } from '@/db';
import { currentUser } from '@clerk/nextjs';
import { Movie } from '@prisma/client';

type MovieBooleanKeys = 'watchlist' | 'completed' | 'recommend';
const arrayValues: MovieBooleanKeys[] = ['watchlist', 'completed', 'recommend'];

const getMovieHistory = async () => {
  const user = await currentUser();
  if (!user) {
    return;
  }
  const response = await prisma.movie.findMany({
    where: {
      userId: user.id,
    },
  });

  const historyRows = arrayValues.map((value) => {
    const filtered = response.filter((movie: Movie) => movie[value] === true);
    return { type: value, items: filtered };
  });

  return historyRows;
};

const HistoryPage = async () => {
  // todo: display and style rows of movies based on type
  const data = await getMovieHistory();
  // console.log(data);
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-4xl md:text-6xl whitespace-nowrap bg-clip-text">
        History
      </h1>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
    </div>
  );
};

export default HistoryPage;
