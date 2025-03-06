import SlickCarousel from '../../SlickCarousel/SlickCarousel';

import './CarouselSection.scss';

const CarouselSection = () => {
	return (
		<section className='section'>
			<div className='container'>
				<h2 className='carousel__title'>Menu gallery</h2>

				<div className='carousel__wrapper'>
					<SlickCarousel />
				</div>
			</div>
		</section>
	);
};

export default CarouselSection;
