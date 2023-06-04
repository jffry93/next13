import React from 'react';
import { MovieSearchbar } from '../components/searchbar';

export const metadata = {
  title: 'Routing Example Layout Title',
  description: 'metadata for all pages in this directory',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <MovieSearchbar />
      {children}
    </div>
  );
};

export default Layout;
