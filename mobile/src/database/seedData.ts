export interface SeedNewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  isBreaking?: boolean;
  author: string;
}

export interface SeedKingItem {
  name: string;
  title: string;
  era: string;
  house: string;
  isCurrent: boolean;
  note: string;
  oriki?: string;
}

export interface SeedBusinessItem {
  id: string;
  name: string;
  category: string;
  tier: string;
  description: string;
  phone: string;
  address: string;
  rating: string;
}

export interface SeedEmergencyContact {
  id: string;
  service: string;
  phone: string;
  location: string;
  availableHours: string;
  icon: string;
}

export const SEED_NEWS: SeedNewsItem[] = [
  {
    id: 'news-01',
    title: 'HRM The Akarigbo Unveils ₦2.5B Sagamu Digital Innovation & Industrial Corridor',
    category: 'Infrastructure & Development',
    date: '2026-09-24',
    readTime: '3 min read',
    isBreaking: true,
    author: 'Palace Communications Bureau',
    summary: 'A new tech hub and agro-industrial corridor launched near the Gateway Agro-Cargo Airport.',
    content: `His Royal Majesty Oba Babatunde Adewale Ajayi, Torungbuwa II, CFR, Akarigbo and Paramount Ruler of Remoland, in partnership with private sector leaders, has unveiled the master plan for the Sagamu Digital Innovation and Agro-Industrial Park. Strategically located along the Interchange-Airport axis, the park is designed to create over 5,000 direct technology and manufacturing jobs for Sagamu youths while modernizing the local supply chain for agricultural and industrial goods.`
  },
  {
    id: 'news-02',
    title: 'OOUTH Sagamu Commissions Ultra-Modern Multi-Specialty Diagnostic Center',
    category: 'Health & Welfare',
    date: '2026-08-18',
    readTime: '4 min read',
    isBreaking: false,
    author: 'Medical Affairs Desk',
    summary: 'Olabisi Onabanjo University Teaching Hospital expands tertiary healthcare with MRI and cardiac catheterization laboratories.',
    content: `The Management of Olabisi Onabanjo University Teaching Hospital (OOUTH), Sagamu, has formally commissioned its state-of-the-art Advanced Diagnostic and Cardiac Wing. This multimillion-naira upgrade enhances tertiary trauma care, specialized neurological imaging, and cardiac monitoring for residents of Sagamu, Ogun State, and interstate transit passengers on the Lagos-Ibadan and Sagamu-Benin corridors.`
  },
  {
    id: 'news-03',
    title: 'Sabo Sagamu International Kolanut Market Adopts Digital Trade & E-Commerce Platform',
    category: 'Economy & Commerce',
    date: '2026-07-10',
    readTime: '4 min read',
    isBreaking: false,
    author: 'Commerce & Markets Desk',
    summary: 'West Africa\'s largest kolanut market partners with financial technology firms to streamline nationwide and international transactions.',
    content: `A historic transformation is underway at Sabo Market, Sagamu, as the Kolanut Traders Union officially inaugurated the digital wholesale matching and verified freight tracking network. For more than a century, Sabo has served as the undisputed heartbeat of the kolanut trade, linking South-West growers to northern Nigerian and Sahelian merchants. The new digital portal offers transparent pricing indices, escrow protections, and electronic freight waybills.`
  },
  {
    id: 'news-04',
    title: 'Sagamu Day 2026: Unity Torch Commences Tour Across All 13 Confederate Quarters',
    category: 'Culture & Heritage',
    date: '2026-06-01',
    readTime: '3 min read',
    isBreaking: false,
    author: 'Culture & Heritage Bureau',
    summary: 'The Sagamu Development Association begins countdown to the 41st Sagamu Day with cultural processions across federated towns.',
    content: `The Sagamu Development Association (SDA) has officially lit the Sagamu Day Unity Torch at the sacred grounds of Ita Oba, outside Aafin Akarigbo. The torch will journey through each of the 13 founding settlements—Offin, Makun, Sonyindo, Epe, Ibido, Igbepa, Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, and Ijagba—symbolizing unbroken brotherhood and solidarity since the 1872 confederation.`
  },
  {
    id: 'news-05',
    title: 'Gateway International Stadium Sagamu Completes Multi-Million Pitch and Facilities Upgrade',
    category: 'Sports & Youth',
    date: '2026-05-14',
    readTime: '3 min read',
    isBreaking: false,
    author: 'Sports & Youth Desk',
    summary: 'The 20,000-seater stadium undergoes comprehensive revitalization ahead of regional football championships.',
    content: `The Ogun State Sports Council in collaboration with the Sagamu Youth Sports Development Directorate has completed the turf re-grassing and modern tartan track resurfacing at the Gateway International Stadium, Sagamu. The stadium boasts digital LED floodlights, VAR-ready press booths, and renewed VIP lounges.`
  }
];

