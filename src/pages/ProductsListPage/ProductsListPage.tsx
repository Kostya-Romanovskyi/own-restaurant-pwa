import { useParams } from 'react-router-dom';
import { useProductsByName } from '../../hooks/useProducts';
import ProductList from '../../components/ProductList/ProductList';

import './products-list-page.scss';
import Spinner from '../../components/Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';

const ProductsListPage = () => {
  const { allItemsName } = useParams<{ allItemsName: string }>();

  const { data: productsByName, isPending } = useProductsByName(allItemsName || '');

  return (
    <>
      {isPending ? (
        <Spinner size={spinnerSize.lg} />
      ) : (
        <>
          <div className="container">
            <h2 className="product__title">{allItemsName}</h2>
          </div>
          {productsByName ? (
            <ProductList list={productsByName.products_items} />
          ) : (
            <div className="container">
              <div>No products found for "{allItemsName}".</div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductsListPage;
