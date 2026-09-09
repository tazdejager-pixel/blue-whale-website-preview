import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, LOGO_CREAM, LOGO_BLUE, RESORT } from '@/data/resort';
import BookButton from './BookButton';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // A NAV_LINKS href is either an in-page anchor or a route. From another page an
  // anchor has to land on the home page first, which is why this is not just a scroll.
  const handleNav = (href: string) => {
    setOpen(false);
    if (!href.startsWith('#')) {
      navigate(href);
      window.scrollTo({ top: 0 });
      return;
    }
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: href } });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#F2ECDD]/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <button onClick={() => handleNav('#top')} aria-label={RESORT.name} className="flex items-center">
          <img
            src={scrolled ? LOGO_BLUE : LOGO_CREAM}
            alt="Blue Whale Resort logo"
            className="h-12 md:h-14 w-auto object-contain transition-all"
          />
        </button>

        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.slice(0, 6).map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className={`text-[13px] tracking-[0.16em] uppercase font-medium transition-colors ${
                scrolled ? 'text-[#1E4E5C] hover:text-[#8A9A5B]' : 'text-[#F2ECDD] hover:text-white'
              }`}
            >
              {l.label}
            </button>
          ))}
          <BookButton variant={scrolled ? 'outline' : 'lightOutline'} className="!py-2 !px-6">
            Book Now
          </BookButton>
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? (
            <X className={scrolled ? 'text-[#1E4E5C]' : 'text-[#F2ECDD]'} size={28} />
          ) : (
            <Menu className={scrolled ? 'text-[#1E4E5C]' : 'text-[#F2ECDD]'} size={28} />
          )}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#F2ECDD] border-t border-[#1E4E5C]/10 px-5 py-6 space-y-2 shadow-lg">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="block w-full text-left py-3 text-[#1E4E5C] tracking-[0.16em] uppercase text-sm font-medium border-b border-[#1E4E5C]/10 last:border-0"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
