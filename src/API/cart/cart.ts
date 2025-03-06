import axios from 'axios';
import { BackendResponse, ICartList, INewItemInCart, ICartUpdateItem } from './cart.interface';
import { BASE_URL } from '../../constants/url';

export const getProductsInCart = async (userId: number) => {
  try {
    const result = await axios.get<BackendResponse>(`${BASE_URL}/${userId}/cart`);
    console.log('get', result);

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const calcTotalPrice = async (userId: number) => {
  try {
    const result = await axios.get<ICartList>(`${BASE_URL}/${userId}/calc-totalPrice`);
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const addItemInCart = async (newItem: INewItemInCart) => {
  try {
    console.log(newItem);
    const response = await axios.post(`${BASE_URL}/cart`, newItem);
    console.log(response);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to add item to cart');
  }
};

export const updateItemInCart = async (cartId: number, updatedItem: ICartUpdateItem) => {
  try {
    return axios.patch(`${BASE_URL}/${cartId}/cart-item-update`, updatedItem);
  } catch (error) {
    console.error(error);
  }
};

export const deleteItemFromCart = async (itemId: number) => {
  try {
    return axios.delete<number>(`${BASE_URL}/${itemId}/delete-cart`);
  } catch (error) {
    console.error(error);
  }
};
