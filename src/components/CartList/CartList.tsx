import { useQuery } from '@tanstack/react-query';
import { useUserCart } from '../../hooks/useCart';
import { IGetUsers } from '../../API/auth/auth.interface';
import CartItem from '../CartItem/CartItem';
import { ICartInfo } from '../../API/cart/cart.interface';

const CartList = () => {
	const { data: userData } = useQuery<IGetUsers>({ queryKey: ['current'] });

	userData && useUserCart(userData?.id);

	const { data } = useQuery<ICartInfo>({ queryKey: ['user-cart', userData?.id] });

	return (
		<ul className='cart__list'>
			{data?.result &&
				data?.result.map(({ cart_id, quantity, price, unit_price, cart_status, products_item }) => (
					<CartItem
						key={cart_id}
						id={cart_id}
						quantity={quantity}
						price={price}
						unit_price={unit_price}
						cart_status={cart_status}
						products_item={products_item}
					/>
				))}
		</ul>
	);
};

export default CartList;
