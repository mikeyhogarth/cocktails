## Requirement: Cocktail detail renders cleanly

The cocktail detail page SHALL render a single ingredients list and a single preparation paragraph with no extraneous text, duplicate sections, or broken markup.

#### Scenario: Detail page shows ingredients once

- **WHEN** a user navigates to any cocktail detail page
- **THEN** the ingredients list is displayed exactly once

#### Scenario: Detail page shows preparation once

- **WHEN** a user navigates to any cocktail detail page
- **THEN** the preparation text is displayed exactly once

#### Scenario: No artefact text visible

- **WHEN** a user navigates to any cocktail detail page
- **THEN** no literal code keywords (e.g. "return") are visible in the rendered output
