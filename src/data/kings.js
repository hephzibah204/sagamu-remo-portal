import { getWithFallback } from '../services/storage';

const STATIC_KINGS = [
  {
    n: 'Oba Igimisoje',
    t: 'The Founding Akarigbo of Sagamu',
    e: 'c. 1872 – 1880s',
    h: 'Anoko / Historical Patriarch',
    cur: false,
    note: 'The heroic paramount ruler who led the historic confederation in 1872. Amidst the 19th-century Yoruba civil wars, he united the 13 independent Remo settlements onto the defensible, fertile land of Bammowu near the Orisagamu Ewa stream, laying the foundation of modern Sagamu as the capital of Remoland.',
    oriki: 'Omo Igimisoje tii fidi pote mole, Alase to ko Remo jo sori oke Bammowu.',
  },
  {
    n: 'Oba Oyebajo',
    t: 'Akarigbo of Remoland',
    e: '1891 – 1899',
    h: 'Torungbuwa Ruling House',
    cur: false,
    note: 'Reigned during the critical decade of British colonial treaty negotiations and boundary demarcations between Lagos Colony and Remoland.',
    oriki: null,
  },
  {
    n: 'Oba Adebonojo',
    t: 'Akarigbo of Remoland',
    e: '1899 – 1915',
    h: 'Anoko Ruling House',
    cur: false,
    note: 'Oversaw the transition into early 20th-century commerce, the founding of modern commercial markets in Sagamu, and the consolidation of the confederacy.',
    oriki: null,
  },
  {
    n: 'Oba William Christopher Adedoyin II',
    t: 'Akarigbo of Remoland',
    e: '1916 – 1952',
    h: 'Torungbuwa Ruling House',
    cur: false,
    note: 'A titan of modern Yoruba monarchy whose 36-year reign revolutionized Remoland. He championed Western education, court reforms, and paved the way for the founding of Remo Secondary School (RSS) in 1946. He was an influential member of the Western Region House of Chiefs.',
    oriki: 'Adedoyin Aladesanmi, Omo Akarigbo gbayi, omo a bi owo nile t\'owo tun wa l\'aafin.',
  },
  {
    n: 'Oba Moses Awolesi',
    t: 'Erinwole II',
    e: '1952 – 1988',
    h: 'Anoko Ruling House',
    cur: false,
    note: 'Reigned for 36 prosperous years spanning Nigeria\'s independence era. A visionary diplomat and peacebuilder, he unified the 13 quarters of Sagamu, spearheaded the establishment of WAPCO Elephant Cement and Olabisi Onabanjo University Teaching Hospital (OOUTH).',
    oriki: 'Erinwole Oba nla, Omo agbejoro tii feje we, omo Awolesi tii so ibi d\'ire.',
  },
  {
    n: 'Oba Dr. Michael Adeniyi Sonariwo, CON',
    t: 'Erinjugbo II',
    e: '1990 – July 23, 2016',
    h: 'Torungbuwa / Erinjugbo Ruling House',
    cur: false,
    note: 'Reigned with exceptional majesty for 26 years. A distinguished chartered accountant and past Chairman of the Ogun State Council of Obas. He elevated the national profile of Sagamu, nurtured Sabo international kolanut trade, and championed higher education and industrial expansion across Remoland.',
    oriki: `Erinjugbo Omo Akarigbo, Oba to f'ogbon joba.
Omo Remo Metalelogbon, omo Alagbafo tii f'omi tutu we.
Sagamu a bi owo nile, a b'oro l'enu,
Omo afidi pote mole, alagemo merindinlogun,
Kabiyeesi alase, igbakeji orisa,
Didun ni iranti olododo...`,
  },
  {
    n: 'Oba Babatunde Adewale Ajayi, CFR, FCA',
    t: 'Torungbuwa II',
    e: 'December 7, 2017 — Present',
    h: 'Torungbuwa Ruling House',
    cur: true,
    note: 'The reigning Akarigbo and Paramount Ruler of Remoland. An accomplished Chartered Accountant, seasoned Barrister and Solicitor of the Supreme Court of Nigeria, and former Chairman of the Ogun State Council of Traditional Rulers. He commissioned the ultra-modern Aafin Akarigbo Palace, catalyzed the Gateway Agro-Cargo Airport corridor, and launched pioneering youth innovation and economic development funds.',
    oriki: `Torungbuwa Keji, Ajayi Omo Oba l'Eko, l'Offin, ni Sagamu.
Ogbomolehin ti n f'owo ola to ilu ro.
Akarigbo Olufiran, omo a bi owo nile,
Oba to m'ero, to m'eko, to tun m'owo se rere.
Kabiyeesi Baba wa Torungbuwa II, Ki ade pe lori, ki bata pe lese!`,
  },
];

