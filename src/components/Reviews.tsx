import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { REVIEWS } from '@/data/resort';

/**
 * Guest reviews, presented by the resort itself.
 *
 * 21/09/2026: the Tripadvisor feed came out (Tarryn). No runtime fetch, no bubbles,
 * no Tripadvisor mark, no outbound links, no aggregate rating. The words are real
 * guests, carried over from the resort's own published widget and held in
 * data/resort.ts, which is the only place they are edited.
 *
 * Nothing here may be invented. See the rules on the REVIEWS export.
 */

const PER_VIEW = 3;

const Reviews: React.FC = () => {
  const [page, setPage] = useState(0);

  if (!REVIEWS.length) return null;

  // Whole pages only, so the last slide is never a single card on its own.
  const whole = Math.floor(REVIEWS.length / PER_VIEW) * PER_VIEW;
  const all = whole >= PER_VIEW ? REVIEWS.slice(0, whole) : REVIEWS;
  const pages = Math.ceil(all.length / PER_VIEW);
  const current = Math.min(page, pages - 1);
  const shown = all.slice(current * PER_VIEW, current * PER_VIEW + PER_VIEW);
  const step = (by: number) => setPage((p) => (p + by + pages) % pages);

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#F2ECDD]">
      <div className="max-w-7xl mx-auto px-5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="block text-[#6E93A6] tracking-[0.24em] uppercase text-[11px] mb-2">
            Guest Reviews
          </span>
          <p className="font-script text-[#8A9A5B] text-4xl sm:text-5xl leading-none mb-2">
            In Their
          </p>
          <h2 className="font-serif text-[#1E4E5C] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl mb-5">
            Own Words
          </h2>
          <p className="text-[#3A3A36]/70 leading-relaxed">
            Guests have been coming back to this stretch of coast for years. Here is what
            some of them said after they left.
          </p>
        </div>

        <div className="relative">
          {pages > 1 && (
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous reviews"
              className="hidden lg:flex absolute -left-4 xl:-left-14 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white text-[#1E4E5C] shadow-md hover:bg-[#1E4E5C] hover:text-[#F2ECDD] transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {shown.map((r) => (
              <figure
                key={r.author + r.when}
                className="bg-white rounded-[1.75rem] p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col"
              >
                {/* Sits above the text, not behind it. Absolutely positioned it
                    collided with the first line on every card. */}
                <Quote
                  size={30}
                  strokeWidth={1.25}
                  aria-hidden="true"
                  className="text-[#8A9A5B]/35 mb-4 shrink-0"
                />

                <blockquote className="text-[#3A3A36]/80 leading-relaxed grow">
                  {r.quote}
                </blockquote>

                <figcaption className="mt-7 pt-5 border-t border-[#1E4E5C]/10">
                  <span className="block font-serif text-[#1E4E5C] text-lg leading-snug">
                    {r.author}
                  </span>
                  <span className="block text-[13px] text-[#3A3A36]/55 mt-0.5">
                    {r.stay}
                    <span className="mx-2 text-[#8A9A5B]">-</span>
                    {r.when}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>

          {pages > 1 && (
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="More reviews"
              className="hidden lg:flex absolute -right-4 xl:-right-14 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white text-[#1E4E5C] shadow-md hover:bg-[#1E4E5C] hover:text-[#F2ECDD] transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {pages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous reviews"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[#1E4E5C]/25 text-[#1E4E5C] hover:bg-[#1E4E5C] hover:text-[#F2ECDD] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`Reviews ${i * PER_VIEW + 1} to ${Math.min((i + 1) * PER_VIEW, all.length)}`}
                  aria-current={i === current}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-6 bg-[#1E4E5C]' : 'w-2 bg-[#1E4E5C]/25 hover:bg-[#1E4E5C]/50'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="More reviews"
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full border border-[#1E4E5C]/25 text-[#1E4E5C] hover:bg-[#1E4E5C] hover:text-[#F2ECDD] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        <p className="text-center text-[11px] tracking-[0.16em] uppercase text-[#3A3A36]/40 mt-8">
          Reviews left by guests who stayed with us
        </p>
      </div>
    </section>
  );
};

export default Reviews;
