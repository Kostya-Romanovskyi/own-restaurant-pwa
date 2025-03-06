import { useLogoutUser } from '../../hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { IRegister } from '../../API/auth/auth.interface';

import './logout-btn.scss';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';

const LogoutBtn = () => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<IRegister>(['current']);

  const { mutate, isPending } = useLogoutUser();

  const handleLogout = () => {
    if (data && typeof data.id === 'number') {
      mutate(data.id, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ['current'] });
        },
      });
    }
  };

  return (
    <button className="logout__btn" onClick={handleLogout}>
      {isPending ? <Spinner size={spinnerSize.sm} /> : 'Logout'}
    </button>
  );
};

export default LogoutBtn;
