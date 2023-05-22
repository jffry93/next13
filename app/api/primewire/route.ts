import { NextResponse } from 'next/server';
import data from '../../../data/index.json';

export async function GET(req: Request) {
  const constructMovieUrl = (id: number, title: string) => {
    const formattedTitle = title.split(' ').join('-');
    return `https://primewire.mx/movie/watch-${formattedTitle}-online-${id}`;
  };

  const searchMoviesArray = (
    searchString: string,
    movies: { title: string; id: number }[]
  ) => {
    const lowerCaseSearchString = searchString.toLowerCase();
    return movies.filter(
      (movie) => movie.title.toLowerCase() === lowerCaseSearchString
    );
  };

  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title');
  if (typeof title !== 'string') {
    return;
  }

  const movies = searchMoviesArray(title, data);
  if (movies.length === 0) {
    return NextResponse.json('Movie not found');
  }

  const movieUrl = constructMovieUrl(movies[0].id, movies[0].title);

  return NextResponse.json(movieUrl);
}
