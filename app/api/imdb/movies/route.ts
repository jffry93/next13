import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  if (typeof title !== 'string') {
    return;
  }

  const apiKey = process.env.MOVIE_DB_KEY;

  const imdbData = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${title}&page=1&include_adult=false`
  );
  const { results } = await imdbData.json();

  return NextResponse.json(results);
}
