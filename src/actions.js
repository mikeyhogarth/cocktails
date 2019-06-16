import { fetchCocktailEnrichment } from "./services/cocktailDBAPI.service";

export function loadCocktails(payload) {
  return { type: "LOAD_COCKTAILS", payload };
}

export function loadIngredients(payload) {
  return { type: "LOAD_INGREDIENTS", payload };
}

export function updateFilter(payload) {
  return { type: "UPDATE_FILTER", payload };
}

export function setBar(payload) {
  return { type: "SET_BAR", payload };
}

export function setEditingFilter(payload) {
  return { type: "SET_EDITING_FILTER", payload };
}

export function addToBar(payload) {
  return { type: "ADD_TO_BAR", payload };
}

export function updateSettings(payload) {
  return { type: "UPDATE_SETTINGS", payload };
}

export function togglePride() {
  return { type: "TOGGLE_PRIDE" };
}

function startEnrichCocktail(cocktailName) {
  return { type: "START_ENRICH_COCKTAIL", payload: cocktailName };
}

function failEnrichCocktail(cocktailName, error) {
  return { type: "FAIL_ENRICH_COCKTAIL", payload: { cocktailName, error } };
}

function finishEnrichCocktail(cocktailName, enrichment) {
  return {
    type: "FINISH_ENRICH_COCKTAIL",
    payload: {
      cocktailName,
      enrichment
    }
  };
}

export function enrichCocktail(cocktail) {
  return (dispatch, getState) => {
    // don't re-enrich: this action only does something if a
    // cocktail has not already been enriched.
    const { enriched, enriching, enrichmentFailed } = cocktail;
    if (enriching || enriched || enrichmentFailed) return;

    dispatch(startEnrichCocktail(cocktail.name));
    fetchCocktailEnrichment(cocktail)
      .then(enrichment => {
        dispatch(finishEnrichCocktail(cocktail.name, enrichment));
      })
      .catch(err => {
        dispatch(failEnrichCocktail(cocktail.name, err));
      });
  };
}
