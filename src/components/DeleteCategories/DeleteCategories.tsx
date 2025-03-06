import { useEffect, useState } from 'react';
import { useAllCategories, useDeleteCategory } from '../../hooks/useAllCategories';
import SelectComponent from '../SelectComponent/SelectComponent';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';

const DeleteCategories = () => {
	const [selectedOption, setSelectedOption] = useState({ value: '', label: '' });
	const { data: allCategories, isPending } = useAllCategories();
	const { mutate, isPending: pendingDelete } = useDeleteCategory();

	const trimmedArray =
		(allCategories && allCategories.map(({ id, name }) => ({ value: String(id), label: name }))) || [];

	useEffect(() => {
		setSelectedOption(trimmedArray[0]);
	}, [isPending]);

	const handleDelete = () => {
		mutate(selectedOption?.value);
	};

	return (
		<>
			<div className='manage__unit__title'>Delete Categories</div>

			<div className='manage__container'>
				{!isPending && (
					<SelectComponent
						options={trimmedArray}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
					/>
				)}

				<button className='button__type--btn button__type--indent' onClick={handleDelete} type='button'>
					{pendingDelete ? <Spinner size={spinnerSize.sm} /> : 'Delete this category'}
				</button>
			</div>
		</>
	);
};

export default DeleteCategories;
