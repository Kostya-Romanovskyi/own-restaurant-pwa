import { FC } from 'react';
import './categories-item.scss';
import { Link, useParams } from 'react-router-dom';

interface ICategoriesItemProps {
  name: string;
  description: string;
  image: string;
}

const CategoriesItem: FC<ICategoriesItemProps> = ({ name, description, image }) => {
  const { categoryName } = useParams();

  return (
    <Link to={`/menu/categories/${categoryName}/${name.toLowerCase().replace('-', ' ')}`}>
      <li
        className="categories__item"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(254, 252, 234, 0.3), rgba(232, 249, 253, 0.3)), url(${image})`,
        }}
      >
        <h3 className="categories__item-title">{name}</h3>
        <p className="categories__item-description">{description}</p>
      </li>
    </Link>
  );
};

export default CategoriesItem;
