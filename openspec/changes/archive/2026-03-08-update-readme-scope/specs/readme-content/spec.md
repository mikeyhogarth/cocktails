## ADDED Requirements

### Requirement: README lists all current features

The README.md SHALL list all features present in the application, including robot bar integration, cocktail dispensing, and QR code support.

#### Scenario: Robot integration mentioned

- **WHEN** a user reads the README features list
- **THEN** robot bar (CocktailBotHAL) integration is listed as a feature

#### Scenario: QR code feature mentioned

- **WHEN** a user reads the README features list
- **THEN** QR code support on cocktail detail pages is listed as a feature

#### Scenario: Dispense workflow mentioned

- **WHEN** a user reads the README features list
- **THEN** the ability to dispense cocktails via a connected robot is listed as a feature

### Requirement: Contributing section reflects current conventions

The README.md contributing section SHALL describe the current conventions: Prettier formatting enforced via pre-commit hook, semantic versioning, and CHANGELOG maintenance.

#### Scenario: Prettier convention documented

- **WHEN** a user reads the contributing section
- **THEN** the Prettier pre-commit hook is mentioned and bypassing it is discouraged

#### Scenario: Versioning convention documented

- **WHEN** a user reads the contributing section
- **THEN** semantic versioning and CHANGELOG updates are described as required for contributions

#### Scenario: Outdated versioning claim removed

- **WHEN** a user reads the contributing section
- **THEN** the text "we're not doing versioning yet" is NOT present
