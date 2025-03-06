import { FC, useState } from 'react';

import './staff-reservation-item.scss';

import SelectComponent from '../SelectComponent/SelectComponent';
import { useChangeReservationStatus } from '../../hooks/useReservations';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';
import dateAndTime from '../../helpers/dateAndTime';
import { IReservationWithUser } from '../../API/reservation/reservation.interface';
import { reservationStatusSelect } from '../../constants/statusSelect';

interface IStaffReservationItemProps {
  reservation: IReservationWithUser;
}

const StaffReservationItem: FC<IStaffReservationItemProps> = ({ reservation }) => {
  const [selectedOption, setSelectedOption] = useState({ value: 'pending', label: 'Pending' });
  const { mutate, isPending } = useChangeReservationStatus();

  const handleSubmitStatus = () => {
    const updatedStatus = {
      status: selectedOption.value,
      reservationId: reservation?.id || -1,
    };

    mutate(updatedStatus);
  };

  const formattedDate = dateAndTime(reservation?.createdAt);

  console.log(dateAndTime(reservation?.start_time));

  return (
    <li className="reservation__item">
      <div className="reservation__item__wrapper reservation__item__wrapper--margin">
        <div className="reservation__number">
          <span className="order__details__id"> № {reservation?.id}</span>{' '}
          <span className="reservation__time"> | {formattedDate}</span>
          <span className={`reservations__status order__details__status--${reservation?.status}`}>
            {reservation?.status}
          </span>
        </div>
      </div>
      <div className="reservation__flex">
        <div className="order__info__wrapp reservation__indent">
          <h2 className="order__info__customer__title">Customer</h2>

          <div className="customer__name__wrapp sections__style">
            <p className="customer__name">
              {reservation?.user?.name} {reservation?.user?.last_name}
            </p>
          </div>

          <div className="sections__style">
            <h2 className="order__info__subtitle">Contant info</h2>
            <p className="customer__phone">
              Phone: <a href={`tel:${reservation?.user?.phone}`}>{reservation?.user?.phone}</a>
            </p>

            <p>
              Email: <a href={`mailto:${reservation?.user?.email}`}>{reservation?.user?.email}</a>
            </p>
          </div>
        </div>

        <div className="order__info__wrapp reservation__indent">
          <p className="reservation__additional__info">
            <span className="info__span">Number of guests:</span> {reservation?.guest_count}
          </p>
          <p className="reservation__additional__info">
            <span className="info__span">Reservation started at:</span>{' '}
            {dateAndTime(reservation?.start_time)}
          </p>
          <p className="reservation__additional__info">
            <span className="info__span">Table number:</span> {reservation?.table_number}
          </p>

          <p className="reservation__additional__info">
            <span className="info__span">With children:</span>{' '}
            {reservation?.with_children ? 'yes' : 'no'}
          </p>
        </div>

        <div>
          <SelectComponent
            options={reservationStatusSelect}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />

          <p>Choose waiting time for user</p>

          <button
            className="button__type--btn button__type--indent"
            onClick={handleSubmitStatus}
            type="submit"
          >
            {isPending ? <Spinner size={spinnerSize.sm} /> : 'Change status'}
          </button>
        </div>
      </div>
    </li>
  );
};

export default StaffReservationItem;
