import compact from "lodash/compact";

export async function filterCocktails(cocktailList, filter) {
  return filterCocktailsSync(cocktailList, filter);
}

export function filterCocktailsSync(cocktailList, filter) {
  const { selectedIngredients, conjunction } = filter;
  if (!selectedIngredients.length) return cocktailList;

  return cocktailList.filter(cocktail => {
    const cocktailIngredients = compact(
      cocktail.ingredients.map(i => i.ingredient)
    );

    // cocktails should only be returned if ALL of the selected
    // ingredients appear in its ingredients.
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

    // cocktails should only be returned if ALL of the selected
    // ingredients appear in its ingredients and NOTHING ELSE.
    if (conjunction === "makeable") {
      return arrayContainsArray(selectedIngredients, cocktailIngredients);
    }

    return true;
  });
}

// utility funciton for checking arrays exist within arrays
function arrayContainsArray(superset, subset) {
  return subset.every(function(value) {
    return superset.indexOf(value) >= 0;
  });
}
