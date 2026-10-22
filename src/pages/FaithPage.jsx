import { useState } from 'react';
import Hero from '../components/Hero';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';

const festivals = [
  {
    n: 'Sagamu Day Grand Celebration',
    ic: '🎊',
    period: 'November (Annual)',
    origin: 'Initiated by Sagamu Development Association (SDA)',
    desc: 'The supreme civic and cultural carnival of Sagamu, bringing together all 13 confederate quarters, home and diaspora indigenes, royal durbars, cultural competitions, and the Miss Sagamu pageant.',
    sacred: false,
    img: '/images/sagamu-townscape.jpg'
  },
  {
    n: 'Remo Grand Agemo Festival',
    ic: '🌿',
    period: 'July–August (Annual)',
    origin: 'Ancient Yoruba religious heritage',
    desc: 'The foremost traditional festival of Remoland, honouring the sixteen sacred Alagemo deities whose ritual dances invoke peace, fertility, and community longevity.',
    sacred: true
  },
  {
    n: 'Coronation Anniversary of The Akarigbo',
    ic: '👑',
    period: 'December 7 (Annual)',
    origin: 'Royal tradition at Aafin Akarigbo',
    desc: 'Commemorating the ascension of HRM Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II), featuring interdenominational thanksgiving and chieftaincy awards.',
    sacred: false,
    img: '/images/palace/1.jpg'
  },
  {
    n: 'Balufon & Oro Festivals',
    ic: '🌙',
    period: 'Dry Season & Lunar Cycle',
    origin: 'Pre-colonial traditional custodianship',
    desc: 'Purifying traditional festivals celebrated across Offin, Makun, and confederate quarters, invoking ancestral blessings and civil tranquility.',
    sacred: true
  },
  {
    n: 'Egungun Ancestral Pageantry',
    ic: '🎭',
    period: 'Biannual / Seasonal',
    origin: 'Ancient Yoruba ancestral veneration',
    desc: 'Exuberant masquerade displays by traditional ancestral families, showcasing elaborate velvet regalia, acrobatic displays, and bata drum rhythms.',
    sacred: false,
    img: '/images/Miss Lipaka Hero.jpg'
  },
];

