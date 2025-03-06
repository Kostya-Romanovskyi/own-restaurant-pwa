import { Link } from 'react-router-dom';
import './success-register-page.scss';

const SuccessRegisterPage = () => {
  return (
    <div>
      <div className="container success__register__wrapper">
        <h1 className="success__register__title success__register__indent">Welcome aboard!</h1>
        <p className="success__register__content success__register__indent">
          Your account has been successfully created.
        </p>
        <p className="success__register__content success__register__indent">
          Please log in to your account and start exploring now!
        </p>
        <Link to="/login" className="success__register__link success__register__indent">
          Go to log in
        </Link>
      </div>
    </div>
  );
};

export default SuccessRegisterPage;
