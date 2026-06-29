import React from 'react';
import { ChevronDown } from 'lucide-react';
import { IMAGES, LOGO_CREAM } from '@/data/resort';
import BookButton from './BookButton';

const Hero: React.FC = () => {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <img
        src={IMAGES.hero}
        alt="Indian Ocean coastline at Blue Whale Resort near George, Garden Route"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d2a32]/70 via-[#103039]/45 to-[#0d2a32]/85" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 46%, rgba(8,28,34,0.6) 0%, rgba(8,28,34,0.25) 45%, transparent 72%)',
        }}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <img
          src={LOGO_CREAM}
          alt="Blue Whale Resort logo"
          className="w-44 sm:w-56 md:w-72 mb-7 drop-shadow-xl"
        />
        <p className="text-[#F2ECDD] tracking-[0.34em] uppercase text-[11px] sm:text-xs mb-5">
          Garden Route · South Africa
        </p>
        <h1 className="font-serif text-[#F2ECDD] leading-[1.1] max-w-3xl mb-3 uppercase tracking-[0.04em] text-2xl sm:text-4xl md:text-5xl [text-shadow:0_2px_20px_rgba(8,28,34,0.8)]">
          The View Is The Destination
        </h1>
        <p className="font-script text-[#F2ECDD] text-4xl sm:text-5xl md:text-6xl mb-7 leading-none [text-shadow:0_2px_20px_rgba(8,28,34,0.8)]">
          Stay. Celebrate. Connect.
        </p>
        <p className="text-[#F2ECDD] max-w-xl text-sm sm:text-base mb-9 font-light leading-relaxed [text-shadow:0_1px_12px_rgba(8,28,34,0.85)]">
          A private coastal nature reserve where uninterrupted ocean views,
          whales and serenity become your everyday.
        </p>
        <BookButton variant="lightOutline" className="text-xs">
          Book Now
        </BookButton>
      </div>

      <button
        onClick={scrollToAbout}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#F2ECDD] animate-bounce"
      >
        <ChevronDown size={32} strokeWidth={1.5} />
      </button>
    </section>
  );
};

export default Hero;
