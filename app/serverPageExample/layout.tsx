import React from 'react';

export const metadata = {
  title: 'Routing Example Layout Title',
  description: 'metadata for all pages in this directory',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>All users</h1>
      {children}
    </div>
  );
};

export default Layout;
