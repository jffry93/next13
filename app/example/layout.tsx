import React from 'react';

export const metadata = {
  title: 'Example Layout Title',
  description: 'metadata for all pages in this directory',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Example</h1>
      {children}
    </div>
  );
};

export default Layout;
