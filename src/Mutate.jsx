import axios from 'axios';
import React from 'react';
import { SWRConfig, useSWRConfig } from 'swr';
import useSWR from 'swr';

const Mutate = () => {
  return (
    <SWRConfig>
      <Page />
      <Profile />
    </SWRConfig>
  );
};

export default Mutate;

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Page = () => {
  const { data } = useSWR('https://jsonplaceholder.typicode.com/posts/4', fetcher);
  const { mutate } = useSWRConfig();

  if (!data) return <>Loading...</>;

  return (
    <div>
      {data.title}
      <button
        onClick={async () => {
          const title = data.title.toUpperCase();

          // 로컬 데이터 즉시 업데이트, 갱신 비활성화
          mutate('https://jsonplaceholder.typicode.com/posts/4', { ...data, title }, false);

          // 로컬 데이터 재검증 (갱신 트리거)
          mutate('https://jsonplaceholder.typicode.com/posts/4');
        }}
      >
        UpperCase
      </button>
    </div>
  );
};

const Profile = () => {
  const { data, mutate } = useSWR('https://jsonplaceholder.typicode.com/posts/5', fetcher);

  if (!data) return <>Loading...</>;

  return (
    <div>
      {data.title}
      <button
        onClick={async () => {
          const title = data.title.toUpperCase();

          // 로컬 데이터 즉시 업데이트, 갱신 비활성화
          mutate({ ...data, title }, false);

          // 로컬 데이터 재검증 (갱신 트리거)
          mutate();
        }}
      >
        UpperCase
      </button>
    </div>
  );
};
