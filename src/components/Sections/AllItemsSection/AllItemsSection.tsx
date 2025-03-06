import { useEffect, useState } from 'react';
import { useAllItems } from '../../../hooks/useItems';
import ProductList from '../../ProductList/ProductList';
import { IProductItem } from '../../../API/products/products.interface';
import Spinner from '../../Spinner/Spinner';
import spinnerSize from '../../../constants/spinnerSize';
import './all-items-section.scss';

const AllItemsSection = () => {
  const { data: allItems, isLoading } = useAllItems();
  const [sortedItems, setSortedItems] = useState<IProductItem[]>([]);
  const maxElements = 5;

  useEffect(() => {
    if (allItems) {
      const sort = [...allItems].sort(() => Math.random() - 0.5).slice(0, maxElements);
      setSortedItems(sort);
    }
  }, [allItems]);

  if (isLoading) {
    return <Spinner size={spinnerSize.md} />;
  }

  return (
    <section className="random__items">
      <h2 className="random__title">More dishes</h2>
      <ProductList list={sortedItems} />
    </section>
  );
};

export default AllItemsSection;
