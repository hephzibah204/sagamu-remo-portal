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
    title: 'Ogun State Government Approves Rehabilitation of Yemogun Street in Sagamu',
    category: 'Infrastructure & Development',
    date: '2026-09-12',
    readTime: '3 min read',
    isBreaking: true,
    author: 'Ogun State Ministry of Works',
    summary: 'The 1.25km Yemogun road project officially commences to improve intra-city connectivity in Sagamu Remo.',
    content: `The Ogun State Executive Council has approved and commenced the complete rehabilitation of the 1.25km Yemogun Street in Sagamu Remo, Sagamu Local Government Area. This strategic infrastructure project aligns with Governor Dapo Abiodun's ongoing infrastructural drive across the state to boost local commerce, ease transportation of agricultural goods, and enhance the quality of life for all Sagamu residents. Construction equipment has been mobilized to the site.`
  },
  {
    id: 'news-02',
    title: 'High Chief Kesington Adebutu Sponsors Modern Recreation Centre at Panada, Sagamu',
    category: 'Community Welfare',
    date: '2026-08-31',
    readTime: '4 min read',
    isBreaking: false,
    author: 'Sagamu Development Council',
    summary: 'A new state-of-the-art civic recreation centre is currently under construction along Abeokuta Road.',
    content: `A monumental foundation-laying ceremony was held on August 31, 2026, for the new Sagamu Recreation Centre situated at Panada, along the Abeokuta Road axis. Fully sponsored by the esteemed philanthropist High Chief Kesington Adebutu, the center will feature modern sporting facilities, civic gathering halls, and youth empowerment hubs. This joins the ongoing renovations of the historic Sagamu Town Hall, marking a renaissance in community civic architecture.`
  },
  {
    id: 'news-03',
    title: 'State Relocates Major Kara Market Operations to Sagamu',
    category: 'Economy & Commerce',
    date: '2026-07-15',
    readTime: '4 min read',
    isBreaking: false,
    author: 'Sagamu Economic Development Desk',
    summary: 'The bustling Kara cattle and livestock market operations are being relocated to Sagamu Remo to boost regional trade.',
    content: `In a major economic policy shift, the Ogun State Government announced the relocation of the famous Kara Market to the Sagamu Remo industrial and logistics corridor. This strategic move is expected to exponentially increase commercial activities, create hundreds of direct and indirect jobs for local youth, and consolidate Sagamu's position as the premier logistics and trade nexus along the Lagos-Ibadan Expressway.`
  },
  {
    id: 'news-04',
    title: 'HRM Oba Babatunde Adewale Ajayi, CFR, FCA Commissioned Ultra-Modern Aafin Akarigbo Palace',
    category: 'Palace Proclamation',
    date: '2025-04-18',
    readTime: '4 min read',
    isBreaking: false,
    author: 'Royal Palace Media Secretariat',
    summary: 'A landmark achievement in Sagamu Remo modern history as the first permanent royal palace was officially dedicated.',
    content: `In a historic gathering of Remo monarchs, state dignitaries, and indigenes from around the world, His Royal Majesty Oba Babatunde Adewale Ajayi (Kankanbiina II, Ilufemiloye I, Arole Sagamu Founding Ancestors) formally commissioned the permanent Aafin Akarigbo Palace. The royal complex features council chambers for traditional chiefs, a modern civic reception auditorium, archival royal library, and administrative suites.`
  }
];

