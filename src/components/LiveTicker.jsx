/**
 * LiveTicker — horizontally scrolling ticker strip for alerts/news/updates.
 * Props:
 *   items   – array of strings to display
 *   speed   – scroll speed (default 35s for full loop)
 *   color   – text color
 *   bg      – background color
 *   label   – prefix label e.g. "⚡ SAGAMU LIVE"
 */
export default function LiveTicker({
  items = [],
  speed = 35,
  color = '#1e3a8a',
  bg = '#f8fafc',
  label = '⚡ SAGAMU LIVE',
}) {
  if (!items.length) return null;

  const doubled = [...items, ...items];

  return (
    <div
      aria-label="Live updates ticker"
      style={{
        background: bg,
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        height: '38px',
      }}
    >
      {/* Fixed label */}
      <div
        style={{
          flexShrink: 0,
          padding: '0 1rem',
          fontSize: '0.72rem',
          fontWeight: 800,
          letterSpacing: '0.06em',
          color: '#1e40af',
          borderRight: '1px solid #e2e8f0',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          background: '#eff6ff',
          whiteSpace: 'nowrap',
          zIndex: 2,
        }}
      >
        {label}
      </div>

      {/* Scrolling track */}
      <div
        style={{
          overflow: 'hidden',
          flex: 1,
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            whiteSpace: 'nowrap',
            animation: `ticker ${speed}s linear infinite`,
          }}
        >
          {doubled.map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: '0.82rem',
                color: color,
                padding: '0 1.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 500,
              }}
            >
              <span>•</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
