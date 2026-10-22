import { getWithFallback } from '../services/storage';

const EVENTS_DEFAULTS = [
  {
    title: '41st Sagamu Day Grand Celebration & Carnival',
    date: 'November 2026',
    time: 'All Day',
    venue: 'Gateway International Stadium & Akarigbo Palace Square, Ita Oba',
    desc: 'The flagship annual festival uniting all 13 confederate quarters of Sagamu, home and diaspora indigenes, featuring cultural parades, awards, and royal blessings.',
    cat: 'festival',
    status: 'upcoming',
    organiser: 'Sagamu Development Association (SDA) & Akarigbo-in-Council'
  },
  {
    title: 'Coronation Anniversary of HRM Oba Babatunde Adewale Ajayi (Torungbuwa II)',
    date: 'December 7, 2026',
    time: '10:00 AM',
    venue: 'Aafin Akarigbo Palace Amphitheatre, Ita Oba, Sagamu',
    desc: 'Solemn thanksgiving, royal durbar, conferment of honorary chieftaincies, and state address by the Akarigbo of Remoland.',
    cat: 'royal',
    status: 'upcoming',
    organiser: 'Remo Traditional Council'
  },
  {
    title: 'Remo Grand Agemo Cultural Festival',
    date: 'July 2026',
    time: 'Day & Night Traditional Rites',
    venue: 'Sacred Agemo Groves across Sagamu & Remoland',
    desc: 'Sacred cultural festival celebrating the 16 Alagemo deities and ancestral heritage of the Remo kingdom.',
    cat: 'traditional',
    status: 'upcoming',
    organiser: 'Council of Agemo High Priests & Osugbo'
  },
  {
    title: 'Balufon & Oro Traditional Festivals',
    date: 'August 2026',
    time: 'Evening Rites',
    venue: 'Offin, Makun, and Sacred Quarters, Sagamu',
    desc: 'Annual purifying traditional festivals honouring the deities of fertility, protection, and peaceful governance.',
    cat: 'traditional',
    status: 'upcoming',
    organiser: 'Osugbo Remo Traditional Council'
  },
  {
    title: 'Sabo Kolanut International Trade & Agricultural Expo',
    date: 'September 18, 2026',
    time: '9:00 AM – 5:00 PM',
    venue: 'Sabo Commercial Arena, Sagamu',
    desc: 'Cross-border trade pavilion spotlighting kolanut, cocoa, agro-allied processing, and commerce across ECOWAS.',
    cat: 'community',
    status: 'upcoming',
    organiser: 'Sagamu Chamber of Commerce & Kolanut Traders Union'
  },
  {
    title: 'Sagamu Youth Tech & Innovation Summit',
    date: 'May 15, 2026',
    time: '9:00 AM',
    venue: 'Remo Secondary School Hall, Akarigbo Street, Sagamu',
    desc: 'Empowering 1,000 Sagamu youths with digital skills, coding, AI applications, and startup seed grants.',
    cat: 'community',
    status: 'completed',
    organiser: 'Sagamu Youth Congress'
  },
];

export const STATIC_EVENTS = getWithFallback('cms-events', EVENTS_DEFAULTS);

export const eventCatColor = {
  festival: '#8B6914',
  royal: '#7A2E0E',
  traditional: '#1a2e5e',
  community: '#2D4A22'
};
