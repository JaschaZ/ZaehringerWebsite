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
const getFooterTop  = () => footerEl.getBoundingClientRect().top
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
Mobile – autonomous wander
Smooth Lissajous-style path: two sine waves at irrational frequency
ratios so the curve never exactly repeats and has no sharp corners.
--------------------*/
const updateMobileTarget = () => {
  // Increment slowly — full sine period ≈ 25 s at 60 fps
  autoTime += 0.004

  const headerBottom = getHeaderBottom()
  const footerTop    = getFooterTop()

  // X: head of chain must sit far enough right for the full text to be on screen
  const chainWidth = chain.length * settings.minDistance
  const xMin = chainWidth + 16
  const xMax = win.w - 16
  const xMid = (xMin + xMax) / 2
  const xAmp = (xMax - xMin) / 2

  // Y: between header bottom and footer top with breathing room
  const yMin = headerBottom + settings.headerClearance + 50
  const yMax = footerTop    - settings.footerClearance  - 30
  const yMid = (yMin + yMax) / 2
  const yAmp = (yMax - yMin) / 2

  // Modulated sine: outer sine + inner sine at different speed → smooth curves,
  // never sharp, never perfectly repetitive.
  mouse.x = xMid + Math.sin(autoTime * 1.00 + Math.sin(autoTime * 0.31) * 1.2) * xAmp * 0.85
  mouse.y = yMid + Math.sin(autoTime * 1.41 + Math.sin(autoTime * 0.47) * 0.9) * yAmp * 0.85
  //                                    ↑ Math.SQRT2 ≈ 1.41 — irrational ratio keeps X/Y out of phase
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
      // Desktop drag mode – chain follows cursor with spring physics
      ctx.fillText(link.letter, link.x - settings.minDistance, link.y)

      if (index > 0) {
        const prevLink = chain[index - 1]
        const dx = link.x - prevLink.x
        const dy = link.y - prevLink.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > settings.minDistance) {
          const ratio = settings.minDistance / distance
          link.x = lerp(link.x, prevLink.x + dx * ratio, .4)
          link.y = lerp(link.y, prevLink.y + dy * ratio, .4)
        }
      }
    } else {
      // Idle (desktop) / always-on (mobile) – chain gently trails the target
      const theta = scale(index, 0, chain.length, .3, .06)
      link.x = lerp(link.x, mouse.x - (index + 1) * settings.minDistance, theta)
      link.y = lerp(link.y, targetY + Math.sin(time * .3 + index * .5) * 4, theta)
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
