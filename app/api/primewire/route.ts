import { NextResponse } from 'next/server';
import data from '../../../data/index.json';
import { fetchMovieIframeURL } from '@/data/primewire/collectMovieInfo';

export async function GET(req: Request, context: any) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  console.log(slug);

  const movieURL = await fetchMovieIframeURL(slug);

  return NextResponse.json(movieURL);
}
