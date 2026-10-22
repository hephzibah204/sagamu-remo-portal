import { getWithFallback } from '../services/storage';

const STATIC_NOTABLE = [
  {
    n: 'Anthony Oluwafemi Joshua, OBE',
    l: 'London, UK / Sagamu',
    f: 'Two-time Unified World Heavyweight Boxing Champion (WBA, IBF, WBO, IBO)',
    note: 'Proud son of Sagamu and Remoland. Frequently visits his ancestral homeland, supports local youth sports academies and community empowerment.',
    ic: '🥊',
  },
  {
    n: 'His Excellency Otunba Gbenga Daniel',
    l: 'Sagamu / Abuja / Lagos',
    f: 'Distinguished Engineer, Two-term Executive Governor of Ogun State, Senator of Nigeria',
    note: 'Hails from Makun-Sagamu. Built landmark civic and educational infrastructure across Ogun State and championed Remoland modernization.',
    ic: '🏛️',
  },
  {
    n: 'Otunba Bimbo Ashiru',
    l: 'Lagos / London / Sagamu',
    f: 'Chairman, Odu\'a Investment Company Limited · Corporate Titan',
    note: 'Distinguished Sagamu indigene who spearheaded foreign direct investments into Ogun State industrial clusters.',
    ic: '💼',
  },
  {
    n: 'Dr. Yemi Ogunbiyi',
    l: 'Lagos / Sagamu',
    f: 'Celebrated Scholar, Literary Critic, Former MD of Daily Times, Pro-Chancellor',
    note: 'Veteran literary icon and distinguished elder statesman of Sagamu origin.',
    ic: '📚',
  },
];

const STATIC_REGIONS = [
  { ic: '🇬🇧', c: 'United Kingdom', d: 'London, Manchester, Birmingham & UK chapters' },
  { ic: '🇺🇸', c: 'United States', d: 'Houston, Atlanta, Maryland, New York, Chicago' },
  { ic: '🇨🇦', c: 'Canada', d: 'Toronto, Calgary, Ottawa' },
  { ic: '🇳🇬', c: 'Lagos & Abuja', d: 'Prominent professional and business clubs' },
  { ic: '🌍', c: 'West Africa & Sahel', d: 'Sabo kolanut trade corridors across Niger, Ghana, Chad' },
  { ic: '🌐', c: 'Worldwide', d: 'Wherever you reside, Sagamu welcomes you home' },
];

const STATIC_DIASPORA_GROUPS = [
  {
    n: 'Sagamu Union UK & Ireland',
    d: 'Apex umbrella diaspora body coordinating welfare, investments, and healthcare missions to Sagamu.',
    ct: 'diaspora@sagamuremo.ng',
  },
  {
    n: 'Sagamu Association of North America (SANA)',
    d: 'Network of Sagamu professionals in the US and Canada supporting annual scholarships and community grants.',
    ct: 'sana.usa@sagamuremo.ng',
  },
  {
    n: 'Remo Secondary School Old Students Association (RSSOSA) Global',
    d: 'Global alumni network of Remoland\'s premier secondary school, funding labs, libraries, and student mentorship.',
    ct: 'rssosa.global@sagamuremo.ng',
  },
  {
    n: 'Sagamu Indigenes Club International (Lagos & Abuja Chapters)',
    d: 'Connecting corporate and business leaders of Sagamu origin in Nigeria\'s major commercial hubs.',
    ct: 'secretariat@sagamuremo.ng',
  },
];

export const notable = getWithFallback('cms-diaspora-notable', STATIC_NOTABLE);
export const regions = STATIC_REGIONS;
export const diasporaGroups = getWithFallback('cms-diaspora-groups', STATIC_DIASPORA_GROUPS);
