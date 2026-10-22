import Hero from '../components/Hero';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';

const pStyle = { fontSize: '.9rem', lineHeight: 1.9, color: 'rgba(245,237,216,.72)', marginBottom: '1rem' };

export default function HistoryPage() {
  return (
    <div>
      <SEO
        title="History of Sagamu"
        description="Explore the rich history of Sagamu, from its founding by the 1872 confederation of thirteen Remo settlements to its rise as the capital of Remoland and industrial titan."
      />
      <Hero
        ey="Our Roots"
        ti="History & Heritage of Sagamu"
        sub="The capital of Remoland — founded in 1872 by thirteen confederate settlements upon the hills of Bammowu."
      />
      <AdireDivider />

      <Section bg="#0A0F1D">
        <p className="sl">Origins & Meaning</p>
        <h2 className="st">The Sacred Spring: Orisagamu Ewa</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', margin: '1.5rem 0' }}>
          <div style={{ flex: '1', minWidth: '280px' }}>
            <p style={pStyle}>
              <strong>Sagamu</strong> (historically spelled <em>Shagamu</em>) is the paramount city, administrative capital, and political heartbeat of <strong>Remoland</strong> (Remo Kingdom), located in Ogun State, South-West Nigeria.
            </p>
            <p style={pStyle}>
              The name "Sagamu" is derived from the sacred freshwater spring <strong>"Orisagamu Ewa"</strong>—a natural aperture where fresh, crystal-clear water bubbled up from the fertile earth. Tradition holds that when the founding confederate ancestors converged on the elevated farmlands of a nobleman named <strong>Bammowu</strong>, this life-sustaining stream provided abundant water and was hailed as a divine omen of endurance and concord.
            </p>
          </div>
          <div style={{ width: '100%', maxWidth: '350px', height: '220px', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(201,150,58,.25)', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', flexShrink: 0 }}>
            <img src="/images/Sagamu Town.jpg" alt="Sagamu landscape" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </Section>

      <Section bg="#0F172A">
        <p className="sl">The Great Confederation of 1872</p>
        <h2 className="st">Thirteen Settlements, One Mighty City</h2>
        <p style={pStyle}>
          Unlike many ancient Yoruba towns that originated from a single royal homestead, modern Sagamu was created through a visionary, strategic confederation in **1872**.
        </p>
        <p style={pStyle}>
          During the mid-nineteenth century, the Yoruba interior was engulfed in the turbulence of the 19th-century Yoruba Civil Wars—exacerbated by Dahomean raids from the west, Ibadan expansion from the north, and the tragic Makun War of 1862. Recognizing that isolated settlements were vulnerable to destruction, the leaders of thirteen independent Remo kingdoms and towns made a historic pact to unite under one common defense perimeter.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          {[
            { n: '1. Offin', d: 'Seat of The Akarigbo, Paramount Sovereign of Remoland' },
            { n: '2. Makun', d: 'Seat of the Ewusi of Makun, vast commercial quarter' },
            { n: '3. Sonyindo', d: 'Ancient town and northern gateway' },
            { n: '4. Epe-Sagamu', d: 'Seat of the Elepe of Epe' },
            { n: '5. Ibido', d: 'Historic confederate quarter of farming and arts' },
            { n: '6. Igbepa', d: 'Eastern agricultural and cultural settlement' },
            { n: '7. Ado-Sagamu', d: 'Seat of the Alado of Ado' },
            { n: '8. Oko', d: 'Ancient warrior redoubt and farming quarter' },
            { n: '9. Ipoji', d: 'Central settlement with rich herbal and hunting lore' },
            { n: '10. Batoro', d: 'Western bastion of customary administration' },
            { n: '11. Ijoku', d: 'Vibrant cultural and craft quarter' },
            { n: '12. Latawa', d: 'North-western quarter known for textile and trade' },
            { n: '13. Ijagba', d: 'Southeastern confederate boundary quarter' },
          ].map((q, i) => (
            <div key={i} style={{ background: 'rgba(201,150,58,.05)', border: '1px solid rgba(201,150,58,.15)', padding: '1rem', borderRadius: 3 }}>
              <div className="playfair" style={{ color: '#F0D080', fontSize: '.95rem', fontWeight: 600 }}>{q.n}</div>
              <div style={{ fontSize: '.78rem', color: 'rgba(245,237,216,.6)', marginTop: '.3rem', lineHeight: 1.5 }}>{q.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section bg="#0A0F1D">
        <p className="sl">Royal Lineage</p>
        <h2 className="st">The Akarigbo of Remoland</h2>
        <p style={pStyle}>
          At the apex of Sagamu and the entire Remo kingdom sits <strong>The Akarigbo of Remoland</strong>. The title originated from Prince Akarigbo, a crowned prince of Ile-Ife (son of Aka and grandson of Oduduwa) who departed the ancestral cradle with divine beaded crowns during the great migrations.
        </p>
        <p style={pStyle}>
          Originally reigning from Orile-Offin, the seat of the Akarigbo moved to Sagamu in 1872 under <strong>Oba Igimisoje</strong>, who coordinated the defensive alliance of the thirteen towns. Under subsequent monarchs such as Oba William Christopher Adedoyin II (1916–1952), Oba Moses Awolesi (1952–1988), Oba Dr. Michael Adeniyi Sonariwo (1990–2016), and reigning sovereign <strong>Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II)</strong>, the Akarigbo has led the Remo Traditional Council as the paramount ruler over all 33 Remo towns (*Remo Metalelogbon*).
        </p>
      </Section>

      <Section bg="#0F172A">
        <p className="sl">Trade & Enterprise</p>
        <h2 className="st">Sabo: West Africa's Kolanut Capital</h2>
        <p style={pStyle}>
          In the early 20th century, Sagamu's economic destiny transformed with the arrival of northern merchants who founded the historic **Sabo Quarter**. Sagamu became the primary collection center for the indigenous *Gbanja* (two-lobed) and *Abata* kolanuts cultivated across the lush groves of Remoland.
        </p>
        <p style={pStyle}>
          Sabo grew into the largest kolanut export exchange in West Africa, dispatching hundreds of haulage trucks weekly to Kano, Maiduguri, Sokoto, Niger Republic, Chad, and Mali. This created an enduring model of intercultural harmony, uniting Yoruba agriculturalists and Hausa-Fulani merchants for over a century.
        </p>
      </Section>

      <Section bg="#0A0F1D">
        <p className="sl">Modern Era</p>
        <h2 className="st">Education, Medicine & Industrial Resurgence</h2>
        <p style={pStyle}>
          Sagamu has consistently stood at the forefront of Western education in Ogun State. In 1946, <strong>Remo Secondary School (RSS)</strong> was founded as the first secondary school in Remoland, educating generations of Nigerian scholars, jurists, captains of industry, and public servants.
        </p>
        <p style={pStyle}>
          In the industrial era, the establishment of the massive **WAPCO / Lafarge Elephant Cement** plant established Sagamu as a heavy industrial capital. In 1986, the establishment of the <strong>Olabisi Onabanjo University Teaching Hospital (OOUTH)</strong> cemented Sagamu’s position as a premier tertiary medical and clinical training center. Today, strategically located at the intersection of the Lagos–Ibadan Expressway and Sagamu–Benin Expressway, Sagamu stands as the unrivaled Gateway to Nigeria’s economic prosperity.
        </p>
      </Section>
    </div>
  );
}
