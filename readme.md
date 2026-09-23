# CFL Neg List website (Astro)

Homepage is a searchable, sortable table of every player on `players.json`;
each row links to a player page with full transaction history, pulled from
`transactions.json`.

Data comes straight from the public exports:
- https://storage.googleapis.com/aus-dashboard/cfl-neg-list/players.json
- https://storage.googleapis.com/aus-dashboard/cfl-neg-list/transactions.json

## Rendering model

The homepage table fetches `players.json` **client-side**, so it always
reflects the latest export.

Player pages (`src/pages/players/[id].astro`) are **server-rendered per
request** (Astro `output: 'server'` + `@astrojs/cloudflare`) rather than
pre-built at deploy time. Each request fetches `players.json` (and, if the
player exists, `transactions.json`) live and renders on the fly, returning a
proper HTTP 404 for an unknown `id`. This means a brand-new player added to
the data is live immediately — no rebuild/redeploy needed, unlike the
previous GitHub Pages version of this site.

## Deploying — Cloudflare Pages

This project no longer targets GitHub Pages (which can't run server-rendered
routes). It's set up for **Cloudflare Pages**, connected directly to this
Git repo — every push to `main` triggers a new build and deploy automatically,
no GitHub Actions workflow needed.

Framework preset: **Astro**. Build command: `npm run build`. Build output
directory: `dist`. Cloudflare's dashboard fills these in automatically when
you select the Astro preset.

Update the `site` value in `astro.config.mjs` once you know your final
`*.pages.dev` URL or custom domain — it's only used for absolute-URL
generation, so it's not build-breaking to leave as a placeholder until then.

## Local development

```
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # wrangler dev, simulating the Cloudflare runtime locally
```

## Notes / things you'll probably want to tweak

- **Nav links** (Twitter/Bluesky) are hardcoded in `src/layouts/Layout.astro`.
- **About page and the old by-position breakdown chart** weren't ported over
  in the first pass (scope was just the search table + player pages) — the
  old Datawrapper embeds for "Recent signings" and "Playing history" are
  effectively superseded by the new table itself.
- **Summary column**: `players.json` already includes a `summary` field
  (joined in from `cfl_player_inference` in your export script), so no
  changes needed there.
- Favicon was carried over as-is from the old `static/favicon.ico`.
- **404 page**: unknown player IDs render an on-brand "Player not found"
  message with a link back to the list, via `Astro.response.status = 404`
  inside `[id].astro` — there's no separate `404.astro`.
