import map from "lodash/map";

// Given a list of cocktails, this returns the counts of the ingredients
// "appearances" in the list (e.g. Gin: 4, Brandy: 2...)
export function countIngredients(cocktails = []) {
  const counts = cocktails.reduce((acc, cocktail) => {
    cocktail.ingredients.forEach(({ ingredient }) => {
      if (!ingredient) return;
      acc[ingredient]
        ? (acc[ingredient] = acc[ingredient] + 1)
        : (acc[ingredient] = 1);
    });
    return acc;
  }, {});

  return map(counts, (count, name) => {
    return { count, name };
  }).sort((a, b) => (a.count < b.count ? 1 : -1));
}
