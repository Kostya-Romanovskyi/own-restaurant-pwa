import sushi1 from '../../../assets/Info__section/info_sushi.jpg';
import sushi2 from '../../../assets/Info__section/info_sushi2.jpeg';

import './InfoSection.scss';

const InfoSection = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="info__title"> Our Restaurant’s Philosophy</h2>

        <ul>
          <li className="info__item">
            <div>
              <h3 className="info__subtitle">
                The art of taste. A harmony of tradition and modern techniques.
              </h3>
              <p className="info__text">
                Inspired by centuries-old Japanese culture, we create dishes that embody the spirit
                of omotenashi – the art of hospitality. Our menu features only fresh and natural
                ingredients, prepared with the philosophy of wabi-sabi, where simplicity enhances
                the true essence of flavors. We honor traditional recipes while embracing
                innovation, offering modern interpretations of classic Japanese dishes.
              </p>
            </div>

            <img className="info__img" src={sushi1} alt="" />
          </li>
          <li className="info__item">
            <div>
              <h3 className="info__subtitle">
                In Japan, beauty is not just about appearance, but also taste.
              </h3>
              <p className="info__text">
                Japanese cuisine is a delicate balance of flavor, texture, and presentation. Every
                ingredient is carefully selected and thoughtfully arranged to create a visual and
                culinary experience. Our dishes are not just meals – they are expressions of
                Japanese aesthetics, where every detail matters. From the freshness of the fish to
                the precision of knife cuts, we strive to deliver an authentic and unforgettable
                taste of Japan.
              </p>
            </div>
            <img className="info__img" src={sushi2} alt="" />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default InfoSection;
