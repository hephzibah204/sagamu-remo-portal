import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOpenRouterMessage } from '../services/openrouter';

const PAGES = [
  { path: '/history', label: 'History & Heritage', keywords: 'history founded 1872 confederation bammowu orisagamu ewa offin makun 13 quarters remo ogun' },
  { path: '/monarchy', label: 'Monarchy & Kings', keywords: 'king oba akarigbo paramount ruler remoland torungbuwa anoko babatunde ajayi sonariwo awolesi adedoyin palace ita oba' },
  { path: '/timeline', label: 'Historical Timeline', keywords: 'timeline 1872 1946 rss confederation bammowu milestones sagamu history' },
  { path: '/oriki', label: 'Oriki Praise Poetry', keywords: 'oriki praise poetry royal poems yoruba chants akarigbo torungbuwa babatunde ajayi sagamu ilu alafia' },
  { path: '/families', label: 'Notable Families', keywords: 'families royal houses torungbuwa anoko gbenga daniel anthony joshua odutola sonariwo lineage' },
  { path: '/associations', label: 'Associations & Societies', keywords: 'associations sagamu development association sda youth congress sagamu club rssosa offin makun unions' },
  { path: '/education', label: 'Education & Schools', keywords: 'schools remo secondary school rss fggc oouth college of health medical sciences education' },
  { path: '/scholarships', label: 'Scholarships & Grants', keywords: 'scholarships grants bursary education financial aid student apply akarigbo stem grant' },
  { path: '/health', label: 'Health & Blood Bank', keywords: 'health oouth university teaching hospital sagamu general hospital sabo blood bank trauma' },
  { path: '/faith', label: 'Faith & Culture', keywords: 'faith st pauls cathedral anglican central mosque ita oba methodist offin agemo balufon' },
  { path: '/gallery', label: 'Photo Gallery', keywords: 'gallery photos coronation palace development heritage pictures sagamu day' },
  { path: '/live', label: 'Live Broadcasts & TV', keywords: 'live tv video stream broadcast coronation sagamu day festival events' },
  { path: '/news', label: 'News & Updates', keywords: 'news headlines community updates development dispatches gazette sagamu' },
  { path: '/news/n-tech-corridor', label: 'News: Sagamu Tech & Innovation Corridor', keywords: 'tech corridor gateway innovation hub youth digital economy news' },
  { path: '/news/n-oouth-diagnostic', label: 'News: OOUTH Diagnostic & Trauma Centre', keywords: 'oouth hospital diagnostic trauma centre modern health sagamu news' },
  { path: '/news/n-sabo-digitization', label: 'News: Sabo Kolanut Market Digital Trade Hub', keywords: 'sabo kolanut market trade export commodity digital exchange news' },
  { path: '/news/n-sagamu-day-torch', label: 'News: Sagamu Day Unity Torch Tour', keywords: 'sagamu day unity torch 13 confederate quarters celebration news' },
  { path: '/blog', label: 'Community Blog', keywords: 'blog articles stories perspectives news opinions sagamu' },
  { path: '/tourism', label: 'Tourism & Landmarks', keywords: 'tourism palace gateway stadium sabo market orisagamu ewa spring attractions hospitality' },
  { path: '/business', label: 'Business Directory', keywords: 'business directory register shop market commerce enterprise artisan lafarge' },
  { path: '/marketplace', label: 'Marketplace', keywords: 'marketplace buy sell shop kolanut adire crafts services farm produce sabo' },
  { path: '/land-registry', label: 'Land Registry', keywords: 'land registry plots property ownership survey dispute verification deed sagamu' },
  { path: '/royal-audience', label: 'Book Royal Audience', keywords: 'royal audience aafin akarigbo palace appointment oba king meeting consultation booking' },
  { path: '/id-card', label: 'Digital ID Card', keywords: 'id card digital identity indigene resident diaspora citizen verification apply sagamu' },
  { path: '/verify-id', label: 'Verify Digital ID', keywords: 'verify id card check status authentic identity validation' },
  { path: '/governance', label: 'Governance Dashboard', keywords: 'governance dashboard projects tracker transparency administration sda' },
  { path: '/diaspora', label: 'Diaspora Network', keywords: 'diaspora global network notable sons daughters abroad uk usa canada' },
  { path: '/events', label: 'Events Calendar', keywords: 'events calendar festival ceremonies sagamu day agemo coronation schedule' },
  { path: '/forum', label: 'Community Forum', keywords: 'forum discussion community board talk topics conversation sagamu' },
  { path: '/miss-sagamu', label: 'Miss Sagamu Pageant', keywords: 'miss sagamu pageant beauty queen 13 quarters contest daughters of sagamu register' },
  { path: '/quiz', label: 'Heritage Quiz', keywords: 'quiz trivia test knowledge yoruba sagamu culture questions 1872 confederation' },
  { path: '/map', label: 'Interactive Map', keywords: 'map landmarks directions emergency services location gps places sagamu' },
  { path: '/alerts', label: 'Security Alerts & Emergency', keywords: 'alerts security police emergency frsc safety 112 hotline report sagamu' },
  { path: '/contact', label: 'Contact SDA & Palace', keywords: 'contact reach community directory palace akarigbo email phone' },
  { path: '/dashboard', label: 'User Dashboard', keywords: 'dashboard profile my submissions id status activity account' },
];

