// Cursor.jsx — 7px blend-multiply dot following the pointer
function Cursor() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
      el.style.opacity = 1;
    };
    const leave = () => { el.style.opacity = 0; };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);
  return (
    <div ref={ref} style={{
      position: 'fixed', width: 7, height: 7, borderRadius: '50%',
      background: 'var(--ink)', pointerEvents: 'none', zIndex: 9999,
      transform: 'translate(-50%, -50%)', mixBlendMode: 'multiply',
      opacity: 0, transition: 'opacity 0.3s ease',
    }} />
  );
}

window.Cursor = Cursor;
