import React from 'react';
import { Photo } from '@/data/resort';

/**
 * One <img> for a Photo from data/resort.ts.
 *
 * It exists so three things can never be forgotten on a photo:
 *  - `srcSet` + `sizes`, so a phone downloads the 640px file and not the 1600px one
 *  - `width`/`height`, so the browser reserves the box and the page does not jump
 *    while the image arrives (this is most of the Cumulative Layout Shift score)
 *  - real `alt` text, which lives with the photo rather than at the call site
 *
 * `priority` is for an image that is visible before any scrolling: it turns off
 * lazy loading and asks the browser to fetch it early. Use it on the page's largest
 * visible image and nowhere else, or it competes with itself. The attribute is spread
 * in lowercase because React 18 does not map the camelCase `fetchPriority` onto it
 * and warns during the prerender instead.
 */
interface Props {
  photo: Photo;
  /** CSS `sizes`. Default assumes a full-width image on a phone. */
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Overrides the photo's own alt. Pass '' for a decorative duplicate. */
  alt?: string;
}

const Img: React.FC<Props> = ({
  photo,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
  priority = false,
  alt,
}) => (
  <img
    src={photo.src}
    srcSet={photo.srcSet}
    sizes={sizes}
    width={photo.width}
    height={photo.height}
    alt={alt ?? photo.alt}
    loading={priority ? 'eager' : 'lazy'}
    decoding={priority ? 'sync' : 'async'}
    {...(priority ? { fetchpriority: 'high' } : {})}
    className={className}
  />
);

export default Img;
