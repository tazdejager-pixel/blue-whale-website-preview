// Single source of truth for all Blue Whale Resort content & config

// NightsBridge booking engine - the one place these are edited
export const NIGHTSBRIDGE_BBID = '17193';
export const BOOKING_URL = `https://book.nightsbridge.com/${NIGHTSBRIDGE_BBID}`;
// The on-page availability grid came out on 09/09/2026 at the resort's request -
// "we have the Book Now button linking through to NightsBridge, which is adequate."
// The admin panel still links the widget for their own use.
// Future room-specific booking link: bookingUrlFor('ROOM_TYPE_ID')
export const bookingUrlFor = (rtid?: string) =>
  rtid ? `${BOOKING_URL}?rtid=${rtid}` : BOOKING_URL;

export const RESORT = {
  name: 'Blue Whale Resort',
  tagline: 'Stay. Celebrate. Connect.',
  taglineSub: 'Experience the Garden Route from the edge of the ocean',
  location: 'A private coastal nature reserve near George, on the Garden Route, South Africa',
  phone: '+27 (0)79 716 2548',
  email: 'bookings@bluewhale.co.za',
  website: 'www.bluewhale.co.za',
  address: 'Blue Whale Resort, George, Western Cape, South Africa',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
};


// Tripadvisor guest reviews.
// The feed is rewritten by scripts/blue_whale_reviews.py and fetched at runtime,
// never bundled into the page source, which is what Tripadvisor's review
// implementation policy requires. robots.txt disallows /reviews/.
export const TRIPADVISOR = {
  locationId: 7734785,
  listingUrl:
    'https://www.tripadvisor.co.za/Hotel_Review-g312662-d7734785-Reviews-Blue_Whale_Resort-George_Western_Cape.html',
};
export const REVIEWS_FEED_URL = `${import.meta.env.BASE_URL}reviews/latest.json`;


// Google Maps embed of the George / Garden Route location (no API key needed)
export const MAP_EMBED =
  'https://www.google.com/maps?q=George%2C%20Western%20Cape%2C%20South%20Africa&output=embed';
export const MAP_LINK =
  'https://www.google.com/maps/search/?api=1&query=George%2C+Western+Cape%2C+South+Africa';


// Blue Whale brand logos + real resort photography (4K-enhanced from the resort's
// own photos), hosted on LAUNCHT storage. No Famous dependency.
const ASSETS = 'https://pntqrwahxmnarhonsjkq.supabase.co/storage/v1/object/public/deliverables/blue-whale';

export const LOGO_CREAM = `${ASSETS}/brand/logo-cream.png`;
export const LOGO_BLUE = `${ASSETS}/brand/logo-navy.png`;

export const IMAGES = {
  hero: `${ASSETS}/site/hero.jpg?v=3`,
  chalet: `${ASSETS}/site/chalet.jpg`,
  whaleHouse: `${ASSETS}/site/whaleHouse.jpg`,
  venue: `${ASSETS}/site/venue.jpg`,
  whale: `${ASSETS}/site/whale.jpg`,
  interior: `${ASSETS}/site/interior.jpg`,
  chaletPatio: `${ASSETS}/site/chaletPatio.jpg`,
  chaletDeck: `${ASSETS}/site/chaletPatio.jpg`,
  boardwalk: `${ASSETS}/site/boardwalk.jpg`,
  whaleHouseExt: `${ASSETS}/site/whaleHouseExt.jpg`,
  whaleHouseValley: `${ASSETS}/site/whaleHouseValley.jpg`,
  // Venue, dressed. The room and the lawn are theirs; the styling is a visualisation
  // of what the space becomes, not a photograph of an event that took place here.
  // Never caption either as a real wedding or a real conference.
  venueHallDressed: `${ASSETS}/site/venueHallDressed.jpg`,
  venueCeremony: `${ASSETS}/site/venueCeremony.jpg`,
};

// `href` starting with # scrolls within the home page; anything else is a route.
export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Accommodation', href: '#accommodation' },
  { label: 'Venue', href: '/venue' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Enquire', href: '#enquiry' },
  { label: 'Book Now', href: '#book' },
];


export interface Stay {
  id: string;
  name: string;
  signature?: boolean;
  view: string;
  suits: string;
  sleeps: string;
  blurb: string;
  images: string[];
  features: string[];
  fromPrice: string;
  bookUrl: string;
}

export const STAYS: Stay[] = [
  {
    id: 'ocean-view-chalets',
    name: 'Ocean-View Chalets',
    signature: true,
    view: 'Panoramic Indian Ocean views',
    suits: 'Couples, families & those who came for the view',
    sleeps: 'Sleeps 2-4',
    blurb:
      'Eight fully equipped self-catering chalets, each positioned to capture panoramic views of the Indian Ocean. Greet spectacular sunrises on your private patio, watch for whales in season and dolphins all year round, then follow the wooden boardwalk through indigenous fynbos to the ocean’s edge. This is our signature stay - here, the view is the whole point.',
    images: [IMAGES.chalet, IMAGES.chaletPatio, IMAGES.boardwalk],
    features: [
      'Panoramic Indian Ocean views',
      'Spectacular sunrises from your patio',
      'Seasonal whale & year-round dolphin sightings',
      'Boardwalk through fynbos to the sea',
      'Fully equipped self-catering kitchen',
      'Private patio with built-in braai',
    ],
    fromPrice: '',
    bookUrl: BOOKING_URL,
  },
  {
    id: 'whale-house',
    name: 'The Whale House',
    view: 'Tranquil valley & fynbos views',
    suits: 'Families wanting extra space and privacy',
    sleeps: 'Sleeps 5-6',
    blurb:
      'A spacious private retreat set back in the fynbos, with tranquil valley views. Room to spread out, and quiet enough to hear it. The Whale House is for families who want that little bit of extra space and privacy - your own corner of the reserve.',
    images: [IMAGES.whaleHouseExt, IMAGES.whaleHouse, IMAGES.whaleHouseValley],
    features: [
      'Spacious private family retreat',
      'Tranquil valley & fynbos views',
      'Fully equipped self-catering kitchen',
      'Private patio with built-in braai',
    ],
    fromPrice: '',
    bookUrl: BOOKING_URL,
  },
];

