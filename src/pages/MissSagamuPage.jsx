import { useState } from 'react';
import Hero from '../components/Hero';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { dbInsert } from '../services/db';
import { sendAnthropicMessage } from '../services/api';
import { getSession } from '../services/auth';

const WINNERS = [
  { year: '2025', title: 'Miss Sagamu 2025 (Queen of Remoland)', name: 'Oluwakemisola Adeola', quarter: 'Offin Quarter', note: 'Crowned at the Sagamu Day Grand Festival · Literacy & STEM Ambassador.' },
  { year: '2024', title: 'Miss Sagamu 2024', name: 'Queen Rachael Oluwapelumi', quarter: 'Makun Quarter', note: 'Championed maternal welfare and youth skills workshops across the 13 quarters.' },
  { year: '2023', title: 'Miss Sagamu 2023', name: 'Idowu Precious Oluwatomiwa', quarter: 'Sonyindo Quarter', note: 'Represented Sonyindo with distinction · Cultural heritage preservation advocate.' },
  { year: '2022', title: 'Miss Sagamu 2022', name: 'Oluwapelumi Solarin', quarter: 'Batoro Quarter', note: 'Pioneered girl-child vocational training and secondary school scholarships.' },
];

const ROUNDS = [
  { title: 'Traditional Yoruba Attire', desc: 'Contestants showcase royal Aso-Oke, beads, and ancestral fabrics honouring the 13 quarters of Sagamu.', ic: '👘' },
  { title: 'Civic Vision & Oratory', desc: 'Contestants present policy and grassroots initiatives for youth empowerment and community development in Remoland.', ic: '🎤' },
  { title: 'Heritage & History Exam', desc: 'Rigorous questions assessing deep knowledge of Sagamu history, the Akarigbos, Yoruba culture, and Remo traditions.', ic: '📚' },
  { title: 'Evening Regalia', desc: 'Poise, elegance, and cultural confidence on display in modern couture.', ic: '👗' },
  { title: 'The Royal Coronation', desc: 'The overall winner is crowned Miss Sagamu and inducted into the Palace Cultural Ambassador Corps.', ic: '👑' },
];

