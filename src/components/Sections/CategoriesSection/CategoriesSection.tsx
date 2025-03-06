import CategoriesListSlider from '../../CategoriesListSlider/CategoriesListSlider';
import './categories-section.scss';

const CategoriesSection = () => {
  return (
    <section className="section__categories">
      <div className="container">
        <CategoriesListSlider />
      </div>
    </section>
  );
};

export default CategoriesSection;
