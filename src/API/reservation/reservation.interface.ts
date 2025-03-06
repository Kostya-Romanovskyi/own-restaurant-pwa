import { IRegister } from '../auth/auth.interface';

export interface IReservation {
  id?: number;
  start_time: string;
  guest_count: number;
  with_children: boolean;
  user_id: number;
  table_number: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IReservationPag {
  reservation: IReservation[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface IChangeReservStatus {
  status: string;
  reservationId: number;
}

export interface IReservationWithUser {
  id?: number;
  start_time: string;
  guest_count: number;
  with_children: boolean | null;
  user_id: number;
  status: string;
  table_number: number;
  createdAt?: string;
  user: IRegister;
}
