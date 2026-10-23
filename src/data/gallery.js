import { getWithFallback } from '../services/storage';

const STATIC_PHOTOS = [
  {
    cat: 'palace',
    title: 'Aafin Akarigbo Palace Complex at Ita Oba',
    date: 'Paramount Seat',
    desc: 'The magnificent Aafin Akarigbo Palace complex at Ita Oba, Offin-Sagamu, seat of the Akarigbo and Paramount Ruler of Remoland.',
    src: '/images/palace/1.jpg',
    credit: 'Remo Traditional Council Archives',
    icon: '🏛️',
    bg: 'linear-gradient(135deg,#1e40af,#0f172a)'
  },
  {
    cat: 'coronation',
    title: 'Royal Throne of The Akarigbo of Remoland',
    date: 'Sovereign Heritage',
    desc: 'The sacred coronation regalia and royal throne of the Torungbuwa Dynasty, guiding the 33 towns of Remoland.',
    src: '/images/palace/2.jpg',
    credit: 'Remo Royal Archives',
    icon: '👑',
    bg: 'linear-gradient(135deg,#059669,#0f172a)'
  },
  {
    cat: 'sagamu-day',
    title: 'Annual Sagamu Day Grand Durbar & Procession',
    date: 'November Annual',
    desc: 'The 13 confederate quarters of Sagamu converge in spectacular colors, music, and royal homage during Sagamu Day.',
    src: '/images/community-empowerment.jpg',
    credit: 'Sagamu Development Association (SDA)',
    icon: '🎉',
    bg: 'linear-gradient(135deg,#2563eb,#0f172a)'
  },
  {
    cat: 'development',
    title: 'Youth Digital Tech & Innovation Bootcamp',
    date: 'STEM Empowerment',
    desc: 'High-impact coding, robotics, and digital enterprise training for Sagamu youth across Offin, Makun, and Sonyindo.',
    src: '/images/news/youth-tech-bootcamp.jpg',
    credit: 'Sagamu Innovation Initiative',
    icon: '💻',
    bg: 'linear-gradient(135deg,#1e3a8a,#059669)'
  },
  {
    cat: 'heritage',
    title: 'Remo Secondary School (RSS) Historic Campus',
    date: 'Founded 1946',
    desc: 'The historic grounds of Remo Secondary School on Akarigbo Street — premier pioneer secondary academy of Remoland.',
    src: '/images/palace/3.jpg',
    credit: 'RSSOSA Community Archives',
    icon: '🏫',
    bg: 'linear-gradient(135deg,#1e40af,#0284c7)'
  },
  {
    cat: 'health',
    title: 'Primary Health & Solar Cold-Chain Facilities',
    date: 'Healthcare Infrastructure',
    desc: 'Solar-powered cold chain refrigeration and primary maternal health centers serving Sagamu confederate quarters.',
    src: '/images/news/health-centre-solar-upgrade.jpg',
    credit: 'Ministry of Health & Diaspora Network',
    icon: '🏥',
    bg: 'linear-gradient(135deg,#059669,#10b981)'
  },
  {
    cat: 'commerce',
    title: 'Sabo Commercial & Hospitality Hub',
    date: 'Trade Corridor',
    desc: 'The vibrant commerce, wholesale kolanut exchanges, and modern hospitality centers across Sagamu.',
    src: '/images/news/hospitality-events-centre.jpg',
    credit: 'Sagamu Chamber of Commerce',
    icon: '🏢',
    bg: 'linear-gradient(135deg,#0f172a,#1e40af)'
  },
  {
    cat: 'infrastructure',
    title: 'Quarter Drainage & Road Rehabilitation',
    date: 'Civic Renewal',
    desc: 'Active road paving, concrete drain construction, and solar street lighting across Sagamu quarters.',
    src: '/images/news/yemogun-street-construction.jpg',
    credit: 'Sagamu Works & Infrastructure Desk',
    icon: '🚧',
    bg: 'linear-gradient(135deg,#1e40af,#059669)'
  },
];

export const photos = getWithFallback('cms-gallery', STATIC_PHOTOS);

export const galleryCategories = ['all', 'palace', 'coronation', 'sagamu-day', 'development', 'heritage', 'health', 'commerce', 'infrastructure'];
