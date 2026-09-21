import React from 'react';
import { BOOKING_URL } from '@/data/resort';

interface Props {
  children?: React.ReactNode;
  variant?: 'solid' | 'outline' | 'light' | 'lightOutline';
  className?: string;
  // Optional override so a future room-specific NightsBridge link
  // (e.g. bookingUrlFor('ROOM_TYPE_ID')) can be passed per chalet.
  href?: string;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-xs font-medium tracking-[0.22em] uppercase transition-all duration-300 min-h-[48px]';

const variants = {
  // filled ocean pill
  solid: 'bg-[#17414D] text-[#F2ECDD] border border-[#17414D] hover:bg-[#112E36] hover:border-[#112E36]',
  // understated outlined pill on light backgrounds - the template's signature look
  outline: 'bg-transparent border border-[#17414D] text-[#17414D] hover:bg-[#17414D] hover:text-[#F2ECDD]',
  // filled cream pill for dark/photo backgrounds
  light: 'bg-[#F2ECDD] text-[#17414D] border border-[#F2ECDD] hover:bg-white',
  // outlined cream pill for dark/photo backgrounds
  lightOutline: 'bg-transparent border border-[#F2ECDD] text-[#F2ECDD] hover:bg-[#F2ECDD] hover:text-[#17414D]',
};

const BookButton: React.FC<Props> = ({
  children = 'Book Now',
  variant = 'outline',
  className = '',
  href = BOOKING_URL,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${base} ${variants[variant]} ${className}`}
  >
    {children}
  </a>
);

export default BookButton;
