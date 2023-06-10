import { currentUser } from '@clerk/nextjs';
import { prisma } from '..';

export interface MovieOpinions {
  recommend: boolean;
  watchlist: boolean;
  completed: boolean;
}

export async function getUserOpinions(id: string) {
  const user = await currentUser();

  const usersOpinion = await prisma.movie.findFirst({
    where: {
      userId: user?.id,
      imoID: Number(id),
    },
  });

  if (usersOpinion) {
    return {
      recommend: usersOpinion.recommend,
      watchlist: usersOpinion.watchlist,
      completed: usersOpinion.completed,
    };
  } else {
    return {
      recommend: false,
      watchlist: false,
      completed: false,
    };
  }
}

export async function getUserMovieOpinions() {
  const user = await currentUser();

  const usersOpinion = await prisma.movie.findMany({
    where: {
      userId: user?.id,
    },
  });

  return usersOpinion;
}
