import React from 'react';
import { mutate, SWRConfig, useSWRConfig } from 'swr';
import { Avatar } from './User';

const Cache = () => {
  return (
    <SWRConfig>
      <Page />
    </SWRConfig>
  );
};

export default Cache;

const Page = () => {
  const { cache } = useSWRConfig();

  return (
    <>
      <Avatar id={2} />
      <button
        onClick={() => {
          mutate('https://jsonplaceholder.typicode.com/users/2');
          console.log(
            `check: ${JSON.stringify(cache.get('https://jsonplaceholder.typicode.com/users/2'))}`
          );
        }}
      >
        check
      </button>
    </>
  );
};
