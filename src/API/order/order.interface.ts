import { IGetUsers } from '../auth/auth.interface';

export enum Status {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export interface INewOrder {
  user_id: number;
  status: Status;
}

export interface IRespAddNewOrder {
  id: number;
  user_id: number;
  status: Status;
  total_price: number;
}

export interface IUserOrderProduct {
  id: number;
  image: string;
  name: string;
  price: string;
}

export interface IOrderItems {
  createdAt: string;
  id: number;
  price: string;
  product: IUserOrderProduct;
  quantity: number;
}

export interface IUserOrder {
  id: number;
  user_id?: number;
  order_id?: number;
  order_items: IOrderItems[];
  status: Status;
  totalPrice: string;
  order_date: Date;
  chopsticks: string;
  chopsticks_quantity: number;
  allergic: string;
  type_of_allergy: string;
  soy_sauce: string;
  additional_information: string;
}

export interface IOrdersInCart {
  currentPage: number;
  result: IUserOrder[];
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
}
export interface IPaginationSetting {
  page: number;
  limit: number;
}

export interface IStaffAllOrders {
  id: number;
  user_id: number;
  order_date: string;
  status: string;
  total_price: string;
  chopsticks: string;
  chopsticks_quantity: number;
  soy_sauce: string;
  allergic: string;
  type_of_allergy: string;
  additional_information: string;
  order_items: IStaffOrdersItem[];
  user: IGetUsers;
}

export interface IStaffOrdersItem {
  id: number;
  order_id: number;
  products_item_id: number;
  quantity: number;
  price: string;
  createdAt: string;
  updatedAt: string;
  products_item: IStaffProductsItem;
}

export interface IStaffProductsItem {
  id: number;
  name: string;
  price: string;
  image: string;
}

export interface IStatus {
  status: string;
}

export interface IUpdateStatus {
  status: IStatus;
  orderId: string | number;
}

export interface IStatusWithTime {
  status: string;
  orderId: string | number;
  time: string;
}

export interface IOrdersForToday {
  todayOrders: IStaffAllOrders[];
  totalMoneyFromAllOrders: string;
}

export interface IOrdersByDate {
  message?: string;
  orders: IStaffAllOrders[];
  totalMoneyForThisDay: string;
}
export interface IGetOrdersByDateString {
  date: string;
}
