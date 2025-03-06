import { FC } from 'react';

import { IStaffAllOrders } from '../../API/order/order.interface';

import StaffOrdersTable from '../StaffOrdersTable/StaffOrdersTable';

import './staff-orders-list.scss';

interface StaffOrdersListProps {
  allOrders: IStaffAllOrders[];
  isLoading: boolean;
}

const StaffOrdersList: FC<StaffOrdersListProps> = ({ allOrders = [], isLoading }) => {
  return (
    <>
      <StaffOrdersTable todayOrdersInfo={allOrders} isLoading={isLoading} />
    </>
  );
};

export default StaffOrdersList;
