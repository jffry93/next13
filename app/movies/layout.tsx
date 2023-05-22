import React from 'react';
import Searchbar from '../components/searchbar';

export const metadata = {
  title: 'Routing Example Layout Title',
  description: 'metadata for all pages in this directory',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <Searchbar />

      {children}
    </div>
  );
};

export default Layout;
