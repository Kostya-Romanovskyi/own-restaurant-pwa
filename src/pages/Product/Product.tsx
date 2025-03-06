import './product.scss';
import { useQuery } from '@tanstack/react-query';
import { useAddToCart } from '../../hooks/useCart';
import { INewItemInCart } from '../../API/cart/cart.interface';
import { IGetUsers } from '../../API/auth/auth.interface';
import { useItemById } from '../../hooks/useItems';
import { useParams } from 'react-router-dom';
import MainButton from '../../components/MainButton/MainButton';
import AllItemsSection from '../../components/Sections/AllItemsSection/AllItemsSection';
import { MdAddShoppingCart } from 'react-icons/md';
// import ImageZoom from '../../components/ImageZoom/ImageZoom';

const Product = () => {
  const { itemId } = useParams<{ itemId: string }>();

  const { data: productItem } = useItemById(itemId || '');
  const { data: user } = useQuery<IGetUsers>({ queryKey: ['current'] });

  const { mutate } = useAddToCart(user?.id || -1);
  console.log(productItem);

  // add product in card
  const handleAddToCart = (id: number): void => {
    console.log(productItem);

    if (productItem) {
      const newItemInCart: INewItemInCart = {
        users_id: user?.id || -1,
        products_item_id: id,
        quantity: 1,
        unit_price: +productItem?.price,
      };

      mutate(newItemInCart);
    }
  };

  return (
    <>
      <section>
        <div className="container">
          <h2 className="product-item__title">{productItem?.name}</h2>
          <div className="product-item__wrapper">
            <div className="product-item__small__section ">
              <img className="product-item__image" src={`${productItem?.image}`} alt="" />

              {/* <InputPrice onQuantityChange={() => {}} quantity={1} price={productItem?.price} /> */}
              {/* <ImageZoom image={productItem?.image || ''} /> */}
            </div>
            <div className="product-item__small__section ">
              <p className="product-item__description">{productItem?.description}</p>
              <p className="product-item__notification_allergen">
                Dish contain allergens, check additional info below
              </p>
              <p className="product-item__price">{productItem?.price} CAD$</p>
              <MainButton
                redirect={user ? '' : '/login'}
                name={'Add to cart'}
                classStyle="product-item__btn"
                click={() => {
                  console.log(`Attempting to add product with ID: ${productItem?.id}`); // Лог для отладки
                  handleAddToCart(productItem?.id || -1);
                }}
                icon={<MdAddShoppingCart />}
              />
              {/* <p>{productItem?.type}</p> */}
            </div>
          </div>
          <p className="ingredients__category">Ingredients:</p>
          <ul className="ingredients__list">
            {productItem?.ingredients.map(({ id, name, calories, allergen_info }) => (
              <li className="ingredients__item" key={id}>
                <p className="ingredients__name">{name}</p>
                <ul className="info__list">
                  <li>
                    <p className="ingredients__info">
                      <span className="info--color">Calories: </span>
                      {calories}
                    </p>
                  </li>
                  <li>
                    <p className="ingredients__info">
                      <span className="info--color">Allergen: </span> {allergen_info}
                    </p>
                  </li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AllItemsSection />
    </>
  );
};

export default Product;
