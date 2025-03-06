import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  getProductsByName,
} from '../API/products/products';
import { IAddNewProduct } from '../API/products/products.interface';

export const useAllProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });
};

export const useProductsByName = (name: string) => {
  return useQuery({
    queryKey: ['products-list', name],
    queryFn: () => getProductsByName(name),
  });
};

export const useAddNewProduct = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['addProduct'],
    mutationFn: (newProduct: IAddNewProduct) => addNewProduct(newProduct),
  });

  return { mutate, isPending };
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return { mutate, isPending };
};
