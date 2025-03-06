import { ChangeEvent, FC, useState } from 'react';
import './input-search.scss';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';

interface IInputSearchProps {
	isBurgerOpen: (isOpen: boolean) => void;
}

const InputSearch: FC<IInputSearchProps> = ({ isBurgerOpen }) => {
	const [queryValue, setQueryValue] = useState('');
	const navigate = useNavigate();

	const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		setQueryValue(e.target.value);
	};

	const handleSearchQuery = () => {
		if (queryValue) {
			navigate(`/menu/search/${queryValue}`);

			isBurgerOpen(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearchQuery();
		}
	};

	return (
		<div className='search__wrapper'>
			<input
				value={queryValue}
				onInput={handleChangeValue}
				onKeyDown={handleKeyDown}
				className='search__input'
				type='text'
				placeholder='Search dish...'
			/>
		<button onClick={handleSearchQuery} className='search__button' type='button'>
				<IoSearch className='search__icon' />
			</button>
		</div>
	);
};

export default InputSearch;
