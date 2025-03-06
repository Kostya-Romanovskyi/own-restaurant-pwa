import axios from 'axios';
import {
  IReservation,
  IChangeReservStatus,
  IReservationWithUser,
  IReservationPag,
} from './reservation.interface';
import { BASE_URL } from '../../constants/url';

export const getAllReservations = async () => {
  try {
    const response = await axios.get<IReservationWithUser[]>(`${BASE_URL}/reservation`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllReservationsForToday = async () => {
  try {
    const response = await axios.get<IReservation[]>(`${BASE_URL}/reservation-today`);
    console.log('reservations', response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUsersReservation = async (userId: number, page: number) => {
  try {
    const response = await axios.get<IReservationPag>(`${BASE_URL}/reservation-my/${userId}`, {
      params: {
        page,
        limit: 5,
      },
    });
    console.log('reservations', response);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addNewReservation = async (newReservation: IReservation) => {
  try {
    const response = await axios.post<IReservation[]>(`${BASE_URL}/reservation`, newReservation);
    console.log('add reservations', response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const changeReservationStatus = async ({ status, reservationId }: IChangeReservStatus) => {
  try {
    const response = await axios.patch(`${BASE_URL}/reservation-status/${reservationId}`, {
      status,
    });
    console.log('Changed reservation', response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
