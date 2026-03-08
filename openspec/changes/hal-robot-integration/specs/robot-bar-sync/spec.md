## ADDED Requirements

### Requirement: Fetch robot liquid configuration

The system SHALL fetch `GET /v1/config` from the configured robot URL on connect (after the SSE connection is established) and cache the result as `robot.robotConfig` in the Redux store. The config SHALL be re-fetched whenever the robot transitions to `idle` from `provisioning`.

#### Scenario: Config fetched on connect

- **WHEN** the SSE connection is established and `robot.connected` becomes true
- **THEN** the system fetches `GET /v1/config` with the bearer token
- **THEN** `robot.robotConfig` is populated with the response

#### Scenario: Config fetch fails

- **WHEN** `GET /v1/config` returns a non-2xx response
- **THEN** `robot.robotConfig` remains null and a console warning is emitted

### Requirement: Ingredient alias table

The system SHALL maintain an `ingredientAliases` map in settings of shape `Record<string, string[]>`, mapping generic ingredient type names (e.g. "Gin") to known brand or variant names (e.g. ["Gordon's Gin", "Kaiza 5"]). The alias table SHALL be persisted to localStorage and SHALL ship with a default seed covering all IBA cocktail ingredient types.

#### Scenario: Alias lookup succeeds

- **WHEN** the robot reports a liquid named "Gordon's Gin"
- **THEN** the system finds "Gordon's Gin" in the aliases for type "Gin"
- **THEN** the liquid is assigned type "Gin"

#### Scenario: Alias lookup fails

- **WHEN** the robot reports a liquid name not found in any alias array
- **THEN** the system flags the liquid as unresolved and prompts the admin to assign a type

#### Scenario: Admin assigns type for unknown liquid

- **WHEN** the admin selects a type for an unresolved liquid and confirms
- **THEN** the liquid name is added to that type's alias array
- **THEN** the alias table is persisted and the liquid is assigned the chosen type

### Requirement: Auto-populate My Bar from robot config

The system SHALL merge the robot's loaded liquids into the My Bar state as typed entries after resolving types via the alias table. Robot-sourced bar entries SHALL have `source: "robot"`. Entries from a previous robot sync SHALL be removed and replaced when a new sync occurs.

#### Scenario: Robot bar sync on connect

- **WHEN** `robot.robotConfig` is populated with loaded liquids
- **THEN** each resolved liquid is added to bar[] as `{ingredient: name, type: resolvedType, source: "robot"}`
- **THEN** any previous `source: "robot"` entries are removed before adding new ones

#### Scenario: barOnly filter with robot entries

- **WHEN** `barOnly` filter is active and the robot has "Gordon's Gin" loaded with type "Gin"
- **THEN** cocktails requiring "Gin" appear in the filtered list

#### Scenario: Robot disconnected — bar entries retained

- **WHEN** the SSE connection drops after a successful sync
- **THEN** robot-sourced bar entries are retained until the next sync or explicit disconnect

### Requirement: Unresolved liquid admin prompt

The system SHALL display a prompt in the Robot Settings panel listing any liquids that could not be automatically resolved to a type. The admin SHALL be able to assign a type from a dropdown of known ingredient types or enter a new type name.

#### Scenario: Unresolved liquids shown in settings

- **WHEN** Settings → Robot tab is open and there are unresolved liquids
- **THEN** each unresolved liquid is listed with a type-assignment dropdown

#### Scenario: New type created by admin

- **WHEN** admin enters a new type name not in the existing alias keys
- **THEN** a new alias table key is created with that name and the liquid's name as its first entry
