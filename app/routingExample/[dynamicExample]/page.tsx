import React from 'react';

interface PropType {
  params: {
    dynamicExample: string;
  };
  searchParams: {}; // TODO: type this
}

export const metadata = {
  title: 'Example Page Title',
  description: 'metadata in page files overrides metadata in layout files',
};

const DynamicExample = (props: PropType) => {
  console.log(props.params.dynamicExample);
  return (
    <div>
      <h1>Dynamic Example ({props.params.dynamicExample})</h1>
      <p>This is the parent page. There is another nested example page</p>
    </div>
  );
};

export default DynamicExample;
