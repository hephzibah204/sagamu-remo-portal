import { Link, useLocation } from 'react-router-dom';
import AiSearch from './AiSearch';
import DonateModal from './DonateModal';
import SosHeaderModal from './SosHeaderModal';
import { useState, useEffect } from 'react';
import { getSaasConfig } from '../services/saasConfig';
import { useAuth } from '../contexts/AuthContext';

const MENU_GROUPS = [
  {
    id: 'governance',
    label: 'Governance & Palace',
    items: [
      { id: 'monarchy', label: '👑 The Monarchy & The Akarigbo' },
      { id: 'royal-audience', label: '📜 Book Royal Audience' },
      { id: 'id-card', label: '🪪 Digital Citizen ID' },
      { id: 'verify-id', label: '🔍 Verify Citizen ID' },
      { id: 'land-registry', label: '📋 Land Registry & Plots' },
      { id: 'disputes', label: '⚖️ Customary Court (Kootu Oba)' },
      { id: 'governance', label: '📊 Civic Performance Dashboard' },
      { id: 'contact', label: '📬 Contact SDA Secretariat' },
    ],
  },
  {
    id: 'commerce',
    label: 'Economy & Industry',
    items: [
      { id: 'marketplace', label: '🛒 Sabo Wholesale & Retail Market' },
      { id: 'business', label: '💼 Industrial & Business Directory' },
      { id: 'fix-my-street', label: '🚧 Fix My Street & Works' },
      { id: 'diaspora', label: '🌍 Global Diaspora Network' },
      { id: 'diaspora-escrow', label: '🤝 Diaspora Grants & Projects' },
    ],
  },
  {
    id: 'community',
    label: 'Healthcare & Schools',
    items: [
      { id: 'health', label: '🏥 OOUTH Teaching Hospital & Blood Bank' },
      { id: 'education', label: '🏫 Schools & Remo Secondary School' },
      { id: 'scholarships', label: '🎓 Scholarships & Innovation Grants' },
      { id: 'faith', label: '⛪ Cathedral, Mosque & Heritage' },
      { id: 'social-connect', label: '🌐 Social Connect & Town Square' },
      { id: 'news', label: '📰 Sagamu Dispatches & Gazette' },
      { id: 'messages', label: '💬 Town Chat & Quarter Channels' },
      { id: 'forum', label: '🗣️ Civic Deliberations Forum' },
      { id: 'associations', label: '🤝 Societies & Clubs (SDA, RSSOSA)' },
    ],
  },
  {
    id: 'heritage',
    label: '13 Quarters & Culture',
    items: [
      { id: 'history', label: '📖 1872 Confederation Founding History' },
      { id: 'timeline', label: '⏳ Dynastic Timeline of Akarigbos' },
      { id: 'map', label: '🗺️ Satellite Landmark Radar' },
      { id: 'tourism', label: '🌴 Tourism & Cultural Citadels' },
      { id: 'gallery', label: '📸 Visual Archives & Media' },
      { id: 'live', label: '🎥 Palace Live TV & Broadcaster' },
      { id: 'quiz', label: '🧠 Heritage Scholar Quiz' },
    ],
  },
];

