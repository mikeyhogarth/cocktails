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

export function addToBar(payload) {
  return { type: "ADD_TO_BAR", payload };
}

function startEnrichCocktail(cocktailName) {
  return { type: "START_ENRICH_COCKTAIL", payload: cocktailName };
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
    dispatch(startEnrichCocktail(cocktail.name));
    fetchCocktailEnrichment(cocktail).then(enrichment => {
      dispatch(finishEnrichCocktail(cocktail.name, enrichment));
    });
  };
}
