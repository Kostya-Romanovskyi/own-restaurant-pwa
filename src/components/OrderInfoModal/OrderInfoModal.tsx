import { FC, useEffect, useState, Dispatch, SetStateAction } from 'react';
import dateAndTime from '../../helpers/dateAndTime';
import { IStaffAllOrders } from '../../API/order/order.interface';
import SelectComponent from '../SelectComponent/SelectComponent';
import { orderStatusSelect, timeSelect } from '../../constants/statusSelect';
import { useUpdateStatusStaff } from '../../hooks/useOrder';
import './order-info-modal.scss';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';

interface IOrderInfoModal {
  currentOrder: IStaffAllOrders | null;
  showModal: Dispatch<SetStateAction<boolean>>;
}

const OrderInfoModal: FC<IOrderInfoModal> = ({ currentOrder, showModal }) => {
  const { mutate, isPending } = useUpdateStatusStaff();
  const [selectedOption, setSelectedOption] = useState({
    label: currentOrder?.status || '',
    value: currentOrder?.status || '',
  });

  const [timeOption, setTimeOption] = useState({
    label: '10 min',
    value: '10',
  });

  useEffect(() => {
    if (currentOrder) {
      setSelectedOption({
        label: currentOrder.status,
        value: currentOrder.status,
      });
    }
  }, [currentOrder]);

  const handleStatusChange = () => {
    if (currentOrder) {
      const updatedStatus = {
        status: selectedOption.value,
        orderId: currentOrder?.id,
        time: timeOption.value,
      };

      mutate(updatedStatus, {
        onSuccess: ({ order }) => {
          if (order?.status === 'Picked Up') {
            showModal(false);
          }
        },
      });
    }
  };

  return (
    <>
      {!currentOrder ? (
        ''
      ) : (
        <div
          style={{ color: 'black', marginTop: '16px', padding: '16px', border: '1px solid #ddd' }}
        >
          <div className="order__details__wrapp">
            <h4 className="order__details__title">
              Order Details <span className="order__details__id">#{currentOrder?.id}</span>
            </h4>

            <p
              className={`order__details__status status__styles--${currentOrder.status.replace(' ', '-')}`}
            >
              {currentOrder.status}
            </p>

            <p className="order__details__date">
              {dateAndTime(currentOrder?.order_date || 'Failed in catching date')}
            </p>
            {/* If order status equal "Picked Up" we hide all actions with status */}
            {currentOrder.status === 'Picked Up' ? null : (
              <>
                <div className="modal__select__status">
                  <SelectComponent
                    options={orderStatusSelect}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                  />
                </div>
                {/* If order status equal "Pending" we show time select. If not, return null */}
                {currentOrder.status === 'Pending' ? (
                  <div className="modal__select__status">
                    <SelectComponent
                      options={timeSelect}
                      selectedOption={timeOption}
                      setSelectedOption={setTimeOption}
                    />
                  </div>
                ) : null}
                <button
                  className="main-button modal__status__update"
                  onClick={handleStatusChange}
                  type="button"
                >
                  {isPending ? <Spinner size={spinnerSize.sm} /> : 'Update'}
                </button>
              </>
            )}
          </div>

          {currentOrder && (
            <div className="order__info__wrapper">
              <div className="order__info__wrapp">
                <h2 className="order__info__customer__title">Customer</h2>

                <div className="customer__name__wrapp sections__style">
                  <img className="customer__avatar" src={currentOrder.user.image} alt="Avatar" />
                  <p className="customer__name">
                    {currentOrder.user.name} {currentOrder.user.last_name}
                  </p>
                </div>

                <div className="sections__style">
                  <h2 className="order__info__subtitle">Contant info</h2>
                  <p className="customer__phone">
                    Phone: <a href={`tel:${currentOrder.user.phone}`}>{currentOrder.user.phone}</a>
                  </p>

                  <p>
                    Email:{' '}
                    <a href={`mailto:${currentOrder.user.email}`}>{currentOrder.user.email}</a>
                  </p>
                </div>

                <div className="sections__style">
                  <h2 className="order__info__subtitle">Additional user information</h2>

                  <p>{currentOrder.user.additional_information}</p>
                </div>
              </div>

              <ul className="order__info__wrapp">
                {currentOrder.order_items.map(({ products_item, quantity, price, id }) => (
                  <li key={id} className="order__info__item">
                    <img
                      className="order__info__item__pic"
                      src={products_item.image}
                      alt={products_item.name}
                    />
                    <p className="order__info__item__name">{products_item.name}</p>

                    <p>{products_item.price} CAD$</p>
                    <p>{quantity}</p>
                    <p>{price} CAD$</p>
                  </li>
                ))}
              </ul>

              <div className="order__info__wrapp">
                <h2 className="order__info__customer__title">Order Add-ons</h2>

                <div className="order__info__distance sections__style">
                  {currentOrder.chopsticks === 'yes' ? (
                    <p>
                      Chopstiks: {currentOrder.chopsticks} x {currentOrder.chopsticks_quantity}
                    </p>
                  ) : (
                    <p>Chopstiks: No</p>
                  )}
                </div>

                <div className="order__info__distance sections__style">
                  {currentOrder.allergic === 'yes' ? (
                    <div className="allergy">
                      <p>Allergy: Yes</p>
                      <p>Type of allergy: {currentOrder.type_of_allergy}</p>
                    </div>
                  ) : (
                    'Allergy: No'
                  )}
                </div>

                <p className="order__info__distance sections__style">
                  Soy sous: {currentOrder.soy_sauce}
                </p>

                <div className="order__info__distance sections__style">
                  {currentOrder.additional_information !== '' ? (
                    <p>Additional information: {currentOrder.additional_information}</p>
                  ) : (
                    'Additional information: -'
                  )}
                </div>
              </div>

              <div className="order__info__wrapp">
                <h2 className="order__info__customer__title">Payment summery</h2>
                <p>Total price: {currentOrder.total_price} CAD$</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default OrderInfoModal;
