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


// Guest reviews.
//
// 21/09/2026: the Tripadvisor feed, branding and links came off the site (Tarryn).
// The words below are REAL guests, carried over verbatim from the resort's own
// published review widget - nothing here is written by us and nothing is invented.
// Trimmed at a full stop where a review ran long, and corrected only for obvious
// typos ("a awesome" -> "an awesome"). The display name is the guest's own published
// handle read back to a name.
//
// RULES FOR THIS LIST:
//  - Never add a review the resort has not actually received.
//  - Never rewrite one to sound better. Trim with a full stop, or leave it out.
//  - No star rating and no review total on the page: that is an aggregate claim and
//    it needs a source, which is the thing we just removed.
export interface Review {
  quote: string;
  author: string;
  when: string;
  stay: string;
}

export const REVIEWS: Review[] = [
  {
    quote:
      'This unit exceeded our expectations by far. The view is breathtaking and to have the privilege of seeing a big school of dolphins going past 3 times in 1 morning was awesome. The unit is well equipped and staff friendly.',
    author: 'Annarie',
    when: 'December 2021',
    stay: 'Sea-View Chalet',
  },
  {
    quote:
      'What a fabulous stay at Blue Whale Resort. We were a group of friends that booked all 8 sea facing chalets. Such stunning units with comfortable beds and amazing views. Would highly recommend and would definitely go back.',
    author: 'Judy',
    when: 'October 2022',
    stay: 'A group of friends',
  },
  {
    quote:
      'If you are looking for a place that is private, never runs out of fire wood, sea views and friendly staff, this is the place for you. We stayed a week and we will definitely return in the near future.',
    author: 'Martin',
    when: 'December 2021',
    stay: 'Honeymoon',
  },
  {
    quote:
      'Fantastic private neat place to stay with the most beautiful scenery of the ocean. Very friendly and helpful hosts that make you feel at home. A place where you can find your soul again. Will definitely visit again.',
    author: 'Sandra',
    when: 'February 2022',
    stay: 'Sea-View Chalet',
  },
  {
    quote:
      'Beautiful place, very quiet and peaceful. Views are stunning. Situated right on the rocks, the sound of the sea makes you sleep like a baby. Excellent fishing spots. Overall a very nice spot to relax and take in the beautiful views.',
    author: 'Dustin',
    when: 'March 2022',
    stay: 'Sea-View Chalet',
  },
  {
    quote:
      'Beautiful clean and neat accommodation with an awesome view of the ocean. Everything was there that was needed to ensure a comfortable stay. Enjoyed the relaxing atmosphere and the walk down to the ocean.',
    author: 'R. Metelerkamp',
    when: 'May 2022',
    stay: 'Sea-View Chalet',
  },
  {
    quote:
      'It was a great place to enjoy the holiday with family. Nice sea view. Value for the money. Rooms were very neat and spacious. You can wake up to a beautiful morning with mountain view as well as sea view.',
    author: 'Sadanand',
    when: 'October 2022',
    stay: 'Family stay',
  },
  {
    quote:
      'Really has everything going for it. The place is off the beaten track, quiet, views are fantastic, chalets are clean. A great spot to get away.',
    author: 'Brian',
    when: 'April 2022',
    stay: 'Sea-View Chalet',
  },
  {
    quote:
      'Great views. Clean and roomy. Well equipped. A huge rain spider kept us company but left us in peace. After all, it is and was his home, so we let it be.',
    author: 'Johan',
    when: 'October 2022',
    stay: 'Sea-View Chalet',
  },
];


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


