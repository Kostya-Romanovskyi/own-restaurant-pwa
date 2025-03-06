import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import './main-button.scss';

interface IMainButtonProps {
  redirect?: string;
  name: string;
  click: () => void;
  classStyle?: string;
  icon?: ReactNode;
}
const MainButton: FC<IMainButtonProps> = ({ redirect, name, click, classStyle, icon }) => {
  return (
    <Link to={`${redirect}`} onClick={click} className={`main-button ${classStyle}`}>
      {name} {icon}
    </Link>
  );
};

export default MainButton;
