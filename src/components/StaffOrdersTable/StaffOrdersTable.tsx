import DataTable, { TableColumn } from 'react-data-table-component';
import { FC, useState, useEffect } from 'react';
import { IStaffAllOrders } from '../../API/order/order.interface';
import dateAndTime from '../../helpers/dateAndTime';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';
import OrderInfoModal from '../OrderInfoModal/OrderInfoModal';
import Modal from '../Modal/Modal';
import './staff-orders-table.scss';

interface IOrdersTableProps {
  todayOrdersInfo: IStaffAllOrders[];
  isLoading: boolean;
}

interface IDataRow {
  id: number;
  customer: string;
  status: string;
  phone: string;
  email: string;
  date: string;
  more_info: string;
}

const rowStyles = {
  height: '100px',
  fontSize: '1.5rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const dateStyle = {
  fontSize: '1.1rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const customStyles = {
  headCells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
      fontSize: '1.5rem',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
};

const StaffOrdersTable: FC<IOrdersTableProps> = ({ todayOrdersInfo, isLoading }) => {
  const [filterText, setFilterText] = useState<string>('');
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<IStaffAllOrders | null>(null);

  const handleDetailsClick = (orderId: number) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };

  useEffect(() => {
    const selectedOrder =
      todayOrdersInfo && todayOrdersInfo.find(order => order.id === expandedOrderId);

    if (selectedOrder) {
      setCurrentOrder(selectedOrder);
    }
  }, [expandedOrderId, todayOrdersInfo]);

  const filteredOrders =
    todayOrdersInfo &&
    todayOrdersInfo
      .filter(order =>
        [
          order?.id,
          order?.user?.name,
          order?.status,
          order?.user?.phone,
          order?.user?.email,
          dateAndTime(order?.order_date),
        ]
          .join(' ')
          .toLowerCase()
          .includes(filterText.toLowerCase())
      )
      .map(order => ({
        id: order.id,
        customer: order.user.name,
        status: order.status,
        phone: order.user.phone,
        email: order.user.email,
        date: dateAndTime(order.order_date),
        more_info: order.additional_information,
      }));

  const columns: TableColumn<IDataRow>[] = [
    {
      name: 'Order_ID',
      cell: row => (
        <div
          className={`selector__id full__cell blink-bg ${row.status === 'Pending' ? 'tabs__blink' : ''}`}
        >
          {row.id}
        </div>
      ),
      sortable: true,
    },

    {
      name: 'Status',
      cell: row => {
        return (
          <div className={`status__styles--${row.status.replace(' ', '-')}`}>{row.status}</div>
        );
      },
      style: rowStyles,
    },

    {
      name: 'Customer',
      selector: row => row.customer,
      sortable: true,
      style: rowStyles,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true,
      style: rowStyles,
    },
    {
      name: 'Date & Time',
      selector: row => row.date,
      sortable: true,
      style: dateStyle,
    },

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
            setShowModalAdd(true);
            handleDetailsClick(row.id);
          }}
        >
          &#x25BC; Open details
        </button>
      ),
      ignoreRowClick: true,
      style: rowStyles,
    },
  ];

  return (
    <div className="font">
      <div className="staff__container">
        <div className="font">
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Search orders..."
              value={filterText}
              onChange={e => setFilterText(e.target.value)}
              className="today__order__filter"
            />
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredOrders || []}
        progressPending={isLoading}
        progressComponent={<Spinner size={spinnerSize.lg} />}
        customStyles={customStyles}
        pagination
        paginationPerPage={30}
        className="main__data__table"
      />

      <Modal isOpen={showModalAdd} onClose={() => setShowModalAdd(false)}>
        <OrderInfoModal currentOrder={currentOrder} showModal={setShowModalAdd} />
      </Modal>
    </div>
  );
};

export default StaffOrdersTable;
