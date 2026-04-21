// ContactDrawer.jsx — extension surface; slides up from bottom
function ContactDrawer({ open, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, pointerEvents: open ? 'auto' : 'none',
      zIndex: 50,
    }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0, background: 'rgba(26,26,26,0.08)',
        opacity: open ? 1 : 0, transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)',
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: 'var(--parchment)', borderTop: '1px solid var(--border)',
        padding: '56px 44px 80px', transform: open ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{
            fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 300,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sand)',
            marginBottom: 24,
          }}>Write to me</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
            fontSize: 56, lineHeight: 1.08, letterSpacing: '-0.01em',
            color: 'var(--ink)', margin: 0,
          }}>A few words, no more than needed.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 44 }}>
            <Field label="Your name" />
            <Field label="Email" />
            <Field label="Message" multiline />
            <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
              <button style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 300,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                padding: '14px 28px', background: 'var(--ink)', color: 'var(--cream)',
                border: 0, borderRadius: 2, cursor: 'none',
              }}>Send</button>
              <button onClick={onClose} style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 300,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                padding: '14px 22px', background: 'transparent', color: 'var(--ink)',
                border: 0, cursor: 'none',
              }}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, multiline }) {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{
        fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 300,
        letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sand)',
      }}>{label}</label>
      <Tag style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 300, fontSize: 15,
        color: 'var(--ink)', background: 'transparent', border: 0,
        borderBottom: '1px solid var(--border)', padding: '8px 0', outline: 'none',
        resize: 'none', minHeight: multiline ? 60 : 'auto',
      }} />
    </div>
  );
}

window.ContactDrawer = ContactDrawer;
