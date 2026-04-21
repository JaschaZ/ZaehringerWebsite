// FooterBar.jsx — pinned footer, label + links, underline-grow on hover
function FooterBar({ onContact }) {
  const linkStyle = {
    color: 'var(--ink)',
    textDecoration: 'none',
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: 11,
    fontWeight: 300,
    letterSpacing: '0.04em',
    position: 'relative',
    cursor: 'none',
  };
  const Link = ({ href, onClick, children, external }) => {
    const [hover, setHover] = React.useState(false);
    return (
      <a href={href} onClick={onClick} target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={linkStyle}>
        {children}
        <span style={{
          position: 'absolute', bottom: -1, left: 0,
          width: hover ? '100%' : 0, height: 1, background: 'currentColor',
          transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </a>
    );
  };

  return (
    <footer style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      padding: '18px 44px', zIndex: 10,
      borderTop: '1px solid rgba(26,26,26,0.1)',
      opacity: 0,
      animation: 'jzFadeIn 1.2s ease 0.7s forwards',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: 9.5, fontWeight: 300, letterSpacing: '0.24em',
        textTransform: 'uppercase', color: 'var(--sand)',
      }}>Get in touch</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <Link href="#" onClick={(e) => { e.preventDefault(); onContact?.(); }}>
          jaschazaehringer@protonmail.com
        </Link>
        <span style={{ color: 'var(--stone)', fontSize: 10 }}>·</span>
        <Link href="https://www.instagram.com/jascha_z/" external>Instagram ↗</Link>
        <span style={{ color: 'var(--stone)', fontSize: 10 }}>·</span>
        <Link href="https://www.linkedin.com/in/jascha-david-z%C3%A4hringer-0b726a242" external>LinkedIn ↗</Link>
      </div>
    </footer>
  );
}

window.FooterBar = FooterBar;
