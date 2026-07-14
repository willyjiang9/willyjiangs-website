# willyjiang.com — minimal / showy redesign

React + Vite. Warm bone canvas, near-black ink, one persimmon accent.
Signature: an interactive project index that inverts on hover, custom cursor, oversized type.

## Run
```bash
npm install
npm run dev
```

## Dials
- Accent color: change `--accent` (one line, top of `src/index.css`) to recolor the whole site.
- Projects: edit the PROJECTS array in `src/components/Work.jsx`.
- About facts / copy: `src/components/About.jsx`.
- Email placeholder: search `willyj915@gmail.com`.
- Marquee words: `src/components/Marquee.jsx`.

Everything respects reduced-motion; the custom cursor auto-disables on touch devices.
