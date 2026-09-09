import React, { useEffect, useState } from 'react';
import { REVIEWS_FEED_URL, TRIPADVISOR } from '@/data/resort';

/**
 * Guest reviews, sourced from Tripadvisor.
 *
 * Tripadvisor's review implementation policy requires that review content is NOT
 * present in the page source and is not crawlable, so the feed is fetched at
 * runtime from /reviews/latest.json, which robots.txt disallows. The refresh job
 * (scripts/blue_whale_reviews.py) rewrites that file; nothing here is hand-edited.
 */

type Review = {
  id: string;
  rating: number;
  title: string;
  text: string;
  author: string;
  date: string;
  url: string;
};

type Feed = {
  rating: number;
  review_count: number;
  ranking: string | null;
  rating_image_url: string | null;
  listing_url: string;
  reviews: Review[];
};

const HOW_MANY = 3;

/** Tripadvisor bubbles. Uses their supplied rating image when the feed carries one. */
const Bubbles: React.FC<{ rating: number; size?: number; imageUrl?: string | null }> = ({
  rating,
  size = 16,
  imageUrl,
}) => {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={`${rating} of 5 bubbles on Tripadvisor`}
        height={size}
        style={{ height: size }}
        className="w-auto"
      />
    );
  }
  return (
    <span
      className="inline-flex items-center gap-[3px]"
      role="img"
      aria-label={`${rating} of 5 bubbles on Tripadvisor`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(Math.max(rating - i + 1, 0), 1);
        return (
          <span
            key={i}
            style={{ width: size, height: size }}
            className="relative inline-block rounded-full border-[1.5px] border-[#00AA6C]"
          >
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden rounded-full"
                style={{ width: `${fill * 100}%` }}
              >
                <span
                  className="block rounded-full bg-[#00AA6C]"
                  style={{ width: size, height: size }}
                />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
};

const TripadvisorMark: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12 4.2c-3.1 0-5.9.9-8 2.5H0l1.8 2a5.5 5.5 0 1 0 8.9 6.4l1.3 1.9 1.3-1.9a5.5 5.5 0 1 0 8.9-6.4L24 6.7h-4c-2.1-1.6-4.9-2.5-8-2.5Zm-5.5 12a3.7 3.7 0 1 1 0-7.4 3.7 3.7 0 0 1 0 7.4Zm11 0a3.7 3.7 0 1 1 0-7.4 3.7 3.7 0 0 1 0 7.4Zm-11-5.6a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Zm11 0a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8Z" />
  </svg>
);

const prettyDate = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' });
};

const Reviews: React.FC = () => {
  const [feed, setFeed] = useState<Feed | null>(null);

  useEffect(() => {
    let live = true;
    fetch(`${REVIEWS_FEED_URL}?t=${Math.floor(Date.now() / 3.6e6)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: Feed) => {
        if (live) setFeed(d);
      })
      .catch(() => {
        /* the band simply does not render if the feed is unreachable */
      });
    return () => {
      live = false;
    };
  }, []);

  if (!feed || !feed.reviews?.length) return null;

  const shown = feed.reviews.slice(0, HOW_MANY);

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
          <h2 className="font-serif text-[#1E4E5C] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl">
            Own Words
          </h2>
        </div>

        {/* Aggregate */}
        <div className="bg-white rounded-[1.75rem] shadow-sm px-7 py-8 sm:px-10 mb-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-center sm:text-left">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-[#1E4E5C] text-5xl sm:text-6xl leading-none">
              {feed.rating.toFixed(1).replace('.', ',')}
            </span>
            <span className="text-[#3A3A36]/50 text-sm">of 5</span>
          </div>

          <div className="hidden sm:block w-px h-14 bg-[#1E4E5C]/10" />

          <div className="flex flex-col items-center sm:items-start gap-2">
            <Bubbles rating={feed.rating} size={18} imageUrl={feed.rating_image_url} />
            <p className="text-[#3A3A36]/75 text-sm">
              {feed.review_count} traveller reviews on{' '}
              <span className="text-[#00AA6C] font-medium">Tripadvisor</span>
            </p>
            {feed.ranking && (
              <p className="text-[#3A3A36]/60 text-sm">{feed.ranking}</p>
            )}
          </div>

          <div className="sm:ml-auto">
            <a
              href={feed.listing_url || TRIPADVISOR.listingUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 rounded-full border border-[#1E4E5C]/25 px-6 py-3 text-[#1E4E5C] text-[13px] tracking-[0.12em] uppercase hover:bg-[#1E4E5C] hover:text-[#F2ECDD] transition-colors duration-300"
            >
              <TripadvisorMark className="w-[18px] h-[18px] text-[#00AA6C]" />
              Read all reviews
            </a>
          </div>
        </div>

        {/* Reviews */}
        <div className="grid gap-6 md:grid-cols-3">
          {shown.map((r) => (
            <figure
              key={r.id}
              className="bg-white rounded-[1.75rem] p-8 shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <Bubbles rating={r.rating} />
                <TripadvisorMark className="w-5 h-5 text-[#00AA6C]/70" />
              </div>

              {r.title && (
                <h3 className="font-serif text-[#1E4E5C] text-lg leading-snug mb-3">
                  {r.title}
                </h3>
              )}

              <blockquote className="text-[#3A3A36]/75 text-sm leading-relaxed grow">
                {r.text}
              </blockquote>

              <figcaption className="mt-6 pt-5 border-t border-[#1E4E5C]/10 text-[13px] text-[#3A3A36]/60">
                <span className="text-[#3A3A36]/85">{r.author}</span>
                <span className="mx-2 text-[#8A9A5B]">-</span>
                {prettyDate(r.date)}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-center text-[11px] tracking-[0.16em] uppercase text-[#3A3A36]/40 mt-8">
          Reviews published on Tripadvisor by guests who stayed with us
        </p>
      </div>
    </section>
  );
};

export default Reviews;
