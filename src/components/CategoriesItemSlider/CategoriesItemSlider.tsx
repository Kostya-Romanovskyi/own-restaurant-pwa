import { FC } from 'react';
import { Link } from 'react-router-dom';
import './categories-item-slider.scss';

interface ICategoriesItemSliderProps {
  name: string;
  image: string;
}

const CategoriesItemSlider: FC<ICategoriesItemSliderProps> = ({ name, image }) => {
  return (
    <Link
      to={`/menu/categories/${name.toLowerCase().replace(' ', '-')}`}
      className="category__link"
    >
      <li className="category__item">
        <img className="category__image" src={image} alt={name} />

        <p className="category__name">{name}</p>
      </li>
    </Link>
  );
};

export default CategoriesItemSlider;
