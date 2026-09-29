# ALLEY CAT

A complete editorial studio website using the supplied cartoon-cat animation, Next.js 16 App Router, TypeScript, Tailwind CSS 4, GSAP ScrollTrigger, Lenis and HTML5 Canvas.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. Build a portable static production site with `npm run build`; deploy the `out/` directory with any static host. `npm start` serves the built export locally on port 3000 (override with `PORT`).

## Checks

```sh
npm run typecheck
npm run lint
npm run build
```

## Cinematic assets

The supplied six-second MP4 is extracted to 144 desktop WebP frames (1280 × 720, 24 fps) and 72 mobile frames (768 × 432, 12 fps). The website does not load or seek a video. The source MP4 remains in its original Downloads location and is not required at runtime.

To replace the animation, install ffmpeg and run:

```sh
npm run extract -- "/absolute/path/source.mp4"
# Optional third argument: absolute path to ffmpeg
```

The script regenerates both sets and their manifest. An optional final sequence name writes to a separate directory, e.g. `npm run extract -- "/path/logo.mp4" "/path/ffmpeg" logo`.

The second supplied video (animated face/logo, four seconds) has 96 desktop and 48 mobile WebP frames under `public/cinematic/logo/`. It appears once in the white “The method in the mischief” section, in a pinned editorial composition with a restrained camera move. The introduction is typography-only. The trench-coat film appears once in the main reveal. The repeated static project image was removed. Both use the shared `CanvasSequence` renderer; poster images are only loading/no-JavaScript fallbacks. The logo cache is capped at 16 decoded desktop frames or 10 mobile frames, in addition to the main film's cache.

The frame loader limits decoded images to 38 on desktop (~134 MiB of pixel data at source size) and 20 on mobile (~25 MiB), plus up to three in-flight images and the canvas. Actual browser overhead varies. First frames load first; the full progressive queue starts only near the cinematic section. Seek requests prioritize nearby frames. Rendering uses a capped DPR of 2, cover sizing, and one pending animation-frame draw. Scroll updates do not set React state. Lenis uses GSAP's ticker and all observers, contexts and listeners are cleaned up.

Reduced-motion preferences disable smooth scrolling, pinning, marquee and entrance effects, and render a meaningful final-frame composition. The page remains readable without JavaScript, including project details and navigation; the contact brief requires JavaScript.

## Content and contact

ALLEY CAT is the created studio identity. The site presents e-commerce design and custom software services; the illustrated product is a demonstration, not a client case study.

The commerce film uses 96 scroll-controlled frames extracted from the supplied can animation. Mobile film scenes preserve the original 16:9 composition and use source-width frames with a bounded 12-image decoded cache to avoid excessive cropping and enlargement. Text entrances and React Bits adaptations respect reduced-motion preferences.

Without a configured email, the contact dialog downloads a plain-text project brief. No information is uploaded or sent. To connect a real studio inbox, copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_CONTACT_EMAIL`, then rebuild. The dialog will prepare a mailto draft for the visitor to review and send in their own email app. It does not pretend to submit to a server.

Fonts are bundled locally via Fontsource. Audio is intentionally omitted. The original artwork is retained.

React Bits ScrollReveal, SplitText and Magnet are adapted locally for the manifesto, final heading and contact CTA. See `components/react-bits/README.md` for sources and adaptations and `licenses/react-bits-LICENSE.md` for the upstream license. The official registry is configured in `components.json`; no additional runtime dependency or global MCP configuration was added.

## Verification limits

Browser checks cover the requested 390, 430, 768, 1440 and 1920 CSS-pixel widths, frame progression, project expansion, the brief dialog, download feedback and Escape dismissal. Actual iPhone Safari hardware performance has not been verified from this Windows environment.

