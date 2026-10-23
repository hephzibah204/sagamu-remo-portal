import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { sendAnthropicMessage } from '../services/api';
import DailyPhrase from '../components/DailyPhrase';
import SuggestionBox from '../components/SuggestionBox';
import LiveTicker from '../components/LiveTicker';
import { photos } from '../data/gallery';

const QUARTERS_DATA = [
  { id: 'offin', name: 'Offin Quarter', title: 'Seat of The Akarigbo', ruler: 'HRM Oba Babatunde Adewale Ajayi', landmark: 'Aafin Akarigbo Palace & Central Mosque', tag: 'Royal & Governance', color: '#1e40af' },
  { id: 'makun', name: 'Makun Quarter', title: 'Seat of The Ewusi', ruler: 'HRM The Ewusi of Makun', landmark: 'OOUTH Hospital Axis & Makun Market', tag: 'Medical & Commercial', color: '#059669' },
  { id: 'sonyindo', name: 'Sonyindo Quarter', title: 'Seat of The Alaye', ruler: 'HRM The Alaye of Sonyindo', landmark: 'Sonyindo Heritage Square & Gateway Link', tag: 'Traditional Core', color: '#0284c7' },
  { id: 'epe', name: 'Epe Quarter', title: 'Seat of The Elepe', ruler: 'HRM The Elepe of Epe', landmark: 'Historic Epe Springs & Agro Corridor', tag: 'Heritage', color: '#475569' },
  { id: 'ibido', name: 'Ibido Quarter', title: 'Seat of The Alabido', ruler: 'Traditional Council of Ibido', landmark: 'Ibido Central Axis', tag: 'Civic', color: '#475569' },
  { id: 'igbepa', name: 'Igbepa Quarter', title: 'Seat of The Onigbepa', ruler: 'Traditional Council of Igbepa', landmark: 'Igbepa Civic Hall & Grounds', tag: 'Residential', color: '#475569' },
  { id: 'ado', name: 'Ado Quarter', title: 'Seat of The Alado', ruler: 'Traditional Council of Ado', landmark: 'Ado Commercial Road', tag: 'Enterprise', color: '#475569' },
  { id: 'oko', name: 'Oko Quarter', title: 'Seat of The Oloja Oko', ruler: 'Traditional Council of Oko', landmark: 'Oko Historical Compound', tag: 'Ancestral', color: '#475569' },
  { id: 'ipoji', name: 'Ipoji Quarter', title: 'Seat of The Onipoji', ruler: 'Traditional Council of Ipoji', landmark: 'Ipoji Agricultural Gateway', tag: 'Agro-Allied', color: '#059669' },
  { id: 'batoro', name: 'Batoro Quarter', title: 'Seat of The Radoki of Batoro', ruler: 'HRM The Radoki of Batoro', landmark: 'Batoro Border & Trade Hub', tag: 'Commerce', color: '#1e40af' },
  { id: 'ijoku', name: 'Ijoku Quarter', title: 'Seat of The Olojoku', ruler: 'Traditional Council of Ijoku', landmark: 'Ijoku Central Square', tag: 'Civic', color: '#475569' },
  { id: 'latawa', name: 'Latawa Quarter', title: 'Seat of The Alatawa', ruler: 'Traditional Council of Latawa', landmark: 'Latawa Community Center', tag: 'Residential', color: '#475569' },
  { id: 'ijagba', name: 'Ijagba Quarter', title: 'Seat of The Onijagba', ruler: 'Traditional Council of Ijagba', landmark: 'Ijagba Heritage Groves', tag: 'Cultural', color: '#475569' },
];

