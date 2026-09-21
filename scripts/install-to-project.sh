#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_DIR="${1:-.}"
TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"

mkdir -p "$TARGET_DIR"
cp -R "$SOURCE_DIR/.opencode" "$TARGET_DIR/"
cp "$SOURCE_DIR/AGENTS.md" "$TARGET_DIR/"
cp "$SOURCE_DIR/opencode.jsonc" "$TARGET_DIR/"
cp "$SOURCE_DIR/.env.example" "$TARGET_DIR/"
cp -R "$SOURCE_DIR/prompts" "$TARGET_DIR/"

printf '\nInstalled OpenCode Cyber Portfolio Kit into: %s\n' "$TARGET_DIR"
printf '%s\n' 'Next: run scripts/install-ui-tooling.sh from the kit, authenticate 21st, then start OpenCode.'
