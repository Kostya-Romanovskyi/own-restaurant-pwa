import { Link, useNavigate, useLocation } from 'react-router-dom';
import CartList from '../../components/CartList/CartList';
import { useQuery } from '@tanstack/react-query';
import { IGetUsers } from '../../API/auth/auth.interface';
import { ICartInfo } from '../../API/cart/cart.interface';

import './cart.scss';
import { useEffect } from 'react';
import MainButton from '../../components/MainButton/MainButton';

import EmptyCartIcon from '../../assets/Cart/empty-cart.png';

import { FaArrowLeftLong } from 'react-icons/fa6';
import Spinner from '../../components/Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';

const Cart = () => {
  const { data: user } = useQuery<IGetUsers>({ queryKey: ['current'] });

  const { data: cartData, isLoading } = useQuery<ICartInfo>({
    queryKey: ['user-cart', user?.id],
    enabled: !!user?.id,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="container">
        <Spinner size={spinnerSize.lg} />
      </div>
    );
  }

  if (cartData?.result.length === 0) {
    return (
      <div className="container">
        <div className="cart__empty__container">
          <Link className="back__from__cart--empty" to={location.state?.from ?? '/'}>
            <FaArrowLeftLong />
          </Link>
          <div>Your cart is still empty</div>
          <img className="cart__empty__img" src={EmptyCartIcon} alt="Empty cart image" />
        </div>
      </div>
    );
  }

  return (
    <div className="container__cart">
      <Link className="back__from__cart" to={location.state?.from ?? '/'}>
        <FaArrowLeftLong />
      </Link>

      <CartList />

      <div className="total__wrapper">
        <p className="total__notification">Notification: This order only for pick up!!!</p>

        <p>GST Tax: 5%</p>
        <div className="final__price__wrapper">
          <p className="total__price">
            Total price: {cartData && cartData.totalPrice.toFixed(2)} CAD$
          </p>

          <MainButton
            redirect="/order"
            classStyle="total__btn"
            click={() => {}}
            name="Place order"
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
