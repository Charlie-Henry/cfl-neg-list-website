// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Moved off GitHub Pages to Cloudflare Pages, which serves from the domain
// root (either a *.pages.dev subdomain or a custom domain) rather than a
// /repo-name/ subpath, so `base` is no longer needed.
// Update `site` once you know your final pages.dev URL or custom domain —
// it's only used for absolute-URL generation (canonical links etc.), so it's
// not build-breaking to leave it as a placeholder in the meantime.
export default defineConfig({
  site: 'https://cfl-neg-list-website.pages.dev',
  output: 'server',
  adapter: cloudflare(),
});