const LANDMARKS_MAP = [
  { id: 'palace', name: '👑 Aafin Akarigbo Palace', desc: 'Seat of The Akarigbo & Paramount Ruler of Remoland', lat: 6.8485, lng: 3.6465, area: 'Ita Oba, Offin' },
  { id: 'sabo', name: '🌾 Sabo Kolanut Wholesale Market', desc: 'West Africa\'s premier kolanut and agro exchange hub', lat: 6.8520, lng: 3.6410, area: 'Sabo Quarter' },
  { id: 'oouth', name: '🏥 OOUTH Teaching Hospital', desc: 'Premier tertiary healthcare, trauma & clinical college', lat: 6.8390, lng: 3.6430, area: 'Hospital Road, Makun' },
  { id: 'stadium', name: '🏟️ Gateway International Stadium', desc: '20,000-seat multi-sports international arena', lat: 6.8350, lng: 3.6390, area: 'GRA Sagamu' },
  { id: 'lafarge', name: '🏭 Lafarge Elephant Cement', desc: 'Iconic industrial cement manufacturing titan', lat: 6.8450, lng: 3.6550, area: 'Industrial Belt' },
  { id: 'rss', name: '🏫 Remo Secondary School (RSS)', desc: 'First secondary school in Remoland (founded 1946)', lat: 6.8470, lng: 3.6490, area: 'Akarigbo Street' },
  { id: 'interchange', name: '🚛 Sagamu Interchange Flyover', desc: 'Tri-state highway hub linking Lagos, Ibadan, and Benin/East', lat: 6.8410, lng: 3.6280, area: 'Lagos-Ibadan-Benin Junction' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [aiMsg, setAiMsg] = useState('');
  const [activeQuarterFilter, setActiveQuarterFilter] = useState('all');
  const [selectedMapLandmark, setSelectedMapLandmark] = useState(LANDMARKS_MAP[0]);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    // Sagamu Central Coordinates: 6.8485° N, 3.6465° E
    fetch('https://api.open-meteo.com/v1/forecast?latitude=6.8485&longitude=3.6465&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Africa/Lagos&forecast_days=3')
      .then(r => r.json())
      .then(d => setWeather(d))
      .catch(() => {});
  }, []);

  useEffect(() => {
    (async () => {
      const msg = await sendAnthropicMessage(
        'You are the official civic AI voice for Sagamu, the capital and heartbeat of Remoland, Ogun State, Nigeria. Founded in 1872 by 13 confederate settlements under The Akarigbo. Provide a dignified, modern 1-sentence welcome celebrating royal majesty, industrial vigor, and community peace. Maximum 20 words.',
        'Deliver the Sagamu welcome.'
      );
      if (msg) setAiMsg(msg);
    })();
  }, []);

  const filteredQuarters = activeQuarterFilter === 'all'
    ? QUARTERS_DATA
    : QUARTERS_DATA.filter(q => q.tag.toLowerCase().includes(activeQuarterFilter.toLowerCase()));

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', color: '#0f172a' }}>
      <SEO
        title="Sagamu Central Civic Portal · Paramount Capital of Remoland"
        description="Official municipal and civic portal of Sagamu, Ogun State. Seat of The Akarigbo, 13 Confederate Quarters, Sabo Kolanut Hub, OOUTH Hospital, and Lafarge Industrial Belt."
      />

      {/* ══════════════════════════════════════════════════════════════
          1. ASYMMETRIC MUNICIPAL SPLIT-SCREEN HERO & OPERATIONS DECK
          (Completely distinct from Ogere's centered single-column layout)
      ══════════════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'calc(var(--nav-height) + 2rem) 1.5rem 3.5rem',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%)',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <div className="container" style={{ maxWidth: '1240px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(480px, 100%), 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Dignified Civic Proclamation & Search */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '20px',
                  background: '#ffffff',
                  border: '1px solid #bfdbfe',
                  boxShadow: '0 1px 3px rgba(30, 64, 175, 0.08)',
                  marginBottom: '1.2rem',
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>🏛️</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1e40af', letterSpacing: '0.06em' }}>
                  OGUN STATE · REMOLAND PARAMOUNT CAPITAL
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                  fontWeight: 900,
                  lineHeight: 1.12,
                  color: '#0f172a',
                  marginBottom: '1rem',
                  letterSpacing: '-0.03em',
                }}
              >
                Sagamu <span style={{ color: '#1e40af' }}>Central</span> <br />
                <span style={{ color: '#059669', fontSize: '0.85em' }}>Civic & Royal Portal</span>
              </h1>

              {aiMsg && (
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#64748b',
                    fontStyle: 'italic',
                    marginBottom: '1.2rem',
                    borderLeft: '3px solid #1e40af',
                    paddingLeft: '0.8rem',
                  }}
                >
                  &ldquo;{aiMsg}&rdquo;
                </p>
              )}

              <p
                style={{
                  fontSize: '1.05rem',
                  color: '#475569',
                  lineHeight: 1.65,
                  marginBottom: '1.8rem',
                }}
              >
                Founded in 1872 at Bammowu by the grand confederation of 13 sovereign Remo settlements. Official seat of <strong>The Akarigbo of Remoland</strong>, epicentre of West African kolanut wholesale trade, and premier industrial corridor.
              </p>

              {/* Fast Lookup Input */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  background: '#ffffff',
                  padding: '0.4rem',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)',
                  marginBottom: '1.6rem',
                }}
              >
                <input
                  type="text"
                  placeholder="Search digital ID, royal audience, Sabo market, land plots..."
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchWord) {
                      navigate(`/business?q=${encodeURIComponent(searchWord)}`);
                    }
                  }}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '0.6rem 0.8rem',
                    fontSize: '0.9rem',
                    color: '#0f172a',
                  }}
                />
                <button
                  onClick={() => {
                    if (searchWord) navigate(`/business?q=${encodeURIComponent(searchWord)}`);
                    else window.dispatchEvent(new CustomEvent('open-global-search'));
                  }}
                  className="btn-p"
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.78rem' }}
                >
                  Lookup →
                </button>
              </div>

              {/* Primary Gateway Action Badges */}
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => navigate('/id-card')}
                  className="btn-p"
                  style={{ fontSize: '0.8rem', padding: '0.65rem 1.2rem' }}
                >
                  <span>🪪</span>
                  <span>Apply Citizen ID</span>
                </button>

                <button
                  onClick={() => navigate('/royal-audience')}
                  className="btn-o"
                  style={{ fontSize: '0.8rem', padding: '0.65rem 1.2rem' }}
                >
                  <span>📜</span>
                  <span>Royal Audience</span>
                </button>

                <button
                  onClick={() => navigate('/marketplace')}
                  className="btn-green"
                  style={{ fontSize: '0.8rem', padding: '0.65rem 1.2rem' }}
                >
                  <span>🛒</span>
                  <span>Sabo Marketplace</span>
                </button>

                <button
                  onClick={() => navigate('/land-registry')}
                  style={{
                    padding: '0.65rem 1rem',
                    fontSize: '0.8rem',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    border: '1.5px solid #cbd5e1',
                    color: '#334155',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  <span>📋</span>
                  <span>Land Registry</span>
                </button>
              </div>
            </div>

            {/* Right Column: Live Civic Operations Deck */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '1.8rem',
                boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #f1f5f9',
                  paddingBottom: '0.8rem',
                  marginBottom: '1.2rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    Sagamu Live Operations Deck
                  </span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>
                  6°50′N, 3°38′E · WAT
                </span>
              </div>

              {/* Live Metric Cards Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                
                {/* 1. Royal Secretariat & Paramount Sovereign Card */}
                <div
                  onClick={() => navigate('/royal-audience')}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #1e40af',
                    borderRadius: '8px',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', overflow: 'hidden', border: '2px solid #1e40af', flexShrink: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                      <img src="/images/palace/akarigbo-king.jpg" alt="HRM Oba Babatunde Adewale Ajayi" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a' }}>
                        Aafin Akarigbo Royal Court
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#1e40af', fontWeight: 600 }}>
                        HRM Oba Babatunde Adewale Ajayi (Torungbuwa II)
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                        Paramount Ruler of Remoland · Seat at Ita Oba
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, background: '#eff6ff', color: '#1e40af', padding: '0.2rem 0.5rem', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                    AUDIENCE →
                  </span>
                </div>

                {/* 2. Security Radar Status */}
                <div
                  onClick={() => navigate('/security-dashboard')}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #dc2626',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>🚨</span>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#991b1b' }}>
                        Joint Security Command
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        Area Command, So-Safe, FRSC Interchange Patrol
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, background: '#dc2626', color: '#ffffff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    13 QUARTERS ACTIVE
                  </span>
                </div>

                {/* 3. Sabo Kolanut Trade Index */}
                <div
                  onClick={() => navigate('/marketplace')}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #059669',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>🌾</span>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#065f46' }}>
                        Sabo Kolanut & Agro Exchange
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        Inter-State Wholesale Auctions & Commodity Transit
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, background: '#ecfdf5', color: '#059669', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    MARKET OPEN
                  </span>
                </div>

                {/* 4. OOUTH Hospital Unit */}
                <div
                  onClick={() => navigate('/health')}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderLeft: '4px solid #0284c7',
                    borderRadius: '8px',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>🏥</span>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0369a1' }}>
                        OOUTH Tertiary Medical Center
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        Teaching Hospital, Trauma Wing & Blood Donor Bank
                      </div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, background: '#f0f9ff', color: '#0284c7', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    24/7 EMERGENCY
                  </span>
                </div>

                {/* 5. Atmosphere Widget */}
                {weather && (
                  <div
                    style={{
                      background: '#eff6ff',
                      borderRadius: '8px',
                      padding: '0.75rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>☀️</span>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e40af' }}>
                          {Math.round(weather.current.temperature_2m)}°C · Sagamu
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#475569' }}>
                          Humidity {weather.current.relative_humidity_2m}% · Wind {Math.round(weather.current.wind_speed_10m)} km/h
                        </div>
                      </div>
                    </div>
                    <Link to="/map" style={{ fontSize: '0.72rem', color: '#1e40af', fontWeight: 700, textDecoration: 'underline' }}>
                      Full Weather →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE CIVIC WIRE ── */}
      <LiveTicker
        label="⚡ SAGAMU CIVIC WIRE"
        speed={32}
        bg="#f8fafc"
        color="#1e40af"
        items={[
          '🚨 Security Patrol Command: All 13 Quarters & Sagamu Interchange Active & Monitored 24/7',
          '🪪 Digital Citizen Cards: Over 1,500+ Sagamu Resident Identity Cards Issued & Verified',
          '🤝 Diaspora Capital Endowment: Sagamu Development Association (SDA) ₦50M Civic Fund Active',
          '👑 Palace Court: Official Akarigbo Royal Audiences now open for direct online booking',
          '🌾 Sabo Kolanut Trade: Daily inter-state commodity wholesale auctions active',
        ]}
      />

      <AdireDivider />

      {/* ══════════════════════════════════════════════════════════════
          2. THE 13 HISTORIC CONFEDERATE QUARTERS EXPLORER
          (Completely unique to Sagamu — 1872 Bammowu Confederation)
      ══════════════════════════════════════════════════════════════ */}
      <Section py="4rem" bg="#ffffff">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#1e40af',
                marginBottom: '0.3rem',
              }}
            >
              HISTORIC 1872 CONFEDERATION
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              The 13 Confederate Quarters of Sagamu
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '4px 0 0 0' }}>
              Established in 1872 on the hills of Bammowu. Explore the founding quarters, traditional rulers, and historic monuments.
            </p>
          </div>

          {/* Quarter Category Filter Tabs */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {['all', 'Royal', 'Commercial', 'Traditional', 'Agro-Allied'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveQuarterFilter(tab)}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '16px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeQuarterFilter === tab ? '1.5px solid #1e40af' : '1px solid #e2e8f0',
                  background: activeQuarterFilter === tab ? '#1e40af' : '#ffffff',
                  color: activeQuarterFilter === tab ? '#ffffff' : '#475569',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab === 'all' ? 'All 13 Quarters' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* 13 Quarters Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(270px, 100%), 1fr))',
            gap: '1rem',
          }}
        >
          {filteredQuarters.map((q) => (
            <div
              key={q.id}
              onClick={() => navigate('/history')}
              className="card"
              style={{
                padding: '1.2rem',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                borderTop: `3px solid ${q.color}`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {q.name}
                  </h3>
                  <span style={{ fontSize: '0.62rem', fontWeight: 700, background: '#f1f5f9', color: '#475569', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                    {q.tag}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: q.color, marginBottom: '0.35rem' }}>
                  {q.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>
                  🏛️ {q.landmark}
                </div>
              </div>

              <div style={{ marginTop: '0.8rem', paddingTop: '0.6rem', borderTop: '1px solid #f8fafc', fontSize: '0.72rem', color: '#1e40af', fontWeight: 600 }}>
                Explore Heritage →
              </div>
            </div>
          ))}
        </div>
      </Section>

      <AdireDivider />

      {/* ══════════════════════════════════════════════════════════════
          3. DUAL ECONOMIC POWERHOUSES (Sabo Kolanut Hub vs Industrial Belt)
          (Highlights Sagamu's twin pillars of commerce & heavy industry)
      ══════════════════════════════════════════════════════════════ */}
      <Section py="4rem" bg="#f8fafc">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#059669',
              background: '#ecfdf5',
              padding: '0.25rem 0.75rem',
              borderRadius: '16px',
              display: 'inline-block',
              marginBottom: '0.5rem',
            }}
          >
            COMMERCE & INDUSTRY
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Sagamu: The Twin Economic Engines
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '6px auto 0', maxWidth: '640px' }}>
            A unique synergy of Africa&apos;s oldest wholesale agricultural commodity market and Nigeria&apos;s most advanced industrial manufacturing corridor.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '2rem' }}>
          
          {/* Pillar 1: Sabo Kolanut Hub */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #059669',
              borderRadius: '14px',
              padding: '1.8rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                🌾
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Sabo Kolanut International Hub
                </h3>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669' }}>
                  Over a Century of Trans-Saharan Trade
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Operating since the early 1900s, Sabo Market in Sagamu is recognized across Africa as the single largest collection and export exchange for both <em>Gbanja</em> and <em>Abata</em> kolanuts, connecting wholesale merchants from Kano, Chad, Niger, and Mali with Remo farmers.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.82rem', color: '#334155' }}>✓ Multi-ton daily wholesale auctions</div>
              <div style={{ fontSize: '0.82rem', color: '#334155' }}>✓ Zero-middleman direct farmer cooperatives</div>
              <div style={{ fontSize: '0.82rem', color: '#334155' }}>✓ Verified haulage and export cargo facilities</div>
            </div>
            <button
              onClick={() => navigate('/marketplace')}
              className="btn-green"
              style={{ width: '100%', fontSize: '0.82rem' }}
            >
              Browse Sabo Wholesale Directory →
            </button>
          </div>

          {/* Pillar 2: Industrial Corridor & Lafarge */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderTop: '4px solid #1e40af',
              borderRadius: '14px',
              padding: '1.8rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                🏭
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Industrial Belt & Manufacturing
                </h3>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1e40af' }}>
                  Lafarge Cement, Logistics & Gateway Interchange
                </span>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Home to Lafarge Africa&apos;s flagship Elephant Cement plant and surrounded by heavy manufacturing, steel, packaging, and commercial breweries. Positioned at the critical junction of the Lagos-Ibadan and Sagamu-Benin expressways.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.82rem', color: '#334155' }}>✓ Elephant Cement production & limestone belt</div>
              <div style={{ fontSize: '0.82rem', color: '#334155' }}>✓ Multi-lane Sagamu Interchange freight flyovers</div>
              <div style={{ fontSize: '0.82rem', color: '#334155' }}>✓ Gateway Agro-Cargo International Airport corridor</div>
            </div>
            <button
              onClick={() => navigate('/business')}
              className="btn-p"
              style={{ width: '100%', fontSize: '0.82rem' }}
            >
              Explore Business & Industry Directory →
            </button>
          </div>
        </div>
      </Section>

      <AdireDivider />

      {/* ══════════════════════════════════════════════════════════════
          4. SPLIT-SCREEN LANDMARK SELECTOR + SATELLITE MAP NAVIGATOR
          (Side-by-side interactive experience rather than stacked iframe)
      ══════════════════════════════════════════════════════════════ */}
      <Section py="4rem" bg="#ffffff">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#0284c7',
                marginBottom: '0.3rem',
              }}
            >
              GEOGRAPHIC NAVIGATOR
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Sagamu Landmark Radar
            </h2>
          </div>
          <Link to="/map" className="btn-o" style={{ fontSize: '0.78rem' }}>
            Open Full Interactive Map →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
            gap: '1.5rem',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
          }}
        >
          {/* Left: Interactive Landmark Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              Select Key Citadel:
            </div>
            {LANDMARKS_MAP.map((lm) => {
              const isSelected = selectedMapLandmark.id === lm.id;
              return (
                <div
                  key={lm.id}
                  onClick={() => setSelectedMapLandmark(lm)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: isSelected ? '#ffffff' : 'transparent',
                    border: isSelected ? '1.5px solid #1e40af' : '1px solid transparent',
                    boxShadow: isSelected ? '0 2px 8px rgba(30, 64, 175, 0.08)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: isSelected ? '#1e40af' : '#0f172a' }}>
                      {lm.name}
                    </div>
                    <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{lm.area}</span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '2px' }}>
                    {lm.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Focused Live Map Embed */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                padding: '0.6rem 1rem',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderBottom: 'none',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af' }}>
                📍 {selectedMapLandmark.name} ({selectedMapLandmark.lat.toFixed(4)}°N, {selectedMapLandmark.lng.toFixed(4)}°E)
              </span>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedMapLandmark.lat},${selectedMapLandmark.lng}`}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, textDecoration: 'underline' }}
              >
                Directions →
              </a>
            </div>

            <div
              style={{
                flex: 1,
                minHeight: '340px',
                borderRadius: '0 0 10px 10px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0',
              }}
            >
              <iframe
                title="Sagamu Google Map Focused View"
                src={`https://maps.google.com/maps?q=${selectedMapLandmark.lat},${selectedMapLandmark.lng}&t=m&z=16&ie=UTF8&iwloc=&output=embed`}
                style={{ width: '100%', height: '100%', minHeight: '340px', border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </Section>

      <AdireDivider />



      {/* ══════════════════════════════════════════════════════════════
          6. HERITAGE ARCHIVES & PHOTO HIGHLIGHTS
      ══════════════════════════════════════════════════════════════ */}
      <Section py="4rem" bg="#ffffff">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', color: '#059669', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              HERITAGE ARCHIVES
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Visual Archives of Sagamu & Remoland
            </h2>
          </div>
          <Link to="/gallery" className="btn-o" style={{ fontSize: '0.78rem' }}>
            View Full Media Archives →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(270px, 100%), 1fr))', gap: '1.5rem' }}>
          {photos.slice(0, 4).map((p, i) => (
            <div key={i} className="card" style={{ overflow: 'hidden' }}>
              <div style={{ height: '190px', background: `url(${p.src}) center/cover no-repeat`, borderBottom: '1px solid #e2e8f0' }} />
              <div style={{ padding: '1.1rem' }}>
                <div style={{ fontSize: '0.62rem', color: '#1e40af', marginBottom: '0.25rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {p.cat}
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.45, margin: 0 }}>
                  {p.desc.length > 95 ? p.desc.substring(0, 95) + '…' : p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <AdireDivider />

      {/* ── DAILY YORUBA PROVERB ── */}
      <Section bg="#f8fafc" py="2.5rem">
        <DailyPhrase />
      </Section>

      <AdireDivider />

      {/* ── SUGGESTIONS & FEEDBACK ── */}
      <Section py="3.5rem" bg="#ffffff">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <SuggestionBox />
        </div>
      </Section>
    </div>
  );
}
