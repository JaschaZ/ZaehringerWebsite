# zaehringer.co — deploy bundle

Drop these files into the root of `JaschaZ/ZaehringerWebsite` (replacing the existing ones) and push. GitHub Pages will serve them as-is.

## Files

```
/
├── CNAME                              # zaehringer.co (unchanged)
├── index.html                         # Home — letter-chain, now with Writing/About nav
├── MouseFollow.css                    # Home styles + new #top-nav styles
├── MouseFollow.js                     # Letter-chain logic (unchanged)
├── site.css                           # Shared styles for /writing and /about
│
├── writing/
│   ├── index.html                     # Writing index
│   ├── on-holding-a-small-page/index.html
│   ├── a-single-gesture-repeated/index.html
│   ├── what-stays-when-you-remove/index.html
│   └── the-room-at-the-end-of-the-hall/index.html
│
└── about/
    └── index.html                     # About page
```

## What's new vs. the current live site

- **Top-right navigation** (Writing · About) on the home page. Fades in at 0.5s; same 10.5px/0.22em tracking as the name plate.
- **`/writing/`** — a quiet index of posts. Click a row to read. Four sample articles included — replace their HTML with your real writing.
- **`/about/`** — short bio + four meta blocks (Currently, Previously, Lives, Reads). Replace the placeholder copy.
- **`site.css`** — shared stylesheet for the new pages. Home still uses `MouseFollow.css`, untouched except for the added nav styles.

## Editing articles

Each article is a plain HTML file at `/writing/<slug>/index.html`. To add a new one:

1. Copy an existing article folder and rename it.
2. Edit the `<title>`, `<h1 class="article-title">`, `.article-meta`, `.standfirst`, and `.article-body`.
3. Add a new `<li class="writing-row">` entry to `/writing/index.html`, linking to `/writing/<new-slug>/`.

Article body blocks:
- `<p>` — regular paragraph. The first one gets a drop cap automatically.
- `<h2>` — section heading, italic serif.
- `<blockquote>` — italic pull-quote, 30px.
- `<div class="dinkus">· · ·</div>` — section break.

## Local preview

Any static server works:

```
cd deploy
python -m http.server 4000
# → http://localhost:4000
```

## Notes

- Fonts are loaded from Google Fonts (Cormorant Garamond + Inter), matching the existing site.
- All links use root-relative paths (`/writing/`, `/about/`), which works on GitHub Pages custom-domain setups. If you ever deploy to a subpath, switch them to relative.
- No JavaScript on the new pages — they're pure HTML + CSS.
