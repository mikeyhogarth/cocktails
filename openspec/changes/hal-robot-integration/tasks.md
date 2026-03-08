## 1. API Spec Update

- [x] 1.1 Amend `CocktailBotHAL/API.yaml`: remove "separate port (9000)" from `/events` description and update to serve on port 80 alongside the REST API

## 2. My Bar State Migration

- [x] 2.1 Update bar state shape in `src/reducers/index.js`: default `bar` entries to `{ingredient, source: "manual"}` objects
- [x] 2.2 Add migration logic in reducer initialisation that converts any persisted plain-string bar entries to the new object shape
- [x] 2.3 Update `src/utilities/persistence.js` to handle both old (string[]) and new (object[]) bar shapes on load
- [x] 2.4 Update `barOnly` filter selector in `src/selectors/` to match recipe ingredient against both `entry.ingredient` and `entry.type`
- [x] 2.5 Update `src/components/Bar/` to render and add bar items using the new object shape
- [x] 2.6 Update snapshot tests for Bar components; run `npm test -- -u` to confirm

## 3. Redux Robot Slice

- [x] 3.1 Add `src/actionTypes.js` entries: `ROBOT_CONNECTED`, `ROBOT_DISCONNECTED`, `ROBOT_STATE_CHANGED`, `ROBOT_CONFIG_LOADED`, `ROBOT_JOB_UPDATED`, `ROBOT_BAR_SYNCED`
- [x] 3.2 Add `robot` slice to `src/reducers/index.js` with initial state `{connected: false, robotState: null, robotConfig: null, activeJobId: null}`
- [x] 3.3 Add robot action creators to `src/actions.js`
- [x] 3.4 Add robot settings to default settings state: `robot: {url: "", token: "", ingredientAliases: {...seedAliases}}`
- [x] 3.5 Create `src/data/ingredientAliases.json` with seeded alias table covering all IBA ingredient types
- [x] 3.6 Add robot settings fields to localStorage persistence (url, token, ingredientAliases)

## 4. Robot Connection Hook

- [x] 4.1 Create `src/hooks/useRobotConnection.js`: opens EventSource to `<url>/v1/events` with bearer token, dispatches `ROBOT_CONNECTED` / `ROBOT_DISCONNECTED` / `ROBOT_STATE_CHANGED` on SSE events
- [x] 4.2 Add exponential back-off reconnection logic (max 30s) in `useRobotConnection`
- [x] 4.3 Add `visibilitychange` listener in `useRobotConnection` to reconnect when tab regains focus
- [x] 4.4 Mount `useRobotConnection` in the app root (e.g. `src/App.js`) so it runs for the app lifetime

## 5. Robot Bar Sync Hook

- [x] 5.1 Create `src/hooks/useRobotBar.js`: fetches `GET /v1/config` when `robot.connected` becomes true, dispatches `ROBOT_CONFIG_LOADED`
- [x] 5.2 Implement alias resolution in `useRobotBar`: for each liquid, search `ingredientAliases` values for the liquid name; assign matched key as type
- [x] 5.3 On successful resolution, dispatch `ROBOT_BAR_SYNCED` with typed bar entries (replacing previous `source: "robot"` entries)
- [x] 5.4 Track unresolved liquids in `robot.unresolvedLiquids` state field for admin prompt display

## 6. Robot Settings UI

- [x] 6.1 Add "Robot" section to `src/components/Settings.js` with URL and token text fields (shown always, robot feature hidden when URL is empty)
- [x] 6.2 Add unresolved liquid assignment UI: list of unknown liquids each with a type dropdown (populated from `ingredientAliases` keys + free-text new type option)
- [x] 6.3 Wire type assignment to dispatch that updates `ingredientAliases` in settings and re-triggers bar sync
- [x] 6.4 Update Settings snapshot test

## 7. Topbar Robot Status Indicator

- [x] 7.1 Add `RobotStatusIndicator` component in `src/components/Topbar.js` (or new file): coloured dot reflecting `robot.connected` and `robot.robotState.state`
- [x] 7.2 Hide indicator entirely when `settings.robot.url` is empty
- [x] 7.3 Update Topbar snapshot test

## 8. Dispense Workflow — CocktailPage

- [x] 8.1 Add ingredient match computation to `CocktailPage`: for each recipe ingredient, find matching bar entry (by type or exact name) and corresponding `liquid_id` from `robot.robotConfig.liquids`
- [x] 8.2 Add "Make it!" button to `src/components/CocktailPage/CocktailDetail.js`: visible when robot connected and idle; disabled when busy
- [x] 8.3 Create `src/components/CocktailPage/DispenseWorkflow.js`: modal/stepper with three phases — pre-mix, dispensing progress, post-mix
- [x] 8.4 Pre-mix phase: list non-dispensable ingredients as manual steps; show preparation text; "Ready" checkbox unlocks "Mix!" button; show size selector populated from `robot.robotConfig.glass_types`
- [x] 8.5 On "Mix!" click: build `JobCreateRequest` payload (name, size, items with liquid_id + parts); call `POST /v1/dispense/jobs`; dispatch `ROBOT_JOB_UPDATED` with returned `job_id`
- [x] 8.6 Dispensing phase: show "Place your glass" prompt when `waiting_for_glass`; show progress bar driven by `job_update` SSE events when `working`
- [x] 8.7 Post-mix phase: show garnish from `cocktail.garnish`; show any non-dispensable liquid ingredients that were skipped; "Done" button clears `activeJobId`
- [x] 8.8 Error state: if `robot.robotState.state === "error"` during active job, show error message and `recovery` hint; close workflow on user dismiss
- [x] 8.9 Handle 503 from job submission: show "Robot is busy" message, keep workflow open
- [x] 8.10 Update CocktailPage / CocktailDetail snapshot tests

## 9. End-to-End Verification

- [x] 9.1 Run full test suite (`npm test`); update any failing snapshots intentionally with `-- -u`
- [ ] 9.2 Manual smoke test: configure robot URL in Settings, verify bar sync and type assignment flow
- [ ] 9.3 Manual smoke test: dispense a cocktail end-to-end (pre-mix → robot progress → post-mix)
- [ ] 9.4 Verify `barOnly` filter shows only cocktails the robot can make after sync
- [ ] 9.5 Verify app with no robot URL configured shows no robot UI anywhere
