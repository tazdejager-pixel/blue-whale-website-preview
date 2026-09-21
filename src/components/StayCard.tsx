import React, { useState } from 'react';
import { Stay } from '@/data/resort';
import { Users, Eye, Check, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { BOOKING_URL } from '@/data/resort';
import Img from './Img';

interface Props {
  stay: Stay;
  reverse?: boolean;
}

/** Thumbnails visible at once. Three is the original layout and it stays three. */
const PER_VIEW = 3;

const StayCard: React.FC<Props> = ({ stay, reverse = false }) => {
  const [active, setActive] = useState(0);
  const [start, setStart] = useState(0);

  const count = stay.images.length;
  const maxStart = Math.max(0, count - PER_VIEW);
  const shown = stay.images.slice(start, start + PER_VIEW);

  // One thumbnail at a time rather than a whole page of three: the strip slides,
  // which is what an arrow on a row of thumbnails is expected to do. Clamped at both
  // ends rather than wrapping, because a wrapping thumbnail strip hides where you are.
  const slide = (by: number) => setStart((s) => Math.min(Math.max(s + by, 0), maxStart));

  return (
    <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Gallery: one big image, thumbnails underneath. Clicking a thumbnail puts
          that photo in the big block; the arrows scroll the strip when a stay has
          more than three photos (Tarryn, 21/09/2026). */}
      <div className={reverse ? 'lg:order-2' : ''}>
        <div className="relative rounded-[2rem] overflow-hidden shadow-xl">
          <Img
            photo={stay.images[active]}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full h-72 sm:h-96 object-cover transition-all duration-500"
          />
          {stay.signature && (
            <span className="absolute top-4 left-4 bg-[#1E4E5C] text-[#F2ECDD] text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Star size={12} className="fill-current" /> Signature Stay
            </span>
          )}
        </div>

        {count > 1 && (
          <div className="relative mt-3">
            <div className="grid grid-cols-3 gap-3">
              {shown.map((img, i) => {
                const index = start + i;
                return (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Show photo ${index + 1} of ${count}: ${img.alt}`}
                    aria-current={active === index}
                    className={`relative rounded-2xl overflow-hidden h-20 sm:h-24 transition-all ${
                      active === index
                        ? 'ring-2 ring-[#1E4E5C] ring-offset-2 ring-offset-white'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.thumb}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Straddle the edge of the strip rather than sitting on a thumbnail.
                The row keeps the original full width and aligns with the big image
                above it, and the button covers only a sliver of the end thumbnail. */}
            {count > PER_VIEW && start > 0 && (
              <button
                type="button"
                onClick={() => slide(-1)}
                aria-label="Show earlier photos"
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#1E4E5C] shadow-md ring-1 ring-[#1E4E5C]/10 hover:bg-[#1E4E5C] hover:text-[#F2ECDD] transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            {count > PER_VIEW && start < maxStart && (
              <button
                type="button"
                onClick={() => slide(1)}
                aria-label="Show more photos"
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white text-[#1E4E5C] shadow-md ring-1 ring-[#1E4E5C]/10 hover:bg-[#1E4E5C] hover:text-[#F2ECDD] transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            )}
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
          {stay.fromPrice && (
            <span className="text-[#1E4E5C] font-medium">{stay.fromPrice}</span>
          )}
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
