import { useState } from 'react';
import Hero from '../components/Hero';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';

const schools = [
  {
    name: 'Remo Secondary School (RSS Sagamu)',
    tag: 'Pioneer Secondary Academy · Est. 1946',
    tagClass: 'tag-blue',
    ic: '🏫',
    founded: 'Founded 1946 under royal patronage of Oba William Christopher Adedoyin II',
    desc: 'The flagship and first secondary school in Remoland. RSS has nurtured generations of distinguished jurists, medical pioneers, corporate captains, and state governors.',
    motto: '"The Utmost for the Highest"',
    alumni: 'RSSOSA Global (Remo Secondary School Old Students Association)',
    address: 'Akarigbo Street, Sagamu, Ogun State',
    facts: [
      'First secondary school in all of Remoland',
      'Celebrating over 80 years of academic excellence',
      'Extensive science laboratories and ICT research centers'
    ],
    img: '/images/OSitelu Memorial College.jpeg'
  },
  {
    name: 'Federal Government Girls\' College (FGGC) Sagamu',
    tag: 'Federal Unity College · Est. 1977',
    tagClass: 'tag-gold',
    ic: '🏛️',
    founded: 'Established by the Federal Government of Nigeria in 1977',
    desc: 'A leading national unity institution dedicated to nurturing women leaders, STEM champions, and exceptional academic scholars from across all 36 states of Nigeria.',
    motto: '"Pro Unitate — For Unity and Service"',
    alumni: 'FGGC Sagamu Old Girls Association (FGGCSOGA)',
    address: 'Offin Quarter, Sagamu, Ogun State',
    facts: [
      'Premier girls unity secondary school in Ogun State',
      'Outstanding performances in WAEC, NECO, and National Olympiads',
      'State-of-the-art boarding and robotics facilities'
    ],
    img: '/images/ositelu-memorial-college-building.jpg'
  },
  {
    name: 'OOU College of Health Sciences & OOUTH Medical Academy',
    tag: 'Tertiary Medical School · Est. 1986',
    tagClass: 'tag-terra',
    ic: '🩺',
    founded: 'Commissioned under the administration of Governor Bisi Onabanjo',
    desc: 'Premier university medical college producing world-class physicians, surgeons, pediatricians, and biomedical research scientists.',
    motto: '"Excellence in Healthcare & Medical Research"',
    alumni: 'OOUTH Medical Doctors & Resident Surgeons Association',
    address: 'Hospital Road, Sagamu, Ogun State',
    facts: [
      'Fully accredited by the Medical and Dental Council of Nigeria (MDCN)',
      'Direct clinical affiliations with international teaching hospitals',
      '24/7 tertiary trauma and surgical training center'
    ],
    img: '/images/church-of-the-lord-aladura.jpg'
  },
  {
    name: 'Methodist Comprehensive College & Muslim High School',
    tag: 'Historic Community Colleges',
    tagClass: 'tag-green',
    ic: '🌱',
    founded: 'Pioneered by early Christian and Islamic educational initiatives in Sagamu',
    desc: 'Renowned community secondary schools providing moral, scientific, and vocational learning to thousands of students across the 13 confederate quarters.',
    motto: '"Knowledge, Character, and Community Service"',
    alumni: 'Joint Sagamu Alumni Networks',
    address: 'Makun & Sabo Quarters, Sagamu, Ogun State',
    facts: [
      'Over six decades of continuous civic learning',
      'Active vocational training workshops and athletic teams'
    ],
    img: '/images/EmmanuelNarroway Academy.jpg'
  },
];

const notable = [
  {
    n: 'Anthony Oluwafemi Joshua, OBE',
    y: 'Contemporary',
    tag: 'Two-time Unified World Heavyweight Champion',
    ic: '🥊',
    desc: 'World-renowned boxer who proudly traces his ancestral lineage to Sagamu. An inspiration to youth worldwide who actively supports education and sports initiatives in Remoland.',
  },
  {
    n: 'His Excellency Otunba Gbenga Daniel',
    y: 'Contemporary',
    tag: 'Two-Term Executive Governor of Ogun State & Senator',
    ic: '🏛️',
    desc: 'Distinguished engineer, industrialist, and statesman hailing from Makun-Sagamu. Spearheaded massive infrastructural and tertiary educational modernization across Ogun State.',
  },
  {
    n: 'Chief Timothy Adeola Odutola, CFR, OBE',
    y: '1902 – 1995',
    tag: 'Pioneer Industrialist & Benefactor',
    ic: '🏭',
    desc: 'Legendary industrial titan, pioneer President of the Manufacturers Association of Nigeria (MAN), and historic champion of secondary education across Remo and Ijebu.',
  },
  {
    n: 'HRM Oba Babatunde Adewale Ajayi, CFR, FCA',
    y: '2017 – Present',
    tag: 'The Akarigbo of Remoland · Torungbuwa II',
    ic: '👑',
    desc: 'Chartered Accountant, Supreme Court Barrister, and Paramount Ruler under whose leadership multimillion-naira STEM scholarships have been endowed across Sagamu.',
    img: '/images/palace/1.jpg'
  },
];