export interface SharedFeature {
  label: string;
  icon: string;
}

export const SHARED_FEATURES: SharedFeature[] = [
  { label: 'Peaceful setting within a private nature reserve', icon: 'TreePine' },
  { label: 'Private patios with built-in braai facilities', icon: 'Flame' },
  { label: 'Fully equipped self-catering', icon: 'UtensilsCrossed' },
  { label: 'Wi-Fi for staying connected', icon: 'Wifi' },
  { label: 'Secure parking', icon: 'Car' },
  { label: 'Stunning ocean & nature views', icon: 'Waves' },
];

export const WHY_CHOOSE = [
  {
    title: 'Uninterrupted Ocean Views',
    desc: 'Panoramic Indian Ocean views from a unique coastal location - the horizon goes on forever.',
  },
  {
    title: 'Space, Privacy & Serenity',
    desc: 'A peaceful nature-reserve environment, away from the crowds, where you can truly breathe.',
  },
  {
    title: 'Family & Group Friendly',
    desc: 'Ideal for family holidays, group getaways, weddings and corporate retreats alike.',
  },
  {
    title: 'Unspoilt Coastal Paradise',
    desc: 'Indigenous fynbos and pristine coastline, explored along our scenic wooden boardwalk.',
  },
];

export const EXPERIENCES = [
  'Whale & dolphin watching',
  'Walkway to the rocky shore',
  'Birdwatching in the fynbos',
  'Stargazing from your deck',
];

// Venue ("Celebrate by the Ocean")
export const VENUE = {
  // The differentiator, and the reason to lead with it: fifty people celebrate and then
  // sleep on the same property. Nobody drives home. Every other venue fact is secondary.
  lead:
    'One property, one weekend. Your fifty guests celebrate on the deck above the ocean, then walk to their chalet. No shuttle, no drive home, no ending the night early because someone has to get back to town.',
  intro:
    'An ocean-view venue on a private coastal nature reserve near George, with the accommodation on the same ten hectares. Whales and dolphins pass below the deck in season, the bar is licensed, and the whole property can be yours for the weekend.',

  // Two buyers, two decisions. The old page ran seven event types in one list, which read
  // as a hall for hire. These are the two routes worth building for.
  routes: [
    {
      key: 'weddings',
      eyebrow: 'Weddings',
      title: 'The Whole Weekend, Not Just The Day',
      body:
        'Say it on the lawn with the ocean behind you, move inside as the light goes, and let the evening run as long as it wants. Your guests are already home. The reserve is private, so the only people here are yours.',
      points: [
        'Ceremony on the lawn, reception inside, drinks on the deck',
        'Up to 50 guests, seated or standing',
        'Ten chalets and the Whale House on the property',
        'Licensed bar',
      ],
      image: 'venueCeremony',
    },
    {
      key: 'corporate',
      eyebrow: 'Conferences, retreats and year-end functions',
      title: 'Far Enough Away To Actually Switch Off',
      body:
        'A team that sleeps on site is a team that is still talking at nine in the evening. Meet with the ocean in the windows, walk the boardwalk down to the rocky shore between sessions, and eat together without anyone watching the clock for the drive back.',
      points: [
        'Ocean-view function and conference space',
        'Up to 50 delegates',
        'Accommodation for the group on the same property',
        'Ten hectares of private nature reserve to walk',
      ],
      image: 'venue',
    },
  ],

  // Facts we can stand behind. Anything not confirmed by the owners stays off the page.
  capacity: [
    { k: 'Seated', v: 'Up to 50' },
    { k: 'Standing', v: 'Up to 50' },
    { k: 'Sleeping on site', v: '10 chalets plus the Whale House' },
    { k: 'The reserve', v: '10 private hectares' },
  ],

  features: [
    'Dedicated function and conference venue',
    'Licensed bar',
    'Ocean-view event space and deck',
    'On-site accommodation for guests and delegates',
    'Exclusive use of the property by arrangement',
  ],

  // Said plainly, because a buyer who arrives expecting a dressed room is a buyer we lose.
  stylingNote:
    'Styling, florals and furniture are arranged separately. We can introduce you to suppliers who work here often.',
};

// Enquiry form interest options
export const INTERESTS = [
  { value: 'chalet', label: 'Ocean-View Chalet' },
  { value: 'whale-house', label: 'The Whale House' },
  { value: 'venue', label: 'Events Venue' },
  { value: 'not-sure', label: 'Not sure yet' },
];

// Event types for venue enquiries
export const EVENT_TYPES = [
  'Wedding',
  'Corporate conference',
  'Team-building retreat',
  'Year-end function',
  'Family reunion',
  'Birthday celebration',
  'Other private event',
];