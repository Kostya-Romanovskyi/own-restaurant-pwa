import './pre-items-list.scss';
import { Link } from 'react-router-dom';
import { useAllProducts } from '../../hooks/useProducts';
import ProductList from '../ProductList/ProductList';
import Spinner from '../Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';
import { FaArrowRightLong } from 'react-icons/fa6';

const PreItemsList = () => {
  const { data: productsList, isLoading } = useAllProducts();

  return (
    <ul style={{ marginBottom: 30 }}>
      {isLoading ? (
        <Spinner size={spinnerSize.lg} />
      ) : (
        productsList?.map(({ name, products_items }) => (
          <li className="pre__items__element" key={name}>
            <div className="pre__items__title--wrap">
              <h2 className="pre__items__title">{name}</h2>

              <Link to={`/menu/all-items/${name.toLowerCase()}`} className="line__wrapper">
                <p className="pre__items__marker">more</p>
                <FaArrowRightLong className="pre__items__arrow" />
              </Link>
            </div>

            <ProductList list={products_items} />
          </li>
        ))
      )}
    </ul>
  );
};

export default PreItemsList;
