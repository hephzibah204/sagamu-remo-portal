import { useState } from 'react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import SEO from '../components/SEO';

const festivals = [
  {
    n: 'Sagamu Day Grand Celebration',
    ic: '🎊',
    period: 'November (Annual)',
    origin: 'Initiated by Sagamu Development Association (SDA)',
    desc: 'The supreme civic and cultural carnival of Sagamu, bringing together all 13 confederate quarters, home and diaspora indigenes, royal durbars, cultural competitions, and the Miss Sagamu pageant.',
    tag: 'Civic & Cultural Summit',
    tagClass: 'badge-blue',
    img: '/images/sagamu-townscape.jpg'
  },
  {
    n: 'Remo Grand Agemo Festival',
    ic: '🌿',
    period: 'July–August (Annual)',
    origin: 'Ancient Yoruba religious heritage',
    desc: 'The foremost traditional festival of Remoland, honouring the sixteen sacred Alagemo deities whose ritual dances invoke peace, fertility, and community longevity across all 13 quarters.',
    tag: 'Sacred Custodianship',
    tagClass: 'badge-emerald',
  },
  {
    n: 'Coronation Anniversary of The Akarigbo',
    ic: '👑',
    period: 'December 7 (Annual)',
    origin: 'Royal tradition at Aafin Akarigbo',
    desc: 'Commemorating the ascension of HRM Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II), featuring interdenominational thanksgiving and chieftaincy awards.',
    tag: 'Royal Durbar',
    tagClass: 'badge-blue',
    img: '/images/palace/1.jpg'
  },
  {
    n: 'Balufon & Oro Festivals',
    ic: '🌙',
    period: 'Dry Season & Lunar Cycle',
    origin: 'Pre-colonial traditional custodianship',
    desc: 'Purifying traditional festivals celebrated across Offin, Makun, and confederate quarters, invoking ancestral blessings and civil tranquility.',
    tag: 'Ancestral Rites',
    tagClass: 'badge-emerald',
  },
  {
    n: 'Egungun Ancestral Pageantry',
    ic: '🎭',
    period: 'Biannual / Seasonal',
    origin: 'Ancient Yoruba ancestral veneration',
    desc: 'Exuberant masquerade displays by traditional ancestral families, showcasing elaborate velvet regalia, acrobatic displays, and bata drum rhythms.',
    tag: 'Living Folklore',
    tagClass: 'badge-blue',
    img: '/images/sagamu-townscape.jpg'
  },
];

const institutions = [
  {
    name: "St. Paul's Anglican Cathedral, Sagamu",
    category: "Anglican Diocese of Remo",
    address: "Ita Oba / Akarigbo Street, Sagamu",
    era: "Episcopal Seat of the Bishop of Remo",
    desc: "The mother church of the Anglican Communion across Remoland and the episcopal seat of the Bishop of Remo Diocese. For well over a century, St. Paul's has stood as a monumental beacon of faith, moral guidance, and pioneer education in Sagamu.",
    icon: "⛪",
    type: "cathedral",
    img: "/images/palace/3.jpg"
  },
  {
    name: "Sagamu Central Mosque (Ita Oba)",
    category: "Mother Mosque of Remoland",
    address: "Central Square, Ita Oba, Sagamu",
    era: "Seat of Chief Imam of Remoland",
    desc: "Seat of the Chief Imam of Remoland and League of Imams. A monumental Islamic sanctuary where royal prayers and weekly Juma'at services unify the community in prayers for tranquility and civic prosperity.",
    icon: "🕌",
    type: "islamic"
  },
  {
    name: "Methodist Cathedral of Peace, Offin",
    category: "Methodist Church Nigeria",
    address: "Offin Quarter, Sagamu",
    era: "Historic 19th Century Mission",
    desc: "One of the foundational Christian missions in Remo, established in the late 19th century and instrumental in spreading literacy, music, and Western secondary education across the confederacy.",
    icon: "⛪",
    type: "cathedral"
  },
  {
    name: "Sabo Central Mosque",
    category: "Intercultural Kolanut Hub",
    address: "Sabo Trade District, Sagamu",
    era: "Cross-Regional Unity Center",
    desc: "Serving the bustling Sabo international kolanut trading community, fostering mutual brotherhood between northern and southwestern Nigerian traders and residents for over a century.",
    icon: "🌾",
    type: "islamic"
  },
  {
    name: "Osugbo & Orisagamu Sacred Groves",
    category: "Ancestral Custodianship",
    address: "Ancient Sanctuary Belt, Sagamu",
    era: "Pre-Colonial Foundation",
    desc: "Ancient custodian groves of the Osugbo Remo council and the historic Orisagamu spring where founding ancestors received divine omens of unity to bind the 13 sovereign communities.",
    icon: "🌿",
    type: "traditional"
  }
];

