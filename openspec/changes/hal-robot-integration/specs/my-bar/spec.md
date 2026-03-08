## MODIFIED Requirements

### Requirement: My Bar entry shape

My Bar entries SHALL support both plain strings (legacy) and structured objects `{ingredient: string, type?: string, source?: "manual" | "robot"}`. On reducer initialisation, any existing plain string entries SHALL be migrated to `{ingredient: name, source: "manual"}`. The `type` field provides the generic ingredient category (e.g. "Gin") used for recipe matching when the specific name differs from the recipe ingredient name.

#### Scenario: Legacy string entries are migrated

- **WHEN** the Redux store is initialised with a persisted bar containing plain strings
- **THEN** each string `"Gin"` is converted to `{ingredient: "Gin", source: "manual"}`
- **THEN** the migrated state is saved back to localStorage

#### Scenario: Manual bar entry without type

- **WHEN** the user manually adds "Gin" to My Bar
- **THEN** the entry is stored as `{ingredient: "Gin", source: "manual"}` with no type field

#### Scenario: Robot bar entry with type

- **WHEN** the robot sync adds a liquid "Gordon's Gin" resolved to type "Gin"
- **THEN** the entry is stored as `{ingredient: "Gordon's Gin", type: "Gin", source: "robot"}`

### Requirement: barOnly filter with typed entries

The `barOnly` filter SHALL match a recipe ingredient against bar entries using the following precedence: (1) exact match on `ingredient` name, (2) match on `type` if present. A cocktail ingredient "Gin" SHALL be considered available if any bar entry has `ingredient === "Gin"` OR `type === "Gin"`.

#### Scenario: Type-based match enables barOnly

- **WHEN** the bar contains `{ingredient: "Gordon's Gin", type: "Gin"}` and a cocktail needs "Gin"
- **THEN** the cocktail appears when the barOnly filter is active

#### Scenario: Exact name match still works

- **WHEN** the bar contains `{ingredient: "Gin", source: "manual"}` and a cocktail needs "Gin"
- **THEN** the cocktail appears when the barOnly filter is active

#### Scenario: No match — cocktail excluded

- **WHEN** the bar contains only entries whose `ingredient` and `type` do not match a required ingredient
- **THEN** the cocktail is excluded from the barOnly filtered list
