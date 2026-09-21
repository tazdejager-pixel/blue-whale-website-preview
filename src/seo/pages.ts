import { RESORT, STAYS, VENUE, SHARED_FEATURES, PHOTOS } from '@/data/resort';

/**
 * Everything a machine reads about this site, in one place.
 *
 * Used twice: `scripts/prerender.mjs` writes it into the HTML that the server sends,
 * and `lib/seo.ts` re-applies the same values on a client-side route change. If the
 * two ever disagree, the served HTML wins, because that is what a crawler sees.
 *
 * THE RULE ON THIS FILE (craft-schema, 12/09/2026): it states only what is true AND
 * visible on the page it describes. When the page copy changes, this changes in the
 * same commit. Specifically, and these have already caught us out here:
 *   - no nightly rate and no occupancy the resort has not confirmed (both were wrong
 *     on the first build and both came off on 04/09/2026)
 *   - no capacity figure for the venue: Maritza took the numbers off /venue on
 *     17/09/2026, so it is no longer visible and no longer belongs in the markup
 *   - no aggregateRating: the Tripadvisor aggregate came off the site on 21/09/2026
 *     and a rating with nothing to source it to is a claim we cannot back
 *   - no sameAs: the footer's social links are still placeholder profile URLs. The
 *     day they point at the resort's real Facebook and Instagram, add them here.
 *   - no street address, no opening hours, no geo: none of it is on the page.
 */

export const SITE_URL = 'https://www.bluewhale.co.za';

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export interface PageSeo {
  /** Route as the router knows it. */
  route: string;
  /** Path written into dist/ and the sitemap. */
  out: string;
  title: string;
  description: string;
  image: string;
  /** Sitemap priority. */
  priority: string;
}

export const PAGES: PageSeo[] = [
  {
    route: '/',
    out: 'index.html',
    title:
      'Blue Whale Resort | Sea-View Self-Catering Chalets & Wedding Venue, George - Garden Route',
    description:
      'Self-catering sea-view chalets and a wedding and conference venue in a private coastal nature reserve near George on the Garden Route. Whales and dolphins from your patio, a walkway down to the rocky shore, braai facilities and secure parking.',
    image: PHOTOS.chaletLounge.src,
    priority: '1.0',
  },
  {
    route: '/venue',
    out: 'venue/index.html',
    title: `Weddings & Conference Venue | ${RESORT.name}, George`,
    description:
      'A sea-view venue for weddings, conferences and functions on a private nature reserve near George. Your guests stay on the same property, the bar is licensed, and whales and dolphins pass below the deck in season.',
    image: PHOTOS.venueWedding.src,
    priority: '0.9',
  },
];

/** A Photo rendered as an ImageObject, so the alt text travels with the URL. */
const imageObject = (p: { src: string; width: number; height: number; alt: string }) => ({
  '@type': 'ImageObject',
  url: p.src,
  width: p.width,
  height: p.height,
  caption: p.alt,
});

/**
 * The site graph. Goes on every page; page graphs point back at it by @id.
 *
 * `Resort` rather than a plain `Organization` because that is what the business is,
 * and a lodging type is what an answer engine needs to place it. It carries no street
 * address and no opening hours, which is the part the visibility rule governs.
 */
export const siteGraph = () => [
  {
    '@type': 'Resort',
    '@id': ORG_ID,
    name: RESORT.name,
    url: `${SITE_URL}/`,
    description:
      'Self-catering sea-view chalets and a wedding and conference venue in a private coastal nature reserve near George on the Garden Route, South Africa.',
    slogan: RESORT.tagline,
    telephone: '+27797162548',
    email: RESORT.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'George',
      addressRegion: 'Western Cape',
      addressCountry: 'ZA',
    },
    areaServed: 'Garden Route, Western Cape, South Africa',
    currenciesAccepted: 'ZAR',
    amenityFeature: SHARED_FEATURES.map((f) => ({
      '@type': 'LocationFeatureSpecification',
      name: f.label,
      value: true,
    })),
    containsPlace: STAYS.map((s) => ({
      '@type': 'Accommodation',
      '@id': `${SITE_URL}/#${s.id}`,
      name: s.name,
      description: s.blurb,
      // "Sleeps 2-4" and "Sleeps 5-6" are on the page, in those words. The numbers
      // are the resort's own (they corrected ours on 04/09/2026).
      occupancy: {
        '@type': 'QuantitativeValue',
        minValue: Number(s.sleeps.replace(/\D+/g, '').slice(0, 1)),
        maxValue: Number(s.sleeps.replace(/\D+/g, '').slice(-1)),
        unitText: 'guests',
      },
      amenityFeature: s.features.map((f) => ({
        '@type': 'LocationFeatureSpecification',
        name: f,
        value: true,
      })),
      image: s.images.map((i) => i.src),
    })),
  },
  {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: RESORT.name,
    url: `${SITE_URL}/`,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-ZA',
  },
];

