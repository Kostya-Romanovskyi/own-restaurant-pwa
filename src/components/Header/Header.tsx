import { Link, Outlet, useLocation } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import LogoutBtn from '../LogoutBtn/LogoutBtn';
import HeaderButton from '../HeaderButton/HeaderButton';
import MainButton from '../MainButton/MainButton';

import { RxHamburgerMenu } from 'react-icons/rx';
import { RxCross2 } from 'react-icons/rx';
import { FaShoppingCart, FaListAlt } from 'react-icons/fa';

import './header.scss';
import NavItems from '../NavItems/NavItems';
import { IUserProfileInfo } from '../../API/auth/auth.interface';
import { ICartInfo } from '../../API/cart/cart.interface';
import InputSearch from '../InputSearch/InputSearch';

const Header = () => {
  const { data: user } = useQuery<IUserProfileInfo>({ queryKey: ['current'] });
  const { data: cartItems } = useQuery<ICartInfo>({ queryKey: ['user-cart', user?.id] });

  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // toggle burger state
  const handleBurgerToggle = () => {
    screen.width <= 768 && setIsOpen(!isOpen);
  };

  // scroll block when burger is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('scroll__block');
    } else {
      document.body.classList.remove('scroll__block');
    }

    return () => {
      document.body.classList.remove('scroll__block');
    };
  }, [isOpen]);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div
              onClick={handleBurgerToggle}
              className={`${isOpen ? 'backdrop__open' : 'backdrop__closed'}`}
            ></div>
            {/* <img className='header__logo' src={Logo} alt='Logo own-shop' /> */}
            <Link to={'/'} className="header__logo">
              OwnRestaurant
            </Link>

            <HeaderButton click={handleBurgerToggle} Icon={RxHamburgerMenu} classStyle="" />

            <div className={`header__mobile__wrapper ${isOpen ? 'opened__burger' : ''}`}>
              <NavItems click={handleBurgerToggle} classStyle="" classNav="" />

              <InputSearch isBurgerOpen={setIsOpen} />

              {user && user !== null ? (
                <div className="header__auth__wrapp">
                  <Link
                    onClick={handleBurgerToggle}
                    to="/cart"
                    state={{ from: location }}
                    className="header__cart__icon"
                  >
                    <FaShoppingCart />

                    <div className="header__cart__counter">
                      {cartItems && cartItems.result.length}
                    </div>
                  </Link>

                  <Link
                    onClick={handleBurgerToggle}
                    to="/profile/my-orders"
                    className="header__cart__icon"
                  >
                    <FaListAlt />
                  </Link>

                  <Link onClick={handleBurgerToggle} to="/profile/my-data">
                    <img
                      className="header__user__profile__img"
                      src={user?.image}
                      alt={user?.name}
                    />
                    <span className="header__user__profile__text"></span>
                  </Link>

                  <LogoutBtn />
                </div>
              ) : (
                <div className="header__auth__wrapp login__width">
                  <MainButton
                    redirect="/login"
                    name="Log in"
                    click={handleBurgerToggle}
                    classStyle="margin-10"
                  />
                  <MainButton
                    redirect="/register"
                    name="Register"
                    click={handleBurgerToggle}
                    classStyle=""
                  />
                </div>
              )}

              <HeaderButton click={handleBurgerToggle} Icon={RxCross2} classStyle="close__btn" />
            </div>
          </div>
        </div>
      </header>

      <Suspense fallback="Loading...">
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;
