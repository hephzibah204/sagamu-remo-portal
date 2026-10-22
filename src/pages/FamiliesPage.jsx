import { useState } from 'react';
import Hero from '../components/Hero';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';

const families = [
  {
    id: 'torungbuwa',
    ic: '👑',
    name: 'The Torungbuwa Royal Dynasty',
    compound: 'Aafin Akarigbo Royal Court',
    ward: 'Offin Quarter',
    tag: 'Sovereign Royal House · Governance',
    tagClass: 'tag-gold',
    accent: '#C9963A',
    summary: 'One of the two recognized paramount ruling houses of the Akarigbo of Remoland.',
    desc: 'The Torungbuwa Ruling House is an ancient royal lineage tracing its heritage directly to the royal crowned princes of Ile-Ife. It produced the visionary colonial-era monarch Oba William Christopher Adedoyin II (reigned 1916–1952) who pioneered Western education in Remoland, and currently reigns through His Royal Majesty Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II).',
    members: [
      { n: 'HRM Oba Babatunde Adewale Ajayi, CFR, FCA', r: 'Reigning Akarigbo of Remoland (Torungbuwa II · 2017–Present)' },
      { n: 'Oba William Christopher Adedoyin II', r: 'Historic Akarigbo (1916–1952) · Patron of Remo Secondary School (1946)' },
      { n: 'Oba Oyebajo', r: 'Akarigbo of Remoland (1891–1899) · Treaty Negotiator' }
    ],
    img: '/images/palace/1.jpg'
  },
  {
    id: 'anoko',
    ic: '🌿',
    name: 'The Anoko Royal Dynasty',
    compound: 'Erinwole & Erinjugbo Royal Houses',
    ward: 'Offin Quarter',
    tag: 'Sovereign Royal House · Modernization',
    tagClass: 'tag-terra',
    accent: '#7A2E0E',
    summary: 'The historic royal dynasty that guided Sagamu through Nigeria\'s independence and 20th-century economic resurgence.',
    desc: 'The Anoko Ruling House has produced some of the most revered monarchs in Yoruba history. Oba Moses Awolesi (Erinwole II) reigned for 36 prosperous years (1952–1988), bringing WAPCO Elephant Cement and OOUTH to Sagamu. He was succeeded by Oba Dr. Michael Adeniyi Sonariwo, CON (Erinjugbo II), who reigned for 26 transformative years (1990–2016).',
    members: [
      { n: 'Oba Dr. Michael Adeniyi Sonariwo, CON', r: 'Erinjugbo II · Reigned 1990–2016 (26 Years) · Former Chairman Ogun State Council of Obas' },
      { n: 'Oba Moses Awolesi', r: 'Erinwole II · Reigned 1952–1988 (36 Years) · Independence Era Titan' },
      { n: 'Oba Adebonojo', r: 'Akarigbo of Remoland (1899–1915)' }
    ],
    img: '/images/OLSAGAMU-OF-SAGAMU-OBA OGUNBADE.jpg'
  },
  {
    id: 'daniel',
    ic: '🏛️',
    name: 'The Daniel Family of Makun',
    compound: 'Makun Confederate Quarter',
    ward: 'Makun Ward',
    tag: 'Statesmanship · Engineering · Public Service',
    tagClass: 'tag-blue',
    accent: '#1a2e5e',
    summary: 'A distinguished patriotic family whose son governed Ogun State and serves in the Nigerian Senate.',
    desc: 'Based in the historic Makun confederate quarter of Sagamu, the Daniel family has contributed immensely to modern governance, engineering excellence, and philanthropy. Most notably, His Excellency Otunba Gbenga Daniel (OGD) served two terms as the Executive Governor of Ogun State (2003–2011) and currently represents Ogun East in the Senate of the Federal Republic.',
    members: [
      { n: 'His Excellency Otunba Gbenga Daniel (OGD)', r: 'Two-Term Executive Governor of Ogun State (2003–2011) · Senator of Nigeria' },
      { n: 'The Daniel Ancestral Estate', r: 'Prominent civic philanthropy center and educational scholarship foundation' }
    ],
  },
  {
    id: 'joshua',
    ic: '🥊',
    name: 'The Joshua Family of Sagamu',
    compound: 'Sagamu Central / Offin Corridor',
    ward: 'Offin Ward',
    tag: 'Global Sporting Glory · Youth Mentorship',
    tagClass: 'tag-green',
    accent: '#2D4A22',
    summary: 'The proud ancestral family of global boxing icon Anthony Joshua, OBE.',
    desc: 'The Joshua family of Sagamu is an ancestral clan with deep roots in commerce, education, and community development. The family gained worldwide acclaim through Anthony Oluwafemi Joshua, OBE, two-time Unified World Heavyweight Boxing Champion, whose proud celebration of his Sagamu roots has inspired millions of Nigerian youths.',
    members: [
      { n: 'Anthony Oluwafemi Olaseni Joshua, OBE', r: 'Two-Time Unified World Heavyweight Boxing Champion (WBA, IBF, WBO, IBO)' },
      { n: 'The Joshua Family Estate', r: 'Sagamu community youth sports and philanthropic supporters' }
    ],
    img: '/images/David Alaba Foundation.jpg'
  },
];

