import Actions from '@/app/components/actions';
import Primewire from '@/app/components/primewire';
import { getPrimeWireLink } from '@/db/helpers/getPrimewireLink';
import { getUserOpinions } from '@/db/helpers/getUsersOpinion';
import type { MovieOpinions } from '@/db/helpers/getUsersOpinion';
import Image from 'next/image';
import { Suspense } from 'react';

interface PropType {
  params: {
    slug: string;
  };
  searchParams: {}; // TODO: type this
}

export interface MovieDetails {
  title: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  id: number;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  status: string;
  tagline: string;
}

async function getMovieData(id: string) {
  const apiKey = process.env.MOVIE_DB_KEY;
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  );
  const json: MovieDetails = await data.json();

  return json;
}

export default async function Page(props: PropType) {
  const [movieData, movieOpinions] = await Promise.all([
    getMovieData(props.params.slug) as Promise<MovieDetails>,
    getUserOpinions(props.params.slug) as Promise<MovieOpinions>,
  ]);
  const primewireLinks = await getPrimeWireLink(movieData.title);

  return (
    <main className="relative z-10 w-full">
      <Image
        className="w-full h-full min-h-[500px]"
        src={`https://image.tmdb.org/t/p/w780${movieData.backdrop_path}`}
        alt={movieData.title}
        width={500}
        height={750}
      />
      <h1 className="text-gray-500">{movieData.title}</h1>
      <Actions movieData={movieData} opinions={movieOpinions} direction="row" />
      <Suspense fallback={<div>Loading...</div>}>
        <Primewire movies={primewireLinks} />
      </Suspense>
    </main>
  );
}
