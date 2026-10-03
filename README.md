# pavelolysar.com

Deployed by Cloudflare Workers Builds (worker `portfolio`) on every push to `main`.
`wrangler.toml` serves the `site/` folder as static assets — whatever is in `site/` is what's live.

| Path | URL | What it is |
|---|---|---|
| `site/` | pavelolysar.com/ | Current portfolio — a Claude Design export, static, no build step |
| `site/404.html` | any unknown path | Branded 404 — standalone HTML (no runtime), all URLs absolute so it works at any depth |
| `site/archiveportfolio/` | pavelolysar.com/archiveportfolio/ | Previous portfolio — committed build output of `archive/` |
| `archive/` | — | Source of the previous portfolio (Vue 3 + Vite) |

## Preview locally

```sh
npx wrangler dev   # http://localhost:8787 — same asset handling as production
```

## Updating the current portfolio

`site/` started as a Claude Design export but has since been fixed by hand, so **it is now the source of
truth — do not copy a fresh export over it.** Make changes in `site/` directly (or port a redesign in
piece by piece). What was added on top of the export:

| File | What it does |
|---|---|
| `responsive.css` | All phone/tablet breakpoints. `index.html` styles everything inline, so elements that need to adapt carry a `data-r="…"` hook and the rules here override them with `!important`. |
| `fonts.css`, `fonts/` | Self-hosted Montserrat + Instrument Serif (no Google Fonts). |
| `vendor/` | Self-hosted React 18.3.1 + Lenis. `support.js` points `REACT_URL`/`REACT_DOM_URL` here. **Never set `window.__resources`**: it makes the runtime skip its raw-HTML re-render, which silently breaks every `transform:{{ … }}` binding (hover arrows, rotating crosses). |
| `tab-status.js`, `favicon*.svg` | Favicon, and the animated "On hold" title + red-dot favicon while the tab is in the background. |
| `privacy.html`, `404.html` | Standalone pages (no runtime) sharing the nav and hero bands. |

Hand edits inside export files: the contact form in `index.html` posts to Web3Forms (`static W3F_KEY`
holds the access key; while it is empty the form opens the visitor's mail app instead), real contact
details/social links, hero-card fit check, menu-closes-on-tap in `Nav.dc.html`, and three `pavelolysar.com:`
patches in `image-slot.js`: two silence editor-only requests, and one drops `touch-action:none` from
slot images, which otherwise made the page impossible to scroll on phones. `smooth-scroll.js` jumps no longer wait
forever on an animation that never starts.

**Phones/tablets** (`(hover: none), (pointer: coarse)`) get a lighter page on purpose: static hero/contact bands
(no drift, shimmer or grain), flat tints instead of `backdrop-filter`, no Lenis, and no per-frame corner rounding
on the project cards. On desktop the band animations pause while their section is off-screen. Scroll-reveal
elements are pre-hidden by CSS (`html.po-rv` in `responsive.css`), never by JS after paint.

## Rebuilding the archive

Only needed if the old portfolio itself changes:

```sh
cd archive && npm ci && npm run build   # writes ../site/archiveportfolio
```

The version that was live before the swap is tagged `v1-vue-archive`.
