import axios from 'axios';
import { IAddNewItem, IItem } from './item.interface';
import { IProductItem } from '../products/products.interface';

import { BASE_URL } from '../../constants/url';

// BASE item url
export const itemUrl = 'https://own-shop-back.onrender.com/';

export const getAllItems = async () => {
  try {
    const result = await axios.get<IProductItem[]>(`${BASE_URL}/items`);
    console.log(result);

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const getItemById = async (id: string) => {
  try {
    const result = await axios.get<IItem>(`${BASE_URL}/items/by-id/${id}`);

    console.log(result.data);

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const getItemsByQuery = async (query: string) => {
  try {
    const result = await axios.get<IProductItem>(`${BASE_URL}/items/query/${query}`);

    console.log(result.data);

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const addNewItem = async (newItem: IAddNewItem) => {
  try {
    const result = await axios.post(`${BASE_URL}/items/`, newItem, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(result.data);

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteItem = async (itemId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/items/${itemId}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
