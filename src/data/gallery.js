import { getWithFallback } from '../services/storage';

const STATIC_PHOTOS = [
  {
    cat: 'monarchy',
    title: 'HRM Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II)',
    date: 'Paramount Ruler of Remoland',
    desc: 'His Royal Majesty Oba Babatunde Adewale Ajayi — The Akarigbo & Paramount Ruler of Remoland, Chairman Ogun State Council of Traditional Rulers.',
    src: '/images/palace/akarigbo-king.jpg',
    credit: 'Wikimedia Commons / Royal Archives of Remoland',
    icon: '👑',
    bg: 'linear-gradient(135deg,#1e40af,#0f172a)'
  },
  {
    cat: 'palace',
    title: 'Aafin Akarigbo of Remo Palace, Sagamu, Ogun State',
    date: 'Paramount Sovereign Citadel',
    desc: 'The official palace complex of the Akarigbo of Remoland located at Ita Oba, Offin-Sagamu, administrative and cultural capital of Remoland.',
    src: '/images/palace/akarigbo-of-remo-palace.jpg',
    credit: 'Wikimedia Commons (File:Akarigbo_of_Remo_Palace,_Sagamu,_Ogun_state.jpg)',
    icon: '🏛️',
    bg: 'linear-gradient(135deg,#059669,#0f172a)'
  },
  {
    cat: 'palace',
    title: 'Aafin Akarigbo Ti Ile Remo Royal Compound',
    date: 'Ancestral Seat',
    desc: 'Historic palace grounds and durbar assembly courtyard of Aafin Akarigbo Ti Ile Remo at Ita Oba, Sagamu.',
    src: '/images/palace/aafin-akarigbo-ile-remo.jpg',
    credit: 'Wikimedia Commons (File:AAFIN_AKARIGBO_TI_ILE_REMO_Sagamu.jpg)',
    icon: '🏰',
    bg: 'linear-gradient(135deg,#1e3a8a,#059669)'
  },
  {
    cat: 'heritage',
    title: 'Akarigbo Palace Heritage Facade, Sagamu',
    date: 'Historic Monument',
    desc: 'The grand exterior architecture of the Akarigbo Palace in Sagamu, embodying over a century of sovereign confederate history uniting the 13 quarters.',
    src: '/images/palace/akarigbo-palace-heritage.jpg',
    credit: 'Wikimedia Commons (File:Akarigbo_palace,_Sagamu.jpg)',
    icon: '🏛️',
    bg: 'linear-gradient(135deg,#1e3a8a,#0f172a)'
  },
  {
    cat: 'sports',
    title: 'Gateway International Stadium, Sagamu, Ogun State',
    date: '20,000 Capacity Arena',
    desc: 'Exterior and arena of the Gateway International Stadium in GRA Sagamu, host of national tournaments and community sports festivals.',
    src: '/images/gateway-stadium-sagamu.jpg',
    credit: 'Wikimedia Commons (File:Gateway_International_Stadium,_Sagamu,_Ogun_state.jpg)',
    icon: '🏟️',
    bg: 'linear-gradient(135deg,#059669,#1e40af)'
  },
  {
    cat: 'faith',
    title: 'Sagamu Central Mosque at Ita Oba',
    date: 'Islamic Mother Sanctuary',
    desc: 'The grand central mosque of Sagamu, seat of the Chief Imam of Remoland and venue of historic Friday Jumaat and Eid celebrations.',
    src: '/images/sagamu-central-mosque.jpg',
    credit: 'Wikimedia Commons (File:SAGAMU_CENTRAL_MOSQUE.jpg)',
    icon: '🕌',
    bg: 'linear-gradient(135deg,#047857,#065f46)'
  },
  {
    cat: 'faith',
    title: 'Historic Cathedral of Sagamu',
    date: 'Christian Mission Heritage',
    desc: 'Iconic cathedral architecture serving the Sagamu community, fostering moral leadership and educational development.',
    src: '/images/sagamu-cathedral.jpg',
    credit: 'Wikimedia Commons (File:Catholic_Cathedral,_Sagamu.jpg)',
    icon: '⛪',
    bg: 'linear-gradient(135deg,#1e40af,#3b82f6)'
  },
  {
    cat: 'faith',
    title: 'Apostolic Faith Church, Sagamu',
    date: 'Sagamu Zonal Headquarters',
    desc: 'The Apostolic Faith Church (WECA) Sagamu Zonal Headquarters, a bastion of Christian worship, choral concerts, and community spiritual development.',
    src: '/images/sagamu-cathedral.jpg',
    credit: 'Apostolic Faith Church Sagamu Zone / WECA Archives',
    icon: '⛪',
    bg: 'linear-gradient(135deg,#059669,#1e40af)'
  },
  {
    cat: 'transit',
    title: 'Road Transportation & Commerce Hub in Sagamu',
    date: 'Transit Arteries',
    desc: 'Bustling commercial movement and transit connections along major Sagamu thoroughfares linking Lagos, Ibadan, and the Eastern expressway.',
    src: '/images/sagamu-transport-transit.jpg',
    credit: 'Wikimedia Commons (Wiki Loves Africa - Road Transportation in Sagamu)',
    icon: '🚌',
    bg: 'linear-gradient(135deg,#0f172a,#1e40af)'
  },
  {
    cat: 'landscape',
    title: 'Sunset over Araromi Quarter, Sagamu',
    date: 'Municipal Townscape',
    desc: 'Evening skyline and expanding residential communities across the Araromi district of Sagamu, Ogun State.',
    src: '/images/sagamu-araromi-sunset.jpg',
    credit: 'Wikimedia Commons (File:Sunset_in_developing_Araromi_in_Sagamu_Ogun_State.jpg)',
    icon: '🌅',
    bg: 'linear-gradient(135deg,#b45309,#78350f)'
  },
  {
    cat: 'industry',
    title: 'Lafarge Industrial Belt & Landscape, Sagamu',
    date: 'Industrial Keystone',
    desc: 'Greenery and surrounding topography of the historic Lafarge Elephant Cement industrial corridor in Sagamu.',
    src: '/images/sagamu-lafarge-belt.jpg',
    credit: 'Wikimedia Commons (File:A_picture_of_the_vegetation_at_Lafarge.jpg)',
    icon: '🏭',
    bg: 'linear-gradient(135deg,#166534,#059669)'
  },
  {
    cat: 'sagamu-day',
    title: 'Sagamu Day Grand Durbar & 13 Quarters Assembly',
    date: 'November Annual Celebration',
    desc: 'The 13 confederate quarters of Sagamu (Offin, Makun, Sonyindo, Epe, Ibido, Igbepa, Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, Ijagba) pay homage to the Akarigbo.',
    src: '/images/community-empowerment.jpg',
    credit: 'Sagamu Development Association (SDA)',
    icon: '🎉',
    bg: 'linear-gradient(135deg,#2563eb,#0f172a)'
  },
  {
    cat: 'development',
    title: 'Sagamu Youth STEM & Digital Innovation Bootcamp',
    date: 'Youth Tech Empowerment',
    desc: 'Empowering young indigenes across Offin, Makun, and Sonyindo with practical coding, robotics, and digital business skills.',
    src: '/images/news/youth-tech-bootcamp.jpg',
    credit: 'Sagamu Innovation & Tech Hub',
    icon: '💻',
    bg: 'linear-gradient(135deg,#1e3a8a,#059669)'
  },
  {
    cat: 'infrastructure',
    title: 'Sagamu Municipal Road Network & Drainage Construction',
    date: 'Urban Renewal Projects',
    desc: 'Active road paving, concrete stormwater canals, and solar street lighting across Sagamu quarter commercial roads.',
    src: '/images/news/yemogun-street-construction.jpg',
    credit: 'Ogun State Ministry of Works & Sagamu Local Government',
    icon: '🚧',
    bg: 'linear-gradient(135deg,#1e40af,#059669)'
  },
  {
    cat: 'health',
    title: 'Primary Healthcare Centers Solar Cold-Chain Upgrade',
    date: 'Public Health Care',
    desc: 'Solar-powered medical refrigeration and maternal healthcare clinics providing 24/7 care across Sagamu quarters.',
    src: '/images/news/health-centre-solar-upgrade.jpg',
    credit: 'Remo Health Initiative & Diaspora Support',
    icon: '🏥',
    bg: 'linear-gradient(135deg,#059669,#10b981)'
  },
  {
    cat: 'commerce',
    title: 'Sabo Commercial Hub & Hospitality Facilities',
    date: 'Interstate Commerce Hub',
    desc: 'The bustling trade networks of Sabo Kolanut Wholesale Exchange, hotels, and event centers serving visitors to Remoland.',
    src: '/images/news/hospitality-events-centre.jpg',
    credit: 'Sagamu Chamber of Commerce & Industry',
    icon: '🏢',
    bg: 'linear-gradient(135deg,#0f172a,#1e40af)'
  },
  {
    cat: 'civic',
    title: 'Sagamu Public Safety & Emergency Operations Command',
    date: 'Safety Infrastructure',
    desc: 'Emergency tactical command and traffic patrol posts stationed across the Sagamu interchange and commercial axes.',
    src: '/images/frsc-office-commissioning.jpg',
    credit: 'Sagamu Municipal Security Bureau',
    icon: '🛡️',
    bg: 'linear-gradient(135deg,#1e40af,#059669)'
  }
];

export const photos = getWithFallback('cms-gallery', STATIC_PHOTOS);

export const galleryCategories = [
  'all',
  'monarchy',
  'palace',
  'sports',
  'faith',
  'transit',
  'landscape',
  'industry',
  'sagamu-day',
  'heritage',
  'development',
  'infrastructure',
  'health',
  'commerce',
  'civic'
];
