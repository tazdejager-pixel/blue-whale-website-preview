import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '@/data/resort';
import Img from './Img';

/**
 * The one gallery on this site: a big image with a strip of thumbnails under it.
 *
 * Click a thumbnail to put that photo in the big block. When there are more
 * thumbnails than fit, the arrows scroll the strip one at a time and hide at each
 * end. That is the whole behaviour and it is not to be redesigned - it was replaced
 * once with arrows over the big photo and dots instead of thumbnails, and came
 * straight back (Tarryn, 21/09/2026).
 *
 * Extracted from StayCard the same day so the accommodation galleries and The View
 * cannot drift apart.
 */

/** Thumbnails visible at once. Three is the layout and it stays three. */
const PER_VIEW = 3;

interface Props {
  photos: Photo[];
  /** CSS `sizes` for the big image. */
  sizes?: string;
  /** Rendered over the top-left of the big image, e.g. the Signature Stay pill. */
  badge?: React.ReactNode;
  /** Height classes for the big image. */
  mainClassName?: string;
}

const PhotoGallery: React.FC<Props> = ({
  photos,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  badge,
  mainClassName = 'w-full h-72 sm:h-96 object-cover transition-all duration-500',
}) => {
  const [active, setActive] = useState(0);
  const [start, setStart] = useState(0);

  const count = photos.length;
  const maxStart = Math.max(0, count - PER_VIEW);
  const shown = photos.slice(start, start + PER_VIEW);

  // One thumbnail at a time rather than a whole page of three: the strip slides,
  // which is what an arrow on a row of thumbnails is expected to do. Clamped at both
  // ends rather than wrapping, because a wrapping strip hides where you are.
  const slide = (by: number) => setStart((s) => Math.min(Math.max(s + by, 0), maxStart));

  return (
    <div>
      <div className="relative rounded-[2rem] overflow-hidden shadow-xl">
        <Img photo={photos[active]} sizes={sizes} className={mainClassName} />
        {badge}
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

          {/* Straddle the edge of the strip rather than sitting on a thumbnail. The
              row keeps its full width and aligns with the big image above it, and the
              button covers only a sliver of the end thumbnail. */}
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
  );
};

export default PhotoGallery;
