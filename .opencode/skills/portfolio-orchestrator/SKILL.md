---
name: portfolio-orchestrator
description: High-end portfolio design system and workflow for building Ahmad Rafi Sutanto's cybersecurity portfolio. Use for planning, designing, implementing, reviewing, or polishing the site's UI/UX, content hierarchy, responsiveness, accessibility, and visual identity.
compatibility: OpenCode with Next.js/React projects
metadata:
  role: design-system-orchestrator
  priority: high
---

# Portfolio Orchestrator

## Core objective
Create a portfolio that communicates hands-on cybersecurity ability and technical maturity while remaining visually sophisticated.

The site should feel intentionally designed by a strong product designer and frontend engineer.

## Mandatory design process
Before writing or redesigning a major section:
1. Identify the section's job.
2. Define its visual hierarchy.
3. Check existing tokens/components.
4. Search 21st.dev when the MCP is available and a common component would benefit from it.
5. Prefer reuse over duplication.
6. Implement.
7. Review the rendered result mentally and by available tooling.
8. Remove anything decorative that does not improve communication.

## Design language
Use:
- near-black/charcoal foundations
- cool cyan/blue as a restrained accent
- optional violet as a secondary accent
- off-white primary text and muted gray secondary text
- subtle 1px borders
- measured surface elevation
- editorial/technical typography
- compact metadata labels
- strong whitespace

Avoid:
- neon green hacker clichés
- Matrix rain
- fake command logs
- skulls or threat icons as decoration
- excessive glassmorphism
- enormous headings with little content
- endless pill badges
- fake analytics numbers
- fake testimonials
- fake GitHub contribution graphs
- meaningless 3D objects

## Portfolio narrative
The page should tell a coherent story:
1. Who is Rafi?
2. What does he focus on?
3. What has he actually built/investigated?
4. What practical leadership/activities does he have?
5. What research direction is he exploring?
6. How can someone contact him?

## Hero
The hero must communicate identity and focus immediately.
Preferred concept:
- name
- concise security-focused descriptor
- 1-sentence value statement
- projects/contact CTA
- restrained status/focus metadata

Do not make the hero a fake SOC console.

## Project storytelling
Project cards should prioritize:
- real problem/context
- what was built/investigated
- technical methods
- technologies/artifacts
- current status
- link/case study when available

Use small metadata labels rather than huge badge walls.

## Skills
Do not use fake proficiency percentages.
Group skills by capability and tools.
For example:
- Digital Forensics
- Malware Analysis
- Defensive Security
- Web Security
- Security Research
- Tooling

## Responsive rules
Design mobile intentionally.
- no horizontal scrolling
- nav remains usable
- cards stack gracefully
- touch targets remain comfortable
- typography uses a deliberate scale
- project metadata wraps naturally

## Accessibility
- semantic HTML
- one clear H1
- logical heading order
- descriptive link text
- visible focus states
- keyboard access
- respect reduced motion
- sufficient contrast

## Content integrity
Never invent facts about the owner.
Unknown URLs, email, credentials, dates, awards, or metrics become obvious placeholders.

## Final polish checklist
Before completion, inspect for:
- inconsistent corner radii
- inconsistent spacing
- excessive animation
- repeated content patterns
- weak CTA hierarchy
- awkward mobile wrapping
- unused imports
- missing alt text
- generic copy
- visual noise
