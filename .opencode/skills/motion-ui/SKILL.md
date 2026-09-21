---
name: motion-ui
description: Production guidance for subtle, accessible Motion for React interactions and animations in the cybersecurity portfolio. Use when adding page transitions, reveals, hover/tap interactions, layout animation, or scroll-driven motion.
compatibility: React 18.2+ / Next.js App Router
metadata:
  library: Motion for React
---

# Motion UI

Use the `motion` package and import React APIs from `motion/react`.

## Installation
If Motion is not already installed:
`npm install motion`

## Rules
- Prefer CSS transitions for simple color/border/shadow changes.
- Use Motion for entrance/reveal, layout, gesture, or more expressive interaction.
- Keep most transitions fast and subtle.
- Avoid animating large blocks on every scroll event when a simple reveal is enough.
- Avoid continuous looping animation unless it conveys real status or atmosphere.
- Respect `prefers-reduced-motion`.
- Do not animate critical text away before the user can read it.

## Preferred patterns
### Section reveal
Use small opacity + translate transitions, with sensible stagger and no excessive delay.

### Project cards
Use a small lift/scale or border emphasis on hover where appropriate. Do not over-animate every element inside the card.

### Navigation
Use layout/shared transitions only when they make state changes clearer.

### Hero
One tasteful reveal sequence is enough. Avoid typewriter gimmicks unless content is genuinely presented as code.

## Next.js
For App Router components using `motion/react`, either make the component a client component when needed, or use the appropriate client-optimized import when practical.

## Accessibility
Provide a reduced-motion path. Animation must never be the only indication of state.
