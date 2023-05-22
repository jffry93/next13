import Actions from '@/app/components/actions';
import Primewire from '@/app/components/primewire';

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

async function getData(id: string) {
  const apiKey = process.env.MOVIE_DB_KEY;
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  );
  return data.json();
}

export default async function Page(props: PropType) {
  const data: MovieDetails = await getData(props.params.slug);

  return (
    <main>
      <h1 className="text-gray-500">{data.title}</h1>
      <Actions movieData={data} />
      {/* @ts-expect-error Server Component */}
      <Primewire title={data.title} />
    </main>
  );
}
