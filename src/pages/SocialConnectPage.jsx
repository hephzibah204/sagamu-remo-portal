import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TimelineFeed from '../components/TimelineFeed';
import { useAuth } from '../contexts/AuthContext';

export default function SocialConnectPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'quarters' | 'topics'

  const quarters = [
    { name: 'Offin Quarter', tag: '#OffinSagamu', members: '4.2k indigenes', icon: '👑', desc: 'Aafin Akarigbo, Central Ita Oba, Palace notices & royal cultural dispatches.' },
    { name: 'Makun Quarter', tag: '#MakunRemo', members: '3.8k indigenes', icon: '🏥', desc: 'Hospital axis, OOUTH community, trade & Makun traditional announcements.' },
    { name: 'Sonyindo Quarter', tag: '#SonyindoHub', members: '2.1k indigenes', icon: '🏛️', desc: 'Alaye domain, youth enterprises, community development discussions.' },
    { name: 'Epe Quarter', tag: '#EpeRemo', members: '1.9k indigenes', icon: '🌿', desc: 'Agro-allied corridors, sacred heritage, rural-urban links.' },
    { name: 'Sabo Trade District', tag: '#SaboKolanut', members: '5.1k merchants', icon: '🌾', desc: 'West African kolanut trade, logistics updates, inter-state commerce.' },
    { name: 'Diaspora Remo', tag: '#RemoInDiaspora', members: '6.4k global', icon: '🌍', desc: 'UK, US, Canada, Europe indigenes sharing projects, investments and homecoming plans.' }
  ];

  const trendingTopics = [
    { topic: '#SagamuInterchange', count: '142 posts this week', category: 'Infrastructure & Transit' },
    { topic: '#AkarigboPalaceUpdate', count: '98 posts this week', category: 'Royal & Cultural' },
    { topic: '#SaboKolanutMarket', count: '87 posts this week', category: 'Commerce & Commodities' },
    { topic: '#OOUTHExcellence', count: '65 posts this week', category: 'Health & Medical' },
    { topic: '#RemoSecondarySchool', count: '54 posts this week', category: 'Education & Alumni' }
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      <SEO
        title="Social Connect — Sagamu Civic Community Network"
        description="Connect with citizens, indigenes, and diaspora across all 13 confederate quarters of Sagamu. Share dispatches, updates, and community deliberations."
      />

      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #059669 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.35rem 0.85rem', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <span>🌐</span> Civic Social Network & Community Hub
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Sagamu Social Connect
          </h1>
          <p style={{ marginTop: '0.75rem', fontSize: '1.05rem', color: '#e2e8f0', maxWidth: 680, lineHeight: 1.6 }}>
            The dedicated digital town square connecting indigenes, residents, quarter councils, and diaspora across all 13 confederate quarters of Remoland.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('feed')}
              style={{
                background: activeTab === 'feed' ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: activeTab === 'feed' ? '#1e3a8a' : '#ffffff',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '0.5rem',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <span>💬</span> Live Dispatches & Timeline
            </button>
            <button
              onClick={() => setActiveTab('quarters')}
              style={{
                background: activeTab === 'quarters' ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: activeTab === 'quarters' ? '#1e3a8a' : '#ffffff',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '0.5rem',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <span>🏛️</span> Quarter Communities
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              style={{
                background: activeTab === 'topics' ? '#ffffff' : 'rgba(255,255,255,0.15)',
                color: activeTab === 'topics' ? '#1e3a8a' : '#ffffff',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '0.5rem',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem'
              }}
            >
              <span>🔥</span> Trending Topics
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '2rem', alignItems: 'start' }}>
          
          {/* Main Feed Column */}
          <div>
            {activeTab === 'feed' && (
              <div>
                <div style={{ marginBottom: '1.5rem', background: '#ffffff', padding: '1.25rem 1.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>Town Square Dispatches</h2>
                      <p style={{ margin: '0.2rem 0 0', fontSize: '0.82rem', color: '#64748b' }}>Real-time updates, local deliberations, and announcements from fellow Sagamites.</p>
                    </div>
                    {!user && (
                      <Link to="/signin" style={{ background: '#eff6ff', color: '#1e40af', padding: '0.4rem 0.8rem', borderRadius: '0.375rem', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}>
                        Sign In to Post →
                      </Link>
                    )}
                  </div>
                </div>

                <TimelineFeed showHeader={false} />
              </div>
            )}

            {activeTab === 'quarters' && (
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Quarter Social Channels</h2>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Join dedicated quarter discussions, local youth groups, and ancestral family circles.</p>
                </div>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {quarters.map((q, idx) => (
                    <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                      <div style={{ fontSize: '2rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', flexShrink: 0 }}>
                        {q.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>{q.name}</h3>
                          <span style={{ background: '#eff6ff', color: '#1e40af', padding: '0.2rem 0.6rem', borderRadius: 999, fontSize: '0.72rem', fontWeight: 700 }}>
                            {q.members}
                          </span>
                        </div>
                        <div style={{ color: '#059669', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.2rem' }}>{q.tag}</div>
                        <p style={{ color: '#475569', fontSize: '0.88rem', margin: '0.5rem 0 0.75rem', lineHeight: 1.5 }}>{q.desc}</p>
                        <button
                          onClick={() => setActiveTab('feed')}
                          style={{ background: '#0f172a', color: '#ffffff', border: 'none', padding: '0.4rem 0.85rem', borderRadius: '0.375rem', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                        >
                          View Channel Feed
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'topics' && (
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem' }}>Trending In Sagamu</h2>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Key discussions, infrastructure progress, and cultural highlights capturing public interest.</p>
                </div>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {trendingTopics.map((t, idx) => (
                    <div key={idx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{t.category}</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e40af' }}>{t.topic}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>{t.count}</div>
                      </div>
                      <button
                        onClick={() => setActiveTab('feed')}
                        style={{ background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0', padding: '0.45rem 0.9rem', borderRadius: '0.375rem', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Explore Posts
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Quick Post Notice */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                Civic Guidelines
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem' }}>
                Respectful Community Deliberation
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.55, margin: '0 0 0.75rem' }}>
                Sagamu Social Connect is our civic digital home. Please maintain dignity, foster harmony across all 13 quarters, and celebrate our collective progress.
              </p>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.78rem', color: '#475569' }}>
                <div>✅ Share factual quarter events</div>
                <div>✅ Promote local commerce & crafts</div>
                <div>✅ Support emergency & road notices</div>
              </div>
            </div>

            {/* Quarter Quick Directory */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem' }}>
                13 Quarters Network
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {['Offin', 'Makun', 'Sonyindo', 'Epe', 'Ibido', 'Igbepa', 'Ado', 'Oko', 'Ipoji', 'Batoro', 'Ijoku', 'Latawa', 'Ijagba'].map(q => (
                  <span
                    key={q}
                    onClick={() => setActiveTab('quarters')}
                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '0.25rem 0.55rem', borderRadius: '0.25rem', fontSize: '0.74rem', color: '#334155', fontWeight: 600, cursor: 'pointer' }}
                  >
                    #{q}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem' }}>
                Community Portals
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
                <Link to="/forum" style={{ color: '#1e40af', textDecoration: 'none', fontWeight: 600 }}>🗣️ Civic Deliberations Forum →</Link>
                <Link to="/messages" style={{ color: '#1e40af', textDecoration: 'none', fontWeight: 600 }}>💬 Quarter Direct Chat →</Link>
                <Link to="/news" style={{ color: '#1e40af', textDecoration: 'none', fontWeight: 600 }}>📰 Official Sagamu Gazette →</Link>
                <Link to="/events" style={{ color: '#1e40af', textDecoration: 'none', fontWeight: 600 }}>📅 Town Events & Festivals →</Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
