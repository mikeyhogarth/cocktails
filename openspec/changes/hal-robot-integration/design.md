## Context

The cocktail browser is a React 16 PWA (Redux + Material UI v4) with no backend. State is localStorage-only. It already has a "My Bar" ingredient inventory used for the `barOnly` filter. The CocktailBot HAL is a local-network robot (ESP32/Pico class hardware) exposing a REST API at `http://robot.local/v1` with bearer-token auth and an SSE event stream.

Key constraints:

- No backend — all robot communication is browser-to-robot, direct fetch/EventSource
- Robot hardware is single-port (ESP32/Pico); SSE and REST must share port 80
- The app must remain fully functional with no robot configured (opt-in)
- React 16, no hooks outside src/hooks/, function components only

## Goals / Non-Goals

**Goals:**

- Connect to a HAL robot from browser settings; authenticate via bearer token
- Sync robot's loaded liquids into My Bar (typed entries)
- Submit dispensing jobs from the cocktail detail page
- Reflect live robot state (SSE) in the UI
- Guide user through pre/post-mix manual steps
- Resolve ingredient names to robot liquid IDs via a user-managed alias table

**Non-Goals:**

- Admin endpoints (power, clean, reset, config PATCH) — out of scope for v1
- Multi-robot support
- Offline/queued job submission
- Parsing preparation text to derive pre-mix steps (heuristic only: non-loaded ingredients + garnish)

## Decisions

### 1. My Bar entry shape — typed objects (Option B)

**Decision:** Extend My Bar entries from `string` to `{ingredient, type?, source?}` objects. Existing string entries are migrated on load.

**Rationale:** The `type` field is the bridge between the specific liquid the robot has ("Gordon's Gin") and the generic recipe ingredient ("Gin"). Storing type on the bar item avoids re-deriving it on every render. Backwards-compatible: the bar selector handles both shapes.

**Alternative considered:** Keep bar as strings, resolve type at dispense time from the alias table. Rejected — requires alias table lookup in selectors, making the barOnly filter dependent on settings state.

### 2. Ingredient alias table in settings

**Decision:** `settings.ingredientAliases: Record<string, string[]>` maps generic type names to arrays of known brand/variant names. Seeded with common aliases; admin-extensible.

```
{
  "Gin":   ["Gin", "Gordon's Gin", "Kaiza 5", "Bloom London Dry Gin"],
  "Vodka": ["Vodka", "Tito's Vodka", "Grey Goose"],
  ...
}
```

On robot connect: each `liquid.name` is fuzzy-searched across all alias arrays. Match → type is the key. No match → admin prompted once, answer saved into the alias table.

**Rationale:** Keeps the API read-only (no type field needed on the HAL). Alias table is durable across robot reconnects.

### 3. SSE on port 80 (same as REST API)

**Decision:** The HAL API spec is amended: `/events` moves from port 9000 to port 80 (`GET /v1/events`). Browser uses a single base URL for both REST and SSE.

**Rationale:** ESP32/Pico HTTP servers run a single listener. Two ports require two server instances, doubling RAM usage. Same port eliminates the CORS multi-origin problem entirely — one `Access-Control-Allow-Origin: *` header on the single server.

**Alternative considered:** Keep port 9000, configure CORS for two origins. Rejected — more complex on constrained hardware, fragile if robot IP changes.

### 4. Redux robot slice (not component-local state)

**Decision:** Robot state lives in a dedicated Redux slice: `{url, token, connected, robotConfig, robotState, activeJobId}`.

**Rationale:** Robot status indicator (Topbar), cocktail card "Make it!" button, and dispense workflow (CocktailPage) all need the same robot state. Redux avoids prop-drilling across unrelated components. Persisted fields (url, token) go through the existing localStorage persistence layer.

### 5. Dispense pre/post instructions — heuristic approach

**Decision:** No new data fields on cocktail JSON. Pre-mix "manual steps" = recipe ingredients not present in the robot's loaded liquids. Post-mix = the cocktail's `garnish` field. Full `preparation` text shown as reference throughout.

**Rationale:** Editing 80 cocktail records to add structured pre/post fields is a large data effort. The heuristic covers the majority of cases accurately (muddled fruits, herbs, and sugars are almost never machine-dispensed). Can be upgraded to structured data in a future change.

### 6. Dispense job — parts from ingredient amounts

**Decision:** Ingredient `amount` values are passed as `parts` directly to the HAL (regardless of original unit). The HAL scales to the target glass volume.

**Rationale:** The IBA data uses `cl` for virtually all liquid ingredients. Passing raw cl values as parts preserves correct proportions. `dash`/`drop` ingredients are handled as manual steps (they're almost never loaded on a robot).

**Alternative considered:** Normalise all amounts to ml before sending. Rejected — adds complexity with no benefit since the HAL only cares about proportions.

## Risks / Trade-offs

- **mDNS unreliability** → Robot URL is user-configurable (not auto-discovered). Admin enters `http://robot.local` or IP directly.
- **SSE reconnection on mobile** → Browsers kill background connections. `useRobotConnection` must reconnect on `visibilitychange`/focus events.
- **Alias table cold start** → First connect with a fresh robot shows many "unknown ingredient" prompts. Mitigated by shipping a seeded alias table covering all 80 IBA cocktail ingredients.
- **Bar state shape migration** → Existing string[] bar entries are migrated on reducer load. Snapshots tests will need updating.
- **Robot goes offline mid-dispense** → SSE drop during `working` state. UI shows "connection lost" with last-known progress; poll `/status` as fallback.

## Migration Plan

1. Amend `CocktailBotHAL/API.yaml`: move `/events` from port 9000 description to port 80
2. Extend Redux bar state shape + migration on load
3. Add `robot` settings fields + persistence
4. Implement `useRobotConnection`, `useRobotBar`, `useDispense` hooks
5. Wire Topbar indicator, CocktailPage dispense workflow, Settings robot tab
6. Update snapshot tests

No server-side migration (app is purely client-side). Feature is off by default; existing users unaffected.

## Open Questions

- Should the seeded alias table be a static JSON file in `src/data/` or hardcoded in the reducer default state?
- Should "makeable from robot" be a new filter, or does it reuse the existing `barOnly` filter with robot-synced bar entries?
