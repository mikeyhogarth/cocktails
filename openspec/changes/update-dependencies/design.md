## Context

The app is a React 16 CRA (create-react-app via react-scripts v3) PWA with hooks-based functional components throughout. Key integration points for breaking upgrades:

- `src/index.js`: Uses `ReactDOM.render()` — needs React 18's `createRoot`
- `src/App.js`: Uses react-router-dom v5 `<Route component={X}>` and no `<Switch>` (already removed)
- `src/store.js`: Uses redux-thunk middleware with `applyMiddleware`
- `.husky` config: Currently lives in `package.json` under `husky.hooks`

## Goals / Non-Goals

**Goals:**

- Bring all dependencies to current supported versions
- Eliminate known security vulnerabilities (react-scripts v3, older webpack)
- Keep the app functionally identical post-upgrade
- Maintain the existing test suite passing

**Non-Goals:**

- Adopting new features of upgraded libs (concurrent mode, Redux Toolkit, etc.)
- Migrating away from CRA/react-scripts to Vite or similar
- TypeScript migration
- Upgrading to MUI v5 (too large in scope; separate change)

## Decisions

### React 18 — use legacy root for minimal diff

React 18's `createRoot` enables concurrent features but `ReactDOM.render` still works with a deprecation warning. We will migrate to `createRoot` to silence warnings and future-proof, but will NOT enable `<StrictMode>` or concurrent features, minimising risk.

**Alternative considered**: Staying on React 16. Rejected — React 16 is EOL, no security patches.

### react-router-dom v6 — update call sites

v6 removes `<Switch>`, changes `<Route component={X}>` → `<Route element={<X/>}>`, and wraps routes in `<Routes>`. The app has ~4 routes in one file (`App.js`), making this a small, contained change.

**Alternative considered**: Pinning to v5. Rejected — v5 is in maintenance-only mode.

### react-scripts v5 — in-place upgrade

CRA v5 ships webpack 5. No eject required. Some jest config may change (jest 27 → 28).

**Alternative considered**: Migrating to Vite. Rejected — out of scope, high risk.

### redux v5 / react-redux v9

redux v5 is ESM-first but ships CJS compat. react-redux v9 drops legacy connect perf hacks but the hook API (`useSelector`, `useDispatch`) is unchanged. The app already uses hooks throughout.

**Alternative considered**: Adopting Redux Toolkit. Rejected — out of scope.

### husky v9

v9 moves hooks to `.husky/` shell scripts and removes the `package.json` config block. Migration: `npx husky init`, then recreate the pre-commit hook script.

### reselect v5

Only change: `createSelector` now defaults to memoizing with `WeakRef`; the functional call signature is identical. No code changes required.

## Risks / Trade-offs

- [react-scripts v5 jest upgrade] Snapshot tests may fail due to different serialisation → Mitigation: run `npm test -- -u` after upgrade to refresh snapshots intentionally.
- [React 18 StrictMode double-invoke] Not enabling StrictMode so this is not a concern.
- [webpack 5 asset filenames] Build output chunk names change → Mitigation: no impact since deployment is static hosting (Netlify), no server-side filename assumptions.
- [husky v9 shell compat] Git hooks now require executable shell scripts → Mitigation: `husky init` generates correct files; test pre-commit hook locally.

## Migration Plan

1. Update `package.json` versions, run `npm install`
2. Fix `src/index.js` (React 18 `createRoot`)
3. Fix `src/App.js` (router v6 `<Routes>` + `element={}`)
4. Migrate husky config to `.husky/` directory
5. Run `npm test` — update snapshots if needed
6. Run `npm run build` — verify clean build

**Rollback**: `git revert` the dependency bump commit; `npm install` restores prior lockfile state.

## Open Questions

- Does `react-infinite-scroller` have an actively maintained fork? (original repo stale) — check before upgrading; may need to swap for `react-window` or similar if abandoned.
