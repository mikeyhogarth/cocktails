export function filterCocktails(
  cocktailList,
  conjunction = "and",
  selectedIngredients
) {
  if (!selectedIngredients.length) return cocktailList;

  return cocktailList.filter(cocktail => {
    const cocktailIngredients = cocktail.ingredients.map(i => i.ingredient);

    // cocktails should only be returned if ALL of the selected
    // ingredients appear in the list.
    if (conjunction === "and") {
      return arrayContainsArray(cocktailIngredients, selectedIngredients);
    }

    // cocktails should only be returned if ANY of the selected
    // ingredients appear in the list.
    if (conjunction === "or") {
      return cocktailIngredients.some(i => {
        return selectedIngredients.includes(i);
      });
    }
  });
}

// utility funciton for checking arrays exist within arrays
function arrayContainsArray(superset, subset) {
  return subset.every(function(value) {
    return superset.indexOf(value) >= 0;
  });
}
