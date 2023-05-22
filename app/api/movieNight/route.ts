import type { MovieDetails } from '@/app/movieDetails/[slug]/page';
import { legitCheck, prisma } from '@/db';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  if (typeof type !== 'string') {
    return;
  }
  // await prisma.movie.upsert({
  //   where: { title },
  //   update: {},
  //   create: { title, },
  // });

  prisma.$disconnect();

  return NextResponse.json(type);
}
interface BodyType {
  type: 'recommend' | 'completed' | 'watchlist';
  movieData: MovieDetails;
  status: boolean;
}

export async function POST(req: Request) {
  legitCheck();
  const body: BodyType = await req.json();
  const user = await currentUser();
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  const { id } = await user;
  const { type, movieData, status } = body;

  await prisma.movie.upsert({
    where: { imoID_userId: { imoID: movieData.id, userId: id } },
    update: { [type]: !status },
    create: {
      imoID: movieData.id,
      userId: id,
      [type]: !status,
      title: movieData.title,
      img_path: movieData.poster_path,
    },
  });
  // await prisma.movie.deleteMany();

  return NextResponse.json({ [type]: !status });
}
