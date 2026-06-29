import React from 'react';
import { RESORT, LOGO_CREAM, NAV_LINKS } from '@/data/resort';
import { Phone, Mail, MapPin, Globe, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#163842] text-[#F2ECDD] pt-16 pb-28 md:pb-10">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-3 gap-12">
        <div>
          <img src={LOGO_CREAM} alt="Blue Whale Resort logo" className="w-44 mb-5" />
          <p className="font-script text-3xl mb-2">{RESORT.tagline}</p>
          <p className="text-[#F2ECDD]/80 text-sm leading-relaxed mb-4">{RESORT.taglineSub}</p>
          <p className="text-[#F2ECDD]/60 text-sm leading-relaxed">{RESORT.location}</p>
        </div>

        <div>
          <h4 className="tracking-[0.24em] uppercase text-[11px] text-[#F2ECDD]/60 mb-5">Explore</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => handleNav(l.href)}
                  className="text-[#F2ECDD]/85 hover:text-white transition-colors text-sm"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <a href="/blog" className="inline-block mt-4 text-[#F2ECDD]/85 hover:text-white transition-colors text-sm underline">
            Journal
          </a>
        </div>


        <div>
          <h4 className="tracking-[0.24em] uppercase text-[11px] text-[#F2ECDD]/60 mb-5">Connect</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3 text-[#F2ECDD]/85">
              <MapPin size={18} className="shrink-0 mt-0.5" /> {RESORT.address}
            </li>
            <li>
              <a href={`tel:${RESORT.phone.replace(/[\s()]/g, '')}`} className="flex items-start gap-3 text-[#F2ECDD]/85 hover:text-white transition-colors">
                <Phone size={18} className="shrink-0 mt-0.5" /> {RESORT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${RESORT.email}`} className="flex items-start gap-3 text-[#F2ECDD]/85 hover:text-white transition-colors">
                <Mail size={18} className="shrink-0 mt-0.5" /> {RESORT.email}
              </a>
            </li>
            <li>
              <a href={`https://${RESORT.website}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-[#F2ECDD]/85 hover:text-white transition-colors">
                <Globe size={18} className="shrink-0 mt-0.5" /> {RESORT.website}
              </a>
            </li>
          </ul>
          <div className="flex gap-3 mt-6">
            <a href={RESORT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-[#F2ECDD]/10 hover:bg-[#F2ECDD]/20 flex items-center justify-center transition-colors">
              <Instagram size={18} />
            </a>
            <a href={RESORT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-[#F2ECDD]/10 hover:bg-[#F2ECDD]/20 flex items-center justify-center transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 mt-12 pt-6 border-t border-[#F2ECDD]/15 text-center text-[#F2ECDD]/50 text-xs">
        © {new Date().getFullYear()} {RESORT.name}. All rights reserved. · Garden Route, South Africa
      </div>
    </footer>
  );
};

export default Footer;
