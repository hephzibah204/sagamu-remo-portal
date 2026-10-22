import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { sendAnthropicMessage } from '../services/api';
import DailyPhrase from '../components/DailyPhrase';
import SuggestionBox from '../components/SuggestionBox';
import LiveTicker from '../components/LiveTicker';
import TimelineFeed from '../components/TimelineFeed';
import { photos } from '../data/gallery';

const CIVIC_PILLARS = [
  {
    id: 'governance',
    title: 'Monarchy & Civic Governance',
    desc: 'Official royal palace services, citizen identification, land records, and customary dispute resolution.',
    color: '#1e40af',
    badge: 'Palace Administration',
    items: [
      { id: 'monarchy', ic: '👑', t: 'The Monarchy & Akarigbo', d: 'HRM Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II), Paramount Ruler of Remoland.' },
      { id: 'royal-audience', ic: '📜', t: 'Book Royal Audience', d: 'Schedule an official appointment with The Akarigbo at Aafin Akarigbo.' },
      { id: 'id-card', ic: '🪪', t: 'Digital Citizen ID', d: 'Apply for official verifiable Sagamu citizen & resident identity cards.' },
      { id: 'verify-id', ic: '🔍', t: 'Verify Citizen ID', d: 'Public registry to instantly verify genuine Sagamu digital identity cards online.' },
      { id: 'land-registry', ic: '📋', t: 'Land Registry & Plots', d: 'Verify surveys, check family boundaries & prevent customary land disputes.' },
      { id: 'disputes', ic: '⚖️', t: 'Customary Court (Kootu Oba)', d: 'Mediation & peaceful arbitration under traditional palace jurisprudence.' },
    ],
  },
  {
    id: 'commerce',
    title: 'Commerce, Markets & Industry',
    desc: 'Africa\'s largest kolanut wholesale market, cement manufacturing, business registration, and trade.',
    color: '#059669',
    badge: 'Economic Engine',
    items: [
      { id: 'marketplace', ic: '🛒', t: 'Town Marketplace & Sabo', d: 'Wholesale Sabo kolanut, farm harvest, textiles, crafts, and retail commerce.' },
      { id: 'business', ic: '💼', t: 'Business & Trade Directory', d: 'Directory of verified companies, manufacturing plants, logistics, and merchants.' },
      { id: 'fix-my-street', ic: '🚧', t: 'Fix My Street', d: 'Report road potholes, street drainage, public lighting, and civic infrastructure.' },
      { id: 'diaspora', ic: '🌍', t: 'Diaspora Network', d: 'Global Sagamu indigenes network, investment council, and development endowment.' },
      { id: 'diaspora-escrow', ic: '🤝', t: 'Diaspora Escrow Grants', d: 'Transparent co-funding for community infrastructure and quarter projects.' },
    ],
  },
  {
    id: 'community',
    title: 'Health, Education & Community',
    desc: 'Tertiary healthcare at OOUTH, premier secondary schools, youth bursaries, and civic discourse.',
    color: '#0284c7',
    badge: 'Civic Well-being',
    items: [
      { id: 'health', ic: '🏥', t: 'OOUTH Health & Blood Bank', d: 'Olabisi Onabanjo University Teaching Hospital, clinic directory & emergency blood bank.' },
      { id: 'education', ic: '🏫', t: 'Schools & Education', d: 'Remo Secondary School (RSS), Federal Government Girls College, and institutes.' },
      { id: 'scholarships', ic: '🎓', t: 'Scholarships & Grants', d: 'Undergraduate bursaries, vocational support & youth STEM innovation funds.' },
      { id: 'messages', ic: '💬', t: 'Town Chat & Messages', d: 'Real-time resident communication, quarter announcements, and direct messaging.' },
      { id: 'forum', ic: '🗣️', t: 'Community Deliberations', d: 'Town hall discourse, quarter development proposals, and civic deliberations.' },
      { id: 'associations', ic: '🤝', t: 'Clubs & Associations', d: 'Sagamu Development Association (SDA), Youth Congress, and RSSOSA alumni.' },
    ],
  },
  {
    id: 'heritage',
    title: 'Heritage, Culture & Geography',
    desc: 'The 1872 confederation of thirteen quarters, sacred royal oriki, festivals, and landmarks.',
    color: '#7c3aed',
    badge: 'Sacred Heritage',
    items: [
      { id: 'history', ic: '📖', t: 'Founding History (1872)', d: 'The historic confederation of 13 Remo settlements on the fertile hills of Bammowu.' },
      { id: 'timeline', ic: '⏳', t: 'Dynastic Timeline', d: 'Chronology of Akarigbos of Remoland from founding fathers to modern day.' },
      { id: 'map', ic: '🗺️', t: 'Google Maps Navigator', d: 'Interactive satellite navigation across all 13 confederate quarters and monuments.' },
      { id: 'quiz', ic: '🧠', t: 'Heritage Scholar Quiz', d: 'Test knowledge of Sagamu history, quarter totems, and earn civic certificates.' },
      { id: 'gallery', ic: '📸', t: 'Media Archives', d: 'Historic photo collections, Sagamu Day festivals, and royal coronations.' },
      { id: 'live', ic: '🎥', t: 'Palace Live TV', d: 'Live broadcasts of royal festivals, town meetings, and civic celebrations.' },
    ],
  },
];

