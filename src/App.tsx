import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Reservation from './pages/Reservation/Reservation';
import CategoryItemPage from './pages/CategoryItemPage/CategoryItemPage';

import './App.scss';

import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { useCurrentUser } from './hooks/useAuth';

import Cart from './pages/Cart/Cart';
import Order from './pages/Order/Order';
import Profile from './pages/Profile/Profile';
import Shop from './pages/Shop/Shop';

import ProductsListPage from './pages/ProductsListPage/ProductsListPage';
import Product from './pages/Product/Product';
import { useUserCart } from './hooks/useCart';

import RestrictedRouter from './components/navigation/RestrictedRouter';
import PrivateRouter from './components/navigation/PrivateRouter';
import UserOrdersList from './components/UserOrdersList/UserOrdersList';
import PersonalData from './components/PersonalData/PersonalData';
import Search from './pages/Search/Search';
import Spinner from './components/Spinner/Spinner';
import spinnerSize from './constants/spinnerSize';
import Admin from './pages/Admin/Admin';
import ManageItemsSection from './components/Sections/ManageItemsSection/ManageItemsSection';
import ManageCategorySection from './components/Sections/ManageCategorySection/ManageCategorySection';
import ManageProductSection from './components/Sections/ManageProductSection/ManageProductSection';
import Staff from './pages/Staff/Staff';
import SuccessReservationPage from './pages/SuccessReservationPage/SuccessReservationPage';
import UserReservations from './components/UserReservations/UserReservations';
import SuccessRegisterPage from './pages/SuccsessRegisterPage/SuccessRegisterPage';
import UserRewards from './components/UserRewards/UserRewards';
import { UserRole } from './API/auth/auth.interface';

import RedirectAdmin from './components/navigation/RedirectAdmin';
import TodayOrdersPage from './pages/TodayOrdersPage/TodayOrdersPage';
import OrdersByDatePage from './pages/OrdersByDatePage/OrdersByDatePage';

function App() {
  const { data: user, isLoading } = useCurrentUser();

  useUserCart(user?.id);

  if (isLoading) {
    return (
      <div className="container">
        <Spinner size={spinnerSize.lg} />
      </div>
    );
  }

  return (
    <RedirectAdmin>
      <Routes>
        <Route index path="/" element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/menu/categories" />
        <Route path="/menu/categories/:categoryName" element={<CategoryItemPage />} />
        <Route path="/menu/categories/:categoryName/:allItemsName" element={<ProductsListPage />} />
        <Route
          path="/menu/categories/:categoryName/:productName/:productId"
          element={<Product />}
        />

        <Route path="/menu/search/item-page/:itemId" element={<Product />} />
        <Route path="/menu/search/:query" element={<Search />} />

        <Route path="/menu/all-items/:allItemsName" element={<ProductsListPage />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/success-registration" element={<SuccessRegisterPage />} />

        <Route path="/profile" element={<PrivateRouter component={<Profile />} redirectTo="/" />}>
          <Route
            path="/profile/my-data"
            element={<PrivateRouter component={<PersonalData />} redirectTo="/" />}
          />

          <Route
            path="/profile/my-orders"
            element={<PrivateRouter component={<UserOrdersList />} redirectTo="/" />}
          />
          <Route
            path="/profile/my-rewards"
            element={<PrivateRouter component={<UserRewards />} redirectTo="/" />}
          />

          <Route
            path="/profile/my-reservations"
            element={<PrivateRouter component={<UserReservations />} redirectTo="/" />}
          />
        </Route>

        <Route
          path="/login"
          element={<RestrictedRouter component={<LoginPage />} redirectTo="/menu" />}
        />

        <Route
          path="/register"
          element={<RestrictedRouter component={<RegisterPage />} redirectTo="/menu" />}
        />

        <Route
          path="/reservation"
          element={<PrivateRouter component={<Reservation />} redirectTo="/login" />}
        />

        <Route
          path="/success-reservation"
          element={<PrivateRouter component={<SuccessReservationPage />} redirectTo="/login" />}
        />

        <Route path="/order" element={<PrivateRouter component={<Order />} redirectTo="/" />} />

        {user && user?.role === UserRole.ADMIN ? (
          <>
            <Route path="/admin-page" element={<Admin />}>
              <Route path="/admin-page/manage-items" element={<ManageItemsSection />} />
              <Route path="/admin-page/manage-category" element={<ManageCategorySection />} />
              <Route path="/admin-page/manage-product" element={<ManageProductSection />} />
            </Route>

            <Route path="/staff" element={<Staff />} />
            <Route path="/today-orders" element={<TodayOrdersPage />} />
            <Route path="/orders-by-date" element={<OrdersByDatePage />} />
          </>
        ) : null}

        <Route path="*" element={<Navigate to={'/'} replace />} />
      </Routes>
    </RedirectAdmin>
  );
}

export default App;
