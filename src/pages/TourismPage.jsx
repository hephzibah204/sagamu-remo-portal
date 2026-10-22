import { useState } from 'react';
import Hero from '../components/Hero';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';

const spots = [
  {
    n: 'Aafin Akarigbo (Palace of The Akarigbo of Remoland)',
    tag: 'FEATURED · Sovereign Royal Seat',
    tagClass: 'tag-gold',
    ic: '👑',
    color: '#C9963A',
    desc: 'The official palace complex of the Akarigbo of Remoland, paramount ruler across 33 kingdoms. Features the modern royal council chamber, cultural amphitheatre, and ancestral heritage archives.',
    rating: '4.9★',
    reviews: 'Royal Heritage Landmark',
    address: 'Ita Oba, Offin, Sagamu Remo',
    distance: 'Central Sagamu',
    features: ['Official seat of the Akarigbo', 'Council of Remo Traditional Rulers', 'Royal Cultural Amphitheatre', 'Historic Regalia & Archives'],
    img: '/images/palace/1.jpg'
  },
  {
    n: 'Gateway International Stadium',
    tag: 'Sports & Recreation',
    tagClass: 'tag-terra',
    ic: '🏟️',
    color: '#B5451B',
    desc: 'A 20,000-seat modern sports stadium constructed to FIFA standards. Hosted national athletics championships, FIFA international training camps, and league tournaments.',
    rating: '4.5★',
    address: 'GRA Sagamu / Benin Expressway Link',
    features: ['20,000-seater capacity', 'FIFA-grade grass pitch', 'Olympic running track', 'Hosted National Sports Festival'],
    img: '/images/Gateway Stadium Sagamu.png'
  },
  {
    n: 'Sabo Kolanut International Market',
    tag: 'Commerce & Culture',
    tagClass: 'tag-gold',
    ic: '🛖',
    color: '#8B6914',
    desc: 'The largest wholesale kolanut trading exchange in West Africa. A vibrant multi-cultural commercial centre bridging trade routes from northern Nigeria, Niger, Mali, and the Yoruba hinterland since the 1930s.',
    rating: '4.7★',
    address: 'Sabo Quarter, Sagamu Remo',
    features: ['Largest kolanut market in West Africa', 'Historic inter-ethnic trading community', 'Daily wholesale auctions', 'Direct link to export hubs'],
    img: '/images/Sabo Market Sagamu.png'
  },
  {
    n: 'Orisagamu Ewa Sacred Stream & Spring',
    tag: 'Founding Heritage',
    tagClass: 'tag-green',
    ic: '💧',
    color: '#2D4A22',
    desc: 'The sacred founding spring situated on historic Bammowu land where 13 independent confederate towns met and ratified unity in 1872, inspiring the name "Orisa-gamu-ewa" (Sagamu).',
    address: 'Bammowu Valley, Sagamu Remo',
    features: ['Founding source of Sagamu in 1872', 'Meeting ground of the 13 confederate quarters', 'Symbol of peace and eternal unity', 'Historical monument'],
    img: '/images/sagamu-townscape.jpg'
  },
  {
    n: 'Conference Hotel & Suites Sagamu',
    tag: 'Premier Hospitality',
    tagClass: 'tag-gold',
    ic: '🏨',
    color: '#B5451B',
    desc: 'Luxury hotel and conference facility offering presidential suites, fine dining restaurants, swimming pool, and banquet halls in a tranquil environment.',
    rating: '4.4★',
    phone: '+234 805 000 0000',
    website: 'conferencehotelsagamu.com',
    address: 'GRA Sagamu, Ogun State',
    features: ['Luxury rooms & suites', 'Olympic-size pool', 'Banquet & conference halls', 'International & indigenous dining'],
    img: '/images/Sagamu Resort.png'
  },
  {
    n: 'Remo Secondary School (RSS) Historic Campus',
    tag: 'Academic Landmark',
    tagClass: 'tag-blue',
    ic: '🏫',
    color: '#1a2e5e',
    desc: 'Founded February 4, 1946 by Oba William Christopher Adedoyin II and the Remo community as the first secondary school in Remoland. Cradle of national leaders, jurists, and scholars.',
    address: 'Awomosu Agbato Drive, Sagamu Remo',
    features: ['Founded Feb 4, 1946', 'Pioneer secondary school in Remoland', 'RSSOSA global alumni community', 'Historic colonial-era quadrangle'],
    img: '/images/Ositelu Memorial School Gate.jpg'
  },
  {
    n: 'The 13 Confederate Quarters Heritage Trail',
    tag: 'Living History',
    tagClass: 'tag-green',
    ic: '🏛️',
    color: '#2D4A22',
    desc: 'An architectural and historic walking corridor across Offin, Makun, Sonyindo, Epe, Ibido, Igbepa, Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, and Ijagba.',
    address: 'Sagamu Central Confederation, Ogun State',
    features: ['13 historical quarters established 1872', 'Ancient quarter Baale and Oliha shrines', 'Traditional agbo-ile family compounds', 'Adire and woodcraft artisan workshops']
  },
  {
    n: 'St. Paul\'s Anglican Cathedral & Sagamu Central Mosque',
    tag: 'Spiritual Heritage',
    tagClass: 'tag-blue',
    ic: '⛪',
    color: '#1a2e5e',
    desc: 'Iconic religious landmarks located at the heart of Sagamu, standing as twin testaments to centuries of religious harmony, interfaith brotherhood, and majestic sacred architecture.',
    address: 'Ita Oba / Offin Axis, Sagamu Remo',
    features: ['Seat of the Anglican Diocese of Remo', 'Historic Central Mosque at Ita Oba', 'Centuries of peaceful coexistence', 'Annual interfaith civic celebrations']
  }
];

