import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBookBar from '@/components/MobileBookBar';
import VenueEnquiry from '@/components/VenueEnquiry';
import { PHOTOS, VENUE } from '@/data/resort';
import Img from '@/components/Img';
import { setSeo } from '@/lib/seo';
import { PAGES } from '@/seo/pages';
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
 * 21/09/2026: the four venue photographs the resort sent on 04/09 replaced the two
 * dressed images from 10/09, on Tarryn's instruction, with the wedding photo leading.
 *
 * Three of the four are the REAL room, deck and lawn with styling and people added.
 * They are a visualisation of what the space becomes and must NEVER be captioned as
 * an event that happened here. The AI-invented signage and on-screen wording in two of
 * them was blurred out before upload; see the note on PHOTOS in data/resort.ts.
 */
const VenuePage: React.FC = () => {
  useEffect(() => {
    // Same title and description the prerender put in the served HTML, so a
    // client-side navigation cannot leave the head saying something different.
    // It also stops this copy drifting: it said "up to 50 guests" until 21/09/2026,
    // months after the capacity came off the page.
    const seo = PAGES.find((p) => p.route === '/venue')!;
    setSeo({ title: seo.title, description: seo.description, image: seo.image, url: '/venue' });
    window.scrollTo({ top: 0 });
  }, []);

  const imageFor = (key: string) => (PHOTOS as Record<string, typeof PHOTOS.venueDeck>)[key];

  return (
    <div className="min-h-screen bg-[#F2ECDD] text-[#2E2A25] antialiased">
      <Navbar />

      <main>
        {/* Hero - lighter overlay than before, because the view is the thing being sold */}
        <section id="top" className="relative min-h-[72vh] flex items-center justify-center">
          <img
            src={PHOTOS.venueWedding.src}
            srcSet={PHOTOS.venueWedding.srcSet}
            sizes="100vw"
            width={PHOTOS.venueWedding.width}
            height={PHOTOS.venueWedding.height}
            alt={PHOTOS.venueWedding.alt}
            fetchpriority="high"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#112E36]/55 via-[#112E36]/35 to-[#112E36]/75" />

          <div className="relative z-10 text-center px-5 max-w-3xl pt-24 pb-16">
            {/* The h1 says what the page is, not just how it feels (21/09/2026).
                It read "By The Ocean", which tells a search engine and an answer
                engine nothing, with "Weddings, Conferences & Functions" sitting
                above it in a decorative span that no heading level could see. The
                eyebrow is gone and its words are in the heading instead. */}
            <p className="font-script text-[#F2ECDD] text-5xl sm:text-6xl leading-none mb-2">
              Celebrate
            </p>
            <h1 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-3xl sm:text-4xl md:text-5xl mb-6 max-w-2xl mx-auto leading-[1.15]">
              A Wedding &amp; Conference Venue By The Ocean
            </h1>
            <p className="text-[#F2ECDD] leading-relaxed max-w-xl mx-auto mb-8">
              {VENUE.lead}
            </p>
            <a
              href="#venue-enquiry"
              className="inline-flex items-center gap-2 rounded-full bg-[#F2ECDD] px-8 py-4 text-[#17414D] text-[13px] font-medium tracking-[0.16em] uppercase shadow-lg hover:bg-[#17414D] hover:text-[#F2ECDD] transition-colors duration-300"
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
              <span className="block text-[#456C80] tracking-[0.24em] uppercase text-[11px] mb-2">
                The Venue
              </span>
              <h2 className="font-serif text-[#17414D] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl mb-6">
                One Place, Start To Finish
              </h2>
              <p className="text-[#2E2A25]/95 leading-relaxed">{VENUE.intro}</p>
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
                    <Img
                      photo={imageFor(r.image)}
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="w-full h-[280px] sm:h-[360px] object-cover rounded-[1.75rem] shadow-sm"
                    />
                  </div>

                  <div className="md:[direction:ltr]">
                    <span className="block text-[#456C80] tracking-[0.24em] uppercase text-[11px] mb-2">
                      {r.eyebrow}
                    </span>
                    <h3 className="font-serif text-[#17414D] uppercase tracking-[0.04em] text-xl sm:text-2xl mb-4">
                      {r.title}
                    </h3>
                    <p className="text-[#2E2A25]/95 leading-relaxed mb-6 whitespace-pre-line">
                      {r.body}
                    </p>
                    <ul className="space-y-3">
                      {r.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-[#2E2A25]/95 text-sm">
                          <Check size={18} className="shrink-0 mt-0.5 text-[#5F6E39]" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The venue itself, on its lawn above the sea. A real photograph, and the
            honest counterweight to the three dressed ones above it. */}
        <section className="pb-20 md:pb-28 bg-[#F2ECDD]">
          <div className="max-w-6xl mx-auto px-5">
            <div className="rounded-[1.75rem] overflow-hidden shadow-sm">
              <Img
                photo={PHOTOS.venueExterior}
                sizes="(min-width: 1024px) 1100px, 100vw"
                className="w-full h-[320px] sm:h-[460px] object-cover"
              />
            </div>
            <p className="text-center text-[#2E2A25]/75 text-xs leading-relaxed mt-4 max-w-xl mx-auto">
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
            src={PHOTOS.boardwalk.src}
            srcSet={PHOTOS.boardwalk.srcSet}
            sizes="100vw"
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#112E36]/85" />

          <div className="relative z-10 max-w-2xl mx-auto px-5">
            <div className="text-center mb-8">
              <span className="block text-[#F2ECDD]/85 tracking-[0.24em] uppercase text-[11px] mb-2">
                Enquire
              </span>
              <h2 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-2xl sm:text-3xl mb-3">
                Tell Us About Your Day
              </h2>
              <p className="text-[#F2ECDD]/90 text-sm leading-relaxed">
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
