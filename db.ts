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

// create user
export const createUser = async () => {
  const user = await currentUser();

  if (user) {
    await prisma.user.upsert({
      where: {
        id: user.id,
      },
      update: {},
      create: {
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }
};