export default function TourismPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <SEO
        title="Tourism & Attractions"
        description="Tourist attractions in Sagamu Remo including Aafin Akarigbo Palace, Gateway International Stadium, Sabo Kolanut Market, Orisagamu Ewa Spring, and luxury hotels."
      />
      <Hero
        ey="Visit Sagamu Remo"
        ti="Tourism & Attractions"
        sub="From the sovereign seat of the Akarigbo of Remoland and the historic Sabo kolanut exchange to the Gateway International Stadium — explore the cultural and commercial heart of Remo."
      />
      <AdireDivider />
      <Section bg="#2c1a0e" py="3rem">
        <div style={{ background: 'rgba(201,150,58,.07)', border: '1px solid rgba(201,150,58,.28)', borderTop: '4px solid #C9963A', padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '3.5rem', flexShrink: 0 }}>👑</div>
            <div style={{ flex: 1 }}>
              <span className="tag tag-gold">⭐ Featured — Royal Heritage Landmark</span>
              <div className="playfair" style={{ fontSize: '1.4rem', color: '#F5EDD8', margin: '.2rem 0' }}>
                Aafin Akarigbo Palace & Cultural Heritage Complex
              </div>
              <div className="cinzel" style={{ fontSize: '.55rem', letterSpacing: '.1em', color: 'rgba(245,237,216,.45)', textTransform: 'uppercase', marginBottom: '.8rem' }}>
                Ita Oba, Offin, Sagamu · Seat of the Paramount Ruler of Remoland
              </div>
              <p style={{ fontSize: '.88rem', lineHeight: 1.85, color: 'rgba(245,237,216,.68)', marginBottom: '1rem' }}>
                The sovereign seat of HRM Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II), presiding over all 33 towns of Remoland. Experience traditional Yoruba royalty, sacred royal chambers, the Remo Traditional Council hall, and the expansive cultural amphitheatre.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="/monarchy" className="btn-p" style={{ textDecoration: 'none', fontSize: '.65rem' }}>Explore Royal Monarchy →</a>
                <a href="/map" className="btn-o" style={{ textDecoration: 'none', fontSize: '.65rem' }}>📍 View Palace on Map</a>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section bg="#1a0d06">
        <p className="sl">Discover Sagamu Remo</p>
        <h2 className="st" style={{ marginBottom: '2.5rem' }}>Attractions & Points of Interest</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(280px, 100%),1fr))', gap: '1.5rem' }}>
          {spots.map((s, i) => (
            <div
              key={i}
              className="card"
              style={{
                cursor: 'pointer',
                background: selected === i ? 'rgba(201,150,58,.09)' : 'rgba(201,150,58,.03)',
                borderLeft: `4px solid ${s.color}`,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: 'all 0.25s'
              }}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              {s.img && (
                <div style={{ height: '160px', width: '100%', overflow: 'hidden', borderBottom: '1px solid rgba(201,150,58,0.15)', position: 'relative' }}>
                  <img
                    src={s.img}
                    alt={s.n}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                    onError={(e) => { e.currentTarget.src = '/images/palace/1.jpg'; }}
                  />
                  <span className={`tag ${s.tagClass}`} style={{ position: 'absolute', top: '0.8rem', right: '0.8rem', zIndex: 10, margin: 0 }}>{s.tag}</span>
                </div>
              )}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {!s.img && <span className={`tag ${s.tagClass}`}>{s.tag}</span>}
                  <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{s.ic}</span>
                    <div className="playfair" style={{ fontSize: '1.05rem', color: '#F5EDD8', fontWeight: 600 }}>{s.n}</div>
                  </div>
                  <div style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'rgba(245,237,216,.6)', marginBottom: '0.5rem' }}>
                    {s.desc.slice(0, 110)}…
                  </div>
                </div>
                {selected === i && (
                  <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(201,150,58,.15)', paddingTop: '1rem' }}>
                    <p style={{ fontSize: '.84rem', lineHeight: 1.82, color: 'rgba(245,237,216,.7)', marginBottom: '.8rem' }}>{s.desc}</p>
                    {s.features && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '.3rem', marginBottom: '.8rem' }}>
                        {s.features.map((f, fi) => (
                          <div key={fi} style={{ fontSize: '.75rem', color: 'rgba(245,237,216,.55)', display: 'flex', gap: '.4rem' }}>
                            <span style={{ color: '#C9963A' }}>›</span><span>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {s.website && (
                      <div style={{ fontSize: '.78rem', color: 'rgba(245,237,216,.5)', marginBottom: '.25rem' }}>
                        🌐 <a href={`https://${s.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#C9963A', textDecoration: 'none' }}>{s.website}</a>
                      </div>
                    )}
                    {s.phone && <div style={{ fontSize: '.78rem', color: 'rgba(245,237,216,.5)', marginBottom: '.25rem' }}>📞 {s.phone}</div>}
                    {s.address && <div style={{ fontSize: '.78rem', color: 'rgba(245,237,216,.5)' }}>📍 {s.address}</div>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <AdireDivider />
    </div>
  );
}
