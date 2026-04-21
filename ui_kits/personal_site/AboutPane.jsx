// AboutPane.jsx — extension surface: brief bio
function AboutPane() {
  return (
    <div style={{ padding: '140px 44px 120px', maxWidth: 720, margin: '0 auto' }}>
      <div style={{
        fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 300,
        letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sand)',
        marginBottom: 28,
      }}>About <span style={{opacity:.5}}>· Extended</span></div>
      <h1 style={{
        fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
        fontSize: 64, lineHeight: 1.06, letterSpacing: '-0.01em',
        color: 'var(--ink)', margin: '0 0 40px',
      }}>I build things. Sometimes they stay built.</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <p style={bodyStyle}>
          I'm Jascha — a person with a laptop, a cream wall, and a slight preference for working late. This site is short on purpose. If we've met, you know where to find me; the footer is a reliable door.
        </p>
        <p style={bodyStyle}>
          Off-page I make small software, write occasionally, and keep a camera closer than seems reasonable.
        </p>
      </div>
      <hr style={{ border: 0, borderTop: '1px solid var(--border)', margin: '64px 0 32px' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
        <Block label="Currently">A hospital app. A personal site that moves.</Block>
        <Block label="Previously">Media lab. Doctoral things.</Block>
        <Block label="Lives">Somewhere warm enough.</Block>
        <Block label="Reads">Shorter than it looks.</Block>
      </div>
    </div>
  );
}

const bodyStyle = {
  fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 17,
  lineHeight: 1.6, color: 'var(--bark)', margin: 0, maxWidth: '56ch',
};

function Block({ label, children }) {
  return (
    <div>
      <div style={{
        fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 300,
        letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--sand)',
        marginBottom: 10,
      }}>{label}</div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
        fontSize: 22, lineHeight: 1.3, color: 'var(--ink)',
      }}>{children}</div>
    </div>
  );
}

window.AboutPane = AboutPane;
