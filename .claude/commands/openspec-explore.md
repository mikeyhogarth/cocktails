---
description: Audit openspec/config.yaml against the actual codebase and report discrepancies
allowed-tools: Read, Glob, Grep, Bash(git log:*), Bash(python3:*), Bash(ls:*), Bash(find:*)
---

## Context

- openspec/config.yaml: !`cat openspec/config.yaml`
- Actual component files: !`find src/components -name "*.js" ! -name "*.spec.js" | sort`
- Actual hook files: !`find src/hooks -name "*.js" 2>/dev/null | sort`
- Cocktail count: !`python3 -c "import json; d=json.load(open('src/data/cocktails.json')); print(len(d))"`
- Ingredient count: !`python3 -c "import json; d=json.load(open('src/data/ingredients.json')); print(len(d))"`
- Glass keys: !`python3 -c "import json; d=json.load(open('src/data/glasses.json')); print(sorted(d.keys()))"`
- package.json version: !`node -e "console.log(require('./package.json').version)"`
- Untracked/modified files: !`git status --short`

## Your task

Compare the `openspec/config.yaml` spec against the actual codebase and produce a concise audit report.

Report should include:

1. **Accurate** — things the spec correctly describes
2. **Stale** — spec entries that no longer match reality (e.g., missing components, wrong counts)
3. **Missing** — things in the codebase not documented in the spec
4. **Known issues** — whether documented known_issues are still present or have been resolved

Do NOT edit any files. Output the audit report as markdown only.