// ---------------------------------------------------------------------------
// The resort's own photographs, 21/09/2026.
//
// Everything a visitor sees on a room, the venue or the view is now a photo the
// resort supplied on 04/09 and 17/09, placed where Tarryn said it goes. The first
// build's chalet, interior, whaleHouse*, venue, whale and dressed-venue images all
// came off in the same pass at her instruction ("for the rooms remove all the ones
// we have"). They still exist under site/ in storage; nothing points at them.
//
// Each file is WebP at three widths - `scripts/blue_whale_optimise_images.py` builds
// and uploads them, and it is the only thing that writes to site/v2/. 42 MB of
// originals became 7 MB.
//
// TWO OF THE VENUE IMAGES ARE DRESSED VISUALISATIONS, not a record of an event that
// happened here: `venueWedding` and `venueConference` are the real hall with styling
// and people added. Their AI-invented on-screen and signage wording was blurred out
// before upload (`inputs/2026-09-21-signage-removed/`). `venueDeck` is the real deck
// with guests added. Never caption any of the three as a real wedding or conference.
// ---------------------------------------------------------------------------
const V2 = `${ASSETS}/site/v2`;

export interface Photo {
  /** Largest rendition, and the plain `src` for anything that ignores srcSet. */
  src: string;
  srcSet: string;
  /** Intrinsic size of the largest rendition, so the browser reserves the box. */
  width: number;
  height: number;
  alt: string;
}

const photo = (base: string, widths: number[], w: number, h: number, alt: string): Photo => ({
  src: `${V2}/${base}-${widths[widths.length - 1]}.webp`,
  srcSet: widths.map((x) => `${V2}/${base}-${x}.webp ${x}w`).join(', '),
  width: w,
  height: h,
  alt,
});

// Alt text describes what is actually in the frame, for a person using a screen
// reader and for an image search. Never the brand name on its own.
export const PHOTOS = {
  // The two photographs kept from the first build. The aerial is the home page hero
  // and the largest image on the site, so it carries a 2200px rendition.
  heroAerial: photo('hero-aerial', [640, 1024, 1600, 2200], 2200, 1236,
    'Blue Whale Resort from the air: chalets along a private coastal reserve above the Indian Ocean near George'),
  boardwalk: photo('boardwalk', [640, 1024, 1600, 1700], 1700, 1275,
    'The wooden boardwalk running through fynbos towards the sea at Blue Whale Resort'),

  // The View
  viewBoardwalk: photo('view-boardwalk', [640, 1024, 1448], 1448, 1086,
    'The wooden walkway at Blue Whale Resort leading down through fynbos to the rocky shore, with surf breaking over the rocks'),
  viewGate: photo('view-gate', [640, 1024, 1347], 1347, 1168,
    'The timber and brick entrance gate to Blue Whale Resort, with the Indian Ocean beyond'),
  viewSunbird: photo('view-sunbird', [640, 1024, 1170], 1170, 878,
    'A sunbird feeding on a yellow vygie flower in the fynbos at Blue Whale Resort'),
  viewFledgling: photo('view-fledgling', [640, 1024, 1100], 1100, 878,
    'A mousebird fledgling perched in the indigenous fynbos on the reserve'),

  // Sea-View Chalets
  chaletLounge: photo('chalet-lounge', [640, 1024, 1600], 1600, 723,
    'The lounge of a sea-view chalet at Blue Whale Resort opening onto a covered patio with a dining table above the ocean'),
  chaletExterior: photo('chalet-exterior', [640, 1024, 1247], 1247, 878,
    'Sea-view chalets at Blue Whale Resort on the fynbos hillside at dusk'),
  chaletCoastline: photo('chalet-coastline', [640, 1024, 1170], 1170, 878,
    'The coastline below Blue Whale Resort, with surf breaking against the rocks and aloes in the foreground'),
  chaletPatioBraai: photo('chalet-patio-braai', [640, 1024, 1448], 1448, 1086,
    'A covered chalet patio at Blue Whale Resort with a built-in braai alight, a long table laid for dinner and the sea beyond'),
  chaletBedroom: photo('chalet-bedroom', [640, 1024, 1448], 1448, 1086,
    'A chalet bedroom at Blue Whale Resort with a double bed and a wide window looking straight out over the ocean'),

  // The Whale House
  whaleHouseTwinRoom: photo('whalehouse-twin-room', [640, 1024, 1448], 1448, 1086,
    'A bedroom in the Whale House at Blue Whale Resort with a double and a single bed and a window onto the sea'),
  whaleHouseDining: photo('whalehouse-dining', [640, 1024, 1448], 1448, 1086,
    'The Whale House dining table set at an open window above the fynbos and the coastline'),
  whaleHouseKitchen: photo('whalehouse-kitchen', [640, 1024, 1448], 1448, 1086,
    'The fully equipped self-catering kitchen in the Whale House, with the indoor braai through the doorway'),
  whaleHouseMainBedroom: photo('whalehouse-main-bedroom', [640, 1024, 1448], 1448, 1086,
    'The main bedroom of the Whale House, with a king bed under a timber beam'),
  whaleHouseLawn: photo('whalehouse-lawn', [640, 1024, 1600], 1600, 1200,
    'The lawn and braai area outside the Whale House, with palms and the Indian Ocean behind'),
  whaleHouseExterior: photo('whalehouse-exterior', [640, 1024, 1600], 1600, 1200,
    'The Whale House at Blue Whale Resort, a double-storey timber house on the lawn'),

  // Venue
  venueWedding: photo('venue-wedding', [640, 1024, 1448], 1448, 1086,
    'The function room at Blue Whale Resort dressed for a wedding reception, with round tables, candles and fairy lights'),
  venueDeck: photo('venue-deck', [640, 1024, 1536], 1536, 1024,
    'The venue deck at Blue Whale Resort set for a drinks reception above the coastline at golden hour'),
  venueConference: photo('venue-conference', [640, 1024, 1536], 1536, 1024,
    'The function room at Blue Whale Resort laid out for a conference, with round tables, a screen and the hills through the windows'),
  venueExterior: photo('venue-exterior', [640, 1024, 1600], 1600, 900,
    'The events venue at Blue Whale Resort on its lawn, with the Indian Ocean and the coastline beside it'),
  venueWalkway: photo('venue-walkway', [640, 1024, 1600], 1600, 1200,
    'The walkway down to the rocky shore at Blue Whale Resort, with the coastline running away to the headland'),
};

