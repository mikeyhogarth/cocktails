---
description: Regenerate openspec/config.yaml from scratch based on the current codebase
allowed-tools: Read, Write, Glob, Grep, Bash(git log:*), Bash(node:*), Bash(python3:*), Bash(ls:*)
---

## Context

- package.json: !`cat package.json`
- Cocktail count: !`python3 -c "import json; d=json.load(open('src/data/cocktails.json')); print(len(d))"`
- Glasses: !`python3 -c "import json; d=json.load(open('src/data/glasses.json')); print(list(d.keys()))"`
- Component files: !`find src/components -name "*.js" ! -name "*.spec.js" ! -name "*.new" | sort`
- Hook files: !`find src/hooks -name "*.js" 2>/dev/null | sort`
- Data files: !`ls src/data/`
- Static assets: !`ls src/images/ 2>/dev/null`
- Recent commits: !`git log --oneline -5`

## Your task

Regenerate `openspec/config.yaml` from scratch using the codebase as the source of truth.

The YAML must include:

- `project`: name, description, version (from package.json), license, url, repo, platform, deployment
- `tech`: runtime, framework, state_management, ui_library, routing, persistence, enrichment, testing, formatting
- `data`: source description + per-file schema entries
- `enumerations`: categories and glasses (derive from data files)
- `features`: filters, measurement_units, views, settings
- `components`: key components and hooks
- `conventions`: project rules from CLAUDE.md
- `known_issues`: any incomplete or broken features found during the scan
- `assets`: notable static asset directories

Write the complete file to `openspec/config.yaml`. Do not preserve stale content from a previous version.
