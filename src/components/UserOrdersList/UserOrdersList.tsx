import { useQuery } from '@tanstack/react-query';
import { useGetUserOrders } from '../../hooks/useOrder';
import { IGetUsers } from '../../API/auth/auth.interface';
import UserOrdersItem from '../UserOrdersItem/UserOrdersItem';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';
import PaginationComp from '../Pagination/PaginationComp';
import { useState } from 'react';
import './user-orders-list.scss';

const UserOrdersList = () => {
	const [page, setPage] = useState(1);
	const { data: user } = useQuery<IGetUsers>({ queryKey: ['current'] });

	const { data: orders, isLoading, isError } = useGetUserOrders(user?.id ?? -1, page);

	const handlePageChange = (pageNumber: number) => {
		setPage(pageNumber);
	};

	if (isLoading) {
		return <Spinner size={spinnerSize.md} />;
	}

	if (orders?.result.length === 0) {
		return <div className='empty__your__orders'>You have no orders yet</div>;
	}

	if (isError) {
		return <div>Failed to load user data</div>;
	}

	return (
		<>
			<ul>
				{orders?.result &&
					orders?.result.map(
						({
							id,
							order_date,
							status,
							order_items,
							chopsticks,
							chopsticks_quantity,
							allergic,
							type_of_allergy,
							soy_sauce,
							additional_information,
							totalPrice,
						}) => (
							<UserOrdersItem
								key={id}
								order_id={id}
								order_items={order_items}
								order_date={order_date}
								status={status}
								totalPrice={totalPrice}
								chopsticks={chopsticks}
								chopsticks_quantity={chopsticks_quantity}
								allergic={allergic}
								type_of_allergy={type_of_allergy}
								soy_sauce={soy_sauce}
								additional_information={additional_information}
							/>
						)
					)}

				<PaginationComp
					currentPage={page}
					totalItems={orders?.totalItems || 0}
					itemsPerPage={orders?.itemsPerPage || 0}
					handleChange={handlePageChange}
				/>
			</ul>
		</>
	);
};

export default UserOrdersList;
