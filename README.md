# OpenCode Cyber Portfolio Kit

Ready-to-use OpenCode configuration for building a premium cybersecurity portfolio with a design-first workflow.

## Included

- `AGENTS.md` — persistent repository instructions.
- `opencode.jsonc` — portfolio agent defaults + optional 21st.dev remote MCP.
- `.opencode/agents/portfolio-builder.md` — primary senior designer/engineer agent.
- `.opencode/agents/portfolio-reviewer.md` — critical visual/UX reviewer subagent.
- `.opencode/skills/portfolio-orchestrator/SKILL.md` — portfolio design system and quality gates.
- `.opencode/skills/motion-ui/SKILL.md` — Motion for React usage rules.
- `prompts/BUILD-PORTFOLIO.md` — one-shot build prompt with your known portfolio content.
- `scripts/install-ui-tooling.sh` — installs the upstream UI/UX Pro Max CLI and 21st CLI.
- `scripts/install-to-project.sh` — copies the kit into an existing portfolio repository.
- `.env.example` — optional 21st MCP API key placeholder.

## Why this architecture

OpenCode supports project-local `SKILL.md` files and persistent `AGENTS.md` instructions. Skills are loaded on demand, which keeps the agent context smaller than stuffing every design rule into every prompt. OpenCode also supports remote MCP servers such as 21st.dev. citehttps://opencode.ai/docs/skillshttps://opencode.ai/docs/mcp-servers

The package intentionally does NOT copy the entire UI/UX Pro Max data set. It installs the upstream skill so its searchable design intelligence can be updated by the upstream project. UI/UX Pro Max officially supports OpenCode. citehttps://github.com/nextlevelbuilder/ui-ux-pro-max-skill

## Setup

### Option A — existing repository

From the extracted kit directory:

```bash
bash scripts/install-to-project.sh /path/to/your/portfolio
cd /path/to/your/portfolio
```

### Option B — start a fresh directory

```bash
mkdir -p ~/portfolio
bash scripts/install-to-project.sh ~/portfolio
cd ~/portfolio
```

Then install the external UI tooling:

```bash
bash scripts/install-ui-tooling.sh
```

The script installs the current upstream UI/UX Pro Max CLI and initializes it for OpenCode, then installs the 21st CLI. The upstream documentation also lists OpenCode as a supported platform. citehttps://github.com/nextlevelbuilder/ui-ux-pro-max-skill

## 21st.dev

The kit configures the current 21st remote MCP endpoint:

`https://21st.dev/api/mcp`

For generic MCP clients, 21st documents API-key authentication and `x-api-key`. Set:

```bash
export API_KEY_21ST="your-key"
```

Then start OpenCode.

Alternatively, authenticate the 21st CLI with:

```bash
21st login
```

21st currently documents search/publishing as free and component installs as limited on the free plan; its page states free users are capped at two installs per day, while AI generation consumes AI credits. citehttps://docs.21st.dev/mcphttps://21st.dev/plans

## Motion

The included Motion skill uses the current `motion` package:

```bash
npm install motion
```

React APIs are imported from `motion/react`. Motion's official docs state React 18.2+ is supported. citehttps://motion.dev/docs/react-installation

## Run the build

Inside the portfolio repo:

```text
Start by reading prompts/BUILD-PORTFOLIO.md and execute it end-to-end.
Load the portfolio-orchestrator skill first. Use 21st when available and load motion-ui for interaction work.
After the initial build, use the portfolio-reviewer subagent for a critical UI/UX pass, then fix all high-confidence findings and run the production build again.
```

The agent should inspect the repository first, preserve useful existing configuration, build the full site, then lint/typecheck/build using whatever scripts actually exist.

## Notes

- Do not commit secrets.
- Replace `YOUR_GITHUB_URL`, `YOUR_LINKEDIN_URL`, `YOUR_EMAIL`, and other placeholders before publishing.
- The kit intentionally forbids fabricated credentials, awards, metrics, rankings, or research results.
