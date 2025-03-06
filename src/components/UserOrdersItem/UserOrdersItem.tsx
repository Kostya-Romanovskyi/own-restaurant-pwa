import { FC, useState } from 'react';
import { IOrderItems, Status } from '../../API/order/order.interface';
import dateAndTime from '../../helpers/dateAndTime';
import { MdKeyboardArrowDown } from 'react-icons/md';
import './user-orders-item.scss';

interface IUserOrderItem {
  order_id: number;
  order_items: IOrderItems[];
  status: Status;
  totalPrice: string;
  order_date: Date;
  chopsticks: string;
  chopsticks_quantity: number;
  allergic: string;
  type_of_allergy: string;
  soy_sauce: string;
  additional_information: string;
}

const UserOrdersItem: FC<IUserOrderItem> = ({
  order_id,
  order_items,
  order_date,
  status,
  chopsticks,
  chopsticks_quantity,
  allergic,
  type_of_allergy,
  soy_sauce,
  additional_information,
  totalPrice,
}) => {
  const [showAdditional, setShowAdditional] = useState(false);

  const handleToggle = () => {
    setShowAdditional(!showAdditional);
  };

  const orderDate = dateAndTime(order_date);

  return (
    <li onClick={handleToggle} className="order__item">
      <MdKeyboardArrowDown
        className={`order__icon ${showAdditional ? 'order__icon--transform' : ''}`}
      />
      <div className="order__item__wrapper">
        <div className="order__number">
          № {order_id} <span className="order__time"> from {orderDate}</span>
          <p className={`order__status order__status--${status}`}>{status}</p>
        </div>
        <div className="order__image__wrapper">
          {order_items.map(item => {
            return (
              <img
                key={item.id}
                className={showAdditional ? 'hide__additional' : 'show__additional order__image'}
                src={`${item.product.image}`}
                alt={`${item.product.name}`}
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
                  src={`${item.product.image}`}
                  alt={`${item.product.name}`}
                />
                <p className="order__additional__name">{item.product.name}</p>

                <p className="order__additional__unit">
                  {item.product.price} CAD$ x {item.quantity} unit
                </p>
              </li>
            );
          })}
        </ul>
        <div className="info__flex__wrapper">
          <p className="order__additional__info">
            <span className="info__span">Chopsticks:</span> {chopsticks} x {chopsticks_quantity}
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
          <p className="order__tax">GST Tax: 5%</p>
        </div>
      </div>

      <p className="order__totalPrice">Total price with tax: {totalPrice} CAD$</p>
    </li>
  );
};

export default UserOrdersItem;
