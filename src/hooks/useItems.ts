import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addNewItem, deleteItem, getAllItems, getItemById, getItemsByQuery } from '../API/item/item';
import { IAddNewItem } from '../API/item/item.interface';

export const useAllItems = () => {
	return useQuery({
		queryKey: ['items'],
		queryFn: getAllItems,
	});
};

export const useItemById = (id: string) => {
	return useQuery({
		queryKey: ['item-id', id],
		queryFn: () => getItemById(id),
	});
};

export const useItemsByQuery = (query: string) => {
	return useQuery({
		queryKey: ['item-query', query],
		queryFn: () => getItemsByQuery(query),
		enabled: Boolean(query),
	});
};

export const useAddNewItem = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey: ['addItem'],
		mutationFn: (newItem: IAddNewItem) => addNewItem(newItem),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['items'] });
		},
	});

	return { mutate, isPending };
};

export const useDeleteItem = () => {
	const { mutate, isPending } = useMutation({
		mutationKey: ['delete-item'],
		mutationFn: (itemId: string) => deleteItem(itemId),
	});

	return { mutate, isPending };
};
