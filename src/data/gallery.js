import { getWithFallback } from '../services/storage';

const STATIC_PHOTOS = [
  {
    cat: 'palace',
    title: 'Aafin Akarigbo Palace Complex at Ita Oba',
    date: 'Paramount Seat',
    desc: 'The monumental Aafin Akarigbo Palace complex at Ita Oba, Offin-Sagamu, the official seat of HRM Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II), Paramount Ruler of Remoland.',
    src: '/images/palace/1.jpg',
    credit: 'Aafin Akarigbo Royal Media Unit',
    icon: '🏛️',
    bg: 'linear-gradient(135deg,#1e40af,#0f172a)'
  },
  {
    cat: 'coronation',
    title: 'Royal Throne & Sceptre of The Akarigbo of Remoland',
    date: 'Sovereign Heritage',
    desc: 'The sacred royal throne, ceremonial staff, and beaded crown of the Torungbuwa Dynasty, sovereign spiritual symbol of all 33 towns across Remoland.',
    src: '/images/palace/2.jpg',
    credit: 'Remo Royal Council Archives',
    icon: '👑',
    bg: 'linear-gradient(135deg,#059669,#0f172a)'
  },
  {
    cat: 'palace',
    title: 'Aafin Akarigbo Grand Heritage Hall & Courtyard',
    date: 'Royal Architecture',
    desc: 'The modern ceremonial reception hall and ancestral courtyard of the Akarigbo Palace, where royal durbars and chieftaincy investitures are hosted.',
    src: '/images/palace/5.jpg',
    credit: 'Sagamu Royal Media',
    icon: '🏰',
    bg: 'linear-gradient(135deg,#1e3a8a,#0f172a)'
  },
  {
    cat: 'sagamu-day',
    title: 'Sagamu Day Grand Durbar & 13 Quarters Procession',
    date: 'November Annual',
    desc: 'The 13 confederate quarters of Sagamu (Offin, Makun, Sonyindo, Epe, Ibido, Igbepa, Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, Ijagba) gather in festive unity.',
    src: '/images/community-empowerment.jpg',
    credit: 'Sagamu Development Association (SDA)',
    icon: '🎉',
    bg: 'linear-gradient(135deg,#2563eb,#0f172a)'
  },
  {
    cat: 'heritage',
    title: 'Remo Secondary School (RSS) — Pioneer Academy',
    date: 'Est. 1946 · Akarigbo St',
    desc: 'The historic grounds of Remo Secondary School (RSS) along Akarigbo Street, founded in 1946 as the first secondary school in Remoland.',
    src: '/images/palace/3.jpg',
    credit: 'RSSOSA National Archives',
    icon: '🏫',
    bg: 'linear-gradient(135deg,#1e40af,#0284c7)'
  },
  {
    cat: 'development',
    title: 'Sagamu Youth STEM & Digital Innovation Bootcamp',
    date: 'Tech Empowerment',
    desc: 'Equipping young indigenes across Offin, Makun, and Sonyindo with practical software engineering, robotics, and creative digital skills.',
    src: '/images/news/youth-tech-bootcamp.jpg',
    credit: 'Sagamu Innovation & Tech Hub',
    icon: '💻',
    bg: 'linear-gradient(135deg,#1e3a8a,#059669)'
  },
  {
    cat: 'infrastructure',
    title: 'Sagamu Municipal Road Network & Drainage Construction',
    date: 'Urban Renewal',
    desc: 'Paving internal quarter streets, upgrading stormwater canals, and deploying solar street illumination along major municipal commercial arteries.',
    src: '/images/news/yemogun-street-construction.jpg',
    credit: 'Ogun State Ministry of Works & Sagamu LG',
    icon: '🚧',
    bg: 'linear-gradient(135deg,#1e40af,#059669)'
  },
  {
    cat: 'health',
    title: 'Primary Healthcare Centers Solar Cold-Chain Upgrade',
    date: 'Public Health',
    desc: '24/7 solar-powered medical refrigeration and maternal healthcare clinics providing reliable public health services across Sagamu.',
    src: '/images/news/health-centre-solar-upgrade.jpg',
    credit: 'Remo Health Initiative & Diaspora Support',
    icon: '🏥',
    bg: 'linear-gradient(135deg,#059669,#10b981)'
  },
  {
    cat: 'commerce',
    title: 'Sabo Commercial District & Hospitality Facilities',
    date: 'Commercial Corridor',
    desc: 'The vibrant trading corridors around Sabo, modern conference venues, and hospitality hotels supporting visitors to Remoland.',
    src: '/images/news/hospitality-events-centre.jpg',
    credit: 'Sagamu Chamber of Commerce & Industry',
    icon: '🏢',
    bg: 'linear-gradient(135deg,#0f172a,#1e40af)'
  },
  {
    cat: 'civic',
    title: 'Sagamu Civic Infrastructure & Public Safety Command',
    date: 'Public Safety',
    desc: 'Federal and state security command posts and civic service centers stationed across the Sagamu interchange and commercial belts.',
    src: '/images/frsc-office-commissioning.jpg',
    credit: 'Sagamu Municipal Security Bureau',
    icon: '🛡️',
    bg: 'linear-gradient(135deg,#1e40af,#059669)'
  },
  {
    cat: 'palace',
    title: 'Royal Assembly at Aafin Akarigbo',
    date: 'Traditional Governance',
    desc: 'HRM The Akarigbo presiding over the Remo Traditional Council assembly, deliberating on community peace, culture, and progress.',
    src: '/images/palace/515331740_122290469708073410_6499557066502581807_n.jpg',
    credit: 'Palace Directorate of Media & Public Relations',
    icon: '👑',
    bg: 'linear-gradient(135deg,#059669,#1e40af)'
  },
  {
    cat: 'community',
    title: 'Remo Community Empowerment & Vocational Assemblies',
    date: 'Grassroots Welfare',
    desc: 'SDA and philanthropic foundations distributing educational scholarships, farming inputs, and micro-business equipment to Sagamites.',
    src: '/images/community-empowerment.jpg',
    credit: 'Sagamu Development Association',
    icon: '🤝',
    bg: 'linear-gradient(135deg,#1e40af,#0f172a)'
  }
];

export const photos = getWithFallback('cms-gallery', STATIC_PHOTOS);

export const galleryCategories = [
  'all',
  'palace',
  'coronation',
  'sagamu-day',
  'heritage',
  'development',
  'infrastructure',
  'health',
  'commerce',
  'civic',
  'community'
];
