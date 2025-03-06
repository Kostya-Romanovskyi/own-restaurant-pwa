import DatePickerValue from '../../components/DatePicker/DatePickerValue';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import dateFormatter from '../../helpers/dateFormatter';
import StaffOrdersTable from '../../components/StaffOrdersTable/StaffOrdersTable';
import { useGetAllOrdersByDate } from '../../hooks/useOrder';
import { IStaffAllOrders } from '../../API/order/order.interface';
import './orders-by-date-page.scss';
import Spinner from '../../components/Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';

const OrdersByDatePage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [ordersListByDate, setOrdersListByDate] = useState<IStaffAllOrders[]>([]);
  const [totalAmount, setTotalAmount] = useState<string | null>(null);
  const formattedDate = selectedDate ? dateFormatter(selectedDate) : '';
  const { mutate, isPending } = useGetAllOrdersByDate();

  const handleSearchOrders = () => {
    console.log(formattedDate);

    if (selectedDate) {
      const dateForSearch = { date: formattedDate };

      mutate(dateForSearch, {
        onSuccess: data => {
          if (data?.orders) {
            setOrdersListByDate(data.orders);
          }
          if (data?.totalMoneyForThisDay) {
            setTotalAmount(data.totalMoneyForThisDay.toString());
          }
        },
        onError: (data: any) => {
          if (data?.orders) {
            setOrdersListByDate(data.orders);
          }
          if (data?.totalMoneyForThisDay) {
            setTotalAmount(data.totalMoneyForThisDay.toString());
          }
        },
      });
    }
  };

  return (
    <div className="staff__container">
      <div className="date__picker_wrapper">
        <DatePickerValue value={selectedDate} onChange={setSelectedDate} />
        <button className="logout__btn" onClick={handleSearchOrders} type="button">
          {isPending ? <Spinner size={spinnerSize.sm} /> : 'Search orders'}
        </button>
      </div>

      {ordersListByDate.length === 0 ? (
        <div className="empty__table">Orders will be here</div>
      ) : (
        <>
          <p className="total__amount__by__date">Total amount for this day: {totalAmount}</p>
          <StaffOrdersTable todayOrdersInfo={ordersListByDate} isLoading={isPending} />
        </>
      )}
    </div>
  );
};

export default OrdersByDatePage;