export const SEED_KINGS: SeedKingItem[] = [
  {
    name: 'Oba Babatunde Adewale Ajayi',
    title: 'Kankanbiina II Â· Ilufemiloye I Â· Arole Sagamu Founding Ancestors',
    era: 'April 25, 2023 â€” Present',
    house: 'Kankanbina / Ejigboye Ruling House',
    isCurrent: true,
    note: 'Currently reigning. Commissioned the Aafin Akarigbo Palace (2025), Sagamu Cultural Centre, and spearheaded modern community civic transformations.',
    oriki: 'Kabiyesi Akarigbo ti Sagamu Remo! Omo Sagamu Day agbeni madein, Arole Sagamu Founding Ancestors, Omo Sagamu mogbo, Sagamu ota, ni le onireke.'
  },
  {
    name: 'Oba Oladele Moshood Ogunbade',
    title: 'Agbejoye II',
    era: 'December 3, 1983 â€“ April 10, 2022',
    house: 'Agbejoye / Fadagbuwa Ruling House',
    isCurrent: false,
    note: 'Reigned for over 38 transformative years. Formerly Marketing Manager at Nigerian Tobacco Company (NTC). Oversaw major educational developments in Sagamu Remo.',
  },
  {
    name: 'Oba Alfred Obafuwa Babington-Ashaye',
    title: 'Legunsen III Â· Agbalajobi-Erinjogunola',
    era: 'c. 1945 â€“ December 4, 1982',
    house: 'Legunsen Ruling House',
    isCurrent: false,
    note: 'Patriarchal and revered monarch who reigned for 37 years. Received full state honours and led community consolidation across post-independence Nigeria.',
    oriki: 'Agbalajobi-Erinjogunola, Omo Otunbade, Oba nla to n gbadobale Oba. Omo Sagamu Day agbeni madein, Omo Sagamu mogbo, Sagamu ota.'
  },
  {
    name: 'Oba Adelana Osifayo',
    title: 'Legunsen I',
    era: 'c. 1880s',
    house: 'Legunsen Ruling House',
    isCurrent: false,
    note: 'The founding The Akarigbo of Remoland upon the formal establishment and fortification of the town following the historic Yoruba Wars.',
  }
];

export const SEED_BUSINESSES: SeedBusinessItem[] = [
  {
    id: 'biz_hephzibah',
    name: 'Hephzibah Edutech & Innovation Hub',
    category: 'Technology & Education',
    tier: 'Premium',
    description: 'Digital innovation hub offering software bootcamps, AI training, coding, and STEM certification in Sagamu Remo.',
    phone: '+234 803 892 0110',
    address: 'Innovation Campus, Palace Way / Expressway Axis, Sagamu',
    rating: '5.0â˜…'
  },
  {
    id: 'biz1',
    name: 'Sagamu Resort & Convention Centre',
    category: 'Hospitality & Tourism',
    tier: 'Premium',
    description: 'Premier retreat destination with 140+ luxury chalets, recreational pools, and conference auditoriums.',
    phone: '+234 906 247 0474',
    address: 'KM 67, Lagosâ€“Ibadan Expressway, Sagamu Remo',
    rating: '4.4â˜…'
  },
  {
    id: 'biz2',
    name: 'Remo Secondary School (RSS) (RSSOSA)',
    category: 'Education',
    tier: 'Standard',
    description: 'Flagship secondary educational institution of Sagamu Remo, preserving academic excellence.',
    phone: '+234 806 215 8840',
    address: 'Awomosu Agbato Drive, Sagamu 121107',
    rating: '4.8â˜…'
  },
  {
    id: 'biz3',
    name: 'Sagamu Central Agro-Allied Logistics',
    category: 'Agriculture & Trade',
    tier: 'Verified',
    description: 'Wholesale agricultural farm produce distribution, poultry processing, and haulage services.',
    phone: '+234 802 334 9911',
    address: 'Oke-Sagamu Market Complex, Sagamu',
    rating: '4.7â˜…'
  }
];

export const SEED_EMERGENCY: SeedEmergencyContact[] = [
  {
    id: 'em-1',
    service: 'Sagamu Police Divisional Headquarters',
    phone: '08034567890',
    location: 'Palace Way, Sagamu Remo',
    availableHours: '24/7 Rapid Response',
    icon: 'ShieldAlert'
  },
  {
    id: 'em-2',
    service: 'FRSC Expressway Patrol Unit (RS2.2)',
    phone: '122',
    location: 'KM 66 Lagosâ€“Ibadan Expressway, Sagamu Outpost',
    availableHours: '24/7 Highway Rescue',
    icon: 'Ambulance'
  },
  {
    id: 'em-3',
    service: 'Sagamu Comprehensive Primary Health Centre',
    phone: '08123456781',
    location: 'Isale-Sagamu Hospital Road',
    availableHours: '24 Hours Emergency Ward',
    icon: 'Cross'
  },
  {
    id: 'em-4',
    service: 'Palace of the Akarigbo Emergency Secretariat',
    phone: '08023456789',
    location: 'Aafin Akarigbo, Sagamu Remo',
    availableHours: '8:00 AM â€” 8:00 PM',
    icon: 'Landmark'
  }
];
