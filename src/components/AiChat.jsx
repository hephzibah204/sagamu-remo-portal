import { useState, useRef, useEffect } from 'react';
import { sendChatMessages } from '../services/openrouter';

const SYSTEM_PROMPT = `You are the official AI assistant for the Sagamu Remo Community Portal. Sagamu is the historic capital of Remoland, Ogun State, Nigeria, founded in 1872 by the confederation of 13 autonomous Remo settlements (Offin, Makun, Sonyindo, Epe, Ibido, Igbepa, Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, and Ijagba) on Bammowu land beside the sacred Orisagamu Ewa stream.

You help visitors with questions about:
- History & heritage (1872 Confederation, 13 founding quarters, Bammowu land, Orisagamu Ewa)
- Monarchy (The Akarigbo of Remoland, Torungbuwa and Anoko ruling houses, reigning monarch HRM Oba Babatunde Adewale Ajayi, CFR, FCA - Torungbuwa II)
- Tourism & Landmarks (Aafin Akarigbo Palace at Ita Oba, Gateway International Stadium, Sabo Kolanut Market, Orisagamu Ewa Spring, Conference Hotel Sagamu)
- Events (Sagamu Day Grand Celebration in November, Akarigbo Coronation Anniversary, Remo Grand Agemo Festival, Miss Sagamu Pageant)
- Education (Remo Secondary School - RSS founded 1946, FGGC Sagamu, OOUTH Medical College)
- Healthcare & Services (Olabisi Onabanjo University Teaching Hospital - OOUTH, blood donor registry)
- Commerce & Industry (Sabo International Kolanut Market, Lafarge Elephant Cement Works, Gateway Agro-Cargo Corridor)
- Emergency contacts (Police Area Command, FRSC Interchange 122, So-Safe Corps, OOUTH Emergency)
- Digital civic services (Digital ID Cards, Land Registry, Royal Audience Booking)

Keep answers concise, warm, and informative. Use Yoruba greetings occasionally (Ẹ káàbọ̀, Ẹ ṣéun, Kábíyèsí o). Never make up specific facts about Sagamu Remo.`;

