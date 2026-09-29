# React Bits adaptations

Source: https://github.com/DavidHDev/react-bits (David Haz, retrieved 2026-09-29).
License: ../../licenses/react-bits-LICENSE.md (MIT + Commons Clause).

- `ScrollReveal.tsx`: based on `src/ts-default/TextAnimations/ScrollReveal/ScrollReveal.tsx`; explicit editorial line breaks, semantic heading, no blur, reduced-motion support and component-scoped GSAP cleanup instead of globally killing ScrollTriggers.
- `SplitText.tsx`: adapted from the staggered GSAP treatment in `src/ts-default/TextAnimations/SplitText/SplitText.tsx`; React owns the character spans to avoid DOM-replacement conflicts during hot reload. Uses existing GSAP without extra plugins, waits for fonts, preserves explicit editorial lines and emphasis, reverts on cleanup and respects reduced motion.
- `Magnet.tsx`: based on `src/ts-default/Animations/Magnet/Magnet.tsx`; bounded 12px/9px travel, fine-pointer-only interaction, no React state updates on pointer movement, keyboard/modal handling and listener cleanup.

The official `@react-bits` registry is configured in `components.json` for shadcn/MCP-compatible discovery. No global MCP/client settings were changed.
