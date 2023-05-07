import { ClerkProvider } from '@clerk/nextjs';

export const WithProviders = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};
