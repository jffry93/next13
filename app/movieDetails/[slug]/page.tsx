import Actions from '@/app/components/actions';
import Primewire from '@/app/components/primewire';
import { searchMoviesArray } from '@/db/helpers/getPrimewireLink';
import { getUserOpinions } from '@/db/helpers/getUsersOpinion';

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
  const movieData: MovieDetails = await getMovieData(props.params.slug);
  const movieOpinions = await getUserOpinions(props.params.slug);
  const primewireLinks = searchMoviesArray(movieData.title);

  return (
    <main>
      <h1 className="text-gray-500">{movieData.title}</h1>
      <Actions movieData={movieData} opinions={movieOpinions} />
      <Primewire movies={primewireLinks} />
    </main>
  );
}
