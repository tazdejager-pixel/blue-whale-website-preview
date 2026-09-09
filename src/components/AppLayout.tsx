import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Accommodation from './Accommodation';
import Venue from './Venue';
import WhyChooseUs from './WhyChooseUs';
import Reviews from './Reviews';
import BookCta from './BookCta';
import AvailabilityGrid from './AvailabilityGrid';
import Enquiry from './Enquiry';
import LocationMap from './LocationMap';
import Footer from './Footer';
import MobileBookBar from './MobileBookBar';


const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F2ECDD] text-[#3A3A36] antialiased scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Accommodation />
        <Venue />
        <WhyChooseUs />
        <Reviews />
        <BookCta />
        <AvailabilityGrid />
        <Enquiry />
        <LocationMap />
      </main>

      <Footer />
      <MobileBookBar />
    </div>
  );
};

export default AppLayout;
