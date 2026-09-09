import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookBar from '@/components/MobileBookBar';
import VenueEnquiry from '@/components/VenueEnquiry';
import { IMAGES, VENUE, RESORT } from '@/data/resort';
import { setSeo } from '@/lib/blog';
import { Check } from 'lucide-react';

/**
 * The venue has its own page rather than a band on the home page, because a wedding
 * or a conference is a different decision from a night in a chalet, and the enquiry
 * form belongs with it. The home page keeps a short section that points here.
 *
 * Deliberately the basics for now - Tarryn is sending the full content.
 */
const VenuePage: React.FC = () => {
  useEffect(() => {
    setSeo({
      title: `Weddings & Conference Venue | ${RESORT.name}, George`,
      description:
        'An ocean-view venue for weddings, conferences and functions up to 50 guests, on a private nature reserve near George. Licensed bar, accommodation on site, whales and dolphins from the deck.',
      url: '/venue',
    });
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-[#F2ECDD] text-[#3A3A36] antialiased">
      <Navbar />

      <main>
        {/* Hero */}
        <section id="top" className="relative min-h-[68vh] flex items-center justify-center">
          <img
            src={IMAGES.venue}
            alt="Ocean-view wedding and conference venue at Blue Whale Resort near George"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#163842]/70" />

          <div className="relative z-10 text-center px-5 max-w-3xl pt-24 pb-16">
            <span className="block text-[#F2ECDD]/80 tracking-[0.24em] uppercase text-[11px] mb-3">
              Weddings, Conferences & Functions
            </span>
            <p className="font-script text-[#F2ECDD] text-5xl sm:text-6xl leading-none mb-2">
              Celebrate
            </p>
            <h1 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-3xl sm:text-4xl md:text-5xl mb-6">
              By The Ocean
            </h1>
            <p className="text-[#F2ECDD]/90 leading-relaxed max-w-xl mx-auto">
              An ocean-view venue for up to 50 guests, on a private coastal nature reserve
              near George, with the accommodation on the same property.
            </p>
          </div>
        </section>

        {/* The venue */}
        <section className="py-20 md:py-28 bg-[#F2ECDD]">
          <div className="max-w-6xl mx-auto px-5">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="block text-[#6E93A6] tracking-[0.24em] uppercase text-[11px] mb-2">
                The Venue
              </span>
              <h2 className="font-serif text-[#1E4E5C] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl mb-6">
                One Place, Start To Finish
              </h2>
              <p className="text-[#3A3A36]/85 leading-relaxed">{VENUE.intro}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <div className="bg-white rounded-[1.75rem] p-8 shadow-sm">
                <h3 className="font-serif text-[#1E4E5C] uppercase tracking-[0.04em] text-xl mb-5">
                  Perfect For
                </h3>
                <ul className="space-y-3">
                  {VENUE.perfectFor.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[#3A3A36]/85 text-sm">
                      <Check size={18} className="shrink-0 mt-0.5 text-[#8A9A5B]" /> {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-[1.75rem] p-8 shadow-sm">
                <h3 className="font-serif text-[#1E4E5C] uppercase tracking-[0.04em] text-xl mb-5">
                  What Comes With It
                </h3>
                <ul className="space-y-3">
                  {VENUE.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[#3A3A36]/85 text-sm">
                      <Check size={18} className="shrink-0 mt-0.5 text-[#8A9A5B]" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { n: '50', l: 'guests, seated or standing' },
                { n: '10', l: 'chalets for your guests to stay in' },
                { n: '10', l: 'hectares of private nature reserve' },
              ].map((s) => (
                <div key={s.l} className="bg-white rounded-[1.75rem] p-8 text-center shadow-sm">
                  <p className="font-serif text-[#1E4E5C] text-4xl leading-none mb-2">{s.n}</p>
                  <p className="text-[#3A3A36]/70 text-sm leading-relaxed">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry - the reason this page exists */}
        <section id="venue-enquiry" className="relative py-20 md:py-28">
          <img
            src={IMAGES.boardwalk}
            alt="Boardwalk through fynbos to the ocean at Blue Whale Resort"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#163842]/85" />

          <div className="relative z-10 max-w-2xl mx-auto px-5">
            <div className="text-center mb-8">
              <span className="block text-[#F2ECDD]/70 tracking-[0.24em] uppercase text-[11px] mb-2">
                Enquire
              </span>
              <h2 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-2xl sm:text-3xl mb-3">
                Tell Us About Your Day
              </h2>
              <p className="text-[#F2ECDD]/80 text-sm leading-relaxed">
                Dates, numbers and what you have in mind. We will come back to you with what
                the day would look like here.
              </p>
            </div>

            <VenueEnquiry />

          </div>
        </section>
      </main>

      <Footer />
      <MobileBookBar />
    </div>
  );
};

export default VenuePage;
