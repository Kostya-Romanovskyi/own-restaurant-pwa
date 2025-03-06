import axios from 'axios';
import {
  IOrdersInCart,
  INewOrder,
  IStaffAllOrders,
  IUpdateStatus,
  IStatusWithTime,
  IOrdersForToday,
  IGetOrdersByDateString,
  IOrdersByDate,
} from './order.interface';
import { BASE_URL } from '../../constants/url';

export const getAllOrders = async () => {
  try {
    const response = await axios.get<IStaffAllOrders[]>(`${BASE_URL}/orders`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrdersForToday = async () => {
  try {
    const response = await axios.get<IOrdersForToday>(`${BASE_URL}/orders-all-today`);
    console.log('for today:', response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrdersByDate = async (date: IGetOrdersByDateString) => {
  try {
    const response = await axios.post<IOrdersByDate>(`${BASE_URL}/orders-by-date`, date);
    console.log(`for this day: ${date}`, response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserOrders = async (userId: number, page: number = 1, limit: number = 5) => {
  try {
    const response = await axios.get<IOrdersInCart>(`${BASE_URL}/${userId}/orders`, {
      params: {
        page,
        limit,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addNewOrder = async (newOrder: INewOrder) => {
  try {
    const response = await axios.post(`${BASE_URL}/order`, newOrder);
    console.log(response);

    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'Your cart is empty');
  }
};

export const updateOrderStatus = async (updatedData: IUpdateStatus) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/update-status/${updatedData.orderId}`,
      updatedData.status
    );
    console.log(response);

    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'Error to update status');
  }
};

export const updateOrderStatusStaff = async (statusWithTime: IStatusWithTime) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-status-staff/${statusWithTime.orderId}`, {
      status: statusWithTime.status,
      time: statusWithTime.time,
    });
    console.log('new func', response);

    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response?.data?.message || 'Error to update status');
  }
};
