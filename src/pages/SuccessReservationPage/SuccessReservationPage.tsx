import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SuccessReservationPage.scss';
import { useNavigate } from 'react-router-dom';

const SuccessReservationPage = () => {
  const [newReservation, setNewReservation] = useState({
    guest_count: 0,
    start_time: '',
    status: '',
    table_number: 0,
    user_id: 0,
    with_children: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const sessionCheck = sessionStorage.getItem('new-order');

    if (!sessionCheck) {
      navigate('/reservation');
    }
  }, []);

  useEffect(() => {
    const sessionCheck = sessionStorage.getItem('new-order');

    if (sessionCheck) {
      const parse = JSON.parse(sessionCheck);
      setNewReservation(parse);
    }
  }, []);

  return (
    <>
      <div className="success__position container">
        <div className="success__reservation__wrapper">
          <h2 className="success__reservation__title">Reservation Confirmed</h2>
          <p className="success__reservation__info">
            Thank you for your reservation! We're excited to welcome you.
          </p>
          <p className="success__reservation__info">Table: Table {newReservation.table_number}</p>
          <p className="success__reservation__info">Guests: {newReservation.guest_count}</p>
          <p className="success__reservation__info">Date and Time: {newReservation.start_time}</p>

          <p className="success__reservation__info">
            You can view your reservations anytime in your personal account.
          </p>

          <p className="success__reservation__notify">See you soon!</p>
        </div>
      </div>

      <div className="success__reservation__nav__wrapp">
        <Link className="success__reservation__style" to="/">
          Back to home
        </Link>
        <Link className="success__reservation__menu success__reservation__style" to="/menu">
          Back to menu
        </Link>
      </div>
    </>
  );
};

export default SuccessReservationPage;
