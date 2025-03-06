import AddNewProduct from '../../AddNewProduct/AddNewProduct';
import DeleteProduct from '../../DeleteProduct/DeleteProduct';

const ManageProductSection = () => {
	return (
		<div>
			<h2>Manage Product Section</h2>

			<AddNewProduct />

			<DeleteProduct />
		</div>
	);
};

export default ManageProductSection;
