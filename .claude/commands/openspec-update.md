---
description: Update openspec/config.yaml to reflect recent codebase changes
allowed-tools: Read, Edit, Glob, Grep, Bash(git log:*), Bash(git diff:*), Bash(git show:*)
---

## Context

- openspec/config.yaml: !`cat openspec/config.yaml`
- Recent commits: !`git log --oneline -10`
- Changes since last openspec update: !`git diff HEAD~3..HEAD --stat`
- Package version: !`node -e "const p=require('./package.json'); console.log(p.version)"`
- Cocktail count: !`python3 -c "import json; d=json.load(open('src/data/cocktails.json')); print(len(d), 'cocktails')"`
- QR images: !`ls src/images/QR/ 2>/dev/null || echo none`

## Your task

Review the current `openspec/config.yaml` against the codebase and update it to reflect reality.

Focus on:

1. Version number — match `package.json`
2. Cocktail count in `data.files`
3. `components.key` — add/remove/update based on actual files in `src/components/`
4. `features` — verify all filters, views, and settings are accurate
5. `known_issues` — add new issues, remove resolved ones
6. `assets` — reflect any new static asset directories

Edit `openspec/config.yaml` directly. Do not rewrite sections that are already accurate.
