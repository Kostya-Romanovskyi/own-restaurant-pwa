import { FC } from 'react';
import { useImages } from '../../hooks/useImages';
import { useAddToCart } from '../../hooks/useCart';

import { INewItemInCart } from '../../API/cart/cart.interface';

import './ProductCard.scss';
import { Link } from 'react-router-dom';
import MainButton from '../MainButton/MainButton';
import { Ingredient } from '../../API/products/products.interface';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';
import { MdAddShoppingCart } from 'react-icons/md';
import { useCurrentUser } from '../../hooks/useAuth';

interface IProductCard {
  id: number;
  name: string;
  price: number;
  image: string;
  ingredients: Ingredient[];
}

const ProductCard: FC<IProductCard> = ({ id, name, price, image, ingredients }) => {
  const { data: user } = useCurrentUser();

  const { mutate, isPending } = useAddToCart(user?.id || -1);

  // add product in card
  const handleAddToCart = (id: number): void => {
    if (!user) return;

    const newItemInCart: INewItemInCart = {
      users_id: user?.id || -1,
      products_item_id: id,
      quantity: 1,
      unit_price: price,
    };

    mutate(newItemInCart);
  };

  // pass image
  const finalImage = image ? useImages(image) : '';

  const ingredientNames = ingredients ? ingredients.map(item => item.name).join(', ') : [];

  return (
    <li className="card">
      <Link to={`/menu/search/item-page/${id}`}>
        <img className="card_img " src={finalImage} alt={`${name} picture`} />
        <h2 className="card__title">{name}</h2>
        <p className="card__ingredients">{ingredientNames}</p>
        <h3 className="card__price">{price.toFixed(2)} CAD$</h3>
      </Link>

      {isPending ? (
        <Spinner size={spinnerSize.sm} />
      ) : (
        <MainButton
          redirect={user ? '' : '/login'}
          name={'Add to cart'}
          classStyle="card__button"
          click={() => {
            console.log(`Attempting to add product with ID: ${id}`);
            handleAddToCart(id);
          }}
          icon={<MdAddShoppingCart />}
        />
      )}
    </li>
  );
};

export default ProductCard;
