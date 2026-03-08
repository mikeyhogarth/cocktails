## 1. Update package.json versions

- [x] 1.1 Bump `react` and `react-dom` to `^18.2.0`
- [x] 1.2 Bump `react-scripts` to `^5.0.1`
- [x] 1.3 Bump `react-router-dom` to `^6.20.0`
- [x] 1.4 Bump `redux` to `^5.0.0` and `react-redux` to `^9.0.0`
- [x] 1.5 Bump `reselect` to `^5.0.0`
- [x] 1.6 Bump `redux-thunk` to `^3.0.0`
- [x] 1.7 Bump `husky` to `^9.0.0` and `pretty-quick` to `^4.0.0`
- [x] 1.8 Bump `prettier` to `^3.0.0`
- [x] 1.9 Bump `react-test-renderer` to `^18.2.0` (must match React version)
- [x] 1.10 Check `react-infinite-scroller` for active maintenance; pin or replace if abandoned
- [x] 1.11 Run `npm install` and resolve any peer dependency conflicts

## 2. Fix React 18 root API

- [x] 2.1 Update `src/index.js` to use `ReactDOM.createRoot` instead of `ReactDOM.render`

## 3. Fix react-router-dom v6 syntax

- [x] 3.1 Wrap routes in `<Routes>` in `src/App.js`
- [x] 3.2 Convert `<Route component={X}>` to `<Route element={<X/>}>` for all 4 routes
- [x] 3.3 Verify any `useHistory` / `withRouter` usage in components and replace with v6 equivalents (`useNavigate`)

## 4. Migrate husky to v9

- [x] 4.1 Remove `husky.hooks` block from `package.json`
- [x] 4.2 Run `npx husky init` to create `.husky/` directory
- [x] 4.3 Create `.husky/pre-commit` script with `npx pretty-quick --staged`
- [ ] 4.4 Test that a git commit triggers the pre-commit hook

## 5. Verify build and tests

- [x] 5.1 Run `npm run build` and confirm no errors
- [x] 5.2 Run `npm test` and update snapshots if needed (`npm test -- -u`)
- [x] 5.3 Run `npm audit` — 26 vulns all in react-scripts transitive deps (jest27, svgo, webpack plugins), none in direct production deps; unfixable without ejecting CRA
- [ ] 5.4 Smoke-test the app in browser: browse cocktails, open detail page, visit My Bar and Settings
