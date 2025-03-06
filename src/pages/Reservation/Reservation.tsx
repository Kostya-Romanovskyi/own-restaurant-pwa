import { useCurrentUser } from '../../hooks/useAuth';
import { useAddNewReservation, useUsersReservation } from '../../hooks/useReservations';
import ReservationForm from '../../components/ReservationForm/ReservationForm';
import './reservation.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Reservation = () => {
  const [checkReservations, setCheckReservations] = useState(false);
  const addNewReservation = useAddNewReservation();
  const { data: currentUser } = useCurrentUser();
  const { data: userReservations } = useUsersReservation(currentUser?.id, 1);

  const handleReservationSubmit = (reservationData: any) => {
    addNewReservation(reservationData);
  };

  useEffect(() => {
    const checkStatus = userReservations?.reservation?.some(item => item.status === 'Pending');

    if (checkStatus) {
      setCheckReservations(true);
    }
  }, [userReservations]);

  return checkReservations ? (
    <div className="container">
      <div className="existed__reservation">
        <div className="test">
          <p className="existed__reservation--indent">
            You have a reservation for today. We're excited to welcome you!
          </p>
          <p className="existed__reservation--indent">
            For more details, you can view your reservation in your{' '}
            <Link className="existed__reservation__link" to="/profile/my-reservations">
              Profile Dashboard.
            </Link>{' '}
          </p>
          <p className="existed__reservation--indent">Looking forward to seeing you soon!</p>
        </div>
      </div>
    </div>
  ) : (
    <>
      <h2 className="reservation__title">Making Reservations Has Never Been Easier</h2>
      <div className="container">
        <ReservationForm currentUser={currentUser} onSubmit={handleReservationSubmit} />
      </div>
    </>
  );
};

export default Reservation;
