'use client';
import Actions from '@/app/components/actions';
import { formatDate } from '@/utils/formateDate';
import type { Movie } from '@prisma/client';
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

export const MovieCardSlide: React.FC<MovieSlideProps> = ({
  id,
  title,
  release_date,
  poster_path,
  userOpinion,
}) => {
  const { push } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    push('/movieDetails/' + id);
  };

  return (
    <div className="relative bg-transparent" onClick={handleClick}>
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-transparent">
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-row-reverse m-2">
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
          <div className="flex flex-col items-start justify-end w-full gap-3 p-4 pb-8">
            <h1 className="text-xl font-display ">{title}</h1>
            <p className="font-bold text-l">{formatDate(release_date)}</p>
          </div>
        </div>
      </div>
      <div className="opacity-50">
        <Image
          className="w-full h-full min-h-[250px]"
          src={`https://image.tmdb.org/t/p/w780${poster_path}`}
          alt={title}
          width={100}
          height={150}
        />

        <div className="absolute top-0 w-full h-full bg-gradient-to-t via-black/80 via-30% from-black/90 to-transparent mix-blend-mode-screen" />
      </div>
    </div>
  );
};
