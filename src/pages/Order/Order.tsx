import { useQuery } from '@tanstack/react-query';
import { Status } from '../../API/order/order.interface';
import { useAddNewOrder } from '../../hooks/useOrder';
import { IRegister } from '../../API/auth/auth.interface';
import { useForm, Controller } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import InputPrice from '../../components/InputPrice/InputPrice';
import { useNavigate } from 'react-router-dom';
import { ICartInfo } from '../../API/cart/cart.interface';

import './order.scss';

interface ICreateNewOrder {
  chopsticks: string;
  chopsticks_quantity: number;
  soy_sauce: string;
  allergic: string;
  type_of_allergy: string;
  additional_information: string;
}

const Order = () => {
  const [needChopsticks, setNeedChopsticks] = useState('no');
  const [allergic, setAllergic] = useState('no');
  const navigate = useNavigate();

  const { data: user } = useQuery<IRegister>({ queryKey: ['current'] });
  const { data: userCart } = useQuery<ICartInfo>({ queryKey: ['user-cart', user?.id] });

  const orderMutation = useAddNewOrder();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<ICreateNewOrder>();

  const onSubmit = async (info: ICreateNewOrder) => {
    const newOrder = {
      ...info,
      user_id: user?.id || -1,
      status: Status.PENDING,
    };

    orderMutation(newOrder);
    navigate('/profile/my-orders');
    reset();
  };

  const handleToggleChopsticks = (e: ChangeEvent<HTMLInputElement>) => {
    setNeedChopsticks(e.target.value);
  };

  const handleToggleAllergic = (e: ChangeEvent<HTMLInputElement>) => {
    setAllergic(e.target.value);
  };

  useEffect(() => {
    if (userCart) {
      if (userCart?.result.length === 0) {
        navigate('/cart');
      }
    }
  }, [navigate, userCart]);

  return (
    <main className="order__main">
      <div className="container">
        <h2>Payment</h2>
        <div className="form__center__wrapper">
          <form className="order-container" onSubmit={handleSubmit(onSubmit)}>
            {/* chopsticks */}
            {errors.chopsticks && (
              <span className="login__error">The chopsticks is required for the answer</span>
            )}
            <div className="flex__wrapper order__mb">
              <p className="order__question">Do you need chopsticks?</p>

              <div className={`flex__wrapper ${errors.chopsticks && 'wrapper__error'}`}>
                <input
                  {...register('chopsticks', { required: true })}
                  onInput={handleToggleChopsticks}
                  id="chop-yes"
                  type="radio"
                  value="yes"
                />
                <label className="order__label__styles" htmlFor="chop-yes">
                  <span>Yes</span> <FaCheck />
                </label>

                <input
                  {...register('chopsticks', { required: true })}
                  onInput={handleToggleChopsticks}
                  id="chop-no"
                  type="radio"
                  value="no"
                />
                <label className="order__label__styles" htmlFor="chop-no">
                  <span>No</span> <ImCross />
                </label>
              </div>
            </div>

            <div
              className={`${needChopsticks === 'yes' ? 'show__order__additional' : 'hide__order__additional'}`}
            >
              <div className="order__mb">
                <Controller
                  name="chopsticks_quantity"
                  control={control}
                  defaultValue={1}
                  render={({ field: { onChange, value } }) => (
                    <div className="add__chopsticks">
                      <p className="order__question">How many?</p>
                      <InputPrice quantity={value} onQuantityChange={onChange} />
                    </div>
                  )}
                />
              </div>
            </div>

            {/* soy souse */}
            {errors.soy_sauce && (
              <span className="login__error">The soy souse is required for the answer</span>
            )}
            <div className="flex__wrapper order__mb">
              <p className="order__question">Do you need soy souse?</p>
              <div className={`flex__wrapper ${errors.soy_sauce && 'wrapper__error'}`}>
                <input
                  {...register('soy_sauce', { required: true })}
                  id="sauce-yes"
                  type="radio"
                  name="soy_sauce"
                  value="yes"
                />
                <label className="order__label__styles" htmlFor="sauce-yes">
                  <span>Yes</span> <FaCheck />
                </label>
                <input
                  {...register('soy_sauce', { required: true })}
                  id="sauce-no"
                  type="radio"
                  name="soy_sauce"
                  value="no"
                />
                <label className="order__label__styles" htmlFor="sauce-no">
                  <span>No</span> <ImCross />
                </label>
              </div>
            </div>

            {/* allergic */}
            {errors.allergic && (
              <span className="login__error">The allergy is required for the answer</span>
            )}
            <div className="flex__wrapper order__mb">
              <p className="order__question">Are you allergic?</p>
              <div className={`flex__wrapper ${errors.allergic && 'wrapper__error'}`}>
                <input
                  {...register('allergic', { required: true })}
                  onInput={handleToggleAllergic}
                  type="radio"
                  name="allergic"
                  value="yes"
                  id="allergic-yes"
                />
                <label className="order__label__styles" htmlFor="allergic-yes">
                  <span>Yes</span> <FaCheck />
                </label>

                <input
                  {...register('allergic', { required: true })}
                  onInput={handleToggleAllergic}
                  type="radio"
                  name="allergic"
                  value="no"
                  id="allergic-no"
                />
                <label className="order__label__styles" htmlFor="allergic-no">
                  <span>No</span> <ImCross />
                </label>
              </div>
            </div>

            {errors.type_of_allergy && allergic === 'yes' ? (
              <span className="login__error">Specifying your allergy is required</span>
            ) : (
              ''
            )}

            <div
              className={
                allergic === 'yes'
                  ? 'show__order__additional order__mb'
                  : 'hide__order__additional order__mb'
              }
            >
              <p className="order__question">Please write down what you shouldn't eat</p>
              <input
                className="order__input"
                {...register('type_of_allergy', { required: allergic === 'yes' ? true : false })}
                type="text"
              />
            </div>

            {/* Additional information */}
            <div>
              <p className="order__question">Additional information for order</p>
              <textarea
                className="order__textarea order__mb"
                {...register('additional_information')}
              ></textarea>
            </div>

            <button className="order__submit__btn" type="submit">
              Place order
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Order;
