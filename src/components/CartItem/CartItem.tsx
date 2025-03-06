import { FC, useState, useCallback } from 'react';
import { IProduct } from '../../API/products/products.interface';
import { useDeleteItem, useUpdateItem } from '../../hooks/useCart';

import InputPrice from '../InputPrice/InputPrice';

import debounce from 'lodash.debounce';
import { useImages } from '../../hooks/useImages';

import { HiDotsHorizontal } from 'react-icons/hi';
import { MdDeleteForever } from 'react-icons/md';

import Spinner from '../Spinner/Spinner';

import './cart-item.scss';
import spinnerSize from '../../constants/spinnerSize';
import { useCurrentUser } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

interface ICartItemProps {
  id: number;
  quantity: number;
  price: string;
  unit_price: number;
  cart_status: string;
  products_item?: IProduct;
}

const CartItem: FC<ICartItemProps> = ({ id, quantity, price, unit_price, products_item }) => {
  const [cartQuantity, setCartQuantity] = useState<number>(quantity);
  const [showDelBtn, setShowDelBtn] = useState(false);

  const { data } = useCurrentUser();

  const { mutate, isPending } = useDeleteItem(id, data?.id || -1);

  // hook for update item in cart
  const {
    mutate: mutateUpdate,
    isPending: pendingUpdate,
    isFetching,
  } = useUpdateItem(
    id,
    {
      products_item_id: products_item?.id ? products_item?.id : -1,
      quantity: cartQuantity,
    },
    data?.id ? data?.id : -1
  );

  // pass product image in cart
  let image = '';

  if (products_item?.image) {
    image = useImages(products_item?.image);
  }
  // debounce for mutation update quantity of product in cart
  const handleUpdate = useCallback(
    debounce(() => {
      mutateUpdate();
    }, 500),
    [mutateUpdate, cartQuantity]
  );

  // change quantity and price in cart
  const handleChange = (newQuantity: number): void => {
    handleUpdate();

    setCartQuantity(newQuantity);
  };

  const handleToggleBtn = () => {
    setShowDelBtn(!showDelBtn);
  };

  return (
    <li className="card__item">
      <div
        className={`card__spinner ${isFetching || pendingUpdate ? 'card__spinner--visible' : ''}`}
      >
        {isFetching || pendingUpdate ? <Spinner size={spinnerSize.lg} /> : ''}
      </div>
      <div className="card__title__wrapp">
        <img
          className="cart__img"
          src={`${image}`}
          alt={`${products_item?.name} picture`}
          width={200}
          height={100}
        />

        <Link to={`/menu/search/item-page/${products_item?.id}`} className="cart__title">
          {products_item?.name}
        </Link>

        <button className="cart__delete__wrapp" onClick={handleToggleBtn} type="button">
          <HiDotsHorizontal className="cart__icon" />
        </button>
      </div>

      <div className="card__price__wrapp">
        <div>
          <p className="cart__price">Price for 1: {unit_price} CAD$</p>

          <p className="cart__price">Current price with tax: {price} CAD$</p>
        </div>

        <InputPrice onQuantityChange={handleChange} quantity={quantity} />

        <div className={showDelBtn ? 'show cart__delete__btn' : 'hide'}>
          <button
            className="delete__btn"
            onClick={() => mutate()}
            disabled={isPending}
            type="button"
          >
            <MdDeleteForever className="delete__icon" />{' '}
            {isPending ? (
              <Spinner size={spinnerSize.sm} />
            ) : (
              <span className="delete__item__span">Delete item</span>
            )}
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
