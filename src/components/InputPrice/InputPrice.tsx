import { useState, FC, ChangeEvent, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa6';
import './input-price.scss';

interface InputPriceProps {
	quantity?: number;
	onQuantityChange: (quantity: number) => void;
}

const InputPrice: FC<InputPriceProps> = ({ quantity, onQuantityChange }) => {
	const defaultQuantity = 1;
	const [refreshQuantity, setRefreshQuantity] = useState<number>(quantity && quantity > 1 ? quantity : defaultQuantity);

	// input increment
	const handleIncrement = (): void => {
		if (refreshQuantity === 10) return;

		setRefreshQuantity((prevState: number) => {
			const newQuantity = prevState + 1;

			return newQuantity;
		});
	};

	// input decrement
	const handleDecrement = (): void => {
		if (refreshQuantity === 1) return;
		setRefreshQuantity((prevState: number) => {
			const newQuantity = prevState - 1;

			return newQuantity;
		});
	};

	// input change
	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		let newQuantity = parseInt(event.target.value);
		if (isNaN(newQuantity) || newQuantity < 1) {
			newQuantity = 1;
		}
		if (newQuantity > 10) {
			newQuantity = 10;
		}
		setRefreshQuantity(newQuantity);
	};

	useEffect(() => {
		onQuantityChange(refreshQuantity);
	}, [refreshQuantity]);

	return (
		<div className='input__wrapper'>
			<button className='count left' onClick={handleDecrement} type='button'>
				<FaMinus />
			</button>
			<input className='input__price' onChange={handleChange} type='number' value={refreshQuantity} />
			<button className='count right' onClick={handleIncrement} type='button'>
				<FaPlus />
			</button>
		</div>
	);
};

export default InputPrice;
