import React, { useEffect, useState } from 'react';
import { BOOKING_URL, RESORT } from '@/data/resort';
import { Phone } from 'lucide-react';

const MobileBookBar: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex gap-2 p-3 bg-[#F2ECDD]/95 backdrop-blur-md border-t border-[#1E4E5C]/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href={`tel:${RESORT.phone.replace(/\s/g, '')}`}
          aria-label="Call us"
          className="w-12 shrink-0 rounded-full border border-[#1E4E5C] text-[#1E4E5C] flex items-center justify-center"
        >
          <Phone size={20} />
        </a>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full bg-[#1E4E5C] text-[#F2ECDD] flex items-center justify-center text-xs font-medium tracking-[0.22em] uppercase min-h-[48px]"
        >
          Book Now
        </a>
      </div>
    </div>
  );
};

export default MobileBookBar;
