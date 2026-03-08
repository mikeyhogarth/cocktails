## Context

The QR code feature was added in commit `4ce619c` by appending a second `<Paper>` block to `CocktailDetail.js`. The block was left in a broken state: it contains a literal `return` keyword as rendered text, a hardcoded static image path (`../../images/QR/vesper.png`) that only refers to a single cocktail, and a duplicate `{preparation}` paragraph. There is no dynamic QR code generation logic and no QR images exist for any cocktail other than possibly vesper. The snapshot test for this component is currently passing against the broken markup.

## Goals / Non-Goals

**Goals:**

- Remove the broken `<Paper>` block entirely (lines 80–88)
- Restore the cocktail detail page to its clean pre-QR state
- Update the component snapshot

**Non-Goals:**

- Implementing a working QR code feature
- Adding any new UI elements or behavior

## Decisions

**Delete the block, don't fix it.**
There is no working QR image library, no per-cocktail image assets, and no design for what the QR code should link to. The block is dead code. Removing it is the correct action; patching it would introduce further scope.

## Risks / Trade-offs

- [Snapshot mismatch] The existing snapshot reflects the broken markup → Update snapshot with `npm test -- -u` after the fix.

## Migration Plan

1. Delete lines 80–88 from `CocktailDetail.js`
2. Run `npm test -- -u` to update the snapshot
3. Verify dev server renders cocktail detail pages correctly
