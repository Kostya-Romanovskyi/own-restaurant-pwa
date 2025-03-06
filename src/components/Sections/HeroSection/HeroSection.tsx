import MainButton from '../../MainButton/MainButton';
import Sushi_1 from '../../../assets/Hero__img/sushi_1.png';
import Sushi_2 from '../../../assets/Hero__img/sushi_2.png';
import Sushi_3 from '../../../assets/Hero__img/sushi_3.png';
import Sushi_4 from '../../../assets/Hero__img/sushi_4.png';
import { MdBorderColor } from 'react-icons/md';
import { MdMenuBook } from 'react-icons/md';

import './hero-section.scss';

const HeroSection = () => {
  const handleClick = () => {};
  return (
    <section className="hero__section">
      <div className="container">
        <h1 className="hero__title">Savor the Art of Freshness at ownSushi</h1>

        <ul className="hero__img__list">
          <li className="hero__img__item">
            <img className="hero__image" src={Sushi_1} alt="Smiling sushi" />
          </li>
          <li className="hero__img__item">
            <img className="hero__image" src={Sushi_2} alt="laughing sushi" />
          </li>
          <li className="hero__img__item">
            <img className="hero__image" src={Sushi_3} alt="sushi" />
          </li>
          <li className="hero__img__item">
            <img className="hero__image" src={Sushi_4} alt="sushi" />
          </li>
        </ul>

        <div className="header__btn__wrapp">
          <MainButton
            redirect="/menu"
            name="Order for pick up"
            click={handleClick}
            classStyle="hero__btn margin__10"
            icon={<MdMenuBook />}
          />

          <MainButton
            redirect="/reservation"
            name="Make reservation"
            click={handleClick}
            classStyle="hero__btn"
            icon={<MdBorderColor />}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
