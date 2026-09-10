import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Accommodation from './Accommodation';
import Venue from './Venue';
import WhyChooseUs from './WhyChooseUs';
import Reviews from './Reviews';
import BookCta from './BookCta';
import Enquiry from './Enquiry';
import LocationMap from './LocationMap';
import Footer from './Footer';
import MobileBookBar from './MobileBookBar';


const AppLayout: React.FC = () => {
  const location = useLocation();

  // Arriving from another page with an anchor in hand - the Venue page's nav, say.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const el = document.querySelector(target);
    if (el) window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60);
  }, [location.state]);

  return (
    <div className="min-h-screen bg-[#F2ECDD] text-[#3A3A36] antialiased scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Accommodation />
        {/* Why Choose Us sits ABOVE the venue (client, 10/09/2026) - the reasons to
            trust the place are read before the biggest ask on the page, and Reviews
            stay directly under the venue so the proof lands right after it. */}
        <WhyChooseUs />
        <Venue />
        <Reviews />
        <BookCta />
        <Enquiry />
        <LocationMap />
      </main>

      <Footer />
      <MobileBookBar />
    </div>
  );
};

export default AppLayout;
