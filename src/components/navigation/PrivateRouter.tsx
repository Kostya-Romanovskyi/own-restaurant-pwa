import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

interface IPrivateRoute {
  component: ReactNode;
  redirectTo: string;
}

const PrivateRouter: FC<IPrivateRoute> = ({ component: Component, redirectTo = '/' }) => {
  const { data, isLoading } = useQuery({ queryKey: ['current'] });

  if (isLoading) return null;
  if (!data) return <Navigate to={redirectTo} />;

  return Component;
};

export default PrivateRouter;