export default function EducationPage() {
  const [tab, setTab] = useState('schools');

  return (
    <div>
      <SEO
        title="Education in Sagamu"
        description="Pioneer educational institutions in Sagamu including Remo Secondary School (RSS), FGGC Sagamu, and OOUTH College of Health Sciences."
      />
      <Hero
        ey="Knowledge & Legacy"
        ti="Education in Sagamu Remoland"
        sub="From Remo Secondary School (est. 1946) to federal colleges and medical faculties — the pillars that educate Sagamu's brilliant minds."
      />
      <AdireDivider />
      <Section bg="#1a0d06" py="2rem">
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['schools', '🏫 Schools & Colleges'], ['notable', '🌟 Notable Pioneers & Alumni']].map(([id, l]) => (
            <button key={id} className={tab === id ? 'btn-p' : 'btn-o'} onClick={() => setTab(id)}>{l}</button>
          ))}
        </div>
      </Section>

      {tab === 'schools' && (
        <Section bg="#1a0d06">
          <p className="sl">Educational Institutions</p>
          <h2 className="st" style={{ marginBottom: '2.5rem' }}>Pillar Institutions of Sagamu</h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {schools.map((s, i) => (
              <div key={i} style={{ padding: '2rem', background: 'rgba(201,150,58,.04)', border: '1px solid rgba(201,150,58,.18)', borderLeft: '4px solid #C9963A', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: '1', minWidth: '280px' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>{s.ic}</div>
                    <div>
                      <span className={`tag ${s.tagClass}`}>{s.tag}</span>
                      <div className="playfair" style={{ fontSize: '1.25rem', color: '#F5EDD8' }}>{s.name}</div>
                      <div style={{ fontSize: '.75rem', color: 'rgba(201,150,58,.6)', fontStyle: 'italic' }}>{s.founded}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '.88rem', lineHeight: 1.85, color: 'rgba(245,237,216,.7)', marginBottom: '1.1rem' }}>{s.desc}</p>
                  <div style={{ background: 'rgba(201,150,58,.07)', border: '1px solid rgba(201,150,58,.15)', padding: '.8rem 1.1rem', marginBottom: '1rem', borderLeft: '3px solid #C9963A' }}>
                    <div className="cinzel" style={{ fontSize: '.52rem', letterSpacing: '.1em', color: 'rgba(201,150,58,.7)', textTransform: 'uppercase', marginBottom: '.3rem' }}>Motto</div>
                    <div className="playfair" style={{ fontStyle: 'italic', fontSize: '.9rem', color: '#F0D080' }}>{s.motto}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: '.5rem', marginBottom: '1rem' }}>
                    {s.facts.map((fact, fi) => (
                      <div key={fi} style={{ display: 'flex', gap: '.5rem', fontSize: '.78rem', color: 'rgba(245,237,216,.6)' }}>
                        <span style={{ color: '#C9963A', flexShrink: 0 }}>›</span><span>{fact}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid rgba(201,150,58,.1)', paddingTop: '.8rem' }}>
                    <div style={{ fontSize: '.75rem', color: 'rgba(245,237,216,.4)' }}>🎓 {s.alumni}</div>
                    <div style={{ fontSize: '.75rem', color: 'rgba(245,237,216,.4)', marginTop: '.25rem' }}>📍 {s.address}</div>
                  </div>
                </div>
                {s.img && (
                  <div style={{ width: '100%', maxWidth: '260px', height: '190px', flexShrink: 0, borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(201,150,58,.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                    <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {tab === 'notable' && (
        <Section bg="#1a0d06">
          <p className="sl">Distinguished Leaders & Pioneers</p>
          <h2 className="st" style={{ marginBottom: '2.5rem' }}>Notable People of Sagamu</h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {notable.map((p, i) => (
              <div key={i} style={{ padding: '2rem', background: 'rgba(201,150,58,.05)', border: '1px solid rgba(201,150,58,.2)', borderLeft: '4px solid #C9963A', display: 'flex', gap: '1.5rem', alignItems: 'start', flexWrap: 'wrap' }}>
                <div style={{ flexShrink: 0, width: 80, height: 80, borderRadius: '50%', border: '2px solid #C9963A', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(201,150,58,.1)', fontSize: '2.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                  {p.img ? (
                    <img src={p.img} alt={p.n} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    p.ic
                  )}
                </div>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <span className="tag tag-gold" style={{ marginBottom: '.4rem', display: 'inline-block' }}>{p.tag}</span>
                  <div className="playfair" style={{ fontSize: '1.15rem', color: '#F5EDD8', marginBottom: '.15rem' }}>{p.n}</div>
                  <div className="cinzel" style={{ fontSize: '.52rem', letterSpacing: '.1em', color: 'rgba(240,208,128,.65)', textTransform: 'uppercase', marginBottom: '.7rem' }}>{p.y}</div>
                  <p style={{ fontSize: '.86rem', lineHeight: 1.85, color: 'rgba(245,237,216,.68)' }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
