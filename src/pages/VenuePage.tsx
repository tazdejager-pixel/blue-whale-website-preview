import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookBar from '@/components/MobileBookBar';
import VenueEnquiry from '@/components/VenueEnquiry';
import { IMAGES, VENUE, RESORT } from '@/data/resort';
import { setSeo } from '@/lib/seo';
import { Check, ArrowDown } from 'lucide-react';

/**
 * The venue has its own page rather than a band on the home page, because a wedding
 * or a conference is a different decision from a night in a chalet.
 *
 * Restructured 10/09/2026 after four specialists reviewed the old page and all reached
 * the same diagnosis: it showed an empty room and a list of seven event types, which
 * reads as a hall for hire, and it never answered the only question a venue buyer has -
 * how much work is this going to be for me.
 *
 * So: the takeover advantage leads, the two buyers get their own route rather than
 * sharing one generic list, capacity is a table instead of decorative tiles, and the
 * enquiry is reachable before the bottom of the page for the mostly-mobile traffic.
 *
 * The dressed images show the real room and the real lawn. They are a visualisation of
 * what the space becomes and must NEVER be captioned as an event that happened here.
 */
const VenuePage: React.FC = () => {
  useEffect(() => {
    setSeo({
      title: `Weddings & Conference Venue | ${RESORT.name}, George`,
      description:
        'A sea-view venue for weddings, conferences and functions up to 50 guests, on a private nature reserve near George. Your guests stay on the same property. Licensed bar, whales and dolphins from the deck.',
      url: '/venue',
    });
    window.scrollTo({ top: 0 });
  }, []);

  const imageFor = (key: string) => (IMAGES as Record<string, string>)[key];

  return (
    <div className="min-h-screen bg-[#F2ECDD] text-[#3A3A36] antialiased">
      <Navbar />

      <main>
        {/* Hero - lighter overlay than before, because the view is the thing being sold */}
        <section id="top" className="relative min-h-[72vh] flex items-center justify-center">
          <img
            src={IMAGES.venueCeremony}
            alt="Ceremony set up on the lawn above the ocean at Blue Whale Resort near George"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#163842]/55 via-[#163842]/35 to-[#163842]/75" />

          <div className="relative z-10 text-center px-5 max-w-3xl pt-24 pb-16">
            <span className="block text-[#F2ECDD]/85 tracking-[0.24em] uppercase text-[11px] mb-3">
              Weddings, Conferences &amp; Functions
            </span>
            <p className="font-script text-[#F2ECDD] text-5xl sm:text-6xl leading-none mb-2">
              Celebrate
            </p>
            <h1 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-3xl sm:text-4xl md:text-5xl mb-6">
              By The Ocean
            </h1>
            <p className="text-[#F2ECDD] leading-relaxed max-w-xl mx-auto mb-8">
              {VENUE.lead}
            </p>
            <a
              href="#venue-enquiry"
              className="inline-flex items-center gap-2 rounded-full bg-[#F2ECDD] px-8 py-4 text-[#1E4E5C] text-[13px] font-medium tracking-[0.16em] uppercase shadow-lg hover:bg-[#1E4E5C] hover:text-[#F2ECDD] transition-colors duration-300"
            >
              Enquire about your date
              <ArrowDown size={16} />
            </a>
          </div>
        </section>

        {/* The two routes - a couple and a company booker are afraid of different things */}
        <section className="py-20 md:py-28 bg-[#F2ECDD]">
          <div className="max-w-6xl mx-auto px-5">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="block text-[#6E93A6] tracking-[0.24em] uppercase text-[11px] mb-2">
                The Venue
              </span>
              <h2 className="font-serif text-[#1E4E5C] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl mb-6">
                One Place, Start To Finish
              </h2>
              <p className="text-[#3A3A36]/85 leading-relaxed">{VENUE.intro}</p>
            </div>

            <div className="space-y-14">
              {VENUE.routes.map((r, i) => (
                <div
                  key={r.key}
                  className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                    i % 2 === 1 ? 'md:[direction:rtl]' : ''
                  }`}
                >
                  <div className="md:[direction:ltr]">
                    <img
                      src={imageFor(r.image)}
                      alt={
                        r.key === 'weddings'
                          ? 'The venue lawn set for a ceremony above the ocean at Blue Whale Resort'
                          : 'The events venue at Blue Whale Resort on its lawn above the Indian Ocean'
                      }
                      loading="lazy"
                      className="w-full h-[280px] sm:h-[360px] object-cover rounded-[1.75rem] shadow-sm"
                    />
                  </div>

                  <div className="md:[direction:ltr]">
                    <span className="block text-[#6E93A6] tracking-[0.24em] uppercase text-[11px] mb-2">
                      {r.eyebrow}
                    </span>
                    <h3 className="font-serif text-[#1E4E5C] uppercase tracking-[0.04em] text-xl sm:text-2xl mb-4">
                      {r.title}
                    </h3>
                    <p className="text-[#3A3A36]/85 leading-relaxed mb-6 whitespace-pre-line">
                      {r.body}
                    </p>
                    <ul className="space-y-3">
                      {r.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[#3A3A36]/85 text-sm">
                          <Check size={18} className="shrink-0 mt-0.5 text-[#8A9A5B]" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The room, dressed. Styling stated plainly so nobody arrives expecting it. */}
        <section className="pb-20 md:pb-28 bg-[#F2ECDD]">
          <div className="max-w-6xl mx-auto px-5">
            <div className="rounded-[1.75rem] overflow-hidden shadow-sm">
              <img
                src={IMAGES.venueHallDressed}
                alt="The function room at Blue Whale Resort dressed for a celebration, with the coastline through the windows"
                loading="lazy"
                className="w-full h-[320px] sm:h-[460px] object-cover"
              />
            </div>
            <p className="text-center text-[#3A3A36]/60 text-xs leading-relaxed mt-4 max-w-xl mx-auto">
              {VENUE.stylingNote}
            </p>
          </div>
        </section>

        {/* The Numbers and What Comes With It came out on 21/09/2026 at the resort's
            request (Maritza, 17/09/2026: "take out the section about the numbers and
            what comes with it"). VENUE.capacity and VENUE.features are still in the
            data file for enquiry replies - do not put them back on the page. */}

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
