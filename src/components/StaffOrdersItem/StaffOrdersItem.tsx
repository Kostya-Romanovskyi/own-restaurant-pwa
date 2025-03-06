import { FC } from 'react';
import './staff-orders-item.scss';
import { IStaffOrdersItem } from '../../API/order/order.interface';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { IGetUsers } from '../../API/auth/auth.interface';
import SelectComponent from '../SelectComponent/SelectComponent';
import { useUpdateStatusStaff } from '../../hooks/useOrder';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';
import dateAndTime from '../../helpers/dateAndTime';
import { orderStatusSelect } from '../../constants/statusSelect';

interface IOrderProps {
  key: string | number;
  id: string | number;
  user_id: number;
  order_id: string | number;
  order_items: IStaffOrdersItem[];
  order_date: string;
  status: string;
  totalPrice: string | number;
  chopsticks: string;
  chopsticks_quantity: number;
  allergic: string;
  type_of_allergy?: string;
  soy_sauce: string;
  additional_information?: string;
  user: IGetUsers;
}

const StaffOrdersItem: FC<IOrderProps> = ({
  id,
  order_date,
  order_id,
  status,
  order_items,
  chopsticks,
  chopsticks_quantity,
  allergic,
  type_of_allergy,
  soy_sauce,
  additional_information,
  totalPrice,
  user,
}) => {
  const [showAdditional, setShowAdditional] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ value: 'pending', label: 'Pending' });
  const { mutate, isPending } = useUpdateStatusStaff();

  const handleToggle = () => {
    setShowAdditional(!showAdditional);
  };

  const handleSubmitStatus = () => {
    const status = {
      status: selectedOption.value,
    };

    const updatedStatus = {
      status: status.status,
      orderId: id,
      time: '30',
    };

    mutate(updatedStatus);
  };

  const orderDate = dateAndTime(order_date);

  return (
    <li className="order__item order__item__flex">
      <div onClick={handleToggle} className="order__left__wrapper">
        <MdKeyboardArrowDown
          className={`staff__order__icon ${showAdditional ? 'order__icon--transform' : ''}`}
        />
        <div className="order__item__wrapper order__item__wrapper--margin">
          <div className="order__number">
            № {order_id} <span className="order__time"> from {orderDate}</span>
            <span className={`status__styles--${status.replace(' ', '-')}`}>{status}</span>
            <div className="user__info">
              <p className="user__info--margin">{user.name}</p>
              <p className="user__lastName">{user.last_name}</p>
            </div>
            <p className="user__info--margin">User`s phone number: {user.phone}</p>
            <p className="user__info--margin">User`s email: {user.email}</p>
            <p className="order__user__add">
              User`s additional info: {user.additional_information}
            </p>
          </div>
          <div className="order__image__wrapper order__image__wrapper--margin">
            {order_items.map(item => {
              return (
                <img
                  key={item.id}
                  className={showAdditional ? 'hide__additional' : 'show__additional order__image'}
                  src={`${item.products_item.image}`}
                  alt={`${item.products_item.name}`}
                />
              );
            })}
          </div>
        </div>

        <div
          className={`${showAdditional ? 'show__additional' : 'hide__additional'} order__additional__wrapper`}
        >
          <ul className="order__additional__list">
            {order_items.map(item => {
              return (
                <li key={item.id} className="order__additional__wrapper--item">
                  <img
                    className="order__image"
                    src={`${item.products_item.image}`}
                    alt={`${item.products_item.name}`}
                  />
                  <p className="order__additional__name">{item.products_item.name}</p>

                  <p className="order__additional__unit">
                    {item.price} CAD$ x {item.quantity} unit
                  </p>
                </li>
              );
            })}
          </ul>
          <div className="info__flex__wrapper">
            <p className="order__additional__info">
              <span className="info__span">Chopsticks:</span> {chopsticks} X {chopsticks_quantity}
            </p>
            <p className="order__additional__info">
              <span className="info__span">Soy souse:</span> {soy_sauce}
            </p>
            <p className="order__additional__info">
              <span className="info__span">Allergic:</span> {allergic}
            </p>
            <p className="order__additional__info">
              <span className="info__span">Description of allergy:</span> {type_of_allergy}
            </p>
            <p className="order__additional__info">
              <span className="info__span">Additional information for order:</span>{' '}
              {additional_information}
            </p>
          </div>
        </div>

        <p className="order__totalPrice">Total price: {totalPrice} CAD$</p>
      </div>
      <div>
        <SelectComponent
          options={orderStatusSelect}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />

        <button
          className="button__type--btn button__type--indent"
          onClick={handleSubmitStatus}
          type="submit"
        >
          {isPending ? <Spinner size={spinnerSize.sm} /> : 'Change status'}
        </button>
      </div>
    </li>
  );
};

export default StaffOrdersItem;
