import { useEffect } from 'react';
import { useGetAllOrders } from '../../hooks/useOrder';
import { useAllReservations } from '../../hooks/useReservations';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import LogoutBtn from '../LogoutBtn/LogoutBtn';
import playOrderSound from '../../helpers/PlayOrderSound';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import io from 'socket.io-client';
import './header-staff.scss';

const usePendingStatus = (items: any, statusType: string) => {
  const [hasPending, setHasPending] = useState(false);

  useEffect(() => {
    setHasPending(items ? items.some((item: any) => item.status === statusType) : false);
  }, [items, statusType]);

  return hasPending;
};

// hook for sound
const useSoundNotification = (shouldPlay: boolean, message: string) => {
  useEffect(() => {
    if (!shouldPlay) return;

    playOrderSound();

    const intervalId = setInterval(playOrderSound, 5000);

    return () => clearInterval(intervalId);
  }, [shouldPlay, message]);
};

const HeaderStaff = () => {
  const { data: orders } = useGetAllOrders();
  const { data: reservations } = useAllReservations();
  const queryClient = useQueryClient();
  useEffect(() => {
    // const socket = io('http://localhost:3000');
    const socket = io('https://own-shop-back.onrender.com');

    socket.on('NEW_ORDER', newOrder => {
      queryClient.invalidateQueries({ queryKey: ['AllOrders'] });
      console.log('New order received:', newOrder);
      playOrderSound();
    });

    socket.on('NEW_RESERVATION', newReservation => {
      queryClient.invalidateQueries({ queryKey: ['all-reservations'] });
      console.log('New reservation received:', newReservation);
      playOrderSound();
    });

    return () => {
      socket.off('NEW_ORDER');
      socket.off('NEW_RESERVATION');
      socket.disconnect();
    };
  }, []);

  const hasPendingOrders = usePendingStatus(orders, 'Pending');
  const hasPendingReservations = usePendingStatus(reservations, 'Pending');

  useSoundNotification(hasPendingOrders, 'orders Pending!');
  useSoundNotification(hasPendingReservations, 'reservations Pending!');

  const checkStatus = orders?.find(order => order.status === 'Pending');

  return (
    <>
      <div className="container header__staff__padding">
        <ul className="header__staff__list">
          <li
            className={`header__staff__item active__orders blink-bg ${checkStatus?.status === 'Pending' ? 'tabs__blink' : ''}`}
          >
            <Link to="/staff">Active orders</Link>
          </li>
          <li className="header__staff__item">
            <Link to="/today-orders">All orders for today</Link>
          </li>
          <li className="header__staff__item">
            <Link to="/orders-by-date">All orders by date</Link>
          </li>
          <li className="header__staff__item">
            <LogoutBtn />
          </li>
        </ul>
      </div>

      <Outlet />
    </>
  );
};

export default HeaderStaff;