export default function FaithPage() {
  const [tab, setTab] = useState('faith');

  return (
    <div>
      <SEO
        title="Faith & Cultural Heritage of Sagamu"
        description="The spiritual foundations, sacred groves, historic cathedrals, grand mosques, and festivals of Sagamu Remoland."
      />
      <Hero
        ey="Spirituality & Heritage"
        ti="Faith & Culture in Sagamu"
        sub="From the historic Cathedral of the Diocese of Remo to the grand Central Mosque, Osugbo groves, and Sagamu Day festivals."
      />
      <AdireDivider />
      <Section bg="#1a0d06" py="2rem">
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['faith', '⛪ Houses of Worship & Faith'], ['festivals', '🎊 Traditional Festivals & Ceremonies']].map(([id, l]) => (
            <button key={id} className={tab === id ? 'btn-p' : 'btn-o'} onClick={() => setTab(id)}>{l}</button>
          ))}
        </div>
      </Section>

      {tab === 'faith' && (
        <Section bg="#1a0d06">
          <p className="sl">Houses of Worship</p>
          <h2 className="st" style={{ marginBottom: '2.5rem' }}>Religious Heritage in Sagamu</h2>
          
          <div style={{ padding: '2rem', background: 'rgba(201,150,58,.06)', border: '1px solid rgba(201,150,58,.28)', borderTop: '4px solid #C9963A', marginBottom: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                <div style={{ fontSize: '3rem', flexShrink: 0 }}>⛪</div>
                <div>
                  <span className="tag tag-gold">Seat of the Anglican Diocese of Remo</span>
                  <div className="playfair" style={{ fontSize: '1.3rem', color: '#F5EDD8', lineHeight: 1.2 }}>St. Paul's Anglican Cathedral, Sagamu</div>
                  <div className="cinzel" style={{ fontSize: '.55rem', letterSpacing: '.1em', color: 'rgba(245,237,216,.5)', textTransform: 'uppercase', marginTop: '.2rem' }}>Ita Oba / Akarigbo Street, Sagamu · Established 19th Century</div>
                </div>
              </div>
              <p style={{ fontSize: '.9rem', lineHeight: 1.9, color: 'rgba(245,237,216,.72)' }}>
                The mother church of the Anglican Communion across Remoland and the episcopal seat of the Bishop of Remo Diocese. For well over a century, St. Paul's has stood as a monumental beacon of faith, moral guidance, and pioneer education in Sagamu.
              </p>
            </div>
            <div style={{ width: '100%', maxWidth: '300px', height: '200px', flexShrink: 0, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(201,150,58,.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              <img src="/images/church-of-the-lord-aladura.jpg" alt="Cathedral of Remo Diocese" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem' }}>
            <div style={{ padding: '1.5rem', background: 'rgba(201,150,58,.04)', border: '1px solid rgba(201,150,58,.15)', borderTop: '3px solid #7A2E0E', minHeight: '260px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '.6rem' }}>🕌</div>
              <span className="tag tag-terra">Islamic Mother Mosque</span>
              <div className="playfair" style={{ fontSize: '1.05rem', color: '#F5EDD8', marginBottom: '.5rem' }}>Sagamu Central Mosque (Ita Oba)</div>
              <div style={{ fontSize: '.82rem', lineHeight: 1.75, color: 'rgba(245,237,216,.6)', marginBottom: '1rem' }}>
                Seat of the Chief Imam of Remoland and League of Imams. A monumental Islamic sanctuary where royal prayers and weekly Juma'at services unify the community.
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(201,150,58,.04)', border: '1px solid rgba(201,150,58,.15)', borderTop: '3px solid #C9963A', minHeight: '260px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '.6rem' }}>⛪</div>
              <span className="tag tag-gold">Historic Methodist Cathedral</span>
              <div className="playfair" style={{ fontSize: '1.05rem', color: '#F5EDD8', marginBottom: '.5rem' }}>Methodist Cathedral of Peace, Offin</div>
              <div style={{ fontSize: '.82rem', lineHeight: 1.75, color: 'rgba(245,237,216,.6)', marginBottom: '1rem' }}>
                One of the foundational Christian missions in Remo, established in the late 19th century and instrumental in spreading literacy and Western education.
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(201,150,58,.04)', border: '1px solid rgba(201,150,58,.15)', borderTop: '3px solid #2D4A22', minHeight: '260px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '.6rem' }}>🌾</div>
              <span className="tag tag-green">Intercultural Mosque</span>
              <div className="playfair" style={{ fontSize: '1.05rem', color: '#F5EDD8', marginBottom: '.5rem' }}>Sabo Central Mosque</div>
              <div style={{ fontSize: '.82rem', lineHeight: 1.75, color: 'rgba(245,237,216,.6)', marginBottom: '1rem' }}>
                Serving the bustling Sabo international kolanut trading community, fostering mutual brotherhood between northern and southwestern Nigerians for over a century.
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(201,150,58,.04)', border: '1px solid rgba(201,150,58,.15)', borderTop: '3px solid #C9963A', minHeight: '260px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '.6rem' }}>🌿</div>
              <span className="tag tag-gold">Sacred Ancestral Groves</span>
              <div className="playfair" style={{ fontSize: '1.05rem', color: '#F5EDD8', marginBottom: '.5rem' }}>Osugbo & Orisagamu Sacred Shrines</div>
              <div style={{ fontSize: '.82rem', lineHeight: 1.75, color: 'rgba(245,237,216,.6)', marginBottom: '1rem' }}>
                Ancient custodian groves of the Osugbo Remo council and the historic Orisagamu spring where founding ancestors received divine omens of unity.
              </div>
            </div>
          </div>
        </Section>
      )}

      {tab === 'festivals' && (
        <Section bg="#1a0d06">
          <p className="sl">Ceremonial Calendar</p>
          <h2 className="st" style={{ marginBottom: '2.5rem' }}>Festivals of Sagamu</h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {festivals.map((f, i) => (
              <div key={i} style={{ padding: '1.8rem', background: 'rgba(201,150,58,.04)', border: '1px solid rgba(201,150,58,.15)', borderLeft: '4px solid #C9963A', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center', marginBottom: '.5rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>{f.ic}</span>
                    <div>
                      <h3 className="playfair" style={{ fontSize: '1.25rem', color: '#F0D080', margin: 0 }}>{f.n}</h3>
                      <div className="cinzel" style={{ fontSize: '.52rem', color: 'rgba(201,150,58,.8)', letterSpacing: '.08em' }}>{f.period} · {f.origin}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '.85rem', lineHeight: 1.75, color: 'rgba(245,237,216,.7)', margin: 0 }}>{f.desc}</p>
                </div>
                {f.img && (
                  <div style={{ width: '100%', maxWidth: '240px', height: '140px', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(201,150,58,.2)', flexShrink: 0 }}>
                    <img src={f.img} alt={f.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
