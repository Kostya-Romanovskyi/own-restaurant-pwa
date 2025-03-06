import { useState } from 'react';
import { useCurrentUser } from '../../hooks/useAuth';
import { useUsersReservation, useChangeReservationStatus } from '../../hooks/useReservations';
import dateAndTime from '../../helpers/dateAndTime';
import Modal from '../Modal/Modal';
import './user-reservations.scss';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';
import { Link } from 'react-router-dom';
import PaginationComp from '../Pagination/PaginationComp';

const UserReservations = () => {
  const [page, setPage] = useState(1);
  const { data: userInfo } = useCurrentUser();
  const { data: reservationsList } = useUsersReservation(userInfo?.id, page);
  const [reservationId, setReservationId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useChangeReservationStatus();

  const handleModalClose = (id: number) => {
    setReservationId(id);

    setIsOpen(!isOpen);
  };

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const cancelReservation = () => {
    setIsOpen(!isOpen);

    const cancelledObject = {
      status: 'Cancelled',
      reservationId: reservationId,
    };

    mutate(cancelledObject);
  };

  if (reservationsList?.reservation?.length === 0) {
    return (
      <div>
        <p className="reservations__empty">You have no rewards yet.</p>
        <p className="reservations__empty">
          You can make your first reservation{' '}
          <Link className="reservations__empty__link" to="/reservation">
            here
          </Link>
        </p>
      </div>
    );
  }

  return (
    <ul>
      {isPending ? (
        <Spinner size={spinnerSize.sm} />
      ) : (
        reservationsList?.reservation &&
        reservationsList?.reservation.map(reservation => (
          <li className="user__reservation__item" key={reservation?.id}>
            <div className="tech__wrapper">
              <p className="user__reservation__id">№ {reservation.id}</p>
              <p className="user__reservation__time">from {dateAndTime(reservation.createdAt)}</p>
              <p className={`reservation__status reservation__status--${reservation.status}`}>
                {reservation.status}
              </p>
            </div>
            <p className="user__reservation__indent">
              Reservation will be started at{' '}
              <span className="user__reservation__time">{dateAndTime(reservation.start_time)}</span>
            </p>
            <p className="user__reservation__indent">
              Your table number is {reservation.table_number}
            </p>
            <p className="user__reservation__indent">For {reservation.guest_count} people</p>
            <p>
              Children:
              {reservation.with_children
                ? ' Yes, you will be accompanied by small children.'
                : ' No, this reservation does not include children.'}
            </p>

            <div className="button__wrapper">
              {reservation.status !== 'Cancelled' && reservation.status !== 'Completed' ? (
                <button
                  className="cancel__reservation__btn"
                  onClick={() => handleModalClose(reservation.id || 0)}
                  type="button"
                >
                  Cancel this reservation
                </button>
              ) : null}
            </div>

            <Modal
              isOpen={isOpen}
              onClose={() => handleModalClose(reservation.id || 0)}
              classStyle="reservation__modal"
            >
              <div>
                <p className="reservation__modal--title">
                  Are you sure you want to cancel your reservation?
                </p>

                <div className="modal__btns__wrapper">
                  <button className="modal__btns" onClick={() => cancelReservation()} type="button">
                    Yes
                  </button>
                  <button
                    className="modal__btns"
                    onClick={() => handleModalClose(reservation.id || 0)}
                    type="button"
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          </li>
        ))
      )}

      <PaginationComp
        currentPage={page}
        totalItems={reservationsList?.totalItems || 0}
        itemsPerPage={reservationsList?.itemsPerPage || 0}
        handleChange={handlePageChange}
      />
    </ul>
  );
};

export default UserReservations;
