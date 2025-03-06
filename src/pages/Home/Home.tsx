import HeroSection from '../../components/Sections/HeroSection/HeroSection';

import ScheduleSection from '../../components/Sections/ScheduleSection/ScheduleSection';

import CarouselSection from '../../components/Sections/CarouselSection/CarouselSection';

import './home.scss';
import ReviewsSection from '../../components/Sections/ReviewsSection/ReviewsSection';
import InfoSection from '../../components/Sections/InfoSection/InfoSection';

import Footer from '../../components/SectionMap/SectionMap';

const Home = () => {
  return (
    <>
      <HeroSection />

      <ScheduleSection />

      <CarouselSection />

      <ReviewsSection />

      <InfoSection />

      <Footer />
    </>
  );
};

export default Home;
