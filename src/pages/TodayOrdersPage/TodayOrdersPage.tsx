import './today-orders-page.scss';
import { useGetAllOrdersForToday } from '../../hooks/useOrder';

import StaffOrdersTable from '../../components/StaffOrdersTable/StaffOrdersTable';

const TodayOrdersPage = () => {
  const { data: allTodayOrders = { todayOrders: [], totalMoneyFromAllOrders: '' }, isLoading } =
    useGetAllOrdersForToday();

  return (
    <div className="staff__container">
      <StaffOrdersTable todayOrdersInfo={allTodayOrders.todayOrders} isLoading={isLoading} />

      <p>Total amount for today: {allTodayOrders?.totalMoneyFromAllOrders} CAD$</p>
    </div>
  );
};

export default TodayOrdersPage;
