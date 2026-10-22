import { useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import Spinner from '../components/Spinner';
import SEO from '../components/SEO';
import { dbInsert } from '../services/db';
import { sendAnthropicMessage } from '../services/api';
import { getSession } from '../services/auth';

const WINNERS = [
  { year: '2025', title: 'Miss Sagamu 2025 (Queen of Remoland)', name: 'Oluwakemisola Adeola', note: 'Crowned at the 40th Sagamu Day Grand Festival.', img: '/images/Oluwakemisola Adeola Miss Lipakal 2025.jpg' },
  { year: '2024', title: 'Miss Sagamu 2024', name: 'Queen Rachael Oluwapelumi', note: 'Winner of the 2024 cultural pageantry edition.', img: '/images/Miss Sagamu 2024 Queen Oshoko Rachael Oluwapelumi.jpg' },
  { year: '2023', title: 'Miss Sagamu 2023', name: 'Idowu Precious Oluwatomiwa', note: 'Represented Offin quarter with cultural distinction.', img: '/images/IDOWU PRECIOUS OLUWATOMIWA Miss Sagamu 2023.jpg' },
  { year: '2022', title: 'Miss Sagamu 2022', name: 'Oluwapelumi Solarin', note: 'Ambassador for girl-child education across Remo.', img: '/images/OLUWAPELUMI. Miss Sagamu 2022.jpg' },
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
        `A young woman named "${f.name}", aged ${f.age}, representing "${f.quarter}" quarter in Sagamu has just registered for the Miss Sagamu Beauty Pageant. Her occupation is "${f.occupation}" and her aspiration is: "${f.reason}". Write a warm, regal, inspiring 2-sentence congratulatory message welcoming her to the Miss Sagamu Pageant, wishing her wisdom and elegance, in Yoruba cultural spirit.`
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
    <div>
      <SEO
        title="Miss Sagamu Pageant"
        description="The premier cultural beauty pageant celebrating the grace, intellect, and heritage of young women across the 13 confederate quarters of Sagamu."
      />
      <Hero
        ey="Crown & Culture"
        ti="Miss Sagamu Pageant"
        sub="Celebrating elegance, intellect, and cultural ambassadorship across the thirteen confederate quarters of Sagamu."
      />
      <AdireDivider />

      <Section bg="#1a0d06">
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(201,150,58,.2)', marginBottom: '2rem' }}>
          <button
            onClick={() => setTab('about')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: tab === 'about' ? '3px solid #C9963A' : '3px solid transparent',
              color: tab === 'about' ? '#F0D080' : 'rgba(245,237,216,.6)',
              fontFamily: "'Cinzel', serif",
              fontSize: '.85rem',
              padding: '.8rem 1.5rem',
              cursor: 'pointer',
            }}
          >
            About & Hall of Queens
          </button>
          <button
            onClick={() => setTab('register')}
            style={{
              background: 'transparent',
              border: 'none',
              borderBottom: tab === 'register' ? '3px solid #C9963A' : '3px solid transparent',
              color: tab === 'register' ? '#F0D080' : 'rgba(245,237,216,.6)',
              fontFamily: "'Cinzel', serif",
              fontSize: '.85rem',
              padding: '.8rem 1.5rem',
              cursor: 'pointer',
            }}
          >
            Contestant Registration
          </button>
        </div>

        {tab === 'about' && (
          <div>
            <p className="sl">Tradition of Grace</p>
            <h2 className="st">The Premier Cultural Pageant of Remoland</h2>
            <p style={{ fontSize: '.9rem', lineHeight: 1.85, color: 'rgba(245,237,216,.75)', maxWidth: '750px', marginBottom: '2rem' }}>
              The Miss Sagamu Pageant is staged annually during the celebrated Sagamu Day celebrations. It provides a dignified platform for young women representing all 13 confederate quarters (Offin, Makun, Sonyindo, Epe, Ibido, Igbepa, Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, and Ijagba) to champion social impact, female literacy, and cultural heritage preservation across Remoland.
            </p>

            <h3 className="playfair" style={{ fontSize: '1.4rem', color: '#F0D080', marginBottom: '1rem' }}>Pageant Rounds & Criteria</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
              {ROUNDS.map((r, i) => (
                <div key={i} style={{ background: 'rgba(201,150,58,.04)', border: '1px solid rgba(201,150,58,.15)', padding: '1.2rem', borderRadius: 4 }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '.4rem' }}>{r.ic}</div>
                  <h4 className="playfair" style={{ color: '#F5EDD8', fontSize: '1rem', margin: '.2rem 0' }}>{r.title}</h4>
                  <p style={{ fontSize: '.8rem', lineHeight: 1.6, color: 'rgba(245,237,216,.65)' }}>{r.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="playfair" style={{ fontSize: '1.4rem', color: '#F0D080', marginBottom: '1.2rem' }}>Past Queens & Honorees</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {WINNERS.map((w, i) => (
                <div key={i} style={{ background: 'rgba(44,26,14,.45)', border: '1px solid rgba(201,150,58,.2)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: 260, overflow: 'hidden', background: '#0d0704' }}>
                    <img src={w.img} alt={w.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1.2rem' }}>
                    <span className="tag tag-gold">{w.year}</span>
                    <h4 className="playfair" style={{ fontSize: '1.1rem', color: '#F0D080', margin: '.3rem 0 .2rem' }}>{w.name}</h4>
                    <div className="cinzel" style={{ fontSize: '.52rem', color: 'rgba(201,150,58,.8)', letterSpacing: '.06em' }}>{w.title}</div>
                    <p style={{ fontSize: '.78rem', color: 'rgba(245,237,216,.6)', marginTop: '.5rem', lineHeight: 1.5 }}>{w.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'register' && (
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            {done ? (
              <div style={{ background: 'rgba(201,150,58,.08)', border: '1px solid rgba(201,150,58,.3)', borderTop: '4px solid #C9963A', padding: '2rem', textAlign: 'center', borderRadius: 4 }}>
                <div style={{ fontSize: '3rem', marginBottom: '.5rem' }}>👑</div>
                <h3 className="playfair" style={{ fontSize: '1.6rem', color: '#F0D080', marginBottom: '.5rem' }}>Registration Received!</h3>
                <p style={{ fontSize: '.9rem', color: 'rgba(245,237,216,.8)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Your application for the Miss Sagamu Pageant has been recorded in the civic registry. The Pageant Committee and Palace Cultural Secretariat will reach out via email/phone regarding auditions.
                </p>
                {aiMsg && (
                  <div style={{ background: 'rgba(0,0,0,.4)', borderLeft: '3px solid #C9963A', padding: '1rem', fontStyle: 'italic', fontSize: '.85rem', color: '#F0D080', marginBottom: '1.5rem' }}>
                    "{aiMsg}"
                  </div>
                )}
                <button onClick={() => { setDone(false); setTab('about'); }} className="btn-p">
                  Back to Pageant Overview
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} style={{ background: 'rgba(44,26,14,.5)', border: '1px solid rgba(201,150,58,.2)', padding: '2rem', borderRadius: 4 }}>
                <p className="sl">Official Portal Entry</p>
                <h3 className="playfair" style={{ fontSize: '1.5rem', color: '#F0D080', marginBottom: '1.5rem' }}>Miss Sagamu Contestant Registration</h3>
                
                <div style={{ display: 'grid', gap: '1.2rem' }}>
                  <div>
                    <label className="cinzel" style={{ fontSize: '.6rem', color: '#C9963A', display: 'block', marginBottom: '.4rem' }}>Full Legal Name *</label>
                    <input className="inp" required value={f.name} onChange={e => setF({...f, name: e.target.value})} placeholder="e.g. Adebisi Folashade Ogunseye" />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="cinzel" style={{ fontSize: '.6rem', color: '#C9963A', display: 'block', marginBottom: '.4rem' }}>Phone Number *</label>
                      <input className="inp" required value={f.phone} onChange={e => setF({...f, phone: e.target.value})} placeholder="08012345678" />
                    </div>
                    <div>
                      <label className="cinzel" style={{ fontSize: '.6rem', color: '#C9963A', display: 'block', marginBottom: '.4rem' }}>Email Address *</label>
                      <input className="inp" type="email" required value={f.email} onChange={e => setF({...f, email: e.target.value})} placeholder="applicant@gmail.com" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="cinzel" style={{ fontSize: '.6rem', color: '#C9963A', display: 'block', marginBottom: '.4rem' }}>Age (18–28)</label>
                      <input className="inp" type="number" min="18" max="28" value={f.age} onChange={e => setF({...f, age: e.target.value})} placeholder="21" />
                    </div>
                    <div>
                      <label className="cinzel" style={{ fontSize: '.6rem', color: '#C9963A', display: 'block', marginBottom: '.4rem' }}>Height</label>
                      <input className="inp" value={f.height} onChange={e => setF({...f, height: e.target.value})} placeholder="5'8''" />
                    </div>
                  </div>

                  <div>
                    <label className="cinzel" style={{ fontSize: '.6rem', color: '#C9963A', display: 'block', marginBottom: '.4rem' }}>Sagamu Confederate Quarter of Representation *</label>
                    <select className="inp" value={f.quarter} onChange={e => setF({...f, quarter: e.target.value})}>
                      {['Offin', 'Makun', 'Sonyindo', 'Epe', 'Ibido', 'Igbepa', 'Ado', 'Oko', 'Ipoji', 'Batoro', 'Ijoku', 'Latawa', 'Ijagba', 'Sabo Commercial District'].map(q => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="cinzel" style={{ fontSize: '.6rem', color: '#C9963A', display: 'block', marginBottom: '.4rem' }}>Current Occupation or Field of Study</label>
                    <input className="inp" value={f.occupation} onChange={e => setF({...f, occupation: e.target.value})} placeholder="e.g. Undergraduate (Law, OOU) / Fashion Entrepreneur" />
                  </div>

                  <div>
                    <label className="cinzel" style={{ fontSize: '.6rem', color: '#C9963A', display: 'block', marginBottom: '.4rem' }}>Why do you want to be Miss Sagamu?</label>
                    <textarea className="inp" rows={4} value={f.reason} onChange={e => setF({...f, reason: e.target.value})} placeholder="Describe your community development project and vision for Sagamu youth..." />
                  </div>

                  <button type="submit" disabled={busy} className="btn-p" style={{ width: '100%', marginTop: '.5rem' }}>
                    {busy ? <Spinner size="sm" /> : 'Submit Pageant Application'}
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
