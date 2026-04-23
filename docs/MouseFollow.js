/*--------------------
Utils
--------------------*/
const scale = (v, x1, y1, x2, y2) => (v - x1) * (y2 - x2) / (y1 - x1) + x2;
const lerp = (a, b, t) => a + t * (b - a)

/*--------------------
Device detection
--------------------*/
const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches

/*--------------------
Settings
--------------------*/
const settings = {
  letters: 'FOLLOW YOUR DREAM',
  minDistance: isMobile ? 18 : 22,
  font: isMobile
    ? 'italic 30px "Cormorant Garamond", Georgia, serif'
    : 'italic 34px "Cormorant Garamond", Georgia, serif',
  color: '#1A1A1A',
  footerClearance: 22,
  headerClearance: 20,
}

/*--------------------
Setup
--------------------*/
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const cursorEl = document.getElementById('cursor')
const footerEl = document.getElementById('footer')
const headerEl = document.getElementById('header')

const win = {
  w: window.innerWidth,
  h: window.innerHeight
}

const mouse = {
  x: win.w / 2,
  y: win.h / 2,
}

let time = 0
let autoTime = 0
const devicePixelRatio = window.devicePixelRatio || 1
const chain = []
const letters = settings.letters.split('').reverse()
for (let i = 0; i < letters.length; i++) {
  chain.push({
    letter: letters[i],
    x: mouse.x - i * settings.minDistance,
    y: mouse.y,
  })
}


/*--------------------
Resize
--------------------*/
const onResize = () => {
  win.w = window.innerWidth
  win.h = window.innerHeight
  canvas.width = win.w * devicePixelRatio
  canvas.height = win.h * devicePixelRatio
  canvas.style.width = `${win.w}px`
  canvas.style.height = `${win.h}px`
  ctx.scale(devicePixelRatio, devicePixelRatio)
}
onResize()


/*--------------------
Helpers
--------------------*/
const getFooterTop   = () => footerEl.getBoundingClientRect().top
const getHeaderBottom = () => headerEl ? headerEl.getBoundingClientRect().bottom : 0
const clampY = (y) => Math.min(y, getFooterTop() - settings.footerClearance)


/*--------------------
Desktop – mouse
--------------------*/
let isInteracting = false
let timeoutID

const onMouseMove = (e) => {
  isInteracting = true
  mouse.x = e.clientX
  mouse.y = e.clientY

  cursorEl.style.left = e.clientX + 'px'
  cursorEl.style.top = e.clientY + 'px'
  cursorEl.classList.add('visible')

  chain[0].x = mouse.x
  chain[0].y = clampY(mouse.y)

  clearTimeout(timeoutID)
  timeoutID = setTimeout(() => { isInteracting = false }, 2000)
}


/*--------------------
Mobile – autonomous wander target
The head chases this target; the body snakes behind it.
Modulated sine at irrational ratio (≈ √2) → smooth, non-repeating
curves that never collapse into a straight line or sharp corner.
--------------------*/
const updateMobileTarget = () => {
  // ~15 s per full X cycle, ~11 s per Y cycle at 60 fps
  autoTime += 0.007

  const headerBottom = getHeaderBottom()
  const footerTop    = getFooterTop()

  const margin = 28
  const xMid = win.w / 2
  const xAmp = win.w / 2 - margin

  const yMin = headerBottom + settings.headerClearance + 30
  const yMax = footerTop    - settings.footerClearance - 30
  const yMid = (yMin + yMax) / 2
  const yAmp = (yMax - yMin) / 2

  // Outer + inner sine → organic, ever-varying curves
  mouse.x = xMid + Math.sin(autoTime       + Math.sin(autoTime * 0.31) * 1.2) * xAmp * 0.82
  mouse.y = yMid + Math.sin(autoTime * 1.41 + Math.sin(autoTime * 0.47) * 0.9) * yAmp * 0.82
}


/*--------------------
Listeners
--------------------*/
window.addEventListener('resize', onResize)

if (!isMobile) {
  window.addEventListener('mousemove', onMouseMove)
}


/*--------------------
Clear
--------------------*/
const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}


/*--------------------
Draw
--------------------*/
const draw = () => {
  clear()

  ctx.font = settings.font
  ctx.fillStyle = settings.color
  ctx.textBaseline = 'middle'

  const targetY = clampY(mouse.y)

  chain.forEach((link, index) => {
    const alpha = 1 - index * 0.018
    ctx.globalAlpha = Math.max(alpha, 0.25)

    if (isInteracting) {
      // ── Desktop drag: chain trails the cursor ──────────────────────────
      ctx.fillText(link.letter, link.x - settings.minDistance, link.y)

      if (index > 0) {
        const prev = chain[index - 1]
        const dx = link.x - prev.x
        const dy = link.y - prev.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > settings.minDistance) {
          const ratio = settings.minDistance / dist
          link.x = lerp(link.x, prev.x + dx * ratio, 0.4)
          link.y = lerp(link.y, prev.y + dy * ratio, 0.4)
        }
      }

    } else if (isMobile) {
      // ── Mobile snake: head chases autonomous target, ───────────────────
      // ── each letter physically follows the one ahead of it  ───────────
      if (index === 0) {
        // Head smoothly pursues the wandering target
        link.x = lerp(link.x, mouse.x,  0.1)
        link.y = lerp(link.y, targetY,  0.1)
      } else {
        // Body: pull each link to exactly minDistance behind the previous
        const prev = chain[index - 1]
        const dx   = link.x - prev.x
        const dy   = link.y - prev.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > settings.minDistance) {
          const ratio = settings.minDistance / dist
          link.x = lerp(link.x, prev.x + dx * ratio, 0.5)
          link.y = lerp(link.y, prev.y + dy * ratio, 0.5)
        }
      }
      ctx.fillText(link.letter, link.x, link.y)

    } else {
      // ── Desktop idle: gentle horizontal drift with sine ripple ─────────
      const theta = scale(index, 0, chain.length, 0.3, 0.06)
      link.x = lerp(link.x, mouse.x - (index + 1) * settings.minDistance, theta)
      link.y = lerp(link.y, targetY + Math.sin(time * 0.3 + index * 0.5) * 4, theta)
      ctx.fillText(link.letter, link.x, link.y)
    }
  })

  ctx.globalAlpha = 1
}


/*--------------------
Animate
--------------------*/
const animate = () => {
  time += 0.1
  if (isMobile) updateMobileTarget()
  requestAnimationFrame(animate)
  draw()
}

document.fonts.ready.then(() => {
  animate()
})