export default function FamiliesPage() {
  const [active, setActive] = useState(null);

  return (
    <div>
      <SEO
        title="Notable Families of Sagamu"
        description="The royal lineages, founding patriarchs, and distinguished families of Sagamu including Torungbuwa, Anoko, Daniel, and Joshua families."
      />
      <Hero
        ey="Lineage & Legacy"
        ti="Notable Families of Sagamu"
        sub="The great dynasties—royal, civic, industrial—whose names are woven into the streets, monuments, and soul of Sagamu Remoland."
      />
      <AdireDivider />
      <Section bg="#0A0F1D" py="3rem">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '1rem' }}>
          {families.map(f => (
            <button
              key={f.id}
              onClick={() => setActive(active === f.id ? null : f.id)}
              style={{
                background: active === f.id ? 'rgba(201,150,58,.12)' : 'rgba(201,150,58,.04)',
                border: `1px solid ${active === f.id ? 'rgba(201,150,58,.55)' : 'rgba(201,150,58,.15)'}`,
                borderTop: `3px solid ${f.accent}`,
                padding: '1.4rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all .2s',
                borderRadius: 4
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>{f.ic}</div>
              <div className="playfair" style={{ fontSize: '1.05rem', color: '#F5EDD8', lineHeight: 1.2, marginBottom: '.3rem' }}>{f.name}</div>
              <div className="cinzel" style={{ fontSize: '.5rem', letterSpacing: '.09em', color: 'rgba(201,150,58,.7)', textTransform: 'uppercase', marginBottom: '.6rem' }}>{f.compound}</div>
              <span className={`tag ${f.tagClass}`} style={{ fontSize: '.46rem' }}>{f.tag}</span>
            </button>
          ))}
        </div>
      </Section>

      {families.map(f => active === f.id && (
        <Section key={f.id} bg="#0F172A">
          <div style={{ borderTop: `4px solid ${f.accent}`, background: 'rgba(201,150,58,.04)', border: '1px solid rgba(201,150,58,.2)', padding: '2.5rem', borderRadius: 4 }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem' }}>
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', flexWrap: 'wrap', flex: 1, minWidth: '280px' }}>
                <div style={{ fontSize: '3rem', flexShrink: 0 }}>{f.ic}</div>
                <div style={{ flex: 1 }}>
                  <span className={`tag ${f.tagClass}`} style={{ marginBottom: '.5rem', display: 'inline-block' }}>{f.tag}</span>
                  <div className="playfair" style={{ fontSize: '1.6rem', color: '#F5EDD8', lineHeight: 1.15, marginBottom: '.25rem' }}>{f.name}</div>
                  <div className="cinzel" style={{ fontSize: '.55rem', letterSpacing: '.12em', color: 'rgba(201,150,58,.6)', textTransform: 'uppercase' }}>{f.compound} · {f.ward}</div>
                </div>
              </div>
              {f.img && (
                <div style={{ width: 100, height: 100, borderRadius: '50%', border: '3px solid #C9963A', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.3)', flexShrink: 0 }}>
                  <img src={f.img} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>
            <div style={{ background: 'rgba(201,150,58,.08)', borderLeft: '4px solid #C9963A', padding: '1rem 1.4rem', marginBottom: '1.8rem', fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '1rem', color: '#F0D080', lineHeight: 1.7 }}>
              "{f.summary}"
            </div>
            <p style={{ fontSize: '.9rem', lineHeight: 1.92, color: 'rgba(245,237,216,.72)', marginBottom: '2rem' }}>{f.desc}</p>
            <div className="cinzel" style={{ fontSize: '.6rem', letterSpacing: '.18em', color: '#C9963A', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Key Members & Historical Legacy
            </div>
            <div style={{ display: 'grid', gap: '.7rem' }}>
              {f.members.map((m, mi) => (
                <div key={mi} style={{ display: 'flex', gap: '1rem', padding: '1rem 1.2rem', background: 'rgba(201,150,58,.04)', border: '1px solid rgba(201,150,58,.12)', borderLeft: `3px solid ${f.accent}`, alignItems: 'flex-start' }}>
                  <span style={{ color: f.accent, fontSize: '1rem', flexShrink: 0, marginTop: '.1rem' }}>›</span>
                  <div>
                    <div className="playfair" style={{ fontSize: '1rem', color: '#F5EDD8', fontWeight: 600 }}>{m.n}</div>
                    <div style={{ fontSize: '.8rem', color: 'rgba(245,237,216,.6)', marginTop: '.2rem' }}>{m.r}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      ))}
    </div>
  );
}
