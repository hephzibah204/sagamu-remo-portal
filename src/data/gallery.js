import { getWithFallback } from '../services/storage';

const STATIC_PHOTOS = [
  {
    cat: 'palace',
    title: 'Aafin Akarigbo (Akarigbo Palace Complex) at Ita Oba',
    date: 'Paramount Seat',
    desc: 'The magnificent ultra-modern Aafin Akarigbo Palace complex at Ita Oba, Offin-Sagamu, featuring traditional royal council halls and state-of-the-art civic amphitheater.',
    src: '/images/palace/1.jpg',
    credit: 'Remo Traditional Council Archives',
    icon: '🏛️',
    bg: 'linear-gradient(135deg,#8B6914,#0F172A)'
  },
  {
    cat: 'coronation',
    title: 'Coronation of Oba Babatunde Adewale Ajayi, CFR (Torungbuwa II)',
    date: 'December 2017',
    desc: 'Historic coronation ceremony of His Royal Majesty Oba Babatunde Adewale Ajayi, CFR, FCA, as The Akarigbo and Paramount Ruler of Remoland.',
    src: '/images/OLsagamu Oba James Coronation.jpg',
    credit: 'State & National Archives',
    icon: '👑',
    bg: 'linear-gradient(135deg,#7A2E0E,#0F172A)'
  },
  {
    cat: 'sagamu-day',
    title: 'Annual Sagamu Day Grand Durbar & Cultural Procession',
    date: 'Annual Festival',
    desc: 'The 13 confederate quarters of Sagamu converge in spectacular colors, music, and royal homage during the grand Sagamu Day celebrations.',
    src: '/images/49th Sagamu Day.jpg',
    credit: 'Sagamu Development Association (SDA)',
    icon: '🎉',
    bg: 'linear-gradient(135deg,#B5451B,#0F172A)'
  },
  {
    cat: 'miss-sagamu',
    title: 'Miss Sagamu Beauty & Culture Pageant',
    date: 'Annual Pageant',
    desc: 'The Miss Sagamu pageant showcases intellect, cultural poise, and social impact among young women from across the 13 confederate quarters.',
    src: '/images/Miss Lipaka Hero.jpg',
    credit: 'Miss Sagamu Pageant Secretariat / SDA',
    icon: '👑',
    bg: 'linear-gradient(135deg,#C9963A,#7A2E0E)'
  },
  {
    cat: 'heritage',
    title: 'Remo Secondary School (RSS Sagamu) Historic Gate',
    date: 'Founded 1946',
    desc: 'The historic grounds of Remo Secondary School on Akarigbo Street — the premier secondary academy of Remoland.',
    src: '/images/OSitelu Memorial College.jpeg',
    credit: 'RSSOSA Community Archives',
    icon: '🏫',
    bg: 'linear-gradient(135deg,#1a2e5e,#0e1a3a)'
  },
  {
    cat: 'development',
    title: 'OOUTH Sagamu Advanced Tertiary Healthcare Complex',
    date: 'Civic Infrastructure',
    desc: 'Olabisi Onabanjo University Teaching Hospital, providing world-class tertiary trauma care, specialized medicine, and clinical training.',
    src: '/images/Sagamu Community.jpg',
    credit: 'Ministry of Health / OOUTH',
    icon: '🏥',
    bg: 'linear-gradient(135deg,#2D4A22,#8B6914)'
  },
  {
    cat: 'commerce',
    title: 'Sabo International Kolanut & Agro Exchange',
    date: 'Century of Trade',
    desc: 'The bustling corridors of Sabo Market, Sagamu — the epicenter of West Africa\'s kolanut distribution trade.',
    src: '/images/Sagamu Town.jpg',
    credit: 'Sagamu Chamber of Commerce',
    icon: '🌾',
    bg: 'linear-gradient(135deg,#5C3317,#0F172A)'
  },
  {
    cat: 'diaspora',
    title: 'Sagamu Diaspora Healthcare & Youth Empowerment Mission',
    date: 'Ongoing Initiative',
    desc: 'Global sons and daughters of Sagamu delivering medical equipment, ICT laboratories, and youth mentorship to schools across Sagamu.',
    src: '/images/David Alaba Foundation.jpg',
    credit: 'Sagamu Diaspora Network',
    icon: '🌍',
    bg: 'linear-gradient(135deg,#1a2e6e,#0d1a3a)'
  },
];

export const photos = getWithFallback('cms-gallery', STATIC_PHOTOS);

export const galleryCategories = ['all', 'palace', 'coronation', 'sagamu-day', 'miss-sagamu', 'commerce', 'development', 'heritage', 'diaspora'];
