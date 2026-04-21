# Zähringer Design System

Design language for **Jascha Zähringer**'s personal presence — zaehringer.co and companion surfaces (writing, case studies, decks).

The existing site is deliberately small: a cream page, a trail of italic serif letters that follow the cursor, and a whisper-quiet footer. This system extends that minimalism into a complete kit without betraying its restraint.

---

## Sources

- **Repo:** [`JaschaZ/ZaehringerWebsite`](https://github.com/JaschaZ/ZaehringerWebsite) (branch `main`) — the live site
- **Domain:** [zaehringer.co](https://zaehringer.co)
- Source files are preserved in `source/` for reference.
- No Figma file provided — tokens here are extracted directly from the CSS/JS.

---

## Context

A personal website for a single person — not a company, not a product. The owner's stated direction: **modern, simple, elegant, warm/positive yet professional.**

The live site has three moving parts:

1. **Name plate** (header) — Inter, 10.5px, uppercase, widely tracked.
2. **Letter-chain cursor** — "FOLLOW YOUR DREAM" in italic Cormorant Garamond, chasing the pointer; idles with a gentle sine-wave drift.
3. **Footer** — a muted label ("Get in touch") and three links: email, Instagram, LinkedIn.

That's the entire site. The interaction *is* the content. Everything we design for Jascha should read as a considered extension of that idea: **a single confident gesture, held quietly on a warm page.**

---

## Index — what's in this folder

| File | Purpose |
|---|---|
| `README.md` | This document — context, fundamentals, usage |
| `SKILL.md` | Machine-readable skill entry point |
| `colors_and_type.css` | CSS custom properties + element base styles |
| `source/` | Original site files from the GitHub repo (reference, do not edit) |
| `fonts/` | Local font references (all via Google Fonts CDN) |
| `assets/` | Logos, marks, imagery |
| `preview/` | Design-system preview cards (Design System tab) |
| `ui_kits/personal_site/` | JSX recreation of the site + extensions |

---

## Content fundamentals

**Voice.** First-person, understated, no performative humility. The existing site has almost no copy — the tagline `FOLLOW YOUR DREAM` is rendered *only* through interaction, not printed as a headline. When you do write, write like someone who trusts the reader.

**Casing.**
- **Uppercase + tracking (0.22em)** is reserved for navigational labels ("GET IN TOUCH", the name in the header). These are the system's structural signposts.
- **Sentence case** for body. Never title case headlines (too corporate).
- **Italic serif** for the one moment of feeling — the display line, a pull-quote, a signature.

**Punctuation.**
- Middle dots `·` as separators between inline links (matches footer).
- Arrows `↗` to mark external links. Never "→ (external)" or `(opens new tab)` microcopy.
- Em dashes — used — as soft parenthetical pauses. No hyphens as dashes.
- No emoji. Not anywhere. Not even cheerfully.

**Length.** Short. The home currently has **six** bits of text on the entire page. Treat every additional word as a cost.

**Pronouns.** "I" in first-person copy (bio, about). "You" only in direct address (contact CTA). Never "we" — this is a person, not a studio.

**Examples from the source:**

> `Jascha Zähringer` — the header name plate, nothing else
> `GET IN TOUCH` — the footer's one label
> `jaschazaehringer@protonmail.com · Instagram ↗ · LinkedIn ↗`
> `FOLLOW YOUR DREAM` — the interaction payload, never static

**When writing longer copy for Jascha** (essays, case studies, bio pages), think: a confident friend with taste, explaining something in one sitting.

- ✅ "I build things. Sometimes they stay built."
- ✅ "This is a page for people I've already met."
- ❌ "Welcome to my portfolio! I'm a passionate creator who loves..."
- ❌ "Discover my journey 🚀"

---

## Visual foundations

### Palette

A single warm cream page. Ink is near-black, not pure. Neutrals drift through sand → stone → oat. Accents exist but are whispered — terracotta, ochre, moss — and only appear once per screen at most.

| Token | Hex | Use |
|---|---|---|
| `--cream` | `#F5F0E8` | Page background, everywhere |
| `--ink` | `#1A1A1A` | Primary text, cursor, display |
| `--sand` | `#9C8E7E` | Muted labels (the "GET IN TOUCH" color) |
| `--stone` | `#B0A090` | Separators, dots |
| `--parchment` | `#FBF7F0` | Lifted surfaces |
| `--linen` | `#EDE5D8` | Sunken surface / quiet fill |
| `--oat` | `#D9CEBC` | Dividers, chips |
| `--bark` | `#6B5F52` | Secondary text |
| `--terracotta` | `#C87B5A` | Rare warm highlight |
| `--ochre` | `#C9A25E` | Italic-paired gold |
| `--moss` | `#7F8A5C` | Quiet positive |

No blues. No purples. No cold grays. No gradients that shift hue.

### Typography

Two families, used for different emotional registers:

- **Inter** — structure, navigation, body. Weights 300 (default) and 400. The source runs almost everything at 300 — light, spacious, slightly delicate. Uppercase labels at 10.5px/0.22em tracking is the single most recognizable pattern.
- **Cormorant Garamond, italic** — feeling, display, the one moment of warmth. Always italic when paired with sans-serif body. Used at display sizes (40–128px) and occasionally at blockquote scale (~28px). Never roman upright — the italic is the mark.

Type is always set loose. Line-heights lean long (1.55 body, 1.72 loose). Tracking opens up dramatically for labels and closes to −0.01em only at display scale.

### Spacing & layout

- **Gutter: 44px** on desktop (the source's left/right padding). Drops to 28px under mobile.
- **Vertical breathing: 36px top offset** for the name, footer pinned to viewport bottom.
- **8-based scale** (4, 8, 12, 16, 24, 32, 44, 64, 96, 128). Half-steps only in UI chrome.
- Content feels like it's anchored to the edges, not centered. The corners of the viewport are loadbearing.

### Backgrounds

No images, no gradients, no patterns. The cream is the brand. If a page needs a secondary surface, use `--parchment` (one step lighter) — never tint downward, always up.

Full-bleed imagery is allowed in case studies, but must be warm-toned — ideally with a faint grain or analogue film character, never crisp stock product photography. B&W acceptable if it's clearly analogue (contact prints, scanned negatives). No blue hours, no drone shots.

### Borders

Hairlines only. `1px solid rgba(26, 26, 26, 0.10)` is the canonical divider (footer top border in source). No thicker strokes anywhere in UI; if you need emphasis, use whitespace, not weight.

### Shadows & elevation

Near-zero. The system ships three shadow tiers but 95% of surfaces use `--shadow-0` (none). Cards get `--shadow-1` (a 4% ink wash); modals get `--shadow-3`. Never blue-tinted shadows.

### Corner radii

Mostly square. `--r-sm` (2px) for the subtlest softening on fields. `--r-lg` (8px) for cards/images. **No pill buttons** — text is already quiet; rounding amplifies the wrong register. The cursor dot (`#cursor`) is the one exception — a perfect 7px circle.

### Cards

Square corners *or* 8px radius. White-adjacent (`--parchment`) on a cream page, or the reverse. 32–44px internal padding. No border + no shadow, or hairline border + no shadow. Never both a border and a shadow.

### Animation

Three rules only:

1. **Fade in on load** — 1.2s, `ease`, 0.4s–0.7s stagger. From the source.
2. **Hover underline grow** — width 0 → 100%, 0.35s, `cubic-bezier(0.4, 0, 0.2, 1)`.
3. **Idle sine drift** — for anything that could "breathe" (the letter chain does this).

No bounces. No springs. No slide-ups on scroll. No parallax. When something moves, it moves once, slowly, and stops.

### Hover states

- **Links:** animated underline grow (width 0 → 100%). Text color unchanged.
- **Buttons/chips:** background shifts one step warmer (e.g. `--parchment` → `--linen`). No opacity fade.
- **Images:** no hover treatment. They're artifacts, not interactive.

### Press states

Subtle scale: `transform: scale(0.98)` over 120ms. No color inversion.

### Custom cursor

The source uses a 7px black dot with `mix-blend-mode: multiply`, hiding the system cursor. Not mandatory system-wide — but when used, **never** larger than 12px and always blend-multiply on cream. On mobile (`pointer: coarse`) the dot is hidden and the system cursor returns.

### Transparency & blur

Avoid. The one sanctioned alpha usage is `rgba(26,26,26,0.10)` for borders. No backdrop-filter, no glassmorphism, no frosted panels — that's a different brand entirely.

### Imagery vibe

When photography is used: **warm tones, natural light, slightly underexposed, film grain acceptable.** Think: late-afternoon living rooms, objects on wooden tables, handwritten notes, negative space. Never corporate stock, never saturated travel photography, never AI-generated composites.

### Fixed elements

Only two: the **header name** (top-left, 36px/44px offsets) and the **footer bar** (full-width, bottom-pinned, 1px hairline top border). Both fade in on load. Both survive scroll. Nothing else should ever be fixed.

---

## Iconography

**The source uses zero icons.** This is a decision, not an oversight.

When icons are genuinely required (future pages, UI kit, longer essays), the rules are:

1. **Textual markers first.** Use Unicode characters where they carry the meaning: `↗` (external link — used in source), `·` (separator — used in source), `—` (dash), `†` (footnote), `§` (section).
2. **Then Lucide** at stroke 1.25, 16–20px, color `currentColor`. Loaded from CDN:
   ```html
   <script src="https://unpkg.com/lucide@latest"></script>
   ```
   Lucide's thin, warm-neutral lineart matches the brand register. **Flagged substitution:** the source ships no icon system, so Lucide is a curatorial choice — please confirm or swap.
3. **Never** Material Icons, Font Awesome, or colorful icon sets.
4. **Never** emoji. Not even in casual contexts.
5. **Never** SVG illustrations generated from scratch. If an illustration is required, Jascha's own photographs or hand-drawn scans should be used — we've left `assets/illustrations/` empty as a reminder to ask.

Logos in `assets/`:
- `wordmark.svg` — the "Jascha Zähringer" name-plate, Inter 300, 10.5px, 0.22em tracking.
- `monogram.svg` — a "JZ" ligature in Cormorant italic.

---

## Font substitution notice

The source imports Cormorant Garamond and Inter directly from Google Fonts. No local font files exist in the repo. This system follows suit — `colors_and_type.css` uses `@import` from Google Fonts. If you need offline-capable or self-hosted fonts, please provide WOFF2 files and we'll swap them in. Both families are freely licensed via Google Fonts.

---

## Using this system

### In an HTML artifact

```html
<link rel="stylesheet" href="colors_and_type.css">
<style>
  body { padding: var(--s-7); }
  .eyebrow { /* already styled */ }
</style>
<header>
  <span class="eyebrow">Jascha Zähringer</span>
</header>
<main>
  <h1 class="display">Follow your dream</h1>
  <p>Short, understated body copy. 300-weight Inter at 17px.</p>
</main>
```

### In a React prototype

Import the same CSS at the root, then use semantic class names: `.display`, `.eyebrow`, `.label`, `.meta`. Prefer CSS variables (`var(--fg2)`) over raw hex.

### The one-gesture rule

For any new screen, ask: **what is the single gesture?** The home has one (the letter chain). A writing page should have one (maybe: drop caps that mirror cursor position). A case study page should have one (maybe: images that reveal on dwell). Don't stack multiple "delightful" interactions — pick one and let it breathe.
