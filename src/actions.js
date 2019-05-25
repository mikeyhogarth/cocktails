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
