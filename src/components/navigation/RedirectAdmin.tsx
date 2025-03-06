import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useAuth';

const RedirectAdmin = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  const allowedPages = [
    '/staff',
    '/admin-page/manage-items',
    '/admin-page/manage-category',
    '/admin-page/manage-product',
    '/admin-page',
    '/today-orders',
    '/orders-by-date',
  ];

  useEffect(() => {
    if (user?.role === 'admin' && !allowedPages.includes(location.pathname)) {
      navigate('/staff', { replace: true });
    }
  }, [user, location, navigate]);

  return <>{children}</>;
};

export default RedirectAdmin;
