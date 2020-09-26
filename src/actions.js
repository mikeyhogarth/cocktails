import { fetchCocktailEnrichment } from "./services/cocktailDBAPI.service";

import * as actionTypes from "./actionTypes";

export function loadCocktails(payload) {
  return { type: actionTypes.LOAD_COCKTAILS, payload };
}

export function loadIngredients(payload) {
  return { type: actionTypes.LOAD_INGREDIENTS, payload };
}

export function loadGlasses(payload) {
  return { type: actionTypes.LOAD_GLASSES, payload };
}

export function updateFilter(payload) {
  return { type: actionTypes.UPDATE_FILTER, payload };
}

export function setBar(payload) {
  return { type: actionTypes.SET_BAR, payload };
}

export function activateFilterDialog(payload) {
  return { type: actionTypes.ACTIVATE_FILTER_DIALOG, payload };
}

export function closeFilterDialog() {
  return { type: actionTypes.CLOSE_FILTER_DIALOG };
}

export function updateFavourites(payload) {
  return { type: actionTypes.UPDATE_FAVOURITES, payload };
}

export function addToBar(payload) {
  return { type: actionTypes.ADD_TO_BAR, payload };
}

export function updateSettings(payload) {
  return { type: actionTypes.UPDATE_SETTINGS, payload };
}

export function togglePride() {
  return { type: actionTypes.TOGGLE_PRIDE };
}

export function toggleLingo() {
  return { type: actionTypes.TOGGLE_LINGO };
}

function startEnrichCocktail(cocktailName) {
  return { type: actionTypes.START_ENRICH_COCKTAIL, payload: cocktailName };
}

function failEnrichCocktail(cocktailName, error) {
  return {
    type: actionTypes.FAIL_ENRICH_COCKTAIL,
    payload: { cocktailName, error }
  };
}

function finishEnrichCocktail(cocktailName, enrichment) {
  return {
    type: actionTypes.FINISH_ENRICH_COCKTAIL,
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
