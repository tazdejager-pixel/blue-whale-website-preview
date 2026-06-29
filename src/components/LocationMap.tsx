import React from 'react';
import { MAP_EMBED, MAP_LINK, RESORT } from '@/data/resort';
import { MapPin } from 'lucide-react';

const LocationMap: React.FC = () => (
  <section id="location" className="py-20 md:py-28 bg-[#F2ECDD]">
    <div className="max-w-7xl mx-auto px-5">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="block text-[#6E93A6] tracking-[0.24em] uppercase text-[11px] mb-2">Find Us</span>
        <p className="font-script text-[#8A9A5B] text-4xl sm:text-5xl leading-none mb-2">On the Garden Route</p>
        <h2 className="font-serif text-[#1E4E5C] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl mb-4">
          Near George, Western Cape
        </h2>
        <p className="text-[#3A3A36]/75 leading-relaxed">{RESORT.location}</p>
      </div>

      <div className="rounded-[2rem] overflow-hidden shadow-xl border border-[#1E4E5C]/10">
        <iframe
          title="Map of Blue Whale Resort near George, Western Cape"
          src={MAP_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[340px] sm:h-[440px] border-0"
        />
      </div>

      <div className="text-center mt-6">
        <a
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#1E4E5C] text-sm tracking-[0.1em] uppercase hover:text-[#8A9A5B] transition-colors"
        >
          <MapPin size={16} /> Open in Google Maps
        </a>
      </div>
    </div>
  </section>
);

export default LocationMap;
