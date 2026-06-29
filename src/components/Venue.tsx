import React from 'react';
import { IMAGES, VENUE } from '@/data/resort';
import BookButton from './BookButton';
import VenueEnquiry from './VenueEnquiry';
import { Check } from 'lucide-react';

const Venue: React.FC = () => (
  <section id="venue" className="relative py-20 md:py-28">
    <img
      src={IMAGES.venue}
      alt="Ocean-view wedding and conference venue at Blue Whale Resort on the Garden Route"
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-[#163842]/82" />

    <div className="relative z-10 max-w-6xl mx-auto px-5">
      <div className="text-center max-w-3xl mx-auto">
        <span className="block text-[#F2ECDD]/70 tracking-[0.24em] uppercase text-[11px] mb-2">
          Events Venue
        </span>
        <p className="font-script text-[#F2ECDD] text-4xl sm:text-5xl leading-none mb-2">Celebrate</p>
        <h2 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl mb-5">
          By The Ocean
        </h2>
        <p className="text-[#F2ECDD]/90 leading-relaxed mb-12">{VENUE.intro}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#F2ECDD]/10 backdrop-blur-sm border border-[#F2ECDD]/20 rounded-[1.5rem] p-8">
          <h3 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-xl mb-5">Perfect For</h3>
          <ul className="space-y-3">
            {VENUE.perfectFor.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[#F2ECDD]/90 text-sm">
                <Check size={18} className="shrink-0 mt-0.5 text-[#8A9A5B]" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#F2ECDD]/10 backdrop-blur-sm border border-[#F2ECDD]/20 rounded-[1.5rem] p-8">
          <h3 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-xl mb-5">Venue Features</h3>
          <ul className="space-y-3">
            {VENUE.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[#F2ECDD]/90 text-sm">
                <Check size={18} className="shrink-0 mt-0.5 text-[#8A9A5B]" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-7">
          <h3 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-xl sm:text-2xl mb-2">
            Enquire About Your Event
          </h3>
          <p className="text-[#F2ECDD]/80 text-sm">
            Tell us what you're planning and we'll help you organise it, end to end.
          </p>
        </div>
        <VenueEnquiry />
        <div className="text-center mt-8">
          <p className="text-[#F2ECDD]/70 text-sm mb-4">Already know your dates?</p>
          <BookButton variant="lightOutline">Book Now</BookButton>
        </div>
      </div>
    </div>
  </section>
);

export default Venue;
