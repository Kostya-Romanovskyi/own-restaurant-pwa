import SelectComponent from '../SelectComponent/SelectComponent';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';
import { useAllItems, useDeleteItem } from '../../hooks/useItems';
import { useState, useEffect } from 'react';

const DeleteItem = () => {
	const { data: allItems, isPending } = useAllItems();
	const { mutate, isPending: pendingDelete } = useDeleteItem();
	const [selectedOption, setSelectedOption] = useState({ value: '', label: '' });

	const trimmedArray = (allItems && allItems.map(({ id, name }) => ({ value: String(id), label: name }))) || [];

	useEffect(() => {
		setSelectedOption(trimmedArray[0]);
	}, [isPending]);

	const handleDelete = () => {
		console.log(selectedOption?.value);

		mutate(selectedOption?.value);
	};

	return (
		<>
			<h2 className='manage__unit__title'>Delete Items</h2>

			<div className='manage__container'>
				{!isPending && (
					<SelectComponent
						options={trimmedArray}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
					/>
				)}

				<button className='button__type--btn button__type--indent' onClick={handleDelete} type='button'>
					{pendingDelete ? <Spinner size={spinnerSize.sm} /> : 'Delete this item'}
				</button>
			</div>
		</>
	);
};

export default DeleteItem;
