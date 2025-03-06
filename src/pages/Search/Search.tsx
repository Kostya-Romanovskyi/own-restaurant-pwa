import ProductList from '../../components/ProductList/ProductList';
import { useParams } from 'react-router-dom';
import { useItemsByQuery } from '../../hooks/useItems';

import './search.scss';
import Spinner from '../../components/Spinner/Spinner';
import spinnerSize from '../../constants/spinnerSize';

const Search = () => {
  const { query } = useParams();
  const { data, isLoading, error } = useItemsByQuery(query || '');

  if (isLoading) return <Spinner size={spinnerSize.lg} />;
  if (error) return <p>Error loading items</p>;

  const itsArray = Array.isArray(data) ? data : [];

  return (
    <div>
      <h2 className="search__title"> Search Results for "{query}"</h2>

      <ProductList list={itsArray} />
    </div>
  );
};

export default Search;
