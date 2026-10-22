export default function Section({ bg, py, children, mw, noContainer }) {
  // Normalize legacy dark section backgrounds to clean civic light palette
  let cleanBg = bg || 'transparent';
  if (
    bg === '#0A0F1D' ||
    bg === 'var(--dark)' ||
    bg === '#0d0704' ||
    bg === 'rgba(13,7,4,0.6)' ||
    bg === 'rgba(13, 7, 4, 0.6)'
  ) {
    cleanBg = '#f8fafc';
  } else if (
    bg === '#050811' ||
    bg === 'var(--darker)' ||
    bg === '#000000' ||
    bg === '#0A0F1D'
  ) {
    cleanBg = '#ffffff';
  }

  return (
    <section
      style={{
        background: cleanBg,
        padding: `${py || 'var(--section-py)'} 0`,
        position: 'relative',
      }}
    >
      {noContainer ? (
        children
      ) : (
        <div 
          className="container" 
          style={{ maxWidth: mw || 'var(--max-width)' }}
        >
          {children}
        </div>
      )}
    </section>
  );
}
