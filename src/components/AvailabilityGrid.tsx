import React from 'react';
import { AVAILABILITY_EMBED_URL } from '@/data/resort';
import BookButton from './BookButton';

const AvailabilityGrid: React.FC = () => (
  <section id="availability" className="bg-[#F2ECDD] py-20 md:py-28">
    <div className="max-w-4xl mx-auto px-5 text-center">
      <p className="font-script text-[#1E4E5C] text-4xl sm:text-5xl leading-none mb-2">Check</p>
      <h2 className="font-serif text-[#1E4E5C] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl mb-5">
        Availability
      </h2>
      <p className="text-[#3A3A36]/80 leading-relaxed mb-10 max-w-2xl mx-auto">
        See live availability and rates below, then continue to our secure NightsBridge
        booking engine to confirm your dates.
      </p>

      <div className="mx-auto w-full max-w-[900px] overflow-hidden rounded-2xl border border-[#1E4E5C]/15 bg-white shadow-sm">
        <iframe
          title="Blue Whale Resort live availability"
          src={AVAILABILITY_EMBED_URL}
          loading="lazy"
          className="block w-full h-[520px] sm:h-[500px]"
        />
      </div>

      <div className="mt-10">
        <BookButton variant="outline">Book Now</BookButton>
      </div>
    </div>
  </section>
);

export default AvailabilityGrid;
