import { Link, Outlet } from 'react-router-dom';
import './admin.scss';

const Admin = () => {
	return (
		<div className='admin__wrapper container'>
			<div className='admin__margin'>
				<div>Admin</div>
				<ul>
					<Link className='profile__link' to='/admin-page/manage-category'>
						<li className='profile__item'>Manage Category</li>
					</Link>

					<Link className='profile__link' to='/admin-page/manage-product'>
						<li className='profile__item'>Manage Product</li>
					</Link>

					<Link className='profile__link' to='/admin-page/manage-items'>
						<li className='profile__item'>Manage Items</li>
					</Link>
				</ul>
			</div>

			<Outlet />
		</div>
	);
};

export default Admin;
