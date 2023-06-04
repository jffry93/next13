'use client';
import { useDebounceState } from '@/utils/debounce';
import { formatDate } from '@/utils/formateDate';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface MovieSlideProps {
  id: number;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
}

export const PopularMovieSlide: React.FC<MovieSlideProps> = ({
  id,
  backdrop_path,
  title,
  overview,
  release_date,
  poster_path,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [displayPoster, setDisplayPoster] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    const intervalId = setInterval(() => {
      setDisplayPoster((prevDisplayPoster) => !prevDisplayPoster);
    }, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(intervalId);
    };
  }, []);

  const isDesktop = useDebounceState(windowWidth >= 640, 300); // Change the breakpoint and delay as needed

  const backgroundImageStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
  };

  return (
    <Link href={'/movieDetails/' + id} className="relative bg-transparent">
      <div className="absolute top-0 left-0 z-10 w-full h-full bg-transparent">
        <div className="flex flex-col items-start justify-end w-full h-full max-w-xl gap-4 p-4 pb-12">
          <h1 className="text-4xl font-display sm:text-6xl md:text-6xl">
            {title}
          </h1>
          <p className="font-bold">{formatDate(release_date)}</p>
          <p>
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
      <div
        className="md:ml-96 sm:ml-56 relative sm:min-h-[700px] min-h-[500px] max-h-[800px] text-slate-300 bg-cover bg-top bg-no-repeat opacity-40"
        style={backgroundImageStyle}
      >
        {!isDesktop && (
          <div className="w-full min-h-[500px] relative">
            <Image
              className="w-full h-full min-h-[500px]"
              src={`https://image.tmdb.org/t/p/w780${poster_path}`}
              alt={title}
              width={500}
              height={750}
            />
          </div>
        )}
      </div>
      <div className="absolute top-0 w-full h-full bg-gradient-to-t sm:bg-gradient-to-r via-black sm:via-35% via-30% from-black to-transparent mix-blend-mode-screen" />
    </Link>
  );
};
