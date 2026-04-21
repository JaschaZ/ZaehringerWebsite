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
  // smaller spacing on mobile so the full chain fits narrow screens
  minDistance: isMobile ? 18 : 22,
  font: isMobile
    ? 'italic 30px "Cormorant Garamond", Georgia, serif'
    : 'italic 34px "Cormorant Garamond", Georgia, serif',
  color: '#1A1A1A',
  footerClearance: 22,
}

/*--------------------
Setup
--------------------*/
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const cursorEl = document.getElementById('cursor')
const footerEl = document.getElementById('footer')

const win = {
  w: window.innerWidth,
  h: window.innerHeight
}

// On mobile the chain idles centered horizontally.
// Chain renders letters at mouse.x - (index+1)*dist, so shift mouse.x
// right by half the chain length to visually center the whole string.
const mobileCenterX = () => win.w / 2 + Math.ceil(settings.letters.length / 2) * settings.minDistance
const mobileCenterY = () => win.h * 0.44

const mouse = {
  x: isMobile ? mobileCenterX() : win.w / 2,
  y: isMobile ? mobileCenterY() : win.h / 2,
}

let time = 0
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

  // keep idle center in sync after orientation change
  if (isMobile && !isInteracting) {
    mouse.x = mobileCenterX()
    mouse.y = mobileCenterY()
  }
}
onResize()


/*--------------------
Helpers
--------------------*/
const getFooterTop = () => footerEl.getBoundingClientRect().top
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
Mobile – touch
--------------------*/
const onTouchStart = (e) => {
  const touch = e.touches[0]
  if (!touch) return

  // Just update the target — idle lerp smoothly attracts the chain there
  mouse.x = touch.clientX
  mouse.y = clampY(touch.clientY)

  clearTimeout(timeoutID)
  // After 2.5 s drift back to center
  timeoutID = setTimeout(() => {
    mouse.x = mobileCenterX()
    mouse.y = mobileCenterY()
  }, 2500)
}


/*--------------------
Listeners
--------------------*/
window.addEventListener('resize', onResize)

if (isMobile) {
  window.addEventListener('touchstart', onTouchStart, { passive: true })
} else {
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
  requestAnimationFrame(animate)
  draw()
}

document.fonts.ready.then(() => {
  animate()
})
