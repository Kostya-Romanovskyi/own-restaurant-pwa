import axios from 'axios';

import { IGetUsers, IRegister, ILogin, IUserProfileInfo } from './auth.interface';
import { getTokenConfig } from '../../helpers/checkToken';
import { BASE_AUTH_URL } from '../../constants/url';

// BASE avatar URL
export const avatarUrl = 'https://own-shop-back.onrender.com/';

export const getUsers = async () => {
  try {
    const response = await axios.get<IGetUsers[]>(`${BASE_AUTH_URL}/users`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const registerNewUser = async (newUser: IRegister) => {
  try {
    console.log(newUser);

    const response = await axios.post(`${BASE_AUTH_URL}/register`, newUser, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response;
  } catch (error: any) {
    console.log(error.response?.data?.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const loginUser = async (userData: ILogin) => {
  try {
    const response = await axios.post(`${BASE_AUTH_URL}/login`, userData);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const config = getTokenConfig();

    const response = await axios.get(`${BASE_AUTH_URL}/current`, config);

    return response.data;
  } catch (error: any) {
    console.warn('User is not authorized.');
    return null;
  }
};

export const updateUserData = async (userId: number, newUserData: IUserProfileInfo) => {
  try {
    const response = await axios.patch(`${BASE_AUTH_URL}/update-info/${userId}`, newUserData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const logout = async (userId: number) => {
  try {
    const config = getTokenConfig();

    await axios.post(`${BASE_AUTH_URL}/logout`, userId, config);

    localStorage.clear();
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};
