import React from 'react';
import { useAuth } from '../authentication';
import { useUser } from '../utils/helpers/user';

export const Home: React.FC<{}> = () => {
  const { user } = useAuth();
  //   console.log(user);
  return <div>home</div>;
};
