import axios from 'axios';
import useSWR from 'swr';

const fetcher = (...args) => axios.get(...args).then((res) => res.data);

const useUser = (id) => {
  const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/users/${id}`, fetcher, {
    refreshInterval: 1000,
  });

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const User = () => {
  return (
    <>
      <Profile id={1} />
      <Avatar id={1} />
    </>
  );
};

export const Profile = ({ id }) => {
  const { user, isLoading, isError } = useUser(id);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <div>hello {user.name}!</div>
      <Avatar id={1} />
    </>
  );
};

export const Avatar = ({ id }) => {
  const { user, isLoading, isError } = useUser(id);

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <div>hello {user.name}!</div>;
};
