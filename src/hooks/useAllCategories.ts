import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewCategory, deleteCategory, getAllCategories, getCategoryById } from '../API/categories/categories';
import { ICategoryByName, IAddNewCategory } from '../API/categories/categories.interface';

export const useAllCategories = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: getAllCategories,
	});
};

export const useCategoryByName = (categoryName: string) => {
	return useQuery<ICategoryByName | undefined>({
		queryKey: ['categories-name', categoryName],
		queryFn: () => getCategoryById(categoryName),
	});
};

export const useAddNewCategory = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (newCategory: IAddNewCategory) => addNewCategory(newCategory),
	});
	return { mutate, isPending };
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: (categoryId: string) => deleteCategory(categoryId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
		},
	});

	return { mutate, isPending };
};
