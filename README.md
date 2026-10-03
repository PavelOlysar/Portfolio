# pavelolysar.com

Deployed by Cloudflare Workers Builds (worker `portfolio`) on every push to `main`.
`wrangler.toml` serves the `site/` folder as static assets — whatever is in `site/` is what's live.

| Path | URL | What it is |
|---|---|---|
| `site/` | pavelolysar.com/ | Current portfolio — a Claude Design export, static, no build step |
| `site/archiveportfolio/` | pavelolysar.com/archiveportfolio/ | Previous portfolio — committed build output of `archive/` |
| `archive/` | — | Source of the previous portfolio (Vue 3 + Vite) |

## Preview locally

```sh
npx wrangler dev   # http://localhost:8787 — same asset handling as production
```

## Updating the current portfolio

Copy the files from the Claude Design export into `site/`, saving `Hero.dc.html` as `index.html`.
The runtime (`support.js`) loads the other components (`Nav.dc.html`, `Teal Hero Background.dc.html`)
by file name, so keep those names unchanged. In `Nav.dc.html`, the logo link points at `./` rather
than `Hero.dc.html`.

## Rebuilding the archive

Only needed if the old portfolio itself changes:

```sh
cd archive && npm ci && npm run build   # writes ../site/archiveportfolio
```

The version that was live before the swap is tagged `v1-vue-archive`.
