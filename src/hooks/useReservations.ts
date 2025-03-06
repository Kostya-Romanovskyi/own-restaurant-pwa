import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getUsersReservation,
  addNewReservation,
  changeReservationStatus,
  getAllReservationsForToday,
  getAllReservations,
} from '../API/reservation/reservation';
import { useNavigate } from 'react-router-dom';
import { IChangeReservStatus } from '../API/reservation/reservation.interface';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useAllReservations = () => {
  return useQuery({
    queryKey: ['all-reservations'],
    queryFn: () => getAllReservations(),
  });
};

export const useUsersReservation = (userId: number, page: number) => {
  return useQuery({
    queryKey: ['my-reservations', page],
    queryFn: () => getUsersReservation(userId, page),
  });
};

export const useReservationToday = () => {
  return useQuery({
    queryKey: ['reservations-today'],
    queryFn: () => getAllReservationsForToday(),
  });
};

export const useAddNewReservation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: addNewReservation,
    onSuccess: () => {
      navigate('/success-reservation');
      queryClient.invalidateQueries({ queryKey: ['all-reservations'] });
    },
    onError: error => {
      alert(error);
    },
  });

  return mutate;
};

export const useChangeReservationStatus = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (newStatus: IChangeReservStatus) => changeReservationStatus(newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-reservations'] });
      queryClient.invalidateQueries({ queryKey: ['all-reservations'] });

      toast.success('Reservation successfully cancelled');
    },
    onError: error => {
      alert(error);
    },
  });

  return { mutate, isPending };
};
