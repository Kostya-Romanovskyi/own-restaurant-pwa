import { FC } from 'react';
import { IProductIncludedInCategory } from '../../API/categories/categories.interface';
import CategoriesItem from '../CategoriesItem/CategoriesItem';

import './categories-list.scss';

interface ICategoryListProps {
  categoryItems: IProductIncludedInCategory[];
}

const CategoriesList: FC<ICategoryListProps> = ({ categoryItems }) => {
  return (
    <ul className="categories__list">
      {categoryItems &&
        categoryItems.map(({ id, name, description, image }) => (
          <CategoriesItem key={id} name={name} description={description} image={image} />
        ))}
    </ul>
  );
};

export default CategoriesList;
