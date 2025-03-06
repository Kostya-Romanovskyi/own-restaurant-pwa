import { useAllCategories } from '../../hooks/useAllCategories';
import CategoriesItemSlider from '../CategoriesItemSlider/CategoriesItemSlider';
import divider from '../../assets/Info__section/divider.png';
import './categories-list-slider.scss';

interface ICategoriesListSliderProps {
  id: number;
  name: string;
  image: string;
}

const CategoriesListSlider = () => {
  const { data: categoriesData } = useAllCategories();

  return (
    <>
      <ul className="category__list">
        {categoriesData &&
          categoriesData.map(({ id, name, image }: ICategoriesListSliderProps) => {
            return <CategoriesItemSlider key={id} name={name} image={image} />;
          })}
      </ul>

      <div className="decorate">
        <img className="decorate__img" src={divider} alt="divider" />
        <img className="decorate__img" src={divider} alt="divider" />
        <img className="decorate__img" src={divider} alt="divider" />
      </div>
    </>
  );
};

export default CategoriesListSlider;
