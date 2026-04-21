// HeaderName.jsx — pinned header with the name plate
function HeaderName() {
  return (
    <header style={{
      position: 'fixed',
      top: 36,
      left: 44,
      zIndex: 10,
      pointerEvents: 'none',
      opacity: 0,
      animation: 'jzFadeIn 1.2s ease 0.4s forwards',
    }}>
      <span style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: 10.5,
        fontWeight: 300,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--ink)',
      }}>Jascha Zähringer</span>
    </header>
  );
}

window.HeaderName = HeaderName;
