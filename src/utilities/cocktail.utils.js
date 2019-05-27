import map from "lodash/map";
import uniq from "lodash/uniq";
import compact from "lodash/compact";

export function getGlasses(cocktails = []) {
  return compact(uniq(cocktails.map(c => c.glass)));
}

export function getCategories(cocktails = []) {
  return compact(uniq(cocktails.map(c => c.category)));
}

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
