// LetterChain.jsx — ported from source/MouseFollow.js
// "FOLLOW YOUR DREAM" chasing the pointer; idle sine drift when still.
function LetterChain({ text = 'FOLLOW YOUR DREAM', footerRef }) {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    const settings = {
      letters: text,
      minDistance: isMobile ? 18 : 22,
      font: isMobile ? 'italic 30px "Cormorant Garamond", Georgia, serif'
                     : 'italic 34px "Cormorant Garamond", Georgia, serif',
      color: '#1A1A1A',
      footerClearance: 22,
    };

    const win = { w: window.innerWidth, h: window.innerHeight };
    const mobileCenterX = () => win.w / 2 + Math.ceil(settings.letters.length / 2) * settings.minDistance;
    const mobileCenterY = () => win.h * 0.44;
    const mouse = {
      x: isMobile ? mobileCenterX() : win.w / 2,
      y: isMobile ? mobileCenterY() : win.h / 2,
    };

    const letters = settings.letters.split('').reverse();
    const chain = letters.map((ltr, i) => ({
      letter: ltr, x: mouse.x - i * settings.minDistance, y: mouse.y,
    }));

    const resize = () => {
      win.w = window.innerWidth; win.h = window.innerHeight;
      canvas.width = win.w * dpr; canvas.height = win.h * dpr;
      canvas.style.width = win.w + 'px'; canvas.style.height = win.h + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();

    const footerTop = () => footerRef?.current
      ? footerRef.current.getBoundingClientRect().top
      : win.h - 60;
    const clampY = (y) => Math.min(y, footerTop() - settings.footerClearance);

    let isInteracting = false, timeoutID, time = 0;
    const scale = (v, x1, y1, x2, y2) => (v - x1) * (y2 - x2) / (y1 - x1) + x2;
    const lerp = (a, b, t) => a + t * (b - a);

    const onMove = (e) => {
      isInteracting = true;
      mouse.x = e.clientX; mouse.y = e.clientY;
      chain[0].x = mouse.x; chain[0].y = clampY(mouse.y);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => { isInteracting = false; }, 2000);
    };
    const onTouch = (e) => {
      const t = e.touches[0]; if (!t) return;
      mouse.x = t.clientX; mouse.y = clampY(t.clientY);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        mouse.x = mobileCenterX(); mouse.y = mobileCenterY();
      }, 2500);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = settings.font;
      ctx.fillStyle = settings.color;
      ctx.textBaseline = 'middle';
      const targetY = clampY(mouse.y);
      chain.forEach((link, index) => {
        ctx.globalAlpha = Math.max(1 - index * 0.018, 0.25);
        if (isInteracting) {
          ctx.fillText(link.letter, link.x - settings.minDistance, link.y);
          if (index > 0) {
            const p = chain[index - 1];
            const dx = link.x - p.x, dy = link.y - p.y;
            const d = Math.sqrt(dx*dx + dy*dy);
            if (d > settings.minDistance) {
              const r = settings.minDistance / d;
              link.x = lerp(link.x, p.x + dx * r, 0.4);
              link.y = lerp(link.y, p.y + dy * r, 0.4);
            }
          }
        } else {
          const theta = scale(index, 0, chain.length, 0.3, 0.06);
          link.x = lerp(link.x, mouse.x - (index + 1) * settings.minDistance, theta);
          link.y = lerp(link.y, targetY + Math.sin(time * 0.3 + index * 0.5) * 4, theta);
          ctx.fillText(link.letter, link.x, link.y);
        }
      });
      ctx.globalAlpha = 1;
    };

    const animate = () => { time += 0.1; rafRef.current = requestAnimationFrame(animate); draw(); };

    window.addEventListener('resize', resize);
    if (isMobile) window.addEventListener('touchstart', onTouch, { passive: true });
    else window.addEventListener('mousemove', onMove);

    (document.fonts?.ready || Promise.resolve()).then(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchstart', onTouch);
    };
  }, [text, footerRef]);

  return <canvas ref={canvasRef} style={{ display: 'block', position: 'fixed', inset: 0 }} />;
}

window.LetterChain = LetterChain;
