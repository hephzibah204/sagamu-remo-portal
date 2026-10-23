import { getWithFallback } from '../services/storage';

const STATIC_PHOTOS = [
  {
    cat: 'monarchy',
    title: 'HRM Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II)',
    date: 'Paramount Ruler of Remoland',
    desc: 'His Royal Majesty Oba Babatunde Adewale Ajayi, CFR, FCA — The Akarigbo & Paramount Ruler of Remoland, Chairman of the Ogun State Council of Traditional Rulers.',
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
    cat: 'heritage',
    title: 'Akarigbo Palace Heritage Facade, Sagamu',
    date: 'Historic Monument',
    desc: 'The grand exterior architecture of the Akarigbo Palace in Sagamu, embodying over a century of sovereign confederate history uniting the 13 quarters.',
    src: '/images/palace/akarigbo-palace-heritage.jpg',
    credit: 'Wikimedia Commons (File:Akarigbo_palace,_Sagamu.jpg)',
    icon: '🏰',
    bg: 'linear-gradient(135deg,#1e3a8a,#0f172a)'
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
  'sagamu-day',
  'heritage',
  'development',
  'infrastructure',
  'health',
  'commerce',
  'civic'
];
