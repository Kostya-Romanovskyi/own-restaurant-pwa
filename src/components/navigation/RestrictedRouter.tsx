import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

interface RestrictedRouterProps {
  component: React.ReactElement;
  redirectTo?: string;
}

const RestrictedRouter: FC<RestrictedRouterProps> = ({
  component: Component,
  redirectTo = '/',
}) => {
  const { data } = useQuery({ queryKey: ['current'] });

  return data ? <Navigate to={redirectTo} /> : Component;
};

export default RestrictedRouter;