const WMO_CODES = {
  0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
  45: 'Foggy', 48: 'Depositing Rime Fog', 51: 'Light Drizzle', 53: 'Moderate Drizzle', 55: 'Dense Drizzle',
  61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain', 66: 'Light Freezing Rain', 67: 'Heavy Freezing Rain',
  71: 'Slight Snow', 73: 'Moderate Snow', 75: 'Heavy Snow', 77: 'Snow Grains',
  80: 'Slight Rain Showers', 81: 'Moderate Rain Showers', 82: 'Violent Rain Showers',
  85: 'Slight Snow Showers', 86: 'Heavy Snow Showers', 95: 'Thunderstorm', 96: 'Thunderstorm with Slight Hail', 99: 'Thunderstorm with Heavy Hail',
};

function getWeatherEmoji(code) {
  if (code === 0 || code === 1) return '☀️';
  if (code === 2) return '⛅';
  if (code === 3) return '☁️';
  if (code >= 45 && code <= 48) return '🌫️';
  if ((code >= 51 && code <= 55) || (code >= 80 && code <= 82)) return '🌦️';
  if ((code >= 61 && code <= 67) || (code >= 85 && code <= 86)) return '🌧️';
  if (code >= 71 && code <= 77) return '❄️';
  if (code >= 95) return '⛈️';
  return '🌡️';
}

