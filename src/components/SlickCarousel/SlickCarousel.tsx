import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SlickCarousel.scss';

import img1 from '../../assets/gallery/udon.avif';
import img2 from '../../assets/gallery/Tanuki-udon.avif';
import img3 from '../../assets/gallery/sushi1.jpg';
import img4 from '../../assets/gallery/sushi2.jpg';
import img5 from '../../assets/gallery/udon.avif';

const nextArrStyles = {
  display: 'block',

  position: 'absolute',
  bottom: 0,
  right: '15px',
};

const prevArrStyles = {
  display: 'block',

  position: 'absolute',
  bottom: 0,
  left: '5px',
};

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, ...nextArrStyles }} onClick={onClick} />;
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, ...prevArrStyles }} onClick={onClick} />;
}

const gallery = [
  { img: img1, name: '7' },
  { img: img2, name: '8' },
  { img: img3, name: '9' },
  { img: img4, name: '10' },
  { img: img5, name: '11' },
];

const SlickCarousel = () => {
  var settings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: 'linear',
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    centerMode: false,
    centerPadding: '0px',
    adaptiveHeight: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider__container">
      <Slider {...settings}>
        {gallery.map(({ img, name }) => (
          <div key={name} className="slider__img__wrapp">
            <img className="slider__img" src={img} alt={name} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlickCarousel;
