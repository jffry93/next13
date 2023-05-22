import { createUser, prisma } from '@/db';
import { ClerkProvider, currentUser } from '@clerk/nextjs';

export const WithProviders = ({ children }: { children: React.ReactNode }) => {
  createUser();
  return <ClerkProvider>{children}</ClerkProvider>;
};
