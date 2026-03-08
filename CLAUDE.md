# Cocktails Browser — Project Guide

## Instructions

- Follow semantic versioning.

## Session Start

1. Read `claude-progress.txt` (create it if missing)
2. Read `git log --oneline -10`
3. Work on exactly ONE task

## Session End

1. Update README.md if relevant. follow https://www.makeareadme.com/ best practices
1. Update `claude-progress.txt`
1. Document relevant changes in `CLAUDE.md` and `openspec/config.yaml`
1. Update `TODO.md` to reflect the changes
1. Document changes in CHANGELOG.md in the format of @https://keepachangelog.com/en/1.1.0/
1. `git commit` with descriptive message

---

## Project Overview

**IBA Cocktails Browser** — a React PWA for browsing and filtering the official IBA cocktail list (~77 cocktails + extras).

Deployed at: https://iba-cocktails.netlify.com/
Stack: React 16 (functional components + hooks), Redux, Material UI v4, react-router-dom v5

## Key Features

- Browse/filter cocktails by ingredient, category, glass, vegan, or "makeable from your bar"
- "My Bar" — local-storage-backed ingredient inventory
- Favourites, configurable color schemes, measurement units (parts/ml/cl/oz), pro bartender mode
- TheCocktailDB enrichment for images
- PWA / installable

## Architecture

### State Management

- Redux store with `redux-thunk` middleware
- Selectors via `reselect` (memoized)
- State mutation via `immer`
- `src/actionTypes.js` — action type constants
- `src/actions.js` — action creators
- `src/reducers/` — reducer slice files
- `src/selectors/` — reselect selectors
- `src/store.js` — store setup

### Data

All data is static JSON in `src/data/`:

- `cocktails.json` — full cocktail recipes
- `ingredients.json` — ingredient definitions
- `glasses.json` — glass types

No backend or database. Persistence is browser localStorage only.

### Components (`src/components/`)

- `CocktailBrowser.js` — main browse/filter view
- `CocktailList.js` / `CocktailCard.js` / `CardView.js` / `TableView.js` — list display
- `CocktailPage/` — cocktail detail page
- `Bar/` — "My Bar" ingredient management
- `Filters/` — filter panel components
- `CocktailFilter.js` — filter logic integration
- `Settings.js` — app settings
- `Topbar.js` — navigation bar
- `IngredientPicker.js` / `IngredientDetail.js` — ingredient UI

### Hooks (`src/hooks/` and inline in components)

- `useEnrichCocktail.js` — fetches TheCocktailDB data
- `useScroll.js`, `useScrollTop.js` — scroll utilities

### Styling

- Material UI v4 (`@material-ui/core`, `@material-ui/icons`)
- Theme defined in `src/theme.js`

## Dev Conventions

- **Function components only** — no class components
- **Snapshot tests** — update snapshots when changing views (`npm test -- -u`)
- **Formatting** — Prettier via `pretty-quick` pre-commit hook (husky); do not bypass
- **No `package-lock.json`** commits unless `package.json` changed
- Test files: `*.spec.js` alongside components

## Common Commands

```bash
npm start      # dev server
npm test       # jest / snapshot tests
npm run build  # production build
```

## Testing Notes

- Uses Jest + `react-test-renderer` for snapshot tests
- Snapshots live in `src/components/__snapshots__/`
- Always run tests after component changes; update snapshots intentionally with `-- -u`
