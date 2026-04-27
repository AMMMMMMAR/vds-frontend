# VDS Frontend — Virtual Dressing System

React + Vite frontend for the Virtual Dressing System (VDS). Connects to the FastAPI backend hosted on Hugging Face Spaces.

## Tech Stack

- **React 18** + **Vite** — UI framework and build tool
- **React Router v7** — page navigation
- **Framer Motion** — animations and transitions
- **Three.js** + **@react-three/fiber** — 3D avatar viewer
- **Tailwind CSS** — styling

## Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/upload` | Upload front, side, and selfie photos + height |
| `/processing` | Runs AI pipeline, shows live progress |
| `/results` | Measurements, skin tone, sizing, colors, 3D avatar |
| `/try-on` | Virtual try-on — apply garment to your photo |

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:5174`.

## Environment Variables

Create a `.env` file in the project root:

```
VITE_API_URL=https://your-space.hf.space
VITE_USE_MOCK=true
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | URL of the backend HF Space (no trailing slash) |
| `VITE_USE_MOCK=true` | Skip API calls, use mock data for UI development |
| `VITE_USE_MOCK=false` | Connect to real backend for end-to-end testing |

> After changing `.env`, restart the dev server.

## API Connection

All backend calls are in `src/lib/api.js`. The pipeline runs in two parallel rounds on the Processing page:

- **Round 1:** `/measurements/extract` + `/skin-tone/detect`
- **Round 2:** `/recommendation/get` + `/avatar/generate`
- **On demand:** `/tryon/generate` (one request per garment click)

If Round 1 or recommendation fails → user sees a retry prompt on the Processing page (no re-upload needed). Avatar failure is non-critical — results page still shows with a regenerate button.

## CORS

The backend reads `ALLOWED_ORIGINS` from its environment variables. Set it in HF Spaces to include your frontend origin:

```
# Development
ALLOWED_ORIGINS=http://localhost:5174

# Both local and production
ALLOWED_ORIGINS=http://localhost:5174,https://your-app.netlify.app
```

## Deploying to Netlify

1. Push to GitHub
2. Connect repo on Netlify
3. Set environment variable: `VITE_API_URL=https://your-space.hf.space`
4. Update `ALLOWED_ORIGINS` on HF Spaces to include your Netlify URL