export default function Nav() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isSosOpen, setIsSosOpen] = useState(false);
  const { user: authUser } = useAuth();
  const currentPage = location.pathname.replace('/', '') || 'home';

  const standalonePages = [
    { id: 'security-dashboard', label: '🛡️ Radar' },
    authUser
      ? { id: 'dashboard', label: `👤 ${authUser.name ? authUser.name.split(' ')[0] : 'Portal'}` }
      : { id: 'signin', label: 'Sign In' },
  ];

  useEffect(() => {
    const handleOpenDonate = () => setIsDonateOpen(true);
    const handleOpenSos = () => setIsSosOpen(true);
    window.addEventListener('open-donate-modal', handleOpenDonate);
    window.addEventListener('open-sos-modal', handleOpenSos);
    return () => {
      window.removeEventListener('open-donate-modal', handleOpenDonate);
      window.removeEventListener('open-sos-modal', handleOpenSos);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const [saasConfig, setSaasConfig] = useState(getSaasConfig());

  useEffect(() => {
    const handleUpdate = () => setSaasConfig(getSaasConfig());
    window.addEventListener('saas-config-updated', handleUpdate);
    window.addEventListener('sagamu-broadcast-updated', handleUpdate);
    return () => {
      window.removeEventListener('saas-config-updated', handleUpdate);
      window.removeEventListener('sagamu-broadcast-updated', handleUpdate);
    };
  }, []);

  const isActive = (id) => currentPage === id;
  const isGroupActive = (group) => group.items.some(item => item.id === currentPage);
  const broadcast = saasConfig.broadcast;

  return (
    <>
      {/* ── TOP MUNICIPAL EXECUTIVE BAR (Distinct from Ogere) ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1002,
          height: '28px',
          background: '#0f172a',
          color: '#cbd5e1',
          fontSize: '0.68rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          borderBottom: '1px solid #1e293b',
        }}
        className="top-municipal-bar"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span>🇳🇬</span>
          <span style={{ fontWeight: 600, color: '#f8fafc', letterSpacing: '0.04em' }}>
            FEDERAL REPUBLIC OF NIGERIA · OGUN STATE · REMOLAND PARAMOUNT HEADQUARTERS
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <span style={{ color: '#94a3b8' }}>📍 6°50′N, 3°38′E</span>
          <span style={{ color: '#4ade80', fontWeight: 600 }}>🟢 13 Quarters Command: Active</span>
          <a href="tel:112" style={{ color: '#f87171', fontWeight: 700, textDecoration: 'none' }}>
            🚨 Emergency Dispatch: 112
          </a>
        </div>
      </div>

      {broadcast && broadcast.enabled && broadcast.message && (
        <div
          style={{
            position: 'fixed',
            top: '28px',
            left: 0,
            right: 0,
            zIndex: 1001,
            padding: '0.35rem 1rem',
            fontSize: '0.74rem',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            background:
              broadcast.type === 'alert' ? '#fef2f2' :
              broadcast.type === 'festival' ? '#ecfdf5' : '#eff6ff',
            borderBottom: `1px solid ${
              broadcast.type === 'alert' ? '#fca5a5' :
              broadcast.type === 'festival' ? '#a7f3d0' : '#bfdbfe'
            }`,
            color:
              broadcast.type === 'alert' ? '#991b1b' :
              broadcast.type === 'festival' ? '#065f46' : '#1e40af',
            fontWeight: 600,
          }}
        >
          <span>{broadcast.type === 'royal' ? '👑' : broadcast.type === 'festival' ? '🎉' : broadcast.type === 'alert' ? '🚨' : 'ℹ️'}</span>
          <span>{broadcast.message}</span>
          {broadcast.ctaLabel && broadcast.ctaLink && (
            <Link
              to={broadcast.ctaLink}
              style={{
                color: '#1e40af',
                fontWeight: 700,
                textDecoration: 'underline',
                marginLeft: '0.4rem',
              }}
            >
              {broadcast.ctaLabel} →
            </Link>
          )}
        </div>
      )}

      {/* ── MAIN CIVIC NAVIGATION BAR ── */}
      <nav
        style={{
          position: 'fixed',
          top: broadcast && broadcast.enabled && broadcast.message ? '60px' : '28px',
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.2s ease',
          background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e2e8f0',
          boxShadow: isScrolled ? '0 4px 20px -2px rgba(15, 23, 42, 0.06)' : '0 1px 3px rgba(0, 0, 0, 0.02)',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          
          {/* Official Emblem & Title */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 900,
                boxShadow: '0 2px 8px rgba(30, 64, 175, 0.2)',
              }}
            >
              👑
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#1e40af', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                SAGAMU
              </span>
              <span style={{ fontSize: '0.58rem', fontWeight: 700, color: '#059669', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Remoland Paramount Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div style={{ display: 'none', gap: '1.2rem', alignItems: 'center' }} className="desktop-nav">
            <style>{`
              @media (min-width: 1024px) {
                .desktop-nav { display: flex !important; }
                .mobile-toggle { display: none !important; }
              }
              @media (max-width: 900px) {
                .top-municipal-bar { display: none !important; }
                nav { top: 0 !important; }
              }
            `}</style>
            
            <Link to="/" className="nav-link" style={{ 
              color: isActive('home') ? '#1e40af' : '#334155',
              fontWeight: isActive('home') ? 800 : 600,
              borderBottom: isActive('home') ? '2px solid #1e40af' : '2px solid transparent'
            }}>
              Home
            </Link>

            {MENU_GROUPS.map((group) => (
              <div 
                key={group.id} 
                style={{ position: 'relative' }}
                onMouseEnter={() => setOpenGroup(group.id)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button className="nav-link" style={{ 
                  color: isGroupActive(group) ? '#1e40af' : '#334155',
                  fontWeight: isGroupActive(group) ? 800 : 600,
                  display: 'flex', alignItems: 'center', gap: '4px',
                  background: 'none', border: 'none', cursor: 'pointer'
                }}>
                  {group.label} <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>▼</span>
                </button>

                {openGroup === group.id && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, minWidth: '240px',
                    padding: '0.5rem 0', borderRadius: '10px', marginTop: '6px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 12px 28px -4px rgba(15, 23, 42, 0.1), 0 4px 8px -2px rgba(15, 23, 42, 0.04)',
                    zIndex: 1003,
                  }}>
                    {group.items.map(item => (
                      <Link key={item.id} to={`/${item.id}`} style={{
                        display: 'block', padding: '0.65rem 1.1rem', fontSize: '0.84rem',
                        color: isActive(item.id) ? '#1e40af' : '#334155',
                        background: isActive(item.id) ? '#eff6ff' : 'transparent',
                        fontWeight: isActive(item.id) ? 700 : 500,
                        textDecoration: 'none',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f8fafc';
                        e.currentTarget.style.color = '#1e40af';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isActive(item.id) ? '#eff6ff' : 'transparent';
                        e.currentTarget.style.color = isActive(item.id) ? '#1e40af' : '#334155';
                      }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {standalonePages.map(page => (
              <Link key={page.id} to={`/${page.id}`} className="nav-link" style={{
                color: isActive(page.id) ? '#1e40af' : '#334155',
                fontWeight: isActive(page.id) ? 800 : 600,
              }}>
                {page.label}
              </Link>
            ))}
            
            {/* Quick Municipal Triggers */}
            <button
              onClick={() => setIsSosOpen(true)}
              className="btn-sos-nav"
              title="Immediate Emergency Rescue & Security Forces"
              style={{
                fontSize: '0.72rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#dc2626',
                border: '1px solid #dc2626',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              <span>🚨</span>
              <span>SOS Rescue</span>
            </button>

            <button
              onClick={() => setIsDonateOpen(true)}
              className="btn-green"
              style={{
                fontSize: '0.72rem',
                padding: '0.45rem 0.85rem',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#059669',
                border: '1px solid #059669',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              <span>💚</span>
              <span>Support Portal</span>
            </button>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-global-search'))}
              title="Search Portal (Ctrl+K)"
              style={{
                fontSize: '0.75rem',
                padding: '0.4rem 0.75rem',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                color: '#475569',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              <span>🔍</span>
              <span style={{ fontSize: '0.7rem' }}>Search</span>
            </button>

            <AiSearch />
          </div>

          {/* Mobile Drawer Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ 
              color: '#0f172a', 
              fontSize: '1.4rem',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              padding: '0.4rem 0.65rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999, paddingTop: 'calc(var(--nav-height) + 30px)',
          overflowY: 'auto', display: 'flex', flexDirection: 'column',
          background: 'rgba(255, 255, 255, 0.99)',
          backdropFilter: 'blur(16px)',
        }}>
          <div className="container" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', marginBottom: '1.2rem' }}>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSosOpen(true);
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontSize: '0.8rem',
                  background: '#dc2626',
                  border: 'none',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  color: '#ffffff',
                  fontWeight: 700,
                }}
              >
                <span>🚨</span>
                <span>Emergency SOS</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsDonateOpen(true);
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  fontSize: '0.8rem',
                  background: '#059669',
                  border: 'none',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  color: '#ffffff',
                  fontWeight: 700,
                }}
              >
                <span>💚</span>
                <span>Support Portal</span>
              </button>
            </div>

            <AiSearch />

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <Link to="/" style={{ fontSize: '1.05rem', fontWeight: 800, color: isActive('home') ? '#1e40af' : '#0f172a' }}>
                🏠 Home
              </Link>
              
              {MENU_GROUPS.map(group => (
                <div key={group.id} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ color: '#1e40af', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.7rem', fontWeight: 800 }}>
                    {group.label}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.65rem' }}>
                    {group.items.map(item => (
                      <Link key={item.id} to={`/${item.id}`} style={{ 
                        fontSize: '0.9rem', 
                        color: isActive(item.id) ? '#1e40af' : '#334155',
                        fontWeight: isActive(item.id) ? 700 : 500,
                        textDecoration: 'none',
                      }}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {standalonePages.map(page => (
                  <Link key={page.id} to={`/${page.id}`} style={{ 
                    fontSize: '0.95rem', 
                    color: isActive(page.id) ? '#1e40af' : '#334155',
                    fontWeight: 600,
                  }}>
                    {page.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <DonateModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
      <SosHeaderModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />

      <style>{`
        .nav-link {
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.4rem 0.2rem;
          transition: all 0.15s ease;
          text-decoration: none;
        }
        .nav-link:hover { color: #1e40af !important; }
      `}</style>
    </>
  );
}
