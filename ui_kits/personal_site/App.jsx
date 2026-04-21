// App.jsx — top-level shell for the Zähringer personal site
function App() {
  const [route, setRoute] = React.useState('home'); // home | writing | article | about
  const [article, setArticle] = React.useState(null);
  const [contactOpen, setContactOpen] = React.useState(false);
  const footerRef = React.useRef(null);

  const openArticle = (a) => { setArticle(a); setRoute('article'); window.scrollTo(0, 0); };
  const backToWriting = () => { setArticle(null); setRoute('writing'); window.scrollTo(0, 0); };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <HeaderName />

      {/* Nav (extension — not on live site, kept minimal) */}
      <nav style={{
        position: 'fixed', top: 36, right: 44, zIndex: 10,
        display: 'flex', gap: 22,
        opacity: 0, animation: 'jzFadeIn 1.2s ease 0.5s forwards',
      }}>
        {['home', 'writing', 'about'].map((r) => (
          <NavItem key={r} active={route === r || (r === 'writing' && route === 'article')}
            onClick={() => { setRoute(r); setArticle(null); }}>
            {r}
          </NavItem>
        ))}
      </nav>

      {/* Home — the canonical, unaltered experience */}
      {route === 'home' && (
        <LetterChain text="FOLLOW YOUR DREAM" footerRef={footerRef} />
      )}

      {route === 'writing' && <WritingIndex onOpen={openArticle} />}
      {route === 'article' && article && <ArticleView article={article} onBack={backToWriting} />}
      {route === 'about' && <AboutPane />}

      <div ref={footerRef}>
        <FooterBar onContact={() => setContactOpen(true)} />
      </div>

      <ContactDrawer open={contactOpen} onClose={() => setContactOpen(false)} />
      <Cursor />
    </div>
  );
}

function NavItem({ active, onClick, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: 'transparent', border: 0, padding: 0,
        fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 300,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'var(--ink)', cursor: 'none',
        position: 'relative', opacity: active ? 1 : 0.6,
        transition: 'opacity 0.3s ease',
      }}>
      {children}
      <span style={{
        position: 'absolute', bottom: -4, left: 0,
        width: (active || hover) ? '100%' : 0, height: 1, background: 'currentColor',
        transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)',
      }} />
    </button>
  );
}

window.App = App;
