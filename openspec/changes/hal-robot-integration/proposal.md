## Why

The cocktail browser is a passive reference tool — it tells you what to make but doesn't make it. A CocktailBot HAL robot can physically dispense cocktails via a local HTTP API. Integrating the browser as a robot controller turns a browsing experience into an end-to-end bartending workflow, using the existing recipe database and "My Bar" inventory system.

## What Changes

- Add a **Robot Settings** panel: robot URL, bearer token, and an ingredient alias table mapping generic ingredient types (e.g. "Gin") to specific brand names the robot may have loaded (e.g. "Gordon's Gin", "Kaiza 5")
- Extend **My Bar** entries to carry an optional `type` field (e.g. `{ingredient: "Gordon's Gin", type: "Gin"}`), enabling the browser to match recipe ingredients against robot-loaded liquids
- Add **robot state sync** via Server-Sent Events (`GET /v1/events`): live robot status reflected in the UI (idle, working, waiting for glass, error, etc.)
- Add a **Dispense Workflow** on the cocktail detail page: pre-mixing manual instructions, robot progress, and post-mixing finish steps
- Add a **robot status indicator** to the Topbar (shown only when a robot URL is configured)
- Add a new `useRobotBar()` hook that fetches `GET /v1/config`, auto-populates My Bar from the robot's loaded liquids, and prompts the admin to assign types for unrecognised liquids
- **BREAKING** (API only, not browser): move the SSE endpoint from a separate port 9000 to port 80 (`GET /v1/events`) so a single-port HTTP server (ESP32/Pico) can serve both API and events without CORS complications

All robot features are **opt-in** — the UI remains unchanged when no robot URL is configured.

## Capabilities

### New Capabilities

- `robot-connection`: Connect to a CocktailBot HAL robot over HTTP/SSE; manage connection lifecycle, bearer-token auth, and live state updates
- `robot-bar-sync`: Fetch robot liquid config, resolve loaded liquids to ingredient types via alias table, and merge into My Bar
- `dispense-workflow`: Submit a dispensing job to the robot from a cocktail detail page; guide the user through pre-mix manual steps, robot progress, and post-mix finishing

### Modified Capabilities

- `my-bar`: My Bar entries gain an optional `type` field and `source` field to support robot-synced items alongside manual entries

## Impact

- **Redux store**: new `robot` slice; `bar` state shape extended (backwards compatible)
- **Settings**: new `robot` settings group (url, token, ingredientAliases) persisted to localStorage
- **CocktailPage / CocktailDetail**: dispense workflow integration
- **Topbar**: robot status badge
- **API spec** (`CocktailBotHAL/API.yaml`): `/events` moved from port 9000 to port 80
- **New dependency**: none (native `EventSource` for SSE; existing `fetch` for API calls)
