import { useState, useEffect } from 'react';
import { useAllCategories } from '../../hooks/useAllCategories';
import SelectComponent from '../SelectComponent/SelectComponent';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputString from '../InputString/InputString';
import { IAddNewProduct } from '../../API/products/products.interface';
import { useAddNewProduct } from '../../hooks/useProducts';

const AddNewProduct = () => {
	const { data, isPending } = useAllCategories();
	const { mutate, isPending: pendingProduct } = useAddNewProduct();

	const optionData = data?.map(({ id, name }) => ({ value: id.toString(), label: name })) || [];
	const [selectedOption, setSelectedOption] = useState(optionData[0] || { value: '', label: '' });

	useEffect(() => {
		setSelectedOption(optionData[0]);
	}, [isPending]);

	const { register, handleSubmit } = useForm<IAddNewProduct>();

	const onSubmit: SubmitHandler<IAddNewProduct> = data => {
		const formData = new FormData() as never as IAddNewProduct;

		formData['category_id'] = selectedOption.value;
		formData['name'] = data.name;
		formData['description'] = data.description;

		if (data.image instanceof FileList) {
			formData['image'] = data.image[0];
		}

		mutate({ ...formData });
	};

	return (
		<div className='manage__container'>
			{isPending ? (
				<div>Loading...</div>
			) : (
				<SelectComponent options={optionData} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
			)}

			<form onSubmit={handleSubmit(onSubmit)}>
				<InputString
					name='name'
					label='Write product name'
					register={register}
					defaultValue=''
					type='string'
					placeholder='Name of product'
				/>

				<InputString
					name='description'
					label='Write product description'
					register={register}
					defaultValue=''
					type='string'
					placeholder='Description of product'
				/>

				<input style={{ display: 'block' }} type='file' {...register('image', { required: true })} />

				<button className='button__type--btn button__type--indent' type='submit'>
					{pendingProduct ? 'Loading' : 'Submit'}
				</button>
			</form>
		</div>
	);
};

export default AddNewProduct;
