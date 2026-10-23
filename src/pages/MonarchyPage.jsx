import { kings, notableDescendants, rulingHouses, achievements } from '../data/kings';
import Hero from '../components/Hero';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';

export default function MonarchyPage() {
  const currentKing = kings.find(k => k.cur) || kings[kings.length - 1];
  const pastKings = kings.filter(k => !k.cur);

  return (
    <div>
      <SEO
        title="The Monarchy of Remoland"
        description="The sacred royal institution of The Akarigbo of Remoland — Paramount Ruler, President of the Remo Traditional Council, and fountain of honour in Sagamu."
      />
      <Hero
        ey="Royal Institution"
        ti="The Monarchy of Sagamu & Remoland"
        sub="The Akarigbo of Remoland — Paramount Ruler, President of the Remo Traditional Council, and Sovereign Fountain of Honour."
      />
      <AdireDivider />

      <Section bg="#0A0F1D">
        <p className="sl">Reigning Monarch</p>
        <h2 className="st">HRM Oba Babatunde Adewale Ajayi, CFR, FCA — Torungbuwa II</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '2.5rem', marginTop: '1.5rem', alignItems: 'start' }}>
          <div style={{ background: 'rgba(201,150,58,.08)', border: '1px solid rgba(201,150,58,.28)', padding: '2rem', textAlign: 'center', borderTop: '4px solid #C9963A' }}>
            <img src="/images/palace/akarigbo-king.jpg" alt="HRM Oba Babatunde Adewale Ajayi, CFR, FCA" style={{ width: '100%', maxWidth: 220, aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'center top', borderRadius: '50%', border: '3px solid #C9963A', marginBottom: '.7rem', margin: '0 auto' }} />
            <div className="cinzel" style={{ fontSize: '.58rem', letterSpacing: '.12em', color: '#C9963A', textTransform: 'uppercase' }}>The Akarigbo of Remoland</div>
            <div className="playfair" style={{ fontSize: '1.05rem', color: '#F5EDD8', margin: '.5rem 0 .2rem' }}>Oba Babatunde Adewale Ajayi</div>
            <div className="cinzel" style={{ fontSize: '.52rem', color: 'rgba(245,237,216,.45)', letterSpacing: '.08em' }}>Torungbuwa II · CFR · FCA · Barrister-at-Law</div>
            <div style={{ height: 1, background: 'rgba(201,150,58,.18)', margin: '1rem 0' }} />
            {[['Coronated', 'December 7, 2017'], ['Ruling House', 'Torungbuwa Ruling House'], ['Title', 'Akarigbo & Paramount Ruler of Remoland'], ['Status', 'President, Remo Traditional Council']].map(([k, v]) => (
              <div key={k} style={{ marginBottom: '.45rem' }}>
                <div className="cinzel" style={{ fontSize: '.5rem', letterSpacing: '.08em', color: 'rgba(201,150,58,.5)', textTransform: 'uppercase' }}>{k}</div>
                <div style={{ fontSize: '.82rem', color: 'rgba(245,237,216,.7)' }}>{v}</div>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: '.9rem', lineHeight: 1.9, color: 'rgba(245,237,216,.7)', marginBottom: '1.1rem' }}>
              His Royal Majesty Oba Babatunde Adewale Ajayi, CFR, FCA, ascended the sacred throne of the Akarigbo of Remoland in December 2017. A distinguished Fellow of the Institute of Chartered Accountants of Nigeria (ICAN) and a seasoned Barrister and Solicitor of the Supreme Court of Nigeria, Kabiyesi brings an extraordinary blend of professional acumen, legal mastery, and royal dignity to the throne.
            </p>
            <p style={{ fontSize: '.9rem', lineHeight: 1.9, color: 'rgba(245,237,216,.7)', marginBottom: '1.3rem' }}>
              Under his visionary reign, Sagamu and Remoland have experienced a monumental renaissance. He commissioned the ultra-modern Aafin Akarigbo Palace Complex, played a pivotal leadership role in the development of the Gateway International Agro-Cargo Airport corridor, launched multi-million-naira educational scholarship funds, and revitalized traditional unity across the 13 confederate quarters of Sagamu and all 33 towns of Remoland.
            </p>
            
            <div className="cinzel" style={{ fontSize: '.63rem', letterSpacing: '.14em', color: '#C9963A', textTransform: 'uppercase', marginBottom: '1rem' }}>Key Royal Accomplishments</div>
            {achievements.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: '.9rem', padding: '.68rem 1rem', background: 'rgba(201,150,58,.04)', border: '1px solid rgba(201,150,58,.1)', borderLeft: '3px solid #C9963A', marginBottom: '.5rem' }}>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{a.ic}</span>
                <div>
                  <div className="cinzel" style={{ fontSize: '.52rem', letterSpacing: '.08em', color: '#C9963A', textTransform: 'uppercase' }}>{a.d}</div>
                  <div style={{ fontSize: '.8rem', lineHeight: 1.62, color: 'rgba(245,237,216,.65)' }}>{a.t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div style={{ background: 'rgba(201,150,58,.04)', padding: '1px 0' }}><AdireDivider thin /></div>

      <Section bg="#0F172A">
        <p className="sl">Ancestral Sovereignty</p>
        <h2 className="st">The Royal Ruling Houses of the Akarigbo</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginTop: '1.5rem' }}>
          {rulingHouses.map(([icon, title, desc], idx) => (
            <div key={idx} style={{ background: 'rgba(201,150,58,.04)', border: '1px solid rgba(201,150,58,.18)', borderTop: '3px solid #C9963A', padding: '1.5rem', borderRadius: 3 }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '.5rem' }}>{icon}</div>
              <h3 className="playfair" style={{ fontSize: '1.1rem', color: '#F0D080', marginBottom: '.5rem' }}>{title}</h3>
              <p style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'rgba(245,237,216,.65)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <div style={{ background: 'rgba(201,150,58,.04)', padding: '1px 0' }}><AdireDivider thin /></div>

      <Section bg="#0A0F1D">
        <p className="sl">Chronicle of Monarchs</p>
        <h2 className="st">Illustrious Past Akarigbos of Remoland</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
          {pastKings.map((k, i) => (
            <div key={i} style={{ background: 'rgba(44,26,14,.45)', border: '1px solid rgba(201,150,58,.15)', padding: '1.5rem', borderRadius: 4 }}>
              <div className="cinzel" style={{ fontSize: '.52rem', letterSpacing: '.1em', color: '#C9963A', textTransform: 'uppercase' }}>{k.e} · {k.h}</div>
              <h3 className="playfair" style={{ fontSize: '1.15rem', color: '#F5EDD8', margin: '.4rem 0 .2rem' }}>{k.n}</h3>
              <div style={{ fontSize: '.8rem', color: 'rgba(201,150,58,.8)', marginBottom: '.8rem' }}>{k.t}</div>
              <p style={{ fontSize: '.82rem', lineHeight: 1.7, color: 'rgba(245,237,216,.65)' }}>{k.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <div style={{ background: 'rgba(201,150,58,.04)', padding: '1px 0' }}><AdireDivider thin /></div>

      <Section bg="#0F172A">
        <p className="sl">Hall of Distinction</p>
        <h2 className="st">Illustrious Sons & Daughters of Sagamu</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.2rem', marginTop: '1.5rem' }}>
          {notableDescendants.map((d, i) => (
            <div key={i} style={{ background: 'rgba(201,150,58,.05)', border: '1px solid rgba(201,150,58,.15)', padding: '1.3rem', borderRadius: 4 }}>
              <h3 className="playfair" style={{ fontSize: '1rem', color: '#F0D080', margin: 0 }}>{d.n}</h3>
              <div className="cinzel" style={{ fontSize: '.5rem', letterSpacing: '.08em', color: '#C9963A', marginTop: '.2rem', textTransform: 'uppercase' }}>{d.r}</div>
              <p style={{ fontSize: '.8rem', lineHeight: 1.6, color: 'rgba(245,237,216,.65)', marginTop: '.6rem' }}>{d.f}</p>
              {d.note && <div style={{ fontSize: '.72rem', color: 'rgba(245,237,216,.45)', fontStyle: 'italic', marginTop: '.4rem' }}>{d.note}</div>}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
