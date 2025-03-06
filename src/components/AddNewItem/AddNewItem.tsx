import { useState, useEffect } from 'react';
import { useAllProducts } from '../../hooks/useProducts';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputString from '../InputString/InputString';
import { IAddNewItem } from '../../API/item/item.interface';
import SelectComponent from '../SelectComponent/SelectComponent';
import Select from 'react-select';
import { useAddNewItem } from '../../hooks/useItems';
import { customSelectStyles } from '../../styles/selectStyles';

interface IItemType {
	value: string;
	label: string;
}

const options: IItemType[] = [
	{ value: 'food', label: 'Food' },
	{ value: 'staff', label: 'Staff' },
];

const AddNewItem = () => {
	const { data, isPending } = useAllProducts();
	const { mutate, isPending: pendingItem } = useAddNewItem();

	const optionData = data?.map(({ id, name }) => ({ value: id.toString(), label: name })) || [];
	const [selectedOption, setSelectedOption] = useState(optionData[0] || { value: '', label: '' });
	const [selectedType, setSelectedType] = useState('');

	useEffect(() => {
		setSelectedOption(optionData[0]);
	}, [isPending]);

	const handleChange = (selected: IItemType | null) => {
		if (selected) {
			setSelectedType(selected.value);
		}
	};

	const { register, handleSubmit } = useForm<IAddNewItem>();

	const onSubmit: SubmitHandler<IAddNewItem> = data => {
		const formData = new FormData() as never as IAddNewItem;

		formData['name'] = data.name;
		formData['description'] = data.description;
		formData['products_id'] = selectedOption.value;
		formData['price'] = data.price;
		formData['type'] = selectedType;

		if (data.image instanceof FileList) {
			formData['image'] = data.image[0];
		}

		mutate({ ...formData });
	};

	return (
		<>
			<h2 className='manage__unit__title'>Add new item</h2>
			<div className='manage__container'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<InputString
						name='name'
						label='Write item name'
						register={register}
						defaultValue=''
						type='string'
						placeholder='Name of item'
					/>

					<InputString
						name='description'
						label='Write item description'
						register={register}
						defaultValue=''
						type='string'
						placeholder='Description of item'
					/>

					<input style={{ display: 'block' }} type='file' {...register('image', { required: true })} />

					<InputString
						name='price'
						label='Write item price'
						register={register}
						defaultValue=''
						type='string'
						placeholder='Description of price'
					/>

					<Select onChange={handleChange} options={options} styles={customSelectStyles} />

					{isPending ? (
						<div>Loading...</div>
					) : (
						<SelectComponent
							options={optionData}
							selectedOption={selectedOption}
							setSelectedOption={setSelectedOption}
						/>
					)}

					<button className='button__type--btn button__type--indent' type='submit'>
						{pendingItem ? 'Loading' : 'Submit'}
					</button>
				</form>
			</div>
		</>
	);
};

export default AddNewItem;
