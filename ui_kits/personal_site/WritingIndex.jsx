// WritingIndex.jsx — extension surface: a quiet list of writing
function WritingIndex({ onOpen }) {
  const items = window.ARTICLES || [];
  return (
    <div style={{ padding: '140px 44px 120px', maxWidth: 780, margin: '0 auto' }}>
      <div style={{
        fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 300,
        letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sand)',
        marginBottom: 28,
      }}>Writing <span style={{opacity:.5}}>· Extended</span></div>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
        fontSize: 72, lineHeight: 1.05, letterSpacing: '-0.01em',
        color: 'var(--ink)', margin: '0 0 64px',
      }}>A shelf of short things.</h1>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((it, i) => (
          <WritingRow key={i} item={it} onClick={() => onOpen?.(it)} />
        ))}
      </ul>
    </div>
  );
}

function WritingRow({ item, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <li onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        display: 'grid', gridTemplateColumns: '72px 1fr auto',
        alignItems: 'baseline', gap: 24,
        padding: '22px 0', borderBottom: '1px solid var(--border)',
        cursor: 'none',
      }}>
      <span style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 11,
        letterSpacing: '0.22em', color: 'var(--sand)',
      }}>{item.year}</span>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
        fontSize: 28, lineHeight: 1.25, color: 'var(--ink)',
        position: 'relative', display: 'inline-block',
      }}>
        {item.title}
        <span style={{
          position: 'absolute', bottom: 0, left: 0,
          width: hover ? '100%' : 0, height: 1, background: 'currentColor',
          transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </span>
      <span style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 11,
        letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--stone)',
      }}>{item.kind}</span>
    </li>
  );
}

window.WritingIndex = WritingIndex;
