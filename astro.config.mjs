// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// Moved off GitHub Pages to Cloudflare (Workers Builds, via the Cloudflare
// adapter's wrangler.jsonc), which serves from the domain root — either a
// *.workers.dev subdomain or a custom domain — rather than a /repo-name/
// subpath, so `base` is no longer needed.
// `site` is only used for absolute-URL generation (canonical links etc.);
// update it again if a custom domain is added later.
export default defineConfig({
  site: 'https://cfl-neg-list-website.thomashenry.workers.dev',
  output: 'server',
  adapter: cloudflare(),
});
