import SelectComponent from '../../components/SelectComponent/SelectComponent';
import ProfileList from '../../components/ProfileList/ProfileList';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import formatString from '../../helpers/formatSelectString';

import './profile.scss';

const options = [
  { value: 'my-data', label: 'Personal data' },
  { value: 'my-orders', label: 'My orders' },
  { value: 'my-rewards', label: 'My rewards' },
  { value: 'my-reservations', label: 'My reservations' },
];

const Profile = () => {
  const localPath =
    window.location.pathname.split('/').pop() === 'profile'
      ? '/my-data'
      : window.location.pathname.split('/').pop();

  const formatted = formatString(localPath || '');

  const [selectedOption, setSelectedOption] = useState({
    value: localPath || '/my-data',
    label: formatted,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname === 'profile' ? navigate('/my-data') : '';
  }, [location.pathname]);

  useEffect(() => {
    navigate(`/profile/${selectedOption.value}`);
  }, [selectedOption]);

  useEffect(() => {
    setSelectedOption({ value: localPath || 'my-data', label: formatted });
  }, [localPath]);

  return (
    <div className="container">
      <div className="select__wrapper">
        <div className="show__mobile">
          <SelectComponent
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>

        <div className="flex__container">
          <ProfileList />

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
