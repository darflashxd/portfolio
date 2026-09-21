# Cybersecurity Portfolio — OpenCode Project Instructions

## Mission
Build and maintain a high-end personal cybersecurity portfolio for Ahmad Rafi Sutanto.
The site must feel like a real security engineer / researcher portfolio, not an AI-generated student template.

## Design north star
- Modern, dark, technical, restrained, credible.
- Inspiration: security research tooling, forensic workstations, developer portfolios, technical documentation.
- Avoid the cliché hacker look: no Matrix rain, skulls, excessive neon, fake terminal spam, fake SOC metrics, or decorative noise.
- Prefer strong typography, spacing, hierarchy, subtle borders, restrained gradients, and purposeful motion.

## Stack preference
- Next.js + TypeScript
- Tailwind CSS
- shadcn/ui when appropriate
- Motion for React (`motion`, imported from `motion/react`)
- Lucide icons
- Vercel-compatible deployment

## Content integrity
- Never invent certifications, jobs, awards, credential IDs, rankings, links, metrics, or research results.
- Missing data must become explicit placeholders such as `YOUR_GITHUB_URL`.
- Never represent an in-progress certification or research project as completed.

## Component strategy
- Search 21st.dev before inventing common UI when the 21st MCP is available.
- Reuse existing local components before adding duplicates.
- Keep content data-driven where practical (`data/` or equivalent).
- Prefer server components unless interactivity requires a client component.

## Motion strategy
- Use Motion only where it creates hierarchy, feedback, continuity, or storytelling.
- Prefer CSS transitions for trivial hover/color changes.
- Respect `prefers-reduced-motion`.
- Never animate critical content in a way that harms accessibility or readability.

## Quality gates
Before declaring the work complete:
1. Run the available typecheck/lint/build commands.
2. Fix TypeScript and build errors.
3. Check mobile, tablet, desktop layouts.
4. Check keyboard navigation and visible focus states.
5. Check color contrast and semantic heading hierarchy.
6. Check for broken/missing image assets.
7. Check that the page still communicates the owner and projects above the fold.
8. Remove dead code, placeholder lorem ipsum, and accidental console errors.

## Useful commands
Use the package manager detected in the repository. Typical commands:
- `npm run dev`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

Do not assume a command exists; inspect `package.json` first.


