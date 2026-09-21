import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PHOTOS, VENUE } from '@/data/resort';
import { Check, ArrowRight } from 'lucide-react';

// The home page introduces the venue and hands off. The detail and the enquiry form
// live on /venue, because booking a wedding is a different decision from booking a
// chalet and it deserves its own page.
//
// 10/09/2026: leads with the takeover advantage rather than a seven-item list of event
// types, which read as a hall for hire. Matches the restructured /venue page.
const Venue: React.FC = () => {
  const navigate = useNavigate();

  return (
  <section id="venue" className="relative py-20 md:py-28 bg-[#112E36]">
    {/* The walkway down to the rocky shore, chosen by Tarryn 21/09/2026 as the
        backdrop for this band. Decorative here - the card sits on top of it and
        carries the meaning - so it is given an empty alt. */}
    <img
      src={PHOTOS.venueWalkway.src}
      srcSet={PHOTOS.venueWalkway.srcSet}
      sizes="100vw"
      alt=""
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-[#112E36]/78" />

    <div className="relative z-10 max-w-6xl mx-auto px-5">
      <div className="text-center max-w-3xl mx-auto mb-12 bg-[#0a2128]/75 backdrop-blur-md border border-[#F2ECDD]/15 rounded-[2rem] p-8 sm:p-12 shadow-xl">
        <span className="block text-[#F2ECDD]/90 tracking-[0.24em] uppercase text-[11px] mb-2">
          Events Venue
        </span>
        <p className="font-script text-[#F2ECDD] text-4xl sm:text-5xl leading-none mb-2">Celebrate</p>
        <h2 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl mb-5">
          By The Ocean
        </h2>
        {/* The resort's own words for the home page band (Maritza, 17/09/2026).
            The /venue hero keeps VENUE.lead, which she asked to leave alone. */}
        <p className="text-[#F2ECDD] leading-relaxed">{VENUE.homeLead}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {VENUE.routes.map((r) => (
          <div
            key={r.key}
            className="bg-[#0a2128]/80 backdrop-blur-md border border-[#F2ECDD]/15 rounded-[1.5rem] p-8 shadow-xl"
          >
            <span className="block text-[#F2ECDD]/85 tracking-[0.2em] uppercase text-[10px] mb-2">
              {r.eyebrow}
            </span>
            <h3 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-xl mb-5">
              {r.title}
            </h3>
            <ul className="space-y-3">
              {r.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[#F2ECDD] text-sm">
                  {/* The LIGHT sage here. This band is the one place the tick sits on a
                      dark card, and the darkened sage that reads well on cream is
                      2.99:1 on this navy. */}
                  <Check size={18} className="shrink-0 mt-0.5 text-[#9DAE68]" /> {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            navigate('/venue');
            window.scrollTo({ top: 0 });
          }}
          className="inline-flex items-center gap-2 rounded-full bg-[#F2ECDD] px-8 py-4 text-[#17414D] text-[13px] font-medium tracking-[0.16em] uppercase shadow-lg hover:bg-[#17414D] hover:text-[#F2ECDD] transition-colors duration-300"
        >
          See the venue
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  </section>
  );
};

export default Venue;
