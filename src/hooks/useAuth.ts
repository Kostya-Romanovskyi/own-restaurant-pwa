import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, registerNewUser } from '../API/auth/auth';
import { IRegister } from '../API/auth/auth.interface';
import { loginUser, logout, updateUserData } from '../API/auth/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current'],
    queryFn: getCurrentUser,
    select: data => data,
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,

    onSuccess: data => {
      queryClient.setQueryData(['login'], data);

      if (data?.token) {
        const token = data?.token;
        localStorage.setItem('token-shop', token);
      }

      if (data?.role === 'admin') {
        navigate('/staff', { replace: true });
      }
    },

    onError: error => {
      toast.error(error.message);
    },
  });

  return { mutate, isPending };
};

export const useRegisterUser = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (registerData: IRegister) => registerNewUser(registerData),

    onSuccess: () => {
      navigate('/success-registration');
      toast.success('Registration successful! Welcome aboard!');
    },

    onError: error => {
      const errorMessage = error.message || 'Registration failed';
      toast.error(errorMessage);
    },
  });

  return { mutate, isPending };
};

export const useUpdateUserData = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ userId, newUserData }: { userId: number; newUserData: any }) => {
      await updateUserData(userId, newUserData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current'] });
      toast.success(`Your data successfully updated`);
    },
    onError: error => {
      toast.error(`${error.message}`);
    },
  });

  return { mutate, isPending };
};

export const useLogoutUser = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: logout,
  });

  return { mutate, isPending };
};
