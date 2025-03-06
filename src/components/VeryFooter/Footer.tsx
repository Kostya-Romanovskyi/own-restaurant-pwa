import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer__info">
          <div className="footer__info__logo">Logo</div>

          <div className="footer__info__wrapp">
            <h3 className="footer__info__title">Follow us:</h3>

            <ul className="footer__info__list">
              <li className="footer__info__item">
                <Link to="/">Instagram</Link>
              </li>
              <li className="footer__info__item">
                <Link to="/">Facebook</Link>
              </li>
              <li className="footer__info__item">
                <Link to="/">Twitter</Link>
              </li>
            </ul>
          </div>

          <div className="footer__info__rights">
            © 2024 ownSushi.<span className="footer__info__span"> All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
