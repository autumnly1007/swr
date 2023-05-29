import axios from 'axios';
import React from 'react';
import { SWRConfig } from 'swr';
import useSWR from 'swr';

const Fetcher = () => {
  return (
    <SWRConfig value={{ fetcher: (...args) => axios.get(...args).then((res) => res.data) }}>
      <Page />
    </SWRConfig>
  );
};

export default Fetcher;

const Page = () => {
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/posts/3', {
    onErrorRetry: (error, revalidate, { retryCount }) => {
      if (error.status === 404) return alert(404);
      if (retryCount > 3) return;
      setTimeout(() => revalidate({ retryCount }, 100));
    },
  });

  if (error) return <>Error!</>;
  if (!data) return <>Loading...</>;

  return <>{data.title}</>;
};
