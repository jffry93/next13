import { prisma } from '@/db';
import { ClerkProvider, currentUser } from '@clerk/nextjs';

// create user
const createUser = async () => {
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
  createUser();
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default Provider;