export const notableDescendants = [
  {
    n: 'His Royal Majesty Oba Babatunde Adewale Ajayi, CFR, FCA',
    r: 'The Akarigbo & Paramount Ruler of Remoland',
    f: 'Chartered Accountant, Barrister at Law, former Chairman of Ogun State Council of Obas, Sovereign President of Remo Traditional Council.',
    note: 'Descendant of the Torungbuwa Royal Lineage.',
  },
  {
    n: 'His Excellency Otunba Gbenga Daniel (OGD)',
    r: 'Prominent Sagamu/Remo Son & Senator of the Federal Republic',
    f: 'Two-term Executive Governor of Ogun State (2003–2011), distinguished engineer, founder of Kresta Laurel, and Senator representing Ogun East.',
    note: 'Native of Makun-Sagamu.',
  },
  {
    n: 'Anthony Oluwafemi Olaseni Joshua, OBE',
    r: 'World-Renowned Heavyweight Champion',
    f: 'Two-time Unified World Heavyweight Boxing Champion (WBA, IBF, WBO, IBO). Proud global ambassador of Sagamu and Remoland.',
    note: 'Hails from the prominent Joshua family of Sagamu.',
  },
  {
    n: 'Chief Timothy Adeola Odutola, CFR, OBE',
    r: 'Legendary Pioneer Industrialist',
    f: 'Pioneer president of the Manufacturers Association of Nigeria (MAN), agricultural titan, and historic industrialist across Remo and Ijebu.',
    note: 'Historic industrial benefactor and education philanthropist.',
  },
  {
    n: 'Late Chief Bisi Onabanjo',
    r: 'First Civilian Executive Governor of Ogun State',
    f: 'Visionary statesman and journalist (Aiyekoto). Established Ogun State University Teaching Hospital (now OOUTH) in Sagamu in 1986.',
    note: 'Architect of Sagamu\'s modern tertiary medical stature.',
  },
  {
    n: 'Otunba Bimbo Ashiru',
    r: 'Chairman, Odu\'a Investment Company Limited',
    f: 'Former Ogun State Commissioner for Commerce & Industry; spearheaded the transformation of Ogun State into Nigeria\'s premier industrial destination.',
    note: 'Distinguished Sagamu indigene and corporate leader.',
  },
];

export const rulingHouses = [
  ['👑', 'Torungbuwa Ruling House', 'Produced Oba Oyebajo, Oba William Christopher Adedoyin II (1916–1952), and the reigning monarch Oba Babatunde Adewale Ajayi, CFR (Torungbuwa II, 2017–present).'],
  ['🌿', 'Anoko Ruling House', 'Produced Oba Adebonojo (1899–1915), Oba Moses Awolesi (Erinwole II, 1952–1988), and Oba Dr. Michael Adeniyi Sonariwo (Erinjugbo II, 1990–2016).'],
  ['🏛️', 'The Remo Traditional Council', 'Apex council of traditional rulers across the 33 Remo towns under the sovereign presidency of The Akarigbo of Remoland.'],
  ['⚔️', 'The Osugbo & Council of Chiefs', 'The ancient custodian council of Remo customary jurisprudence, royal rites, and quarter representation.'],
];

export const achievements = [
  { ic: '🏛️', d: 'November 2021', t: 'Commissioned Ultra-Modern Aafin Akarigbo Palace Complex — monumental civic palace with 2,000-seater amphitheater and royal council chambers.' },
  { ic: '✈️', d: 'February 2023', t: 'Strategic integration with Gateway International Agro-Cargo Airport corridor within the Remoland economic belt.' },
  { ic: '🩺', d: 'June 2024', t: 'Facilitated expansion and modern equipment endowment for OOUTH (Olabisi Onabanjo University Teaching Hospital) Sagamu.' },
  { ic: '🌾', d: 'October 2025', t: 'Launched Sabo Kolanut International Trade Modernization Initiative, connecting local traders to digital logistics.' },
  { ic: '🎓', d: 'January 2026', t: 'Awarded ₦50M in STEM & Vocational Scholarships to bright indigenes across the 13 confederate quarters of Sagamu.' },
  { ic: '🛡️', d: 'April 2026', t: 'Established Sagamu Joint Security & Emergency Response Operations Centre linking NPF, So-Safe, and Amotekun.' },
];

export const kings = getWithFallback('cms-kings', STATIC_KINGS);