export default function MissSagamuPage() {
  const [tab, setTab] = useState('about');
  const [f, setF] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    height: '',
    address: '',
    quarter: 'Offin',
    occupation: '',
    reason: '',
  });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [aiMsg, setAiMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!f.name || !f.phone) return;
    setBusy(true);

    const session = await getSession();
    const entry = {
      id: `MSGM-${Date.now()}`,
      full_name: f.name,
      email: f.email,
      phone: f.phone,
      age: f.age,
      height: f.height,
      address: f.address,
      quarter: f.quarter,
      occupation: f.occupation,
      reason: f.reason,
      status: 'pending',
      created_at: new Date().toISOString(),
      user_id: session?.id || null,
    };

    try {
      await dbInsert('pageant_registrations', entry);
      setDone(true);

      sendAnthropicMessage(
        `A young woman named "${f.name}", aged ${f.age}, representing "${f.quarter}" quarter in Sagamu has registered for the Miss Sagamu Cultural Pageant. Her occupation is "${f.occupation}" and her aspiration is: "${f.reason}". Write a warm, regal 2-sentence congratulatory message welcoming her to the Miss Sagamu Pageant in dignified Yoruba cultural spirit.`
      )
        .then(msg => setAiMsg(msg))
        .catch(() => setAiMsg('Welcome to Miss Sagamu! May your journey celebrate the grace and cultural majesty of Remoland.'));
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please check connection.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#0f172a' }}>
      <SEO
        title="Miss Sagamu Cultural Pageant"
        description="The premier cultural beauty pageant celebrating the grace, intellect, and heritage of young women across the 13 confederate quarters of Sagamu."
      />
      <Hero
        ey="Crown & Culture"
        ti="Miss Sagamu Cultural Pageant"
        sub="Celebrating elegance, intellect, and civic ambassadorship across the thirteen confederate quarters of Sagamu."
      />
      <AdireDivider />

      <Section py="2rem" bg="#f8fafc">
        <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
          <button
            onClick={() => setTab('about')}
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: '24px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: tab === 'about' ? '1.5px solid #1e40af' : '1px solid #cbd5e1',
              background: tab === 'about' ? '#1e40af' : '#ffffff',
              color: tab === 'about' ? '#ffffff' : '#475569',
            }}
          >
            👑 About the Crown
          </button>
          <button
            onClick={() => setTab('register')}
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: '24px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              border: tab === 'register' ? '1.5px solid #059669' : '1px solid #cbd5e1',
              background: tab === 'register' ? '#059669' : '#ffffff',
              color: tab === 'register' ? '#ffffff' : '#475569',
            }}
          >
            📝 Register for Auditions
          </button>
        </div>
      </Section>

      <Section py="4rem" bg="#ffffff">
        {tab === 'about' && (
          <div>
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1e40af', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                TRADITION OF GRACE & LEADERSHIP
              </div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.8rem' }}>
                The Premier Cultural Pageant of Remoland
              </h2>
              <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: '#64748b' }}>
                Staged annually during the historic Sagamu Day celebrations. It provides a dignified platform for young women representing all 13 confederate quarters (Offin, Makun, Sonyindo, Epe, Ibido, Igbepa, Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, and Ijagba) to champion social impact, female literacy, and cultural preservation.
              </p>
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem', textAlign: 'center' }}>
              Pageant Rounds & Criteria
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3.5rem' }}>
              {ROUNDS.map((r, i) => (
                <div key={i} className="card" style={{ padding: '1.4rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>{r.ic}</div>
                  <h4 style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{r.title}</h4>
                  <p style={{ fontSize: '0.82rem', lineHeight: 1.5, color: '#64748b', margin: 0 }}>{r.desc}</p>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem', textAlign: 'center' }}>
              Past Queens & Cultural Ambassadors
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {WINNERS.map((w, i) => (
                <div key={i} className="card" style={{ padding: '1.5rem', borderRadius: '12px', borderTop: '3px solid #1e40af' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                      👑
                    </div>
                    <div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1e40af', background: '#eff6ff', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
                        {w.year} REIGN
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 0 0' }}>{w.name}</h4>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', marginBottom: '0.4rem' }}>
                    📍 {w.quarter}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#1e40af', fontWeight: 600, marginBottom: '0.6rem' }}>
                    {w.title}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                    {w.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'register' && (
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            {done ? (
              <div style={{ textAlign: 'center', padding: '2.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👑</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e40af', marginBottom: '0.8rem' }}>
                  Registration Received!
                </h3>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Thank you for applying for the Miss Sagamu Cultural Pageant. The audition committee will review your profile and reach out via your contact phone.
                </p>
                {aiMsg && (
                  <div style={{ padding: '1rem', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#0f172a', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                    &ldquo;{aiMsg}&rdquo;
                  </div>
                )}
                <button
                  onClick={() => { setDone(false); setF({ name: '', email: '', phone: '', age: '', height: '', address: '', quarter: 'Offin', occupation: '', reason: '' }); }}
                  className="btn-p"
                >
                  Register Another Contestant
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="card" style={{ padding: '2rem', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.4rem' }}>
                  Audition Registration Form
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Open to all young women between 18 and 27 years residing in or with ancestral roots in any of the 13 confederate quarters of Sagamu.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Full Legal Name *</label>
                    <input required className="inp" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} placeholder="e.g. Adeola Oluwakemi Babatunde" />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Phone Number *</label>
                      <input required className="inp" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} placeholder="e.g. 0803 123 4567" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Email Address</label>
                      <input type="email" className="inp" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} placeholder="e.g. adeola@gmail.com" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Age (18-27) *</label>
                      <input required type="number" min="18" max="27" className="inp" value={f.age} onChange={e => setF({ ...f, age: e.target.value })} placeholder="e.g. 21" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Height (ft/in)</label>
                      <input className="inp" value={f.height} onChange={e => setF({ ...f, height: e.target.value })} placeholder="e.g. 5ft 8in" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Quarter of Origin *</label>
                      <select className="inp" value={f.quarter} onChange={e => setF({ ...f, quarter: e.target.value })}>
                        {['Offin', 'Makun', 'Sonyindo', 'Epe', 'Ibido', 'Igbepa', 'Ado', 'Oko', 'Ipoji', 'Batoro', 'Ijoku', 'Latawa', 'Ijagba'].map(q => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Occupation / Course of Study</label>
                    <input className="inp" value={f.occupation} onChange={e => setF({ ...f, occupation: e.target.value })} placeholder="e.g. Medical Student at OOU / Fashion Entrepreneur" />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.3rem' }}>Why do you want to be Miss Sagamu? *</label>
                    <textarea required className="inp" rows="3" value={f.reason} onChange={e => setF({ ...f, reason: e.target.value })} placeholder="Share your vision for community development and youth representation..." />
                  </div>

                  <button type="submit" disabled={busy} className="btn-p" style={{ width: '100%', marginTop: '0.5rem', padding: '0.85rem' }}>
                    {busy ? 'Submitting Application...' : '👑 Submit Pageant Registration'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </Section>
    </div>
  );
}
