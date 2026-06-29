import React from 'react';
import { IMAGES } from '@/data/resort';
import BookButton from './BookButton';

const BookCta: React.FC = () => (
  <section id="book" className="relative py-24 md:py-32">
    <img
      src={IMAGES.chalet}
      alt="Ocean-view chalet at Blue Whale Resort, George"
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-[#1E4E5C]/85" />
    <div className="relative z-10 max-w-3xl mx-auto px-5 text-center">
      <p className="font-script text-[#F2ECDD] text-4xl sm:text-5xl leading-none mb-2">Your Ocean Escape</p>
      <h2 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl mb-5">
        Awaits
      </h2>
      <p className="text-[#F2ECDD]/90 leading-relaxed mb-9">
        Check availability and reserve your chalet in moments through our secure
        NightsBridge booking engine. The horizon is calling.
      </p>
      <BookButton variant="light" className="text-xs">
        Book Now
      </BookButton>
    </div>
  </section>
);

export default BookCta;
