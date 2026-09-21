import React from 'react';
import { PHOTOS, EXPERIENCES } from '@/data/resort';
import BookButton from './BookButton';
import Img from './Img';

const About: React.FC = () => (
  <section id="about" className="py-20 md:py-28 bg-[#F2ECDD]">
    <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
      <div className="order-2 md:order-1">
        <span className="block text-[#6E93A6] tracking-[0.24em] uppercase text-[11px] mb-2">
          About Blue Whale Resort
        </span>
        <p className="font-script text-[#8A9A5B] text-4xl sm:text-5xl leading-none mb-3">
          The View
        </p>
        <h2 className="font-serif text-[#1E4E5C] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl leading-tight mb-6">
          Is The Destination
        </h2>
        <p className="text-[#3A3A36]/85 leading-relaxed mb-5">
          Blue Whale Resort sits within a private coastal nature reserve near
          George, on South Africa's celebrated Garden Route - offering
          breathtaking sea views, comfortable self-catering accommodation and
          unforgettable experiences for every kind of getaway.
        </p>
        <p className="text-[#3A3A36]/85 leading-relaxed mb-8">
          From relaxed family holidays and romantic escapes to weddings and
          conferences, this is a place to breathe out - to slow down, reconnect
          with the people who matter, and create lasting memories. Far from the
          noise, close to the wild.
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-9">
          {EXPERIENCES.map((e) => (
            <div key={e} className="flex items-center gap-3 text-[#3A3A36]/80 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8A9A5B] shrink-0" />
              {e}
            </div>
          ))}
        </div>

        <BookButton variant="outline">Book Now</BookButton>
      </div>

      {/* The resort's own photographs of the reserve (Tarryn, 21/09/2026): the
          walkway down to the rocky shore leads, then the gate and the two birds.
          The chalet interior that used to sit here came off with the rest of the
          room photography. */}
      <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
        <Img
          photo={PHOTOS.viewBoardwalk}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="col-span-2 w-full h-56 sm:h-72 object-cover rounded-3xl shadow-lg"
        />
        <Img
          photo={PHOTOS.viewGate}
          sizes="(min-width: 768px) 23vw, 50vw"
          className="w-full h-40 sm:h-48 object-cover rounded-3xl shadow-lg"
        />
        <Img
          photo={PHOTOS.viewSunbird}
          sizes="(min-width: 768px) 23vw, 50vw"
          className="w-full h-40 sm:h-48 object-cover rounded-3xl shadow-lg"
        />
        <Img
          photo={PHOTOS.viewFledgling}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="col-span-2 w-full h-40 sm:h-48 object-cover rounded-3xl shadow-lg"
        />
      </div>
    </div>
  </section>
);

export default About;
