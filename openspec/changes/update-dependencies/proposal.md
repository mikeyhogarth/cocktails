## Why

The project's dependencies are significantly outdated (last major update was 2021), creating security exposure, incompatibility with modern tooling, and accumulating technical debt. Several packages have known vulnerabilities or are on versions that no longer receive patches.

## What Changes

- Update `react-scripts` from v3 to v5 (webpack 5, improved perf, security fixes)
- Update `react` + `react-dom` from 16 to 18 (concurrent features, StrictMode compat) **BREAKING**
- Update `react-router-dom` from v5 to v6 (new routing API) **BREAKING**
- Update `reselect` from v4 to v5 (minor API change, better TypeScript support)
- Update `redux` from v4 to v5 and `react-redux` from v7 to v9 **BREAKING**
- Update `husky` from v3 to v9 (new configuration format) **BREAKING**
- Update `prettier` from v1 to v3 and `pretty-quick` to latest
- Update `lodash`, `pluralize`, `react-circular-progressbar`, `react-infinite-scroller` to latest patch/minor versions (low-risk)

## Capabilities

### New Capabilities

- `dependency-versions`: Tracks the target dependency version matrix and upgrade constraints for this project

### Modified Capabilities

<!-- No existing specs — no spec-level requirement changes -->

## Impact

- `package.json`: All dependency version strings updated
- `src/`: React 18 root API (`createRoot` instead of `ReactDOM.render`), router v6 `<Routes>`/`element` syntax, react-redux v9 hook usage review
- `.husky/`: New husky v9 config directory replaces `husky.hooks` in `package.json`
- `src/store.js`: May need redux v5 compat review
- Build output: webpack 5 (via react-scripts v5) may change chunk names / asset paths
