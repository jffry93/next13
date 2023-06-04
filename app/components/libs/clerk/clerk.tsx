import { prisma } from '@/db';
import { ClerkProvider, currentUser } from '@clerk/nextjs';

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

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default Provider;