export const SEED_KINGS: SeedKingItem[] = [
  {
    name: 'Oba Babatunde Adewale Ajayi, CFR, FCA',
    title: 'Torungbuwa II',
    era: 'December 7, 2017 — Present',
    house: 'Torungbuwa Ruling House',
    isCurrent: true,
    note: 'The reigning Akarigbo and Paramount Ruler of Remoland. An accomplished Chartered Accountant, seasoned Barrister and Solicitor of the Supreme Court of Nigeria, and former Chairman of the Ogun State Council of Traditional Rulers.',
    oriki: 'Torungbuwa Keji, Ajayi Omo Oba l\'Eko, l\'Offin, ni Sagamu. Ogbomolehin ti n f\'owo ola to ilu ro. Akarigbo Olufiran, omo a bi owo nile. Kabiyeesi Baba wa Torungbuwa II!'
  },
  {
    name: 'Oba Dr. Michael Adeniyi Sonariwo, CON',
    title: 'Erinjugbo II',
    era: '1990 – July 23, 2016',
    house: 'Torungbuwa / Erinjugbo Ruling House',
    isCurrent: false,
    note: 'Reigned with exceptional majesty for 26 years. A distinguished chartered accountant and past Chairman of the Ogun State Council of Obas. Championed higher education, Sabo kolanut commerce, and industrial expansion.',
    oriki: 'Erinjugbo Omo Akarigbo, Oba to f\'ogbon joba. Omo Remo Metalelogbon, omo Alagbafo tii f\'omi tutu we. Didun ni iranti olododo.'
  },
  {
    name: 'Oba Moses Awolesi',
    title: 'Erinwole II',
    era: '1952 – 1988',
    house: 'Anoko Ruling House',
    isCurrent: false,
    note: 'Reigned for 36 prosperous years spanning Nigeria\'s independence era. Spearheaded the establishment of WAPCO Elephant Cement and Olabisi Onabanjo University Teaching Hospital (OOUTH).',
    oriki: 'Erinwole Oba nla, Omo agbejoro tii feje we, omo Awolesi tii so ibi d\'ire.'
  },
  {
    name: 'Oba William Christopher Adedoyin II',
    title: 'Akarigbo of Remoland',
    era: '1916 – 1952',
    house: 'Torungbuwa Ruling House',
    isCurrent: false,
    note: 'A titan of modern Yoruba monarchy whose 36-year reign revolutionized Remoland. Pioneered Western education and founded Remo Secondary School (RSS) in 1946.',
    oriki: 'Adedoyin Aladesanmi, Omo Akarigbo gbayi, omo a bi owo nile t\'owo tun wa l\'aafin.'
  },
  {
    name: 'Oba Igimisoje',
    title: 'The Founding Akarigbo of Sagamu',
    era: 'c. 1872 – 1880s',
    house: 'Anoko / Historical Patriarch',
    isCurrent: false,
    note: 'The heroic paramount ruler who led the historic confederation in 1872, uniting the 13 independent settlements onto Bammowu land near the Orisagamu Ewa stream.',
    oriki: 'Omo Igimisoje tii fidi pote mole, Alase to ko Remo jo sori oke Bammowu.'
  }
];

export const SEED_BUSINESSES: SeedBusinessItem[] = [
  {
    id: 'biz_hephzibah',
    name: 'Hephzibah Edutech & Innovation Hub',
    category: 'Technology & Education',
    tier: 'Premium',
    description: 'Digital innovation hub offering software engineering bootcamps, AI training, coding, and STEM certification in Sagamu Remo.',
    phone: '+234 803 892 0110',
    address: 'Innovation Campus, Palace Way / Expressway Axis, Sagamu',
    rating: '5.0★'
  },
  {
    id: 'biz1',
    name: 'Conference Hotel & Suites Sagamu',
    category: 'Hospitality & Tourism',
    tier: 'Premium',
    description: 'Premier luxury hotel with 100+ executive chalets, Olympic swimming pool, banquet halls, and international dining.',
    phone: '+234 805 000 0000',
    address: 'GRA Sagamu, Ogun State',
    rating: '4.6★'
  },
  {
    id: 'biz2',
    name: 'Sabo Kolanut International Traders Association',
    category: 'Trade & Export',
    tier: 'Premium',
    description: 'West Africa\'s premier wholesale kolanut exchange, connecting trans-Saharan and nationwide merchants with daily multi-ton trade auctions.',
    phone: '+234 704 957 0510',
    address: 'Sabo International Market, Sabo, Sagamu',
    rating: '4.7★'
  },
  {
    id: 'biz3',
    name: 'Remo Secondary School (RSS) (RSSOSA)',
    category: 'Education',
    tier: 'Standard',
    description: 'Flagship pioneer secondary school of Remoland (est. 1946), preserving academic excellence for eight decades.',
    phone: '+234 806 215 8840',
    address: 'Awomosu Agbato Drive, Sagamu 121107',
    rating: '4.8★'
  },
  {
    id: 'biz4',
    name: 'Lafarge Elephant Cement Sagamu Depot',
    category: 'Infrastructure & Manufacturing',
    tier: 'Premium',
    description: 'Direct distribution of certified Lafarge Elephant Cement (Classic 32.5 & Supaset 42.5R) and building aggregates.',
    phone: '+234 802 887 6655',
    address: 'Elephant Cement Works Way, Sagamu',
    rating: '4.8★'
  }
];

export const SEED_EMERGENCY: SeedEmergencyContact[] = [
  {
    id: 'em-1',
    service: 'Sagamu Police Area Command & Divisional HQ',
    phone: '08081762371',
    location: 'Ewusi Street / Akarigbo Road, Sagamu',
    availableHours: '24/7 Rapid Response',
    icon: 'ShieldAlert'
  },
  {
    id: 'em-2',
    service: 'OOUTH Tertiary Emergency Trauma Centre',
    phone: '08023456789',
    location: 'Hospital Road, OOUTH Complex, Sagamu',
    availableHours: '24 Hours Emergency Ward & Blood Bank',
    icon: 'Cross'
  },
  {
    id: 'em-3',
    service: 'FRSC Sagamu Corridor Command (RS2.2)',
    phone: '122',
    location: 'Sagamu Interchange, Lagos–Ibadan & Benin Expressway',
    availableHours: '24/7 Highway Rescue',
    icon: 'Ambulance'
  },
  {
    id: 'em-4',
    service: 'Aafin Akarigbo Royal Security Command',
    phone: '08029876543',
    location: 'Ita Oba, Offin, Sagamu Remo',
    availableHours: '24/7 Royal Security Guard',
    icon: 'Landmark'
  }
];
