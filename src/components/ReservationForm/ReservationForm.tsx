import { useState, useEffect } from 'react';
import TableSelector from '../TableSelector/TableSelector';
import ChildrenSelector from '../ChildrenSelector/ChildrenSelector';
import BasicDateTimePicker from '../../components/Calendar/Calendar';
import { IReservation } from '../../API/reservation/reservation.interface';
import dateAndTime from '../../helpers/dateAndTime';
import { toast } from 'react-toastify';
import './reservation-form.scss';
import { useAllReservations } from '../../hooks/useReservations';

const ReservationForm = ({
  currentUser,
  onSubmit,
}: {
  currentUser: any;
  onSubmit: (data: IReservation) => void;
}) => {
  const [selectedTable, setSelectedTable] = useState(-1);
  const [guestCount, setGuestCount] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectChildren, setSelectChildren] = useState<boolean | null>(null);
  const [reservedTables, setReservedTables] = useState<number[]>([]);
  const { data } = useAllReservations();

  useEffect(() => {
    if (data && selectedTime) {
      const selectedDate = new Date(selectedTime).toISOString().slice(0, 10);
      const filteredReservations = data.filter(
        (res: { table_number: number; start_time: string; status: string }) => {
          const reservationDate = new Date(res.start_time).toISOString().slice(0, 10);
          return reservationDate === selectedDate && res.status !== 'Cancelled';
        }
      );

      setReservedTables(
        filteredReservations.map((res: { table_number: number }) => res.table_number)
      );
    }
  }, [selectedTime, data]);

  const handleSubmit = () => {
    if (selectedTable === -1) {
      toast.error('Please, choose the table');
      return;
    }

    if (!selectedTime) {
      toast.error('Please, choose date and time');
      return;
    }

    if (selectChildren === null) {
      toast.error('Please, choose children option');
      return;
    }

    const reservationData: IReservation = {
      table_number: selectedTable,
      guest_count: guestCount,
      start_time: dateAndTime(selectedTime),
      status: 'Pending',
      user_id: currentUser.id,
      with_children: selectChildren,
    };

    sessionStorage.setItem('new-order', JSON.stringify(reservationData));

    onSubmit(reservationData);
  };

  return (
    <div>
      <h3 className="calendar__title">Select reservation time:</h3>
      <div className="calendar__wrapper">
        <BasicDateTimePicker onTimeSelect={setSelectedTime} />
      </div>
      <TableSelector
        onTableSelect={(table, guests) => {
          setSelectedTable(table);
          setGuestCount(guests);
        }}
        selectedTime={selectedTime}
        reservedTables={reservedTables}
      />

      <ChildrenSelector onChildrenSelect={setSelectChildren} />
      <button className="reservation__submit__btn" onClick={handleSubmit}>
        Submit Reservation
      </button>
    </div>
  );
};

export default ReservationForm;
