import axios from 'axios';
import { IGetUsers } from './user.interface';

// const BASE_URL = `http://localhost:3000/api`;
const BASE_URL = `https://own-shop-back.onrender.com/api`;

export const getUserById = async (userId: number) => {
  try {
    const response = await axios.get<IGetUsers>(`${BASE_URL}/user/${userId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