export default function FaithPage() {
  const [tab, setTab] = useState('faith');

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      <SEO
        title="Faith & Cultural Heritage of Sagamu"
        description="The spiritual foundations, sacred groves, historic cathedrals, grand mosques, and festivals of Sagamu Remoland."
      />

      {/* Modern Clean Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #059669 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.35rem 0.85rem', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <span>🏛️</span> Religious Harmonization & Sacred Heritage
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Faith, Harmony & Cultural Heritage
          </h1>
          <p style={{ marginTop: '0.75rem', fontSize: '1.05rem', color: '#e2e8f0', maxWidth: 700, lineHeight: 1.6 }}>
            The spiritual foundations of Sagamu Remoland: From the historic Anglican Diocese Cathedral to the grand Central Mosque, Osugbo groves, and the annual Sagamu Day carnivals.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem' }}>
            <button
              onClick={() => setTab('faith')}
              style={{
                background: tab === 'faith' ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: tab === 'faith' ? '#1e3a8a' : '#ffffff',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '0.5rem',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>⛪</span> Houses of Worship & Heritage
            </button>
            <button
              onClick={() => setTab('festivals')}
              style={{
                background: tab === 'festivals' ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: tab === 'festivals' ? '#1e3a8a' : '#ffffff',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '0.5rem',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>🎊</span> Festivals & Ceremonial Calendar
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
        {tab === 'faith' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Spiritual Landscape</div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0 0.5rem' }}>Centuries of Peaceful Coexistence</h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, maxWidth: 650 }}>
                Sagamu has historically served as a benchmark for religious peace in Nigeria, where royal palace celebrations integrate traditional custodians, Christian prelates, and Islamic scholars.
              </p>
            </div>

            {/* Featured Cathedral Card */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              <div style={{ padding: '2.25rem' }}>
                <div style={{ display: 'inline-block', background: '#eff6ff', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Primary Cathedral Seat
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem' }}>
                  {institutions[0].name}
                </h3>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#059669', marginBottom: '1rem' }}>
                  📍 {institutions[0].address} · {institutions[0].era}
                </div>
                <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
                  {institutions[0].desc}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ background: '#f1f5f9', color: '#334155', padding: '0.25rem 0.6rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>Diocese Headquarters</span>
                  <span style={{ background: '#f1f5f9', color: '#334155', padding: '0.25rem 0.6rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>Anglican Communion</span>
                  <span style={{ background: '#f1f5f9', color: '#334155', padding: '0.25rem 0.6rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>Civic Landmark</span>
                </div>
              </div>
              <div style={{ background: '#f8fafc', borderLeft: '1px solid #f1f5f9', minHeight: 240, overflow: 'hidden' }}>
                <img src={institutions[0].img} alt="Palace & Cathedral Axis" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Grid of Other Religious Sanctuaries */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {institutions.slice(1).map((item, idx) => (
                <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
                      <span style={{ background: item.type === 'islamic' ? '#ecfdf5' : '#eff6ff', color: item.type === 'islamic' ? '#047857' : '#1e40af', padding: '0.2rem 0.6rem', borderRadius: 999, fontSize: '0.7rem', fontWeight: 700 }}>
                        {item.category}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.35rem' }}>{item.name}</h4>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500, marginBottom: '0.75rem' }}>📍 {item.address}</div>
                    <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                  </div>
                  <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                    {item.era}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'festivals' && (
          <div>
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ceremonial Rhythms</div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0 0.5rem' }}>Sagamu Festivals & Civic Calendar</h2>
              <p style={{ color: '#64748b', fontSize: '0.95rem', margin: 0, maxWidth: 650 }}>
                A vibrant yearly cycle celebrating sovereign roots, sacred deities, royal continuity, and community thanksgiving across all 13 quarters.
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {festivals.map((f, i) => (
                <div key={i} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.75rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.8rem' }}>{f.ic}</span>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>{f.n}</h3>
                          <span style={{ background: f.tagClass === 'badge-emerald' ? '#ecfdf5' : '#eff6ff', color: f.tagClass === 'badge-emerald' ? '#047857' : '#1e40af', padding: '0.15rem 0.55rem', borderRadius: 999, fontSize: '0.68rem', fontWeight: 700 }}>
                            {f.tag}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600, marginTop: '0.2rem' }}>
                          📅 {f.period} · {f.origin}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.88rem', lineHeight: 1.65, color: '#475569', margin: '0.75rem 0 0' }}>{f.desc}</p>
                  </div>
                  {f.img && (
                    <div style={{ width: '100%', maxWidth: '240px', height: '140px', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #e2e8f0', flexShrink: 0 }}>
                      <img src={f.img} alt={f.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
