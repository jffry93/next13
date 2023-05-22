import { PrismaClient } from '@prisma/client';
import { auth, currentUser } from '@clerk/nextjs';

//connect to the database
export const prisma = new PrismaClient();

// check user auth
export const legitCheck = () => {
  const { userId } = auth();
  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }
};
