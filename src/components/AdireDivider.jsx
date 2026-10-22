export default function AdireDivider({ thin }) {
  return (
    <div
      style={{
        height: thin ? '1px' : '2px',
        width: '100%',
        background: 'linear-gradient(90deg, transparent 0%, #1e40af 20%, #059669 80%, transparent 100%)',
        opacity: thin ? 0.25 : 0.45,
        margin: '0 auto',
      }}
    />
  );
}
