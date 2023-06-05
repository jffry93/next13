import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Make the homepage accessible while signed out
  publicRoutes: ['/', '/contact'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};
