import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { addIngredientsToItem, getAllIngredients } from '../API/ingredients/ingredients';
import { IUpdateIngredientsParams } from '../API/ingredients/ingredients.interface';

export const useGetAllIngredients = () => {
	return useQuery({
		queryKey: ['ingredients'],
		queryFn: getAllIngredients,
	});
};

export const useAddIngredientsToItem = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey: ['addItem'],
		mutationFn: (updatedData: IUpdateIngredientsParams) => addIngredientsToItem(updatedData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['items'] });
		},
	});

	return { mutate, isPending };
};
