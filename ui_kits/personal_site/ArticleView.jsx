// ArticleView.jsx — individual post reading view
// Drop cap, italic pull-quote, back-to-index footer
function ArticleView({ article, onBack }) {
  return (
    <div style={{ padding: '140px 44px 160px', maxWidth: 680, margin: '0 auto' }}>
      {/* Back link */}
      <BackLink onClick={onBack} />

      {/* Meta */}
      <div style={{
        fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 300,
        letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sand)',
        marginTop: 40, marginBottom: 28,
        display: 'flex', gap: 18, alignItems: 'center',
      }}>
        <span>{article.kind}</span>
        <span style={{ color: 'var(--stone)' }}>·</span>
        <span>{article.date || article.year}</span>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
        fontSize: 'clamp(44px, 7vw, 72px)', lineHeight: 1.12,
        letterSpacing: '-0.01em', color: 'var(--ink)', margin: 0,
        textWrap: 'balance',
      }}>{article.title}</h1>

      {/* Standfirst */}
      {article.standfirst && (
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
          fontSize: 22, lineHeight: 1.45, color: 'var(--bark)',
          margin: '44px 0 0', maxWidth: '48ch',
        }}>{article.standfirst}</p>
      )}

      {/* Body */}
      <article style={{ marginTop: 56 }}>
        {article.body.map((block, i) => renderBlock(block, i))}
      </article>

      {/* End rule + signature */}
      <div style={{
        marginTop: 80, paddingTop: 40,
        borderTop: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
          fontSize: 20, color: 'var(--ink)',
        }}>— Jascha</span>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 300,
          letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sand)',
        }}>§</span>
      </div>

      <div style={{ marginTop: 56 }}><BackLink onClick={onBack} label="Back to writing" /></div>
    </div>
  );
}

function renderBlock(block, i) {
  if (block.type === 'p' && i === 0) {
    // First paragraph: drop cap on first letter
    const text = block.text;
    const first = text[0];
    const rest = text.slice(1);
    return (
      <p key={i} style={{ ...bodyPStyle, marginTop: 0 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
          fontWeight: 500, fontSize: 88, lineHeight: 0.9,
          float: 'left', marginRight: 10, marginTop: 6, marginBottom: -6,
          color: 'var(--ink)',
        }}>{first}</span>
        {rest}
      </p>
    );
  }
  if (block.type === 'p') {
    return <p key={i} style={bodyPStyle}>{block.text}</p>;
  }
  if (block.type === 'quote') {
    return (
      <blockquote key={i} style={{
        fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
        fontWeight: 400, fontSize: 30, lineHeight: 1.3,
        color: 'var(--ink)', margin: '48px 0',
        paddingLeft: 24, borderLeft: '1px solid var(--oat)',
        maxWidth: '48ch', textWrap: 'balance',
      }}>{block.text}</blockquote>
    );
  }
  if (block.type === 'h2') {
    return (
      <h2 key={i} style={{
        fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
        fontSize: 36, lineHeight: 1.2, letterSpacing: '-0.005em',
        color: 'var(--ink)', margin: '64px 0 20px',
      }}>{block.text}</h2>
    );
  }
  if (block.type === 'hr') {
    return <div key={i} style={{
      textAlign: 'center', margin: '48px 0',
      fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
      fontSize: 18, color: 'var(--stone)', letterSpacing: '0.5em',
    }}>· · ·</div>;
  }
  return null;
}

const bodyPStyle = {
  fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 18,
  lineHeight: 1.68, color: 'var(--bark)',
  margin: '0 0 24px', maxWidth: '62ch', textWrap: 'pretty',
};

function BackLink({ onClick, label = 'Back' }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: 'transparent', border: 0, padding: 0, cursor: 'none',
        fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 300,
        letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink)',
        position: 'relative', display: 'inline-block',
      }}>
      ← {label}
      <span style={{
        position: 'absolute', bottom: -4, left: 0,
        width: hover ? '100%' : 0, height: 1, background: 'currentColor',
        transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)',
      }} />
    </button>
  );
}

window.ArticleView = ArticleView;
