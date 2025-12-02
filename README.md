# CapCheck

Minimal announcement page for CapCheck - Launching December 2025.

## Tech Stack

- **Framework**: SvelteKit 5
- **Deployment**: Cloudflare Pages/Workers
- **Styling**: Custom CSS with brand guidelines from capcheck.ai

## Development

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment

This project is configured for Cloudflare deployment using `@sveltejs/adapter-cloudflare`.

### Deploying to Cloudflare Pages

1. Install Wrangler CLI (if not already installed):

```bash
npm install -g wrangler
```

2. Login to Cloudflare:

```bash
wrangler login
```

3. Deploy:

```bash
npm run build
wrangler pages deploy .svelte-kit/cloudflare
```

Or deploy directly from the Cloudflare dashboard by connecting the GitHub repository.

## Brand Assets

The site follows the CapCheck brand guidelines:

- **Primary Color**: #0088FF
- **Typography**: QTOldGoudy (display), System fonts (body)
- **Theme**: Automatic light/dark mode based on system preferences

All brand assets (fonts, SVG icons) are located in the `/static` directory.
