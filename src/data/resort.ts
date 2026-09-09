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
  intro:
    'A distinctive ocean-view venue overlooking the Indian Ocean and surrounded by natural beauty - the perfect setting for weddings, conferences, year-end functions, family gatherings and private celebrations. With accommodation and spectacular scenery all in one place, your event becomes a seamless destination experience from start to finish.',
  perfectFor: [
    'Weddings',
    'Corporate conferences',
    'Team-building retreats',
    'Year-end functions',
    'Family reunions',
    'Birthday celebrations',
    'Private events & special occasions',
  ],
  features: [
    'Dedicated function & conference venue',
    'Licensed bar',
    'Ocean-view event space',
    'On-site accommodation for guests & delegates',
    'Flexibility to host intimate & larger gatherings',
  ],
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