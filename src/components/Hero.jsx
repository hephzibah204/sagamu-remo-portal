export default function Hero({ ey, ti, sub, dark }) {
  return (
    <div
      style={{
        minHeight: '45vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'calc(var(--nav-height) + 3rem) 1.5rem 3.5rem',
        position: 'relative',
        overflow: 'hidden',
        background: dark 
          ? 'linear-gradient(180deg, #1e3a8a 0%, #0f172a 100%)' 
          : 'linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      {/* Subtle Background Accent */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: dark ? 'rgba(37, 99, 235, 0.15)' : 'rgba(37, 99, 235, 0.05)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: dark ? 'rgba(5, 150, 105, 0.15)' : 'rgba(5, 150, 105, 0.05)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
        {ey && (
          <div
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.8rem',
              borderRadius: '20px',
              background: dark ? 'rgba(255, 255, 255, 0.1)' : '#eff6ff',
              border: dark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid #bfdbfe',
              color: dark ? '#93c5fd' : '#1e40af', 
              fontSize: '0.75rem', 
              fontWeight: 700,
              letterSpacing: '0.08em', 
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}
          >
            {ey}
          </div>
        )}
        <h1 
          style={{ 
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', 
            fontWeight: 800, 
            lineHeight: 1.15,
            color: dark ? '#ffffff' : '#0f172a',
            marginBottom: '1.2rem',
            letterSpacing: '-0.02em',
          }}
        >
          {ti}
        </h1>
        <div 
          style={{ 
            width: '48px', 
            height: '3px', 
            background: 'linear-gradient(90deg, #1e40af, #059669)', 
            margin: '0 auto 1.5rem',
            borderRadius: '2px',
          }} 
        />
        {sub && (
          <p 
            style={{ 
              fontSize: 'clamp(1rem, 2vw, 1.15rem)', 
              color: dark ? '#cbd5e1' : '#475569',
              maxWidth: '640px',
              margin: '0 auto',
              lineHeight: 1.7
            }}
          >
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
