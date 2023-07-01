'use client';
import { constructMovieUrl } from '@/db/helpers/getPrimewireLink';
import { useState } from 'react';

interface PropType {
  movies: { title: string; id: number }[];
}

const Primewire = ({ movies }: PropType) => {
  const [movieUrl, setMovieUrl] = useState('');

  if (movies.length <= 0) {
    return <div className="text-red-500">Movie not found</div>;
  }

  const handleSelectMovie = async (movie: { id: number; title: string }) => {
    const res = await fetch(
      `/api/primewire?slug=${constructMovieUrl(movie.id, movie.title)}`
    );
    const json = await res.json();

    setMovieUrl(json);
  };

  console.log(process.env.LOCAL);

  return (
    <>
      {process.env.LOCAL && movieUrl && (
        <iframe
          title="Your descriptive title here"
          width="100%"
          height="500"
          src={movieUrl}
          allowFullScreen
        ></iframe>
      )}
      {movies.map((movie) => {
        return (
          <div key={'button' + movie.id}>
            {process.env.LOCAL ? (
              <button
                className="text-gray-700"
                onClick={() => handleSelectMovie(movie)}
              >
                Watch - {movie.title}
              </button>
            ) : (
              <a
                className="text-gray-700"
                href={constructMovieUrl(movie.id, movie.title)}
                target="_blank"
              >
                Watch - {movie.title}
              </a>
            )}
          </div>
        );
      })}
    </>
  );
};

export default Primewire;
