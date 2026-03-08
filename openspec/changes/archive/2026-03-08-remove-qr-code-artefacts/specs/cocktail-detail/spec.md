## REMOVED Requirements

### Requirement: QR code display

**Reason**: The QR code block was never fully implemented. It renders a literal `return` keyword as text, a hardcoded static image for a single cocktail, and a duplicate preparation paragraph. There is no working QR code generation, no per-cocktail image assets, and no defined link target.
**Migration**: No migration needed. The block is dead UI that should not have shipped.

## MODIFIED Requirements

### Requirement: Cocktail detail renders cleanly

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
