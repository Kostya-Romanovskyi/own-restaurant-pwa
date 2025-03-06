import { useEffect, useState } from 'react';
import { useAllProducts, useDeleteProduct } from '../../hooks/useProducts';
import SelectComponent from '../SelectComponent/SelectComponent';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';

const DeleteProduct = () => {
	const { data: allProducts, isPending } = useAllProducts();
	const { mutate, isPending: pendingDelete } = useDeleteProduct();
	const [selectedOption, setSelectedOption] = useState({ value: '', label: '' });

	const trimmedArray = (allProducts && allProducts.map(({ id, name }) => ({ value: String(id), label: name }))) || [];

	useEffect(() => {
		setSelectedOption(trimmedArray[0]);
	}, [isPending]);

	const handleDelete = () => {
		mutate(selectedOption?.value);
	};

	return (
		<>
			<div className='manage__unit__title'>Delete Products</div>

			<div className='manage__container'>
				{!isPending && (
					<SelectComponent
						options={trimmedArray}
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
					/>
				)}

				<button className='button__type--btn button__type--indent' onClick={handleDelete} type='button'>
					{pendingDelete ? <Spinner size={spinnerSize.sm} /> : 'Delete this product'}
				</button>
			</div>
		</>
	);
};

export default DeleteProduct;
