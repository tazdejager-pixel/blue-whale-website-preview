import React from 'react';
import { VIEW_GALLERY, EXPERIENCES } from '@/data/resort';
import BookButton from './BookButton';
import PhotoGallery from './PhotoGallery';

const About: React.FC = () => (
  <section id="about" className="py-20 md:py-28 bg-[#F2ECDD]">
    <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
      <div className="order-2 md:order-1">
        <span className="block text-[#456C80] tracking-[0.24em] uppercase text-[11px] mb-2">
          About Blue Whale Resort
        </span>
        <p className="font-script text-[#5F6E39] text-4xl sm:text-5xl leading-none mb-3">
          The View
        </p>
        <h2 className="font-serif text-[#17414D] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl leading-tight mb-6">
          Is The Destination
        </h2>
        <p className="text-[#2E2A25]/95 leading-relaxed mb-5">
          Blue Whale Resort sits within a private coastal nature reserve near
          George, on South Africa's celebrated Garden Route - offering
          breathtaking sea views, comfortable self-catering accommodation and
          unforgettable experiences for every kind of getaway.
        </p>
        <p className="text-[#2E2A25]/95 leading-relaxed mb-8">
          From relaxed family holidays and romantic escapes to weddings and
          conferences, this is a place to breathe out - to slow down, reconnect
          with the people who matter, and create lasting memories. Far from the
          noise, close to the wild.
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-9">
          {EXPERIENCES.map((e) => (
            <div key={e} className="flex items-center gap-3 text-[#2E2A25]/90 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5F6E39] shrink-0" />
              {e}
            </div>
          ))}
        </div>

        <BookButton variant="outline">Book Now</BookButton>
      </div>

      {/* The same gallery as the accommodation cards: one big image, three
          thumbnails, click to swap (Tarryn, 21/09/2026). It replaced a fixed
          four-image grid, which could not carry six photographs. */}
      <div className="order-1 md:order-2">
        <PhotoGallery photos={VIEW_GALLERY} sizes="(min-width: 768px) 45vw, 100vw" />
      </div>
    </div>
  </section>
);

export default About;
