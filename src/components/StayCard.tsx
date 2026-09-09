import React, { useState } from 'react';
import { Stay } from '@/data/resort';
import { Users, Eye, Check, Star } from 'lucide-react';
import { BOOKING_URL } from '@/data/resort';

interface Props {
  stay: Stay;
  reverse?: boolean;
}

const StayCard: React.FC<Props> = ({ stay, reverse = false }) => {
  const [active, setActive] = useState(0);

  return (
    <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Gallery */}
      <div className={reverse ? 'lg:order-2' : ''}>
        <div className="relative rounded-[2rem] overflow-hidden shadow-xl">
          <img
            src={stay.images[active]}
            alt={`${stay.name} at Blue Whale Resort - photo ${active + 1}`}
            loading="lazy"
            className="w-full h-72 sm:h-96 object-cover transition-all duration-500"
          />
          {stay.signature && (
            <span className="absolute top-4 left-4 bg-[#1E4E5C] text-[#F2ECDD] text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Star size={12} className="fill-current" /> Signature Stay
            </span>
          )}
        </div>
        {stay.images.length > 1 && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {stay.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1} of ${stay.name}`}
                className={`relative rounded-2xl overflow-hidden h-20 sm:h-24 transition-all ${
                  active === i
                    ? 'ring-2 ring-[#1E4E5C] ring-offset-2 ring-offset-white'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail */}
      <div className={reverse ? 'lg:order-1' : ''}>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-2 bg-[#F2ECDD] text-[#1E4E5C] text-xs px-3 py-1.5 rounded-full">
            <Users size={14} /> {stay.sleeps}
          </span>
          <span className="inline-flex items-center gap-2 bg-[#F2ECDD] text-[#1E4E5C] text-xs px-3 py-1.5 rounded-full">
            <Eye size={14} /> {stay.view}
          </span>
        </div>

        <h3 className="font-serif text-[#1E4E5C] text-3xl sm:text-4xl mb-2">{stay.name}</h3>
        <p className="text-[#8A9A5B] text-sm italic mb-5">Ideal for {stay.suits.toLowerCase()}.</p>

        <p className="text-[#3A3A36]/80 leading-relaxed mb-6">{stay.blurb}</p>

        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
          {stay.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[#3A3A36]/80 text-sm">
              <Check size={16} className="text-[#8A9A5B] shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-5 pt-5 border-t border-[#1E4E5C]/10">
          <span className="text-[#1E4E5C] font-medium">{stay.fromPrice}</span>
          <a
            href={stay.bookUrl || BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 text-xs font-medium tracking-[0.22em] uppercase border border-[#1E4E5C] text-[#1E4E5C] hover:bg-[#1E4E5C] hover:text-[#F2ECDD] transition-all min-h-[48px]"
          >
            Book Now
          </a>
        </div>
      </div>
    </article>
  );
};

export default StayCard;
