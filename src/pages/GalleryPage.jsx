import { useState } from 'react';
import { photos, galleryCategories } from '../data/gallery';
import SEO from '../components/SEO';

export default function GalleryPage() {
  const [cat, setCat] = useState('all');
  const [modal, setModal] = useState(null);
  const filtered = photos.filter(p => cat === 'all' || p.cat === cat);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      <SEO
        title="Visual Archives & Gallery — Sagamu Remoland"
        description="Explore the authentic visual archives of Sagamu: Aafin Akarigbo Palace, royal assemblies, 13 confederate quarters, historic schools, and municipal development."
      />

      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 60%, #059669 100%)', color: '#ffffff', padding: '3.5rem 1.5rem 3rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.35rem 0.85rem', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            <span>📸</span> Verified Civic & Cultural Archives
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            Sagamu Visual Archives & Gallery
          </h1>
          <p style={{ marginTop: '0.75rem', fontSize: '1.05rem', color: '#e2e8f0', maxWidth: 700, lineHeight: 1.6 }}>
            Official photographic documentation of Sagamu Remoland: From the sovereign seat of the Akarigbo at Ita Oba to the 13 confederate quarters, historic academies, and modern industrial milestones.
          </p>

          {/* Filter Bar */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {galleryCategories.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={{
                  background: cat === c ? '#ffffff' : 'rgba(255,255,255,0.15)',
                  color: cat === c ? '#1e3a8a' : '#ffffff',
                  border: 'none',
                  padding: '0.45rem 1rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {c.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1.5rem 4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>
            Showing <span style={{ color: '#0f172a', fontWeight: 800 }}>{filtered.length}</span> archive photographs in <span style={{ color: '#059669', textTransform: 'capitalize' }}>{cat.replace('-', ' ')}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', background: '#ecfdf5', padding: '0.3rem 0.75rem', borderRadius: 999, fontWeight: 700 }}>
            ✓ 100% Authentic Sagamu Heritage
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((p, i) => (
            <div
              key={i}
              onClick={() => setModal(p)}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
              }}
            >
              <div style={{ height: 210, background: p.bg, position: 'relative', overflow: 'hidden' }}>
                <img
                  src={p.src}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(4px)',
                    color: '#ffffff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 999,
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}
                >
                  {p.cat}
                </span>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  <span>{p.icon}</span> {p.date}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem', lineHeight: 1.35 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#475569', margin: '0 0 0.85rem' }}>
                  {p.desc}
                </p>
                <div style={{ paddingTop: '0.65rem', borderTop: '1px solid #f1f5f9', fontSize: '0.72rem', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>📷 {p.credit}</span>
                  <span style={{ color: '#1e40af', fontWeight: 700 }}>Expand ↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Modal Viewer */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem'
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderRadius: '1rem',
              maxWidth: 720,
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}
          >
            <div style={{ maxHeight: 380, background: modal.bg, position: 'relative', overflow: 'hidden' }}>
              <img
                src={modal.src}
                alt={modal.title}
                style={{ width: '100%', height: '100%', maxHeight: 380, objectFit: 'contain', background: '#0f172a' }}
              />
              <button
                onClick={() => setModal(null)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(15, 23, 42, 0.75)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 999,
                  width: 36,
                  height: 36,
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '1.75rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                {modal.icon} {modal.date} · {modal.cat.replace('-', ' ')}
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem' }}>
                {modal.title}
              </h2>
              <p style={{ fontSize: '0.92rem', lineHeight: 1.7, color: '#475569', margin: '0 0 1.25rem' }}>
                {modal.desc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '0.78rem', color: '#64748b' }}>
                <span>📷 Provenance: <strong>{modal.credit}</strong></span>
                <button
                  onClick={() => setModal(null)}
                  style={{
                    background: '#1e40af',
                    color: '#ffffff',
                    border: 'none',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