/** The graph for one page, site graph included. */
export const pageGraph = (page: PageSeo) => {
  const url = page.route === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.route}`;

  const webPage: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: imageObject(
      page.route === '/' ? PHOTOS.chaletLounge : PHOTOS.venueWedding,
    ),
    inLanguage: 'en-ZA',
  };

  if (page.route !== '/') {
    webPage.breadcrumb = { '@id': `${url}#breadcrumb` };
  }

  const graph: Record<string, unknown>[] = [...siteGraph(), webPage];

  if (page.route === '/venue') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Venue', item: url },
      ],
    });
    graph.push({
      '@type': 'EventVenue',
      '@id': `${url}#venue`,
      name: `${RESORT.name} events venue`,
      // The page's own opening paragraph, so the markup and the words agree.
      description: VENUE.intro,
      url,
      image: [PHOTOS.venueWedding.src, PHOTOS.venueExterior.src, PHOTOS.venueDeck.src],
      address: { '@type': 'PostalAddress', addressLocality: 'George', addressRegion: 'Western Cape', addressCountry: 'ZA' },
      amenityFeature: VENUE.features.map((f) => ({
        '@type': 'LocationFeatureSpecification',
        name: f,
        value: true,
      })),
      // containedInPlace, not isPartOf: EventVenue is a Place, and isPartOf is a
      // CreativeWork property. The checker caught this on 21/09/2026.
      containedInPlace: { '@id': ORG_ID },
    });
    (webPage as Record<string, unknown>).mainEntity = { '@id': `${url}#venue` };
  } else {
    (webPage as Record<string, unknown>).mainEntity = { '@id': ORG_ID };
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};

/**
 * `llms.txt`, a plain-text brief for an answer engine.
 *
 * It is a convention, not a standard, and no vendor promises to read it. It is here
 * because it costs one file and states the facts in the least ambiguous form there
 * is: no markup, no navigation, no styling to parse around. Everything in it is on
 * a page, for the same reason the schema is.
 */
export const llmsTxt = () => {
  const stay = (s: (typeof STAYS)[number]) =>
    [
      `### ${s.name}`,
      s.blurb,
      `- ${s.sleeps}`,
      `- ${s.view}`,
      ...s.features.map((f) => `- ${f}`),
    ].join('\n');

  return [
    `# ${RESORT.name}`,
    '',
    `> ${RESORT.tagline} ${RESORT.location}.`,
    '',
    'Self-catering sea-view chalets and a wedding and conference venue in a private',
    'coastal nature reserve near George on the Garden Route, South Africa. Whales pass',
    'in season and dolphins all year round. A wooden walkway runs from the fynbos down',
    'to the rocky shore.',
    '',
    '## Contact and booking',
    `- Website: ${SITE_URL}/`,
    `- Email: ${RESORT.email}`,
    `- Phone: ${RESORT.phone}`,
    `- Location: ${RESORT.location}`,
    '- Bookings are taken through the NightsBridge booking engine, linked from every',
    '  page as "Book Now". Enquiries go through the form on the home page.',
    '',
    '## Accommodation',
    '',
    STAYS.map(stay).join('\n\n'),
    '',
    '## Shared facilities',
    SHARED_FEATURES.map((f) => `- ${f.label}`).join('\n'),
    '',
    '## Things to do on the reserve',
    '- Whale and dolphin watching',
    '- Walkway to the rocky shore',
    '- Birdwatching in the fynbos',
    '- Stargazing from your deck',
    '',
    '## Events venue',
    VENUE.intro,
    '',
    VENUE.routes
      .map((r) => [`### ${r.eyebrow}: ${r.title}`, r.body, ...r.points.map((p) => `- ${p}`)].join('\n'))
      .join('\n\n'),
    '',
    VENUE.stylingNote,
    '',
    '## Not stated on this site, so do not infer it',
    '- Nightly rates. The resort quotes these directly; none are published.',
    '- Check-in and check-out times, and the pet policy.',
    '- Any guest rating or review count.',
    '',
    `Last updated: ${new Date().toISOString().slice(0, 10)}`,
    '',
  ].join('\n');
};
