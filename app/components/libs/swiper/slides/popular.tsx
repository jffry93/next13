'use client';
import Actions from '@/app/components/actions';
import { formatDate } from '@/utils/formateDate';
import { Movie } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MovieSlideProps {
  id: number;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  userOpinion?: Movie;
}

export const PopularMovieSlide: React.FC<MovieSlideProps> = ({
  id,
  backdrop_path,
  title,
  overview,
  poster_path,
  release_date,
  userOpinion,
}) => {
  const { push } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    push('/movieDetails/' + id);
  };

  const backgroundImageStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
  };

  return (
    <div className="relative bg-transparent" onClick={handleClick}>
      <div className="absolute top-0 left-0 z-10 flex w-full h-full bg-transparent">
        <div className="flex flex-col items-start justify-end w-full h-full gap-4 p-4 pb-16 m-auto max-w-7xl">
					<div className='flex justify-between w-full'>
          <h1 className="max-w-xl text-4xl font-display sm:text-6xl md:text-6xl">
            {title}
          </h1>
					<Actions
          hasIcons={true}
          movieData={{
            id,
            title,
            poster_path,
          }}
          opinions={
            userOpinion
              ? {
                  recommend: userOpinion.recommend,
                  watchlist: userOpinion.watchlist,
                  completed: userOpinion.completed,
                }
              : { recommend: false, watchlist: false, completed: false }
          }
          availableActions={['watchlist']}
        />
				</div>
          <p className="font-bold">{formatDate(release_date)}</p>
          <p className='max-w-xl'>
            {overview.length > 120
              ? `${overview
                  .slice(0, 120)
                  .trim()
                  .split(' ')
                  .slice(0, -1)
                  .join(' ')}...`
              : overview}
          </p>
        </div>
      </div>
      <div className="opacity-60">
        <div
          className="h-screen sm:ml-32 relative sm:min-h-[500px] min-h-[500px] max-h-[700px] lg:max-h-[900px] text-slate-300 bg-cover bg-top bg-no-repeat "
          style={backgroundImageStyle}
        >
          <div className="w-full min-h-[500px] relative sm:hidden">
            <Image
              className="w-full h-full min-h-[500px]"
              src={`https://image.tmdb.org/t/p/w780${poster_path}`}
              alt={title}
              width={500}
              height={750}
            />
          </div>
        </div>
        <div className="absolute top-0 w-full h-full bg-gradient-to-t sm:bg-gradient-to-r via-gray-900 sm:via-[16rem] via-20% from-black to-transparent mix-blend-mode-screen " />
      </div>
    </div>
  );
};