const QUICK_ACTIONS = [
  'Tell me about Sagamu history',
  'Who is the Akarigbo of Remoland?',
  'What is Sagamu Day?',
  'Sabo Kolanut Market info',
  'Emergency contacts',
];

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [inp, setInp] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const getLocalAnswer = (text) => {
    const q = text.toLowerCase();
    if (q.includes('history') || q.includes('found') || q.includes('1872') || q.includes('origin')) {
      return 'Ẹ káàbọ̀! Sagamu was founded in 1872 during the 19th-century Yoruba civil wars when 13 autonomous Remo settlements (Offin, Makun, Sonyindo, Epe, Ibido, Igbepa, Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, and Ijagba) united on fertile Bammowu land around the sacred "Orisagamu Ewa" spring under Oba Igimisoje. Sagamu serves as the capital of Remoland and the seat of the Akarigbo.';
    }
    if (q.includes('oba') || q.includes('king') || q.includes('akarigbo') || q.includes('ajayi')) {
      return 'The reigning monarch is His Royal Majesty Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II), The Akarigbo and Paramount Ruler of Remoland, who ascended the throne on December 7, 2017. He presides over all 33 towns of Remoland from the historic Aafin Akarigbo at Ita Oba, Offin.';
    }
    if (q.includes('sagamu day') || q.includes('festival') || q.includes('pageant') || q.includes('miss sagamu')) {
      return 'Sagamu Day is the flagship annual civic and cultural carnival celebrated every November by the Sagamu Development Association (SDA). It brings together all 13 confederate quarters, home and diaspora indigenes, royal processions, the Miss Sagamu Cultural Pageant, and community empowerment awards!';
    }
    if (q.includes('kolanut') || q.includes('sabo') || q.includes('market')) {
      return 'Sabo Market in Sagamu is West Africa\'s largest wholesale kolanut exchange. Established in the early 20th century, it connects southwestern kolanut producers with northern Nigerian, Sahelian (Niger, Mali, Chad), and international merchants in daily multi-ton trading auctions.';
    }
    if (q.includes('emergency') || q.includes('police') || q.includes('security') || q.includes('phone') || q.includes('help')) {
      return 'Emergency Contacts for Sagamu Remo:\n• Police Emergency / General: 112\n• Sagamu Police Area Command / DPO: 08081762371\n• OOUTH Emergency & Trauma Centre: 08023456789\n• FRSC Sagamu Interchange Command: 122 / 08075557788\n• Ogun State So-Safe Corps Sagamu: 08054443322\nFor full listings, visit the Security Alerts page.';
    }
    if (q.includes('touris') || q.includes('visit') || q.includes('attraction') || q.includes('hotel')) {
      return 'Top attractions in Sagamu Remo include:\n1. Aafin Akarigbo Palace & Cultural Amphitheatre (Ita Oba)\n2. Gateway International Stadium (20,000 capacity FIFA-grade stadium)\n3. Sabo Kolanut International Market\n4. Orisagamu Ewa Sacred Founding Spring\n5. Conference Hotel & Suites Sagamu (GRA)\n6. Remo Secondary School (RSS) Historic Campus (est. 1946).';
    }
    if (q.includes('id') || q.includes('card') || q.includes('verify')) {
      return 'You can apply for your official Digital Sagamu ID Card directly on the portal at /id-card, and verify any issued card instantly on /verify-id.';
    }
    if (q.includes('market') || q.includes('buy') || q.includes('sell') || q.includes('yam')) {
      return 'Visit our Community Marketplace at /marketplace to buy and sell local produce like fresh Sagamu yams, handcrafted Adire fabrics, catering services, and artisan trades!';
    }
    if (q.includes('donate') || q.includes('fund') || q.includes('sponsor') || q.includes('opay') || q.includes('support')) {
      return '🌟 Make Sagamu Nigeria\'s 1st Digital Town!\nBy supporting this project, you are helping Sagamu Remo pioneer history as the very first fully digitalized indigenous town in Nigeria.\n\nFunding directly supports developers, designers, project managers, cloud app hosting, and domain maintenance.\n• Bank: Opay\n• Account Number: 6101307590\n• Account Name: Hephtech Multimedia & Innovations\n• Call/WhatsApp: 09077780156\nẸ ṣéun púpọ̀ for your generous support!';
    }
    if (q.includes('scholarship') || q.includes('grant') || q.includes('student')) {
      return 'Educational empowerment grants and bursaries are available at /scholarships for secondary, undergraduate, and tech students from Sagamu Remo.';
    }
    return 'Ẹ ṣéun for reaching out! You can explore all our community services across the portal, including the Monarchy, History, Marketplace, Digital ID, and News pages. If you need dedicated assistance, feel free to contact SDA at info@sagamuremo.ng.';
  };

  const send = async (text) => {
    if (!text.trim() || busy) return;
    const userMsg = { role: 'user', content: text.trim() };
    const updated = [...msgs, userMsg];
    setMsgs(updated);
    setInp('');
    setBusy(true);

    let reply = await sendChatMessages([
      { role: 'system', content: SYSTEM_PROMPT },
      ...updated,
    ]);

    if (!reply) {
      reply = getLocalAnswer(text);
    }

    setMsgs([...updated, { role: 'assistant', content: reply }]);
    setBusy(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          width: 56, height: 56, borderRadius: '50%', border: 'none',
          background: open ? '#7A2E0E' : '#C9963A', color: '#F5EDD8',
          fontSize: '1.5rem', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,.5)',
          transition: 'all .25s', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        aria-label="AI Chat Assistant"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div
          style={{
            position: 'fixed', bottom: 'min(92px, calc(10vh + 56px))', right: 'min(24px, 4vw)', zIndex: 9999,
            width: 360, maxWidth: 'calc(100vw - 32px)', height: 480, maxHeight: 'calc(100vh - 120px)',
            background: '#0A0F1D', border: '1px solid rgba(201,150,58,.3)', borderTop: '3px solid #C9963A',
            borderRadius: 12, overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 8px 40px rgba(0,0,0,.6)',
          }}
        >
          <div style={{ padding: '.8rem 1rem', borderBottom: '1px solid rgba(201,150,58,.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span className="cinzel" style={{ fontSize: '.55rem', letterSpacing: '.12em', color: '#C9963A', textTransform: 'uppercase' }}>AI Assistant</span>
              <div style={{ fontSize: '.68rem', color: 'rgba(245,237,216,.45)' }}>Ask about Sagamu Remo</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '.8rem', display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {msgs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '1.5rem .5rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '.5rem' }}>🤖</div>
                <div className="cinzel" style={{ fontSize: '.5rem', letterSpacing: '.12em', color: '#C9963A', textTransform: 'uppercase', marginBottom: '.4rem' }}>Welcome to Sagamu Remo</div>
                <p style={{ fontSize: '.78rem', color: 'rgba(245,237,216,.55)', lineHeight: 1.65, marginBottom: '1rem' }}>Ask me anything about the town — history, tourism, events, emergency contacts, and more!</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem', justifyContent: 'center' }}>
                  {QUICK_ACTIONS.map((q, i) => (
                    <button key={i} onClick={() => send(q)} style={{ fontSize: '.65rem', padding: '.35rem .6rem', background: 'rgba(201,150,58,.08)', border: '1px solid rgba(201,150,58,.2)', color: 'rgba(245,237,216,.7)', cursor: 'pointer', borderRadius: 4 }}>{q}</button>
                  ))}
                </div>
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%', padding: '.55rem .8rem', borderRadius: 8, fontSize: '.78rem', lineHeight: 1.6,
                  background: m.role === 'user' ? 'rgba(201,150,58,.15)' : 'rgba(44,26,14,.8)',
                  color: m.role === 'user' ? '#F5EDD8' : 'rgba(245,237,216,.8)',
                  border: m.role === 'user' ? '1px solid rgba(201,150,58,.25)' : '1px solid rgba(201,150,58,.1)',
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {busy && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ padding: '.55rem .8rem', borderRadius: 8, background: 'rgba(44,26,14,.8)', border: '1px solid rgba(201,150,58,.1)', fontSize: '.78rem', color: 'rgba(245,237,216,.5)' }}>Thinking...</div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div style={{ padding: '.6rem .8rem', borderTop: '1px solid rgba(201,150,58,.12)', display: 'flex', gap: '.5rem' }}>
            <input
              value={inp}
              onChange={e => setInp(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(inp)}
              placeholder="Ask about Sagamu Remo..."
              style={{ flex: 1, padding: '.5rem .7rem', fontSize: '.78rem', background: 'rgba(44,26,14,.6)', border: '1px solid rgba(201,150,58,.2)', color: '#F5EDD8', outline: 'none', borderRadius: 4 }}
            />
            <button onClick={() => send(inp)} disabled={busy} style={{ padding: '.5rem .8rem', background: '#C9963A', border: 'none', color: '#0A0F1D', fontSize: '.7rem', cursor: 'pointer', borderRadius: 4, fontWeight: 600 }}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}