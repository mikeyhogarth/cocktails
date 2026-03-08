## Context

README.md is the project's primary entry point for new users and contributors. It currently describes a 77-cocktail browser with basic filtering and bar management. Since that description was written, the project has gained robot bar integration (live sync with a CocktailBotHAL dispenser via SSE), a cocktail dispense workflow UI, QR codes on cocktail detail pages, and updated tooling conventions (Prettier pre-commit, semantic versioning, CHANGELOG).

## Goals / Non-Goals

**Goals:**

- Accurately list all current features in the README
- Update the contributing section to reflect current conventions (versioning, CHANGELOG, Prettier)
- Mention the robot integration as an optional/advanced feature

**Non-Goals:**

- Rewriting the entire README from scratch — preserve existing structure and tone
- Adding full documentation for the robot API or dispense workflow
- Changing any code

## Decisions

**Preserve existing structure** — The current README follows a clear pattern (badges → screenshot → features → credits → tech → contributing). Keeping this structure minimises diff noise and preserves familiarity for existing contributors.

**Keep robot docs brief** — The CocktailBotHAL integration is an optional advanced feature. A one-liner in the features list plus a short note in the tech section is sufficient; a full sub-section would over-weight a niche capability.

**Update contributing conventions inline** — Rather than a separate CONTRIBUTING.md, update the existing Contributing section bullet points to reflect Prettier, CHANGELOG, and semantic versioning.

## Risks / Trade-offs

- [Risk] README could drift again as features are added → Mitigation: CLAUDE.md session-end checklist already requires README updates
- [Risk] Robot integration description may become inaccurate if the HAL API changes → Mitigation: Keep the description high-level and link to the HAL repo if/when one exists
