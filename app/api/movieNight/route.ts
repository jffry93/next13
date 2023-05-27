import type { MovieDetails } from '@/app/movieDetails/[slug]/page';
import { legitCheck, prisma } from '@/db';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

interface BodyType {
  type: 'recommend' | 'completed' | 'watchlist';
  movieData: MovieDetails;
  status: boolean;
}

// add or update movie on user's movie night list
export async function POST(req: Request) {
  legitCheck();
  const body: BodyType = await req.json();
  const user = await currentUser();
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  const { id } = await user;
  const { type, movieData, status } = body;

  // await prisma.movie.upsert({
  //   where: { imoID_userId: { imoID: movieData.id, userId: id } },
  //   update: { [type]: !status },
  //   create: {
  //     imoID: movieData.id,
  //     userId: id,
  //     [type]: !status,
  //     title: movieData.title,
  //     img_path: movieData.poster_path,
  //   },
  // });

  return NextResponse.json({ [type]: !status });
}
