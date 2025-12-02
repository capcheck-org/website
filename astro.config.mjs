import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';

// Use Node adapter for local development, Cloudflare for production
const isDev = process.env.NODE_ENV !== 'production' || process.env.DEV_MODE === 'true';

export default defineConfig({
  output: 'server',
  adapter: isDev
    ? node({ mode: 'standalone' })
    : cloudflare(),
  integrations: [svelte()],
  publicDir: 'static',
  devToolbar: {
    enabled: false,
  },
});