// `href` starting with # scrolls within the home page; anything else is a route.
// Book Now is NOT in here - the header carries its own button and having both put
// the same call to action in the nav twice (client, 10/09/2026).
export const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Accommodation', href: '#accommodation' },
  { label: 'Venue', href: '/venue' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Enquire', href: '#enquiry' },
];


export interface Stay {
  id: string;
  name: string;
  signature?: boolean;
  view: string;
  suits: string;
  sleeps: string;
  blurb: string;
  images: Photo[];
  features: string[];
  fromPrice: string;
  bookUrl: string;
}

export const STAYS: Stay[] = [
  {
    id: 'sea-view-chalets',
    name: 'Sea-View Chalets',
    signature: true,
    view: 'Panoramic sea views',
    suits: 'Couples, families & those who came for the view',
    sleeps: 'Sleeps 2-4',
    blurb:
      'Eight fully equipped self-catering chalets, each positioned to capture panoramic views of the Indian Ocean. Greet spectacular sunrises on your private patio, watch for whales in season and dolphins all year round, then follow the wooden boardwalk through indigenous fynbos to the ocean’s edge. This is our signature stay - here, the view is the whole point.',
    // Order set by Tarryn 21/09/2026: the lounge leads.
    images: [
      PHOTOS.chaletLounge,
      PHOTOS.chaletExterior,
      PHOTOS.chaletCoastline,
      PHOTOS.chaletPatioBraai,
      PHOTOS.chaletBedroom,
    ],
    features: [
      'Panoramic sea views',
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
    // 21/09/2026: this said "with tranquil valley views" and nothing else, which the
    // resort's own photographs contradict - three of the six show open ocean from the
    // bedroom, the dining table and the lawn. The badge and the feature list still say
    // "Tranquil valley & fynbos views" because that is Maritza's own wording, approved
    // on 04/09/2026, and only she can change it. Open question for the resort: should
    // the Whale House be sold on its sea view as well?
    blurb:
      'A spacious private retreat set back in the fynbos, with the valley on one side and the ocean on the other. Room to spread out, and quiet enough to hear it. The Whale House is for families who want that little bit of extra space and privacy - your own corner of the reserve.',
    // Order set by Tarryn 21/09/2026: the twin room leads.
    images: [
      PHOTOS.whaleHouseTwinRoom,
      PHOTOS.whaleHouseDining,
      PHOTOS.whaleHouseKitchen,
      PHOTOS.whaleHouseMainBedroom,
      PHOTOS.whaleHouseLawn,
      PHOTOS.whaleHouseExterior,
    ],
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
  { label: 'Stunning sea & nature views', icon: 'Waves' },
];

export const WHY_CHOOSE = [
  {
    title: 'Uninterrupted Sea Views',
    desc: 'Panoramic sea views from a unique coastal location - the horizon goes on forever.',
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

  // The home page band uses the resort's OWN words, supplied by Maritza 17/09/2026.
  // The /venue hero keeps `lead` above, because she asked for the venue page intro
  // to stay as it was. Do not merge the two.
  homeLead:
    'The venue is perfect for your wedding, conference, or year-end function. Surrounded by indigenous fynbos, our facility boasts beautiful sea views from which whales and dolphins can be seen. We offer convenient on-site accommodation for your guests, and we are fully licensed to serve alcohol.',
  intro:
    'A sea-view venue on a private coastal nature reserve near George, with the accommodation on the same ten hectares. Whales and dolphins pass below the deck in season, the bar is licensed, and the whole property can be yours for the weekend.',

  // Two buyers, two decisions. The old page ran seven event types in one list, which read
  // as a hall for hire. These are the two routes worth building for.
  routes: [
    {
      key: 'weddings',
      eyebrow: 'Weddings',
      title: 'The Whole Weekend, Not Just The Day',
      // The resort's own words, supplied by Maritza 17/09/2026. Her em dashes are
      // hyphens here, which is the only change made to them.
      body:
        'Celebrate with the ocean as your backdrop, move effortlessly from day into evening, and let the celebrations continue for as long as you like. With accommodation right here on the property, your guests are already home.\n\nThe reserve is private, giving you the space to relax, celebrate and enjoy the weekend together - without having to worry about travelling between venues.',
      points: [
        'Ceremony, reception and celebrations all on the property',
        'Accommodation available on site',
        'Private setting exclusively for your group',
        'Licensed bar',
      ],
      image: 'venueDeck',
    },
    {
      key: 'corporate',
      eyebrow: 'Conferences, retreats and year-end functions',
      title: 'Far Enough Away To Actually Switch Off',
      // The resort's own words, supplied by Maritza 17/09/2026.
      body:
        'Step away from the office and into a setting where your team can truly disconnect. Meet with the ocean in the windows, take a walk down to the rocky shore between sessions, and enjoy meals together without anyone watching the clock for the drive home.\n\nWith comfortable accommodation available on the same property, your team can stay, connect and make the most of the experience - all in one place.',
      points: [
        'Sea-view function and conference space',
        'Accommodation available on the property',
        'Private nature reserve to explore and unwind',
        'Space to meet, connect and relax away from the office',
      ],
      image: 'venueConference',
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
    'Sea-view event space and deck',
    'On-site accommodation for guests and delegates',
    'Exclusive use of the property by arrangement',
  ],

  // Said plainly, because a buyer who arrives expecting a dressed room is a buyer we lose.
  stylingNote:
    'Styling, florals and furniture are arranged separately. We can introduce you to suppliers who work here often.',
};

// Enquiry form interest options
export const INTERESTS = [
  { value: 'chalet', label: 'Sea-View Chalet' },
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