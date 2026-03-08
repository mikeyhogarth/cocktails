## Why

A broken QR code block was introduced in the cocktail detail page (`CocktailDetail.js`) that renders visible code artefacts — a literal `return` keyword as text, a hardcoded static image path for a single cocktail (vesper), and a duplicate preparation paragraph. This degrades the UI for all cocktail detail views and needs to be removed.

## What Changes

- Remove the entire broken second `<Paper>` block (lines 80–88 of `CocktailDetail.js`) containing the malformed QR code render
- The literal `return` keyword rendered as text is eliminated
- The hardcoded `vesper.png` image reference is eliminated
- The duplicate `{preparation}` paragraph is eliminated

## Capabilities

### New Capabilities

<!-- None -->

### Modified Capabilities

- `cocktail-detail`: Remove broken QR code block; the detail view should render ingredients and preparation once, cleanly, without artefacts

## Impact

- `src/components/CocktailPage/CocktailDetail.js` — second `<Paper>` block removed
- Snapshot test for `CocktailDetail` will need updating
