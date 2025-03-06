import { useMutation } from '@tanstack/react-query';
import { getUserById } from '../API/user/user';

export const useUserInfo = () => {
	const { mutate, isPending } = useMutation({
		mutationKey: ['user'],
		mutationFn: (userId: number) => getUserById(userId),
	});

	return { mutate, isPending };
};
