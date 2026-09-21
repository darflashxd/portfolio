#!/usr/bin/env bash
set -euo pipefail

echo '==> Installing UI/UX Pro Max for OpenCode (official project CLI)...'
npm install -g ui-ux-pro-max-cli
uipro init --ai opencode

echo

echo '==> Installing 21st.dev CLI...'
npm install -g @21st-dev/cli

echo

echo 'Next steps:'
echo '1) Authenticate 21st: 21st login'
echo '2) Export your 21st API key if you prefer MCP API-key auth: export API_KEY_21ST=...'
echo '3) Copy this kit into your portfolio repository.'
echo '4) Start OpenCode in the repository and run the master prompt.'
