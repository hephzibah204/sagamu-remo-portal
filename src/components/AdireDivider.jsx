export default function AdireDivider({ thin }) {
  return (
    <div
      style={{
        height: thin ? 4 : 10,
        opacity: thin ? 0.6 : 1,
        background: `repeating-linear-gradient(
          90deg,
          #1E3A8A 0, #1E3A8A ${thin ? 6 : 8}px,
          #C9963A ${thin ? 6 : 8}px, #C9963A ${thin ? 12 : 16}px,
          #8B1E3F ${thin ? 12 : 16}px, #8B1E3F ${thin ? 18 : 24}px,
          #C9963A ${thin ? 18 : 24}px, #C9963A ${thin ? 24 : 32}px
        )`,
      }}
    />
  );
}
