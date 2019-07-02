import { fetchCocktailEnrichment } from "./services/cocktailDBAPI.service";

import { LOAD_COCKTAILS, LOAD_INGREDIENTS, LOAD_GLASSES, UPDATE_FILTER,
  ACTIVATE_FILTER_DIALOG, CLOSE_FILTER_DIALOG, SET_BAR, UPDATE_FAVOURITES,
  ADD_TO_BAR, UPDATE_SETTINGS, TOGGLE_PRIDE, TOGGLE_LINGO, START_ENRICH_COCKTAIL,
  FAIL_ENRICH_COCKTAIL, FINISH_ENRICH_COCKTAIL } from "./actionTypes";

export function loadCocktails(payload) {
  return { type: LOAD_COCKTAILS, payload };
}

export function loadIngredients(payload) {
  return { type: LOAD_INGREDIENTS, payload };
}

export function loadGlasses(payload) {
  return { type: LOAD_GLASSES, payload };
}

export function updateFilter(payload) {
  return { type: UPDATE_FILTER, payload };
}

export function setBar(payload) {
  return { type: SET_BAR, payload };
}

export function activateFilterDialog(payload) {
  return { type: ACTIVATE_FILTER_DIALOG, payload };
}

export function closeFilterDialog() {
  return { type: CLOSE_FILTER_DIALOG };
}

export function updateFavourites(payload) {
  return { type: UPDATE_FAVOURITES, payload };
}

export function addToBar(payload) {
  return { type: ADD_TO_BAR, payload };
}

export function updateSettings(payload) {
  return { type: UPDATE_SETTINGS, payload };
}

export function togglePride() {
  return { type: TOGGLE_PRIDE };
}

export function toggleLingo() {
  return { type: TOGGLE_LINGO };
}

function startEnrichCocktail(cocktailName) {
  return { type: START_ENRICH_COCKTAIL, payload: cocktailName };
}

function failEnrichCocktail(cocktailName, error) {
  return { type: FAIL_ENRICH_COCKTAIL, payload: { cocktailName, error } };
}

function finishEnrichCocktail(cocktailName, enrichment) {
  return {
    type: FINISH_ENRICH_COCKTAIL,
    payload: {
      cocktailName,
      enrichment
    }
  };
}

export function enrichCocktail(cocktail) {
  return async dispatch => {
    // don't re-enrich: this action only does something if a
    // cocktail has not already been enriched.
    const { enriched, enriching, enrichmentFailed } = cocktail;
    if (enriching || enriched || enrichmentFailed) return;

    dispatch(startEnrichCocktail(cocktail.name));
    try {
      const enrichment = await fetchCocktailEnrichment(cocktail);
      dispatch(finishEnrichCocktail(cocktail.name, enrichment));
    } catch (err) {
      dispatch(failEnrichCocktail(cocktail.name, err.message));
    }
  };
}
