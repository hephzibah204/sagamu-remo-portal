import { Link } from 'react-router-dom';

const SECTIONS = [
  {
    heading: 'Palace & Governance',
    links: [
      { to: '/monarchy', l: 'The Akarigbo & Monarchy' },
      { to: '/royal-audience', l: 'Book Royal Audience' },
      { to: '/id-card', l: 'Digital Citizen ID' },
      { to: '/land-registry', l: 'Land Registry' },
      { to: '/disputes', l: 'Customary Court (Kootu Oba)' },
      { to: '/governance', l: 'Civic Dashboard' },
    ],
  },
  {
    heading: 'Economy & Trade',
    links: [
      { to: '/marketplace', l: 'Sagamu Marketplace' },
      { to: '/business', l: 'Business Directory' },
      { to: '/fix-my-street', l: 'Fix My Street' },
      { to: '/diaspora', l: 'Diaspora Network' },
      { to: '/diaspora-escrow', l: 'Diaspora Projects' },
    ],
  },
  {
    heading: 'Community & Health',
    links: [
      { to: '/health', l: 'OOUTH Health & Blood Bank' },
      { to: '/education', l: 'Education & Schools' },
      { to: '/scholarships', l: 'Scholarships' },
      { to: '/faith', l: 'Faith & Culture' },
      { to: '/social-connect', l: 'Social Connect' },
      { to: '/news', l: 'Town News' },
      { to: '/associations', l: 'Associations' },
    ],
  },
  {
    heading: 'Heritage & Media',
    links: [
      { to: '/history', l: 'Founding History (1872)' },
      { to: '/timeline', l: 'Dynastic Timeline' },
      { to: '/gallery', l: 'Media Gallery' },
      { to: '/map', l: 'Interactive Map' },
      { to: '/tourism', l: 'Tourism' },
      { to: '/miss-sagamu', l: 'Miss Sagamu' },
    ],
  },
  {
    heading: 'Portal & Security',
    links: [
      { to: '/security-dashboard', l: 'Security Radar' },
      { to: '/alerts', l: 'Emergency SOS' },
      { to: '/contact', l: 'Contact Secretariat' },
      { to: '/signin', l: 'Citizen Sign In' },
      { to: '/admin', l: 'Admin Access' },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0f172a',
        borderTop: '1px solid #1e293b',
        padding: '3.5rem 1.5rem 2rem',
        color: '#f8fafc',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                }}
              >
                👑
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
                SAGAMU REMO
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>
              Official civic and community portal of Sagamu, Ogun State. Capital of Remoland, Seat of The Akarigbo, and premier hub of commerce and industry.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1.5rem',
              flex: 1,
              minWidth: 'min(300px, 100%)',
            }}
          >
            {SECTIONS.map((sec) => (
              <div key={sec.heading}>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#60a5fa',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}
                >
                  {sec.heading}
                </div>
                {sec.links.map((lnk) => (
                  <Link
                    key={lnk.to}
                    to={lnk.to}
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      color: '#cbd5e1',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease',
                      padding: '0.2rem 0',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#38bdf8')}
                    onMouseLeave={(e) => (e.target.style.color = '#cbd5e1')}
                  >
                    {lnk.l}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Community Sponsorship & Donation Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            border: '1px solid #334155',
            borderLeft: '4px solid #10b981',
            borderRadius: '12px',
            padding: '1.5rem 1.8rem',
            margin: '2rem auto',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.2rem' }}>
            <div style={{ flex: 1, minWidth: 'min(280px, 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🌟</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  Support the Sagamu Digital City Initiative
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', lineHeight: 1.6, color: '#cbd5e1', margin: '0 0 0.5rem 0' }}>
                Continuous funding powers dedicated software development, cloud infrastructure, domain management, and 24/7 maintenance for Sagamu&apos;s digital transformation.
              </p>
              <div style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>
                🏦 <strong>Opay:</strong> <span style={{ color: '#60a5fa', fontWeight: 700 }}>6101307590</span> · <em>Hephtech Multimedia & Innovations</em>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-donate-modal'))}
                className="btn-green"
                style={{
                  fontSize: '0.78rem',
                  padding: '0.65rem 1.2rem',
                }}
              >
                💚 Support Project
              </button>
              <a
                href="https://wa.me/2349077780156?text=Hello%20Hephtech%20Multimedia%2C%20I%20would%20like%20to%20support/donate%20to%20the%20Sagamu%20Community%20Portal."
                target="_blank" rel="noopener noreferrer"
                style={{
                  fontSize: '0.78rem',
                  padding: '0.65rem 1.1rem',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid #475569',
                  color: '#ffffff',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontWeight: 600,
                }}
              >
                💬 WhatsApp Desk
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: '#1e293b',
            margin: '1.5rem 0 1rem',
          }}
        />
        <div
          style={{
            fontSize: '0.75rem',
            color: '#64748b',
            textAlign: 'center',
          }}
        >
          © 2026 Sagamu Community Portal · Built & Maintained by Hephtech Multimedia & Innovations · Seat of The Akarigbo of Remoland
        </div>
      </div>
    </footer>
  );
}
