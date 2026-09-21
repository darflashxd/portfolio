---
name: reviewing-interface-quality
description: Use when asked to review, critique, audit, or improve an existing user interface — "review this UI", "why does this look generic", "make this more polished", "design feedback", "does this look AI-generated", "audit this page". Also use as the final gate before shipping any frontend work, and when a UI renders correctly but feels unfinished, cheap, or inconsistent without an obvious cause.
---

# Reviewing Interface Quality

## Overview
Interface quality problems have specific causes — unenforced spacing scale, hierarchy varying on 4 dimensions at once, missing states. Every finding must name a location, cause, and concrete replacement value.

## The Iron Law
NO FINDING WITHOUT EVIDENCE ACTUALLY GATHERED (screenshots at 1440px and 390px, computed values, overflow checks).

## Checklist
1. Gather evidence at 1440px and 390px
2. First impression (5 seconds, naive read)
3. System consistency (font-size, radius, shadows, colors)
4. Typography (ratio scale, measure, balance)
5. Layout and responsive (no horizontal overflow, broken grid)
6. States and behavior (empty, loading, error)
7. Accessibility (contrast, focus rings, semantic tags)
8. Motion and performance (reduced motion, durations)
