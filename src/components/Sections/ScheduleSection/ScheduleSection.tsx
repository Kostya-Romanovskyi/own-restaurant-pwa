import { Link } from 'react-router-dom';
import MainButton from '../../MainButton/MainButton';
import dividerImg from '../../../assets/Info__section/divider.png';
import './schedule-section.scss';

const ScheduleSection = () => {
  return (
    <section className="section">
      <div className="container">
        <ul className="schedule__list">
          <li className="schedule__item">
            <div className="second__border">
              <h2 className="schedule__title">Our hours</h2>
              <div className="schedule__days">Mon - Fri:</div>
              <div className="schedule__description mb-10">
                <span>10:00 am - 8:00 pm</span>
              </div>
              <div className="schedule__days">Sat:</div>
              <div className="schedule__description">
                <span>12:00 pm - 6:00pm</span>
              </div>
            </div>
          </li>
          <img className="info__divider_1" src={dividerImg} alt="divider" />
          <li className="schedule__item">
            <div className="second__border">
              <h2 className="schedule__title">Location</h2>
              <p className="schedule__description mb-10">
                9998 Front Ave. Labrador City, LB A2V 6N5
              </p>

              <MainButton
                redirect="https://www.google.com/maps/search/9998+Front+Ave.+Labrador+City,+LB+A2V+6N5/@52.9599728,-67.0203084,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MDkxNi4wIKXMDSoASAFQAw%3D%3D"
                name="Get directions"
                click={() => {}}
                classStyle=""
                icon={<></>}
              />
            </div>
          </li>
          <img className="info__divider_2" src={dividerImg} alt="divider" />
          <li className="schedule__item">
            <div className="second__border">
              <h2 className="schedule__title">Contact us</h2>
              <div>
                <div>
                  <p className="schedule__days">Call:</p>
                  <Link
                    className="schedule__description mb-10 schedule__active"
                    to="tel:+1(605) 234-3233"
                  >
                    +1 (605) 234-3233
                  </Link>
                </div>
                <div>
                  <p className="schedule__days">Email:</p>
                  <Link
                    className="schedule__description schedule__active"
                    to="mailto:restaurant@gmail.com"
                  >
                    restaurant@gmail.com
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ScheduleSection;
