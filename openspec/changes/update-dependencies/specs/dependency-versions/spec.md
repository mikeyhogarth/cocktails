## ADDED Requirements

### Requirement: React 18 root API

The application SHALL use React 18's `createRoot` API to mount the app, replacing the deprecated `ReactDOM.render`.

#### Scenario: App mounts with createRoot

- **WHEN** the application starts
- **THEN** `ReactDOM.createRoot` is used to mount the root component without console deprecation warnings

### Requirement: React Router v6 route syntax

The application SHALL use react-router-dom v6 `<Routes>` and `<Route element={}>` syntax for all route declarations.

#### Scenario: Routes render correct components

- **WHEN** the user navigates to `/cocktails`, `/cocktails/:slug`, `/my-bar`, or `/settings`
- **THEN** the correct page component is rendered without errors

#### Scenario: Unknown paths fall through gracefully

- **WHEN** the user navigates to an unknown path
- **THEN** the application does not crash and renders a default view or redirects

### Requirement: Supported dependency versions

All production and development dependencies SHALL be at versions that receive active security patches.

#### Scenario: No critical vulnerabilities in audit

- **WHEN** `npm audit` is run after upgrade
- **THEN** no critical or high severity vulnerabilities are reported for in-scope packages

### Requirement: Build succeeds after upgrade

The application SHALL build without errors after all dependency upgrades.

#### Scenario: Production build completes

- **WHEN** `npm run build` is executed
- **THEN** the build completes successfully with no errors

### Requirement: Test suite passes after upgrade

All existing snapshot and unit tests SHALL pass after dependency upgrades (with snapshots refreshed as needed).

#### Scenario: Tests pass

- **WHEN** `npm test` is run
- **THEN** all test suites pass (snapshots may be updated to reflect rendering changes)

### Requirement: Husky pre-commit hook continues to function

The pre-commit hook SHALL run `pretty-quick --staged` before each commit using husky v9's configuration format.

#### Scenario: Prettier runs on staged files

- **WHEN** a developer makes a git commit
- **THEN** `pretty-quick --staged` executes and formats staged files before the commit is recorded
