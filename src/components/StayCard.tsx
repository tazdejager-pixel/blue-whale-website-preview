import React, { useState } from 'react';
import { Stay } from '@/data/resort';
import { Users, Eye, Check, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { BOOKING_URL } from '@/data/resort';
import Img from './Img';

interface Props {
  stay: Stay;
  reverse?: boolean;
}

const StayCard: React.FC<Props> = ({ stay, reverse = false }) => {
  const [active, setActive] = useState(0);
  const count = stay.images.length;
  const step = (by: number) => setActive((i) => (i + by + count) % count);

  return (
    <article className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Gallery. Arrows on the photo itself (Tarryn, 21/09/2026) - the old
          three-up thumbnail strip wrapped to two rows once these stays carried
          five and six photos, and it pushed the copy down the page on mobile. */}
      <div className={reverse ? 'lg:order-2' : ''}>
        <div className="relative rounded-[2rem] overflow-hidden shadow-xl group">
          <Img
            photo={stay.images[active]}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="w-full h-72 sm:h-96 object-cover"
          />

          {stay.signature && (
            <span className="absolute top-4 left-4 bg-[#1E4E5C] text-[#F2ECDD] text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Star size={12} className="fill-current" /> Signature Stay
            </span>
          )}

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={`Previous photo of ${stay.name}`}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/85 text-[#1E4E5C] shadow-md backdrop-blur-sm hover:bg-white transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={`Next photo of ${stay.name}`}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/85 text-[#1E4E5C] shadow-md backdrop-blur-sm hover:bg-white transition-colors"
              >
                <ChevronRight size={22} />
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
                {stay.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Photo ${i + 1} of ${count}`}
                    aria-current={i === active}
                    className={`h-2 rounded-full transition-all duration-300 shadow ${
                      i === active ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/90'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {count > 1 && (
          <p className="text-center text-[11px] tracking-[0.16em] uppercase text-[#3A3A36]/45 mt-3">
            Photo {active + 1} of {count}
          </p>
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
