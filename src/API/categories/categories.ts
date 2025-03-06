import axios from 'axios';
import { ICategoryByName, IAddNewCategory, IAllCategories } from './categories.interface';
import { BASE_URL } from '../../constants/url';

export const getAllCategories = async () => {
  try {
    const response = await axios.get<IAllCategories[]>(`${BASE_URL}/categories`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCategoryById = async (
  categoryName: string
): Promise<ICategoryByName | undefined> => {
  try {
    const response = await axios.get<ICategoryByName>(`${BASE_URL}/categories/${categoryName}`);
    console.log(response);

    return response.data;
  } catch (error: any) {
    console.error(error.message || error);

    return undefined;
  }
};

export const addNewCategory = async (newCategory: IAddNewCategory) => {
  console.log(newCategory);

  try {
    const response = await axios.post(`${BASE_URL}/categories`, newCategory, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response);

    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    await axios.delete(`${BASE_URL}/categories/${categoryId}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