export default function AiSearch() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState(null);
  const [busy, setBusy] = useState(false);
  const inpRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (open) inpRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const search = async () => {
    const q = query.trim();
    if (!q) return;
    if (q.length < 3) {
      const fuzzy = PAGES.filter(p =>
        p.label.toLowerCase().includes(q.toLowerCase()) ||
        p.keywords.toLowerCase().includes(q.toLowerCase())
      );
      setResults(fuzzy.map(p => ({ label: p.label, path: p.path, score: 1 })));
      return;
    }
    setBusy(true);
    const pageList = PAGES.map(p => `${p.label}: ${p.keywords}`).join('\n');
    const msg = await sendOpenRouterMessage(
      `You are a search assistant for the Sagamu Remo website. Given a user query and a list of pages with keywords, return the 1-3 most relevant page paths as a JSON array of objects with keys "path" and "label". Only respond with valid JSON, nothing else. Pages available:\n${pageList}`,
      `User query: "${q}". Return the most relevant pages as JSON.`
    );
    if (msg) {
      try {
        const parsed = JSON.parse(msg);
        if (Array.isArray(parsed)) {
          setResults(parsed.map(r => ({ label: r.label, path: r.path, score: 2 })));
          setBusy(false);
          return;
        }
      } catch {}
    }
    const fuzzy = PAGES.filter(p =>
      p.label.toLowerCase().includes(q.toLowerCase()) ||
      p.keywords.toLowerCase().includes(q.toLowerCase())
    );
    setResults(fuzzy.map(p => ({ label: p.label, path: p.path, score: 1 })));
    setBusy(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '.2rem .3rem', color: 'rgba(245,237,216,.6)', transition: 'color .2s' }}
        aria-label="Search"
      >
        🔍
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, zIndex: 9998, marginTop: 8,
          width: 340, maxWidth: 'calc(100vw - 32px)',
          background: '#1a0d06', border: '1px solid rgba(201,150,58,.3)', borderTop: '3px solid #C9963A',
          borderRadius: 8, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,.6)',
        }}>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(201,150,58,.12)' }}>
            <input
              ref={inpRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') search(); if (e.key === 'Escape') setOpen(false); }}
              placeholder="Search Sagamu Remo..."
              style={{ flex: 1, padding: '.65rem .8rem', fontSize: '.8rem', background: 'rgba(44,26,14,.4)', border: 'none', color: '#F5EDD8', outline: 'none' }}
            />
            <button onClick={search} disabled={busy} style={{ padding: '.65rem .9rem', background: '#C9963A', border: 'none', color: '#1a0d06', fontSize: '.7rem', cursor: 'pointer', fontWeight: 600 }}>{busy ? '...' : 'Go'}</button>
          </div>
          {results && (
            <div style={{ padding: '.5rem' }}>
              {results.length === 0 ? (
                <div style={{ padding: '1rem', textAlign: 'center', fontSize: '.75rem', color: 'rgba(245,237,216,.4)' }}>No results found</div>
              ) : (
                results.map((r, i) => (
                  <div key={i} onClick={() => { navigate(r.path); setOpen(false); setResults(null); setQuery(''); }}
                    style={{ padding: '.6rem .7rem', cursor: 'pointer', borderRadius: 4, transition: 'background .15s', display: 'flex', alignItems: 'center', gap: '.5rem' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,150,58,.1)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <span style={{ fontSize: '.8rem', color: '#C9963A' }}>📄</span>
                    <div>
                      <div style={{ fontSize: '.8rem', color: '#F5EDD8' }}>{r.label}</div>
                      <div style={{ fontSize: '.6rem', color: 'rgba(245,237,216,.35)' }}>{r.path}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {!results && query.length > 0 && (
            <div style={{ padding: '.8rem', textAlign: 'center', fontSize: '.72rem', color: 'rgba(245,237,216,.35)' }}>Press Enter or click Go to search</div>
          )}
        </div>
      )}
    </div>
  );
}