import { FC, useEffect, useState, useCallback } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

import { useChangeReservationStatus } from '../../hooks/useReservations';
import { useQueryClient } from '@tanstack/react-query';
import Modal from '../Modal/Modal';
import dateAndTime from '../../helpers/dateAndTime';
import StaffReservationItem from '../StaffReservationItem/StaffReservationItem';
import SelectComponent from '../SelectComponent/SelectComponent';
import { reservationStatusSelect } from '../../constants/statusSelect';

import { IReservationWithUser } from '../../API/reservation/reservation.interface';

import './staff-reservation-list.scss';

interface IDataRow {
  id: number;
  customer: string;
  status: string;
  phone: string;
  email: string;
  table: number;
  date: string;
}
interface StaffReservationListProps {
  allReservations: IReservationWithUser[];
}

const rowStyles = {
  height: '100px',
  fontSize: '1.2rem',
};

const StaffReservationList: FC<StaffReservationListProps> = ({ allReservations = [] }) => {
  const [selectedOption, setSelectedOption] = useState({ value: 'Pending', label: 'Pending' });
  const [filterText, setFilterText] = useState<string>('');
  const [selectedReservation, setSelectedReservation] = useState<any | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [expandedReservationId, setExpandedReservationId] = useState<number | null>(null);
  const [currentReservation, setCurrentReservation] = useState<any | null>(null);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useChangeReservationStatus();

  const getStatusClass = (status: string) => {
    return `status__styles--${status}`;
  };

  const filteredReservations: IDataRow[] = allReservations
    .filter(reservation =>
      [
        reservation?.id,
        reservation?.user?.name,
        reservation?.status,
        reservation?.user?.phone,
        reservation?.user?.email,
        reservation?.table_number,
        dateAndTime(reservation?.start_time),
      ]
        .join(' ')
        .toLowerCase()
        .includes(filterText.toLowerCase())
    )
    .map(reservation => ({
      id: reservation.id ?? 0,
      customer:
        `${reservation.user?.name || 'Unknown'} ${reservation.user?.last_name || ''}`.trim(),
      status: reservation.status || 'Pending',
      phone: reservation.user?.phone || 'N/A',
      email: reservation.user?.email || 'N/A',
      table: reservation.table_number ?? 0,
      date: dateAndTime(reservation.start_time) || 'Unknown',
    }))
    .reverse();

  const handleStatusClick = useCallback(
    (row: IDataRow) => {
      const fullReservation = allReservations.find(reservation => reservation.id === row.id);
      if (fullReservation) {
        setSelectedReservation(fullReservation);

        setShowModal(true);
      }
    },
    [allReservations]
  );

  const handleStatusChange = () => {
    if (selectedReservation && selectedOption !== selectedReservation.status) {
      mutate(
        { reservationId: selectedReservation.id, status: selectedOption.value },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['AllReservations'] });
          },
        }
      );
    }
    setShowModal(false);
  };

  const handleDetailsClick = (reservationId: number) => {
    console.log(reservationId);

    const selectedReservation = allReservations.find(res => res.id === reservationId);

    setExpandedReservationId(prevId => (prevId === reservationId ? null : reservationId));
    setCurrentReservation(selectedReservation);
  };

  useEffect(() => {
    if (expandedReservationId !== null) {
      const selectedReservation = allReservations.find(res => res.id === expandedReservationId);
      setCurrentReservation(selectedReservation || null);
    }
  }, [expandedReservationId, allReservations]);

  const columns: TableColumn<IDataRow>[] = [
    {
      name: 'Reservation ID',
      selector: row => row.id.toString(),
      sortable: true,
      style: rowStyles,
    },
    { name: 'Customer', selector: row => row.customer, sortable: true, style: rowStyles },
    {
      name: 'Status',
      style: rowStyles,
      cell: row => (
        <div
          className={getStatusClass(row.status)}
          style={{ cursor: 'pointer' }}
          onClick={() => handleStatusClick(row)}
        >
          {isPending ? 'Updating...' : row.status}
        </div>
      ),
    },
    { name: 'Phone', selector: row => row.phone, sortable: true, style: rowStyles },
    { name: 'Table', selector: row => row.table.toString(), sortable: true, style: rowStyles },
    { name: 'Date & Time', selector: row => row.date, sortable: true, style: rowStyles },
    {
      name: 'Details',

      cell: row => (
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#007BFF',
          }}
          onClick={() => {
            handleDetailsClick(row.id);
            setShowDetailsModal(true);
          }}
        >
          &#x25BC; Open details
        </button>
      ),
    },
  ];

  return (
    <div className="font">
      <input
        type="text"
        placeholder="Search orders..."
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
        style={{
          padding: '8px',
          fontSize: '14px',
          width: '100%',
          maxWidth: '300px',
          marginBottom: '20px',
        }}
      />

      <DataTable columns={columns} data={filteredReservations} pagination />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        classStyle="status__reserv__modal"
      >
        <h3 className="change__status__title">Update Status</h3>

        <SelectComponent
          options={reservationStatusSelect}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <div className="modal-actions-wrapper">
          <button className="button__status" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="button__status" onClick={handleStatusChange}>
            Save
          </button>
        </div>
      </Modal>

      <Modal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)}>
        <StaffReservationItem reservation={currentReservation} />
      </Modal>
    </div>
  );
};

export default StaffReservationList;