export default function HomePage() {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [aiMsg, setAiMsg] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // Sagamu GPS: 6.8485° N, 3.6465° E
    fetch('https://api.open-meteo.com/v1/forecast?latitude=6.8485&longitude=3.6465&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Africa/Lagos&forecast_days=3')
      .then(r => r.json())
      .then(d => setWeather(d))
      .catch(() => {});
  }, []);

  useEffect(() => {
    (async () => {
      const msg = await sendAnthropicMessage(
        'You are the official civic AI greeter for Sagamu, the paramount capital of Remoland, Ogun State, Nigeria. Founded in 1872 by 13 confederate settlements under The Akarigbo. Provide a concise, dignified, 1-sentence welcome in English celebrating progress, royal peace, and enterprise. Maximum 20 words.',
        'Welcome a visitor to the Sagamu Civic Portal.'
      );
      if (msg) setAiMsg(msg);
    })();
  }, []);

  const filteredPillars = activeCategory === 'all'
    ? CIVIC_PILLARS
    : CIVIC_PILLARS.filter(p => p.id === activeCategory);

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <SEO
        title="Sagamu Community & Royal Portal"
        description="Official civic portal of Sagamu, Ogun State. Capital of Remoland, Seat of The Akarigbo, 13 Confederate Quarters, Digital ID, Sabo Kolanut Trade, and Security Command."
      />
      
      {/* ── CRISP EXECUTIVE CIVIC HERO ── */}
      <section
        style={{
          position: 'relative',
          padding: 'calc(var(--nav-height) + 3.5rem) 1.5rem 4rem',
          background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
          borderBottom: '1px solid #e2e8f0',
          overflow: 'hidden',
        }}
      >
        {/* Subtle Geometric Background Elements */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-5%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0%',
            left: '-5%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(5, 150, 105, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ maxWidth: '1040px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          
          {/* Civic Status Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '24px',
              background: '#ffffff',
              border: '1px solid #bfdbfe',
              boxShadow: '0 1px 3px rgba(30, 64, 175, 0.08)',
              marginBottom: '1.2rem',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e40af', letterSpacing: '0.04em' }}>
              OFFICIAL CIVIC PORTAL · SEAT OF THE AKARIGBO OF REMOLAND
            </span>
          </div>

          {/* AI Civic Greeter */}
          {aiMsg && (
            <p
              style={{
                fontSize: '0.92rem',
                color: '#475569',
                fontStyle: 'italic',
                maxWidth: '680px',
                margin: '0 auto 1.2rem',
                lineHeight: 1.6,
              }}
            >
              &ldquo;{aiMsg}&rdquo;
            </p>
          )}

          {/* Main Dignified Title */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6.5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#0f172a',
              marginBottom: '1.2rem',
              letterSpacing: '-0.025em',
            }}
          >
            Welcome to <span style={{ color: '#1e40af' }}>Sagamu</span>,{' '}
            <span style={{ color: '#059669' }}>Remo</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
              color: '#475569',
              maxWidth: '780px',
              margin: '0 auto 2.2rem',
              lineHeight: 1.7,
            }}
          >
            Established in 1872 through the historic confederation of thirteen settlements upon the hills of Bammowu. The paramount seat of Remoland, global capital of kolanut commerce, and Ogun State&apos;s leading industrial corridor.
          </p>

          {/* Primary Civic Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '0.85rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}
          >
            <button
              onClick={() => navigate('/id-card')}
              className="btn-p"
              style={{ padding: '0.85rem 1.6rem', fontSize: '0.85rem' }}
            >
              <span>🪪</span>
              <span>Apply for Citizen ID</span>
            </button>

            <button
              onClick={() => navigate('/royal-audience')}
              className="btn-o"
              style={{ padding: '0.85rem 1.6rem', fontSize: '0.85rem' }}
            >
              <span>📜</span>
              <span>Book Royal Audience</span>
            </button>

            <button
              onClick={() => navigate('/marketplace')}
              className="btn-green"
              style={{ padding: '0.85rem 1.6rem', fontSize: '0.85rem' }}
            >
              <span>🛒</span>
              <span>Sabo Marketplace</span>
            </button>

            <button
              onClick={() => navigate('/security-dashboard')}
              style={{
                padding: '0.85rem 1.4rem',
                fontSize: '0.85rem',
                borderRadius: '8px',
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                color: '#334155',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#1e40af';
                e.currentTarget.style.color = '#1e40af';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.color = '#334155';
              }}
            >
              <span>🛡️</span>
              <span>Security Console</span>
            </button>
          </div>

          {/* Clean Metric Counters Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              maxWidth: '880px',
              margin: '0 auto',
            }}
          >
            {[
              { val: '1872', lab: 'Great Confederation', sub: '13 Historic Quarters' },
              { val: '33', lab: 'Remo Towns Seat', sub: 'Paramount Kingdom Capital' },
              { val: '13', lab: 'Confederate Quarters', sub: 'Offin · Makun · Sonyindo' },
              { val: '100+ Yrs', lab: 'Sabo Kolanut Hub', sub: 'West Africa Trade Center' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  background: '#ffffff',
                  padding: '1.1rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e40af', lineHeight: 1.1 }}>
                  {stat.val}
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f172a', marginTop: '0.35rem' }}>
                  {stat.lab}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '0.15rem' }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE CIVIC NEWS TICKER ── */}
      <LiveTicker
        label="⚡ SAGAMU CIVIC WIRE"
        speed={32}
        bg="#f8fafc"
        color="#1e40af"
        items={[
          '🚨 Security Patrol Radar: All 13 Quarters & Sagamu Interchange Active & Monitored 24/7',
          '🪪 Digital Citizen Cards: Over 1,500+ Sagamu Resident Identity Cards Issued & Verified',
          '🗺️ Google Maps Ground Mapping: Ground survey completed across Offin, Makun, and Sabo',
          '🤝 Diaspora Capital Endowment: Sagamu Development Association (SDA) ₦50M Civic Fund Active',
          '👑 Palace Court: Official Akarigbo Royal Audiences now open for direct online booking',
        ]}
      />

      <AdireDivider />

      {/* ── 24/7 RAPID SECURITY & EMERGENCY CONSOLE ── */}
      <div style={{ maxWidth: 1100, margin: '2rem auto 1.5rem', padding: '0 1.5rem' }}>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #fee2e2',
            borderLeft: '5px solid #dc2626',
            borderRadius: '12px',
            padding: '1.3rem 1.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.2rem',
            flexWrap: 'wrap',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '280px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: '#fef2f2',
                border: '1.5px solid #fca5a5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                flexShrink: 0,
              }}
            >
              🚨
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#991b1b' }}>
                  24/7 SAGAMU JOINT SECURITY & RESCUE RADAR
                </span>
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    background: '#dc2626',
                    color: '#ffffff',
                    padding: '2px 8px',
                    borderRadius: '20px',
                  }}
                >
                  LIVE PATROL
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: '#475569', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                Instant emergency dispatch coordinating Sagamu Police Area Command, FRSC Interchange Rescue, So-Safe Corps, and Palace Vigilante.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-sos-modal'))}
              style={{
                background: '#dc2626',
                border: '1px solid #dc2626',
                borderRadius: '8px',
                padding: '0.6rem 1.1rem',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 2px 8px rgba(220, 38, 38, 0.25)',
              }}
            >
              <span>📞</span>
              <span>Instant Emergency Call</span>
            </button>

            <button
              onClick={() => navigate('/alerts')}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '0.6rem 1rem',
                color: '#334155',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              Report Incident →
            </button>

            <button
              onClick={() => navigate('/security-dashboard')}
              style={{
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: '8px',
                padding: '0.6rem 1rem',
                color: '#1e40af',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              Command Console →
            </button>
          </div>
        </div>
      </div>

      {/* ── ORGANIZED CIVIC PILLARS DIRECTORY ── */}
      <Section bg="#f8fafc" py="4rem">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#1e40af',
              background: '#eff6ff',
              padding: '0.25rem 0.75rem',
              borderRadius: '16px',
              marginBottom: '0.6rem',
            }}
          >
            CIVIC SERVICES & PORTALS
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
            Explore Sagamu Services by Category
          </h2>
          <p style={{ color: '#64748b', maxWidth: '640px', margin: '0 auto', fontSize: '0.98rem' }}>
            Structured public services, commercial trade tools, healthcare facilities, and monarchical registries organized for quick citizen access.
          </p>

          {/* Clean Category Filter Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '1.8rem',
            }}
          >
            {[
              { id: 'all', label: 'All Services' },
              { id: 'governance', label: '👑 Monarchy & Palace' },
              { id: 'commerce', label: '🛒 Trade & Industry' },
              { id: 'community', label: '🏥 Health & Education' },
              { id: 'heritage', label: '📖 History & Culture' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeCategory === tab.id ? '1.5px solid #1e40af' : '1px solid #cbd5e1',
                  background: activeCategory === tab.id ? '#1e40af' : '#ffffff',
                  color: activeCategory === tab.id ? '#ffffff' : '#475569',
                  transition: 'all 0.15s ease',
                  boxShadow: activeCategory === tab.id ? '0 2px 6px rgba(30, 64, 175, 0.2)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pillars Display */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          {filteredPillars.map((pillar) => (
            <div
              key={pillar.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: 'clamp(1.2rem, 3vw, 2rem)',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1.4rem',
                  flexWrap: 'wrap',
                  gap: '0.6rem',
                  borderBottom: '1px solid #f1f5f9',
                  paddingBottom: '0.8rem',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '2px 0 0 0' }}>
                    {pillar.desc}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.65rem',
                    borderRadius: '12px',
                    background: pillar.id === 'governance' ? '#eff6ff' : pillar.id === 'commerce' ? '#ecfdf5' : '#f8fafc',
                    color: pillar.id === 'governance' ? '#1e40af' : pillar.id === 'commerce' ? '#065f46' : '#334155',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  {pillar.badge}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(270px, 100%), 1fr))',
                  gap: '1rem',
                }}
              >
                {pillar.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(`/${item.id}`)}
                    className="card"
                    style={{
                      padding: '1.2rem',
                      textAlign: 'left',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                      background: '#ffffff',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{item.ic}</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        {item.t}
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                      {item.d}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <AdireDivider />

      {/* ── INTERACTIVE GOOGLE MAPS SECTION ── */}
      <Section py="4rem">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#059669',
              background: '#ecfdf5',
              padding: '0.25rem 0.75rem',
              borderRadius: '16px',
              marginBottom: '0.6rem',
            }}
          >
            GEOGRAPHY & PLACES
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
            Explore Sagamu on Google Maps
          </h2>
          <p style={{ color: '#64748b', maxWidth: '640px', margin: '0 auto', fontSize: '0.98rem' }}>
            Satellite mapping of Aafin Akarigbo Palace, OOUTH Teaching Hospital, Sabo Kolanut Market, and all 13 confederate quarters.{' '}
            <Link to="/map" style={{ color: '#1e40af', fontWeight: 600, textDecoration: 'underline' }}>
              Launch Full Map Navigator →
            </Link>
          </p>
        </div>

        <div
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            background: '#ffffff',
          }}
        >
          <div
            style={{
              padding: '0.85rem 1.25rem',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#f8fafc',
              flexWrap: 'wrap',
              gap: '0.6rem',
            }}
          >
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e40af' }}>
              📍 SATELLITE RADAR · SAGAMU (6°50′N, 3°38′E)
            </span>
            <Link
              to="/map"
              className="btn-p"
              style={{ fontSize: '0.72rem', padding: '0.4rem 0.9rem' }}
            >
              Open Full Screen Map →
            </Link>
          </div>

          <div style={{ width: '100%', height: '380px', background: '#f1f5f9' }}>
            <iframe
              title="Sagamu Google Map Preview"
              src="https://maps.google.com/maps?q=6.8485,3.6465&t=m&z=15&ie=UTF8&iwloc=&output=embed"
              style={{ width: '100%', height: '100%', border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Quick Landmark Jump Pills */}
          <div style={{ padding: '0.85rem 1.25rem', background: '#ffffff', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b' }}>VERIFIED PLACES:</span>
            {[
              ['👑 Aafin Akarigbo Palace', '/map'],
              ['🏥 OOUTH Teaching Hospital', '/map'],
              ['🌾 Sabo Kolanut Market', '/map'],
              ['🏫 Remo Secondary School', '/map'],
              ['🏟️ Gateway International Stadium', '/map'],
              ['🚛 Sagamu Interchange', '/map'],
              ['🏭 Lafarge Elephant Cement', '/map'],
              ['👑 Ewusi of Makun Palace', '/map'],
            ].map(([ti, href]) => (
              <Link
                key={ti}
                to={href}
                style={{
                  fontSize: '0.74rem',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '16px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#334155',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1e40af';
                  e.currentTarget.style.color = '#1e40af';
                  e.currentTarget.style.background = '#eff6ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.color = '#334155';
                  e.currentTarget.style.background = '#f8fafc';
                }}
              >
                {ti}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <AdireDivider />

      {/* ── CIVIC PULSE & COMMUNITY FEED ── */}
      <Section bg="#f8fafc" py="4rem">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#1e40af',
              background: '#eff6ff',
              padding: '0.25rem 0.75rem',
              borderRadius: '16px',
              marginBottom: '0.6rem',
            }}
          >
            CIVIC PULSE & UPDATES
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
            What&apos;s On Your Mind, Sagamu?
          </h2>
          <p style={{ color: '#64748b', maxWidth: '640px', margin: '0 auto', fontSize: '0.98rem' }}>
            <em>Kí ni nǹkan tó ń ṣẹlẹ̀?</em> Share quarter news, deliberate on community projects, and view verified updates from across all 13 confederate settlements.
          </p>
        </div>

        <TimelineFeed embedded={true} maxPosts={4} showHeader={false} linkToAll="/timeline" />
      </Section>

      <AdireDivider />

      {/* ── LIVE WEATHER FORECAST ── */}
      {weather && (
        <Section py="3.5rem">
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: 'clamp(1.5rem, 3vw, 2.2rem)',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            }}
          >
            <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', color: '#1e40af', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              LIVE ATMOSPHERE & WEATHER IN SAGAMU (6.8485°N, 3.6465°E)
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 4vw, 4rem)', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.3rem' }}>{getWeatherEmoji(weather.current.weather_code)}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
                  {Math.round(weather.current.temperature_2m)}°C
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.3rem' }}>
                  {WMO_CODES[weather.current.weather_code]} · Humidity {weather.current.relative_humidity_2m}%
                </div>
              </div>
              
              <div style={{ height: '60px', width: '1px', background: '#e2e8f0' }} className="weather-sep" />

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {weather.daily.time.map((date, i) => {
                  const d = new Date(date + 'T12:00:00');
                  const day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
                  return (
                    <div key={i} style={{ textAlign: 'center', minWidth: '65px' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{day}</div>
                      <div style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>{getWeatherEmoji(weather.daily.weather_code[i])}</div>
                      <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 700 }}>{Math.round(weather.daily.temperature_2m_max[i])}°C</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* ── DAILY YORUBA PROVERB / PHRASE ── */}
      <Section bg="#f8fafc" py="2.5rem">
        <DailyPhrase />
      </Section>

      <AdireDivider />

      {/* ── HERITAGE PHOTO HIGHLIGHTS ── */}
      <Section py="4rem">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.2rem' }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.08em', color: '#059669', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              HERITAGE ARCHIVES
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Snapshots of Sagamu & Remoland
            </h2>
          </div>
          <Link to="/gallery" className="btn-o" style={{ fontSize: '0.78rem' }}>
            View Media Archives (100+ Photos) →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '1.5rem' }}>
          {photos.slice(0, 3).map((p, i) => (
            <div key={i} className="card" style={{ overflow: 'hidden' }}>
              <div style={{ height: '210px', background: `url(${p.src}) center/cover no-repeat`, borderBottom: '1px solid #e2e8f0' }} />
              <div style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.65rem', color: '#1e40af', marginBottom: '0.3rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  {p.cat}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                  {p.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
                  {p.desc.length > 110 ? p.desc.substring(0, 110) + '…' : p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <AdireDivider />

      {/* ── CITIZEN FEEDBACK & SUGGESTIONS ── */}
      <Section py="4rem" bg="#f8fafc">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <SuggestionBox />
        </div>
      </Section>

      <AdireDivider />
    </div>
  );
}
