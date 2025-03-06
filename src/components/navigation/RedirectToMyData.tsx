import { Navigate } from 'react-router-dom';

const RedirectToMyData = () => {
  return <Navigate to="/profile/my-data" replace />;
};

export default RedirectToMyData;
