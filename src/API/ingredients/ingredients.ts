import axios from 'axios';
import { IIngredient, IUpdateIngredientsParams } from './ingredients.interface';
import { BASE_URL } from '../../constants/url';

export const getAllIngredients = async () => {
  try {
    const response = await axios.get<IIngredient[]>(`${BASE_URL}/ingredients`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addIngredientsToItem = async (updatedData: IUpdateIngredientsParams) => {
  try {
    const result = await axios.post(
      `${BASE_URL}/items/${updatedData.itemId}/ingredients`,
      updatedData.ingredientIds
    );

    console.log(result.data);

    return result.data;
  } catch (error) {
    console.error(error);
  }
};
