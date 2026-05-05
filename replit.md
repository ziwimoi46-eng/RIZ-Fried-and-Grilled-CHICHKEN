# Riz Fried & Grilled Chicken

## Overview

Static marketing/ordering website for "Riz Fried and Grilled Chicken" — a fast-food restaurant based in Aurangabad, Maharashtra. The site showcases the menu, gallery, and provides an ordering CTA (WhatsApp-based).

## Stack

- **Frontend**: React (pre-built SPA bundle)
- **Styling**: Tailwind CSS (compiled)
- **Server**: `serve` (static file server via npx)
- **No backend, no database, no auth**

## Structure

```
/
├── index.html          # SPA entry point
├── assets/
│   ├── index-*.js      # Bundled React app
│   └── index-*.css     # Compiled Tailwind CSS
├── package.json        # Single dev script using `serve`
├── vercel.json         # SPA route rewrites (legacy, not used on Replit)
└── _redirects          # SPA fallback (legacy, not used on Replit)
```

## Running

```bash
npm run dev
```

Starts a static file server on port 5000 (or `$PORT`). All routes fall back to `index.html` for SPA routing.

## Notes

- No authentication required
- No external API integrations
- No environment variables needed
- Pre-built bundle — no build step required to run
