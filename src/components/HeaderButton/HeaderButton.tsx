import { FC, ComponentType } from 'react';
import './headerButton.scss';

interface IHeaderButtonProps {
	click: () => void;
	Icon: ComponentType;
	classStyle: string;
}

const HeaderButton: FC<IHeaderButtonProps> = ({ click, Icon, classStyle }) => {
	return (
		<button onClick={click} className={`header__btn ${classStyle}`} type='button'>
			<Icon />
		</button>
	);
};

export default HeaderButton;
