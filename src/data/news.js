import { getWithFallback } from '../services/storage';

const NEWS_DEFAULTS = [
  {
    id: 'n1',
    slug: 'akarigbo-unveils-sagamu-tech-and-industrial-park',
    date: 'September 24, 2026',
    cat: 'development',
    headline: 'HRM The Akarigbo Unveils ₦2.5B Sagamu Digital Innovation & Industrial Corridor',
    summary: 'A new tech hub and agro-industrial corridor officially launched to harness Sagamu\'s strategic positioning near the Gateway Agro-Cargo Airport.',
    body: "His Royal Majesty Oba Babatunde Adewale Ajayi, Torungbuwa II, CFR, Akarigbo and Paramount Ruler of Remoland, in partnership with private sector leaders, has unveiled the master plan for the Sagamu Digital Innovation and Agro-Industrial Park.\n\nStrategically located along the Interchange-Airport axis, the park is designed to create over 5,000 direct technology and manufacturing jobs for Sagamu youths while modernizing the local supply chain for agricultural and industrial goods.\n\n\"Sagamu has always been the commercial crossroad of Nigeria; now we are making it the premier innovation capital of Ogun State,\" the monarch announced at the royal ceremony.",
    paragraphs: [
      'His Royal Majesty Oba Babatunde Adewale Ajayi, Torungbuwa II, CFR, Akarigbo and Paramount Ruler of Remoland, in partnership with private sector leaders, has unveiled the master plan for the Sagamu Digital Innovation and Agro-Industrial Park.',
      'Strategically located along the Interchange-Airport axis, the park is designed to create over 5,000 direct technology and manufacturing jobs for Sagamu youths while modernizing the local supply chain for agricultural and industrial goods.',
      '"Sagamu has always been the commercial crossroad of Nigeria; now we are making it the premier innovation capital of Ogun State," the monarch announced at the royal ceremony.'
    ],
    highlights: [
      '₦2.5B joint investment in innovation and manufacturing.',
      'Anticipated 5,000 direct jobs for Sagamu youths.',
      'Leverages proximity to Gateway Agro-Cargo Airport and Lagos-Ibadan corridor.'
    ],
    quote: {
      text: 'Sagamu is poised to lead the industrial and technological resurgence of Remoland.',
      author: 'HRM Oba Babatunde Adewale Ajayi, CFR, FCA'
    },
    ic: '🚀',
    readTime: '3 min read',
    author: 'Palace Communications Bureau',
    image: '/images/palace/1.jpg',
    featured: true
  },
  {
    id: 'n2',
    slug: 'oouth-sagamu-commissions-advanced-cardiac-diagnostic-center',
    date: 'August 18, 2026',
    cat: 'health',
    headline: 'OOUTH Sagamu Commissions Ultra-Modern Multi-Specialty Diagnostic Center',
    summary: 'Olabisi Onabanjo University Teaching Hospital expands tertiary healthcare services with cutting-edge MRI and catheterization laboratories.',
    body: "The Management of Olabisi Onabanjo University Teaching Hospital (OOUTH), Sagamu, has formally commissioned its state-of-the-art Advanced Diagnostic and Cardiac Wing.\n\nThis multimillion-naira upgrade enhances tertiary trauma care, specialized neurological imaging, and cardiac monitoring for residents of Sagamu, Ogun State, and interstate transit passengers on the Lagos-Ibadan and Sagamu-Benin corridors.\n\nThe Chief Medical Director expressed profound appreciation to the State Government and Sagamu Diaspora healthcare benefactors whose grants accelerated the acquisition of high-resolution digital imaging systems.",
    paragraphs: [
      'The Management of Olabisi Onabanjo University Teaching Hospital (OOUTH), Sagamu, has formally commissioned its state-of-the-art Advanced Diagnostic and Cardiac Wing.',
      'This multimillion-naira upgrade enhances tertiary trauma care, specialized neurological imaging, and cardiac monitoring for residents of Sagamu, Ogun State, and interstate transit passengers on the Lagos-Ibadan and Sagamu-Benin corridors.',
      'The Chief Medical Director expressed profound appreciation to the State Government and Sagamu Diaspora healthcare benefactors whose grants accelerated the acquisition of high-resolution digital imaging systems.'
    ],
    highlights: [
      'New MRI and cardiac catheterization facilities.',
      'Enhances 24/7 trauma response for Sagamu and expressway traffic.',
      'Supported by Sagamu Diaspora Health Alliance.'
    ],
    quote: {
      text: 'Quality tertiary healthcare at our doorstep preserves life across the entire Remo kingdom.',
      author: 'OOUTH Medical Directorate'
    },
    ic: '🏥',
    readTime: '4 min read',
    author: 'Medical Affairs Desk',
    image: '/images/sagamu-townscape.jpg'
  },
  {
    id: 'n3',
    slug: 'sabo-kolanut-international-market-digitization',
    date: 'July 10, 2026',
    cat: 'commerce',
    headline: 'Sabo Sagamu International Kolanut Market Adopts Digital Trade & E-Commerce Platform',
    summary: 'West Africa\'s largest kolanut market partners with financial technology firms to streamline nationwide and international transactions.',
    body: "A historic transformation is underway at Sabo Market, Sagamu, as the Kolanut Traders Union officially inaugurated the digital wholesale matching and verified freight tracking network.\n\nFor more than a century, Sabo has served as the undisputed heartbeat of the kolanut trade, linking South-West growers to northern Nigerian and Sahelian merchants. The new digital portal offers transparent pricing indices, escrow protections, and electronic freight waybills.\n\nTraders from across Niger, Mali, Burkina Faso, and northern states welcomed the development, noting it will eliminate transit cash hazards and accelerate trade settlement.",
    paragraphs: [
      'A historic transformation is underway at Sabo Market, Sagamu, as the Kolanut Traders Union officially inaugurated the digital wholesale matching and verified freight tracking network.',
      'For more than a century, Sabo has served as the undisputed heartbeat of the kolanut trade, linking South-West growers to northern Nigerian and Sahelian merchants. The new digital portal offers transparent pricing indices, escrow protections, and electronic freight waybills.',
      'Traders from across Niger, Mali, Burkina Faso, and northern states welcomed the development, noting it will eliminate transit cash hazards and accelerate trade settlement.'
    ],
    highlights: [
      'Digital payment and freight tracking for kolanut merchants.',
      'Strengthens century-old trade bridge between Remo and Sahelian West Africa.',
      'Supported by Sagamu Chamber of Commerce.'
    ],
    quote: {
      text: 'Sabo has nurtured unity and prosperity between Yoruba and Hausa communities for generations.',
      author: 'Alhaji Danladi & Chief Alani, Sabo Market Leadership'
    },
    ic: '🌾',
    readTime: '3 min read',
    author: 'Commerce & Markets Desk',
    image: '/images/Sagamu Central Market.webp'
  },
  {
    id: 'n4',
    slug: 'sagamu-day-2026-unity-torch-tour',
    date: 'June 01, 2026',
    cat: 'culture',
    headline: 'Sagamu Day 2026: Unity Torch Commences Historic Tour Across All 13 Confederate Quarters',
    summary: 'The Sagamu Development Association begins countdown to the 41st Sagamu Day with cultural processions visiting Offin, Makun, Sonyindo, Epe, and all federated towns.',
    body: "The Sagamu Development Association (SDA) has officially lit the Sagamu Day Unity Torch at the sacred grounds of Ita Oba, outside Aafin Akarigbo.\n\nThe torch will journey through each of the 13 founding settlements—Offin, Makun, Sonyindo, Epe, Ibido, Igbepa, Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, and Ijagba—symbolizing unbroken brotherhood and solidarity since the 1872 confederation.\n\nElders and youth leaders in every quarter are staging cultural performances, honoring community elders, and unveiling localized development targets.",
    paragraphs: [
      'The Sagamu Development Association (SDA) has officially lit the Sagamu Day Unity Torch at the sacred grounds of Ita Oba, outside Aafin Akarigbo.',
      'The torch will journey through each of the 13 founding settlements—Offin, Makun, Sonyindo, Epe, Ibido, Igbepa, Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, and Ijagba—symbolizing unbroken brotherhood and solidarity since the 1872 confederation.',
      'Elders and youth leaders in every quarter are staging cultural performances, honoring community elders, and unveiling localized development targets.'
    ],
    highlights: [
      'Unity Torch visits all 13 confederate quarters.',
      'Precursor to the 41st Sagamu Day grand celebration in November.',
      'Focuses on quarter infrastructural priorities and youth integration.'
    ],
    quote: {
      text: '13 branches, one mighty trunk: that is the eternal strength of Sagamu.',
      author: 'Sagamu Development Association (SDA)'
    },
    ic: '🔥',
    readTime: '3 min read',
    author: 'Culture & Heritage Bureau',
    image: '/images/palace/1.jpg'
  },
  {
    id: 'n5',
    slug: 'gateway-stadium-sagamu-sports-festival-prep',
    date: 'May 14, 2026',
    cat: 'infrastructure',
    headline: 'Gateway International Stadium Sagamu Completes Multi-Million Pitch and Facilities Upgrade',
    summary: 'The 20,000-seater stadium undergoes comprehensive revitalization ahead of regional football championships and athletic trials.',
    body: "The Ogun State Sports Council in collaboration with the Sagamu Youth Sports Development Directorate has completed the turf re-grassing and modern tartan track resurfacing at the Gateway International Stadium, Sagamu.\n\nThe stadium, famous for hosting international youth tournaments and premier league fixtures, now boasts digital LED floodlights, VAR-ready press booths, and renewed VIP lounges.\n\nLocal football clubs and youth academies in Sagamu expressed joy, affirming that the facility will inspire the next generation of international champions like Sagamu's own Anthony Joshua.",
    paragraphs: [
      'The Ogun State Sports Council in collaboration with the Sagamu Youth Sports Development Directorate has completed the turf re-grassing and modern tartan track resurfacing at the Gateway International Stadium, Sagamu.',
      'The stadium, famous for hosting international youth tournaments and premier league fixtures, now boasts digital LED floodlights, VAR-ready press booths, and renewed VIP lounges.',
      'Local football clubs and youth academies in Sagamu expressed joy, affirming that the facility will inspire the next generation of international champions like Sagamu\'s own Anthony Joshua.'
    ],
    highlights: [
      'FIFA-compliant turf and Olympic 8-lane tartan track.',
      'Equipped with digital lighting for evening fixtures.',
      'Home base for Remo youth athletic talent discovery.'
    ],
    quote: {
      text: 'Sagamu sports infrastructure is returning to world-class reckoning.',
      author: 'Sagamu Sports Development Commission'
    },
    ic: '🏟️',
    readTime: '3 min read',
    author: 'Sports & Youth Desk',
    image: '/images/Gateway Stadium Sagamu.png'
  },
  {
    id: 'n6',
    slug: 'lafarge-elephant-cement-sagamu-green-initiative',
    date: 'April 22, 2026',
    cat: 'infrastructure',
    headline: 'Lafarge Elephant Cement Sagamu Works Commissions ₦800M Clean Energy & Youth Apprenticeship Hub',
    summary: 'Industrial giant reinforces community commitment with biomass energy transition and fully funded engineering apprenticeships for Sagamu youths.',
    body: "In celebration of over six decades of continuous industrial excellence in Sagamu, Lafarge Africa Plc has commissioned an ₦800 million alternative fuel and community training complex at its Sagamu Elephant Cement Works.\n\nThe initiative transitions a significant portion of kiln heating to renewable agricultural biomass, cutting local carbon emissions while opening direct technical vocational training for 200 youths annually in mechanical, electrical, and mechatronic engineering.\n\nHis Royal Majesty The Akarigbo commended Lafarge as a pillar of Sagamu's modern industrial economy, urging other corporations in the corridor to emulate their dedication.",
    paragraphs: [
      'In celebration of over six decades of continuous industrial excellence in Sagamu, Lafarge Africa Plc has commissioned an ₦800 million alternative fuel and community training complex at its Sagamu Elephant Cement Works.',
      'The initiative transitions a significant portion of kiln heating to renewable agricultural biomass, cutting local carbon emissions while opening direct technical vocational training for 200 youths annually in mechanical, electrical, and mechatronic engineering.',
      'His Royal Majesty The Akarigbo commended Lafarge as a pillar of Sagamu\'s modern industrial economy, urging other corporations in the corridor to emulate their dedication.'
    ],
    highlights: [
      '₦800M investment in alternative green fuel and youth training.',
      '200 full technical scholarships awarded yearly.',
      'Reduces carbon footprint across Sagamu industrial zone.'
    ],
    quote: {
      text: 'Elephant Cement and Sagamu share an inseparable bond of industrial heritage and progress.',
      author: 'Lafarge Sagamu Plant Operations'
    },
    ic: '🏗️',
    readTime: '4 min read',
    author: 'Industry & Environment Desk',
    image: '/images/sagamu-townscape.jpg'
  },
  {
    id: 'n7',
    slug: 'remo-secondary-school-rss-80th-anniversary-endowment',
    date: 'March 11, 2026',
    cat: 'education',
    headline: 'Remo Secondary School (RSS) Alunmi (RSSOSA) Endows ₦50M Digital Research Chair Ahead of 80th Jubilee',
    summary: 'The pioneer secondary school of Remoland prepares for historic milestone with major digital library and scientific laboratories.',
    body: "The global alumni body of Remo Secondary School (RSSOSA) has endowed a ₦50 million science, technology, and humanities research fund ahead of the school's upcoming 80th anniversary.\n\nFounded on February 4, 1946 by Oba William Christopher Adedoyin II and visionary community leaders, RSS remains the intellectual cornerstone of Sagamu and Remoland.\n\nThe endowment finances high-speed fiber internet throughout the historic quadrangle campus, advanced physics and robotics laboratories, and annual scholarships for exceptional indigent students.",
    paragraphs: [
      'The global alumni body of Remo Secondary School (RSSOSA) has endowed a ₦50 million science, technology, and humanities research fund ahead of the school\'s upcoming 80th anniversary.',
      'Founded on February 4, 1946 by Oba William Christopher Adedoyin II and visionary community leaders, RSS remains the intellectual cornerstone of Sagamu and Remoland.',
      'The endowment finances high-speed fiber internet throughout the historic quadrangle campus, advanced physics and robotics laboratories, and annual scholarships for exceptional indigent students.'
    ],
    highlights: [
      '₦50M research and digital library endowment.',
      'Commemorates 80 years of pioneer academic excellence since 1946.',
      'Transforms science and robotics training for Sagamu youth.'
    ],
    quote: {
      text: 'The torch lit in 1946 will forever burn bright across Remoland and the nation.',
      author: 'RSSOSA National Executive'
    },
    ic: '🏫',
    readTime: '3 min read',
    author: 'Education & Alumni Secretariat',
    image: '/images/news/youth-tech-bootcamp.jpg'
  },
  {
    id: 'n8',
    slug: 'sagamu-diaspora-alliance-maternal-health-clinics',
    date: 'February 15, 2026',
    cat: 'diaspora',
    headline: 'Sagamu Diaspora Network in UK & North America Mobilizes $1.2M for Primary Health Centers Across Quarters',
    summary: 'Diaspora indigenes fund maternal health, solar boreholes, and emergency response outposts in Sonyindo, Epe, and Batoro.',
    body: "The Sagamu Union UK & Ireland and the Sagamu Association of North America (SANA) have united to deliver a comprehensive healthcare intervention package valued at $1.2 million across Sagamu.\n\nThe project delivers 24-hour solar electrical systems to primary health centers, automated vaccine refrigeration, clean potable water boreholes, and three rapid-response community ambulances.\n\nThe handover ceremony, held at Aafin Akarigbo, saw quarter leaders and traditional chiefs warmly celebrating the diaspora sons and daughters for their unwavering homecoming investments.",
    paragraphs: [
      'The Sagamu Union UK & Ireland and the Sagamu Association of North America (SANA) have united to deliver a comprehensive healthcare intervention package valued at $1.2 million across Sagamu.',
      'The project delivers 24-hour solar electrical systems to primary health centers, automated vaccine refrigeration, clean potable water boreholes, and three rapid-response community ambulances.',
      'The handover ceremony, held at Aafin Akarigbo, saw quarter leaders and traditional chiefs warmly celebrating the diaspora sons and daughters for their unwavering homecoming investments.'
    ],
    highlights: [
      '$1.2M diaspora community healthcare intervention.',
      'Solar power, vaccine cold chains, and boreholes installed.',
      'Benefitting Sonyindo, Epe, Batoro, and Offin primary care centers.'
    ],
    quote: {
      text: 'No matter how far we travel, our hearts and resources remain anchored in Sagamu.',
      author: 'Sagamu Diaspora Joint Action Committee'
    },
    ic: '🌐',
    readTime: '3 min read',
    author: 'Diaspora Affairs Desk',
    image: '/images/community-empowerment.jpg'
  }
];

export const STATIC_NEWS = getWithFallback('cms-news', NEWS_DEFAULTS);

export const newsCatColor = {
  development: '#2563eb',
  royal: '#d97706',
  education: '#059669',
  health: '#dc2626',
  infrastructure: '#7c3aed',
  culture: '#C9963A',
  commerce: '#8B6914',
  diaspora: '#10b981',
  community: '#3b82f6',
};
