import { FC, PropsWithChildren } from 'react';
import useSession from '../hooks/useSession';
import React from 'react';

const SessionDataProvider: FC<PropsWithChildren> = ({ children }) => {
  useSession();
  return <>{children}</>;
};

export default SessionDataProvider;
