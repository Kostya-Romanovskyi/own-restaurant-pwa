import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addNewOrder,
  getAllOrders,
  getAllOrdersByDate,
  getAllOrdersForToday,
  getUserOrders,
  updateOrderStatus,
  updateOrderStatusStaff,
} from '../API/order/order';
import {
  IUpdateStatus,
  IUserOrder,
  IStatusWithTime,
  IGetOrdersByDateString,
} from '../API/order/order.interface';
import { toast } from 'react-toastify';

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ['AllOrders'],
    queryFn: () => getAllOrders(),
  });
};

export const useGetAllOrdersForToday = () => {
  return useQuery({
    queryKey: ['today-orders'],
    queryFn: () => getAllOrdersForToday(),
  });
};

export const useGetAllOrdersByDate = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (date: IGetOrdersByDateString) => getAllOrdersByDate(date),
  });

  return { mutate, isPending };
};

export const useAddNewOrder = () => {
  const queryClient = useQueryClient();
  const { data: user } = useQuery<IUserOrder>({ queryKey: ['current'] });

  const { mutate } = useMutation({
    mutationFn: addNewOrder,
    onSuccess: () => {
      toast.success('Your order has been placed successfully!');
      queryClient.invalidateQueries({ queryKey: ['user-cart', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['UserOrders', user?.id] });
    },
    onError: error => {
      alert(error);
    },
  });

  return mutate;
};

export const useGetUserOrders = (userId: number, page: number) => {
  return useQuery({
    queryKey: ['UserOrders', userId, page],
    queryFn: () => getUserOrders(userId, page),
  });
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['update-status'],
    mutationFn: (updatedData: IUpdateStatus) => updateOrderStatus(updatedData),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['AllOrders'] });
      toast.success(data.message);
    },
    onError: error => {
      alert(error);
    },
  });

  return { mutate, isPending };
};

export const useUpdateStatusStaff = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['update-status-staff'],
    mutationFn: (statusWithTime: IStatusWithTime) => updateOrderStatusStaff(statusWithTime),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['AllOrders'] });
      toast.success(data.message);
    },
    onError: error => {
      alert(error);
    },
  });

  return { mutate, isPending };
};
