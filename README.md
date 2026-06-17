# ShapeSoup

A seed-based SVG generative pattern engine with a shareable web playground.

## What is ShapeSoup?

ShapeSoup produces deterministic, beautiful, scalable SVG backgrounds and illustrations from a config + seed string. Same config + same seed = same SVG, every time.

## Monorepo Structure

```
shapesoup/
├── apps/web/           # Next.js 16 playground
└── packages/core/      # @shapesoup/core npm package
```

## Quick Start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Playground Features

- **8 Generators**: Blob, Wave, Layered Waves, Stacked Waves, Blurry Gradient, Blob Scene, Low Poly Grid, Layered Peaks
- **Shareable URLs** — every setting is reflected in the URL; share links and they restore the exact same pattern
- **Copy Link** — copy the current shareable URL to clipboard
- **Copy SVG** — raw SVG string
- **Copy JSX** — React-compatible JSX
- **Copy CSS** — `background-image` CSS snippet
- **Copy React** — ready-to-use React component snippet
- **Download SVG** — save as `.svg` file
- **Download PNG** — export at 1x, 2x, or 4x scale
- **Canvas Size** — presets + custom width/height
- **Color Palettes** — 12 curated presets + custom picker
- **Randomize** — new seed, or new seed + random palette

## npm Package

```bash
pnpm add @shapesoup/core
```

```typescript
import { generateBlobScene } from "@shapesoup/core";

const { svg, dataUri, metadata } = generateBlobScene({
  width: 1920,
  height: 1080,
  seed: "hero-bg",
  colors: ["#0f766e", "#14b8a6", "#5eead4", "#ccfbf1"],
});
```

See `packages/core/API.md` for full documentation.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start web playground |
| `pnpm build:core` | Build `@shapesoup/core` |
| `pnpm build` | Build everything |
| `pnpm test` | Run all tests |
| `pnpm typecheck` | Type-check everything |

## Tech Stack

- **Core**: TypeScript, culori, d3-delaunay, tsup, vitest
- **Web**: Next.js 16, React 19, TailwindCSS v4, Zustand
- **Monorepo**: pnpm workspaces

## License

MIT
