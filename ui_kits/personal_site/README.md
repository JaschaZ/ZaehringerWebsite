# Personal Site — UI Kit

A high-fidelity, interactive recreation of zaehringer.co, plus the small set of extension surfaces (writing index, about, contact drawer) that the brand would naturally grow into.

**Source of truth:** `../../source/index.html`, `../../source/MouseFollow.css`, `../../source/MouseFollow.js`.

## Files

- `index.html` — click-through prototype
- `App.jsx` — top-level shell (header, footer, route state)
- `LetterChain.jsx` — the cursor-following "FOLLOW YOUR DREAM" letter chain (ported from source)
- `Cursor.jsx` — the 7px blend-multiply dot
- `FooterBar.jsx` — pinned footer with label + links
- `HeaderName.jsx` — the name plate
- `WritingIndex.jsx`, `AboutPane.jsx`, `ContactDrawer.jsx` — extension surfaces

Everything beyond `App` / `LetterChain` / `Cursor` / `FooterBar` / `HeaderName` is an extension, not present on the live site. Clearly labelled in the prototype as *Extended*.
