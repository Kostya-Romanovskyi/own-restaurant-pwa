import AddIngredientsToItem from '../../AddIngredientsToItem/AddIngredientsToItem';
import AddNewItem from '../../AddNewItem/AddNewItem';
import DeleteItem from '../../DeleteItem/DeleteItem';

const ManageItemsSection = () => {
	return (
		<div>
			<AddNewItem />

			<AddIngredientsToItem />

			<DeleteItem />
		</div>
	);
};

export default ManageItemsSection;
