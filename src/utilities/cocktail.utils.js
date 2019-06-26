import { map, compact } from "lodash";

// Given a list of cocktails, this returns the counts of the ingredients
// "appearances" in the list (e.g. Gin: 4, Brandy: 2...)
export function countIngredients(cocktails = []) {
  const counts = cocktails.reduce((acc, cocktail) => {
    cocktail.ingredients.forEach(({ ingredient }) => {
      if (!ingredient) return;
      acc[`${ingredient}`]
        ? (acc[`${ingredient}`] = acc[`${ingredient}`] + 1)
        : (acc[`${ingredient}`] = 1);
    });
    return acc;
  }, {});

  return map(counts, (count, name) => {
    return { count, name };
  }).sort((a, b) => (a.count < b.count ? 1 : -1));
}

export function getIngredientKeys(cocktail) {
  return compact(cocktail.ingredients.map(i => i.ingredient));
}

// We store all ingredient quantities in cl. This function converts
// that to another format should the user want to.
export function convertMeasurementFromCl(amount, unit) {
  switch (unit) {
    case "ml":
      return amount * 10;
    case "oz":
      return Math.round(amount * 0.351951 * 2) / 2;
    default:
      return amount;
  }
}

// pass in amount in cl, returns any "bar lingo" covered by that amount.
function lingoForClMeasure(amount) {
  if (amount === 0.25) return "A Dash of";
  if (amount === 0.5) return "1 Bar Spoon";
  if (amount === 3) return "1 Pony";
  if (amount === 4.5) return "1 Jigger";
  if (amount === 6) return "2 Ponies";
  if (amount === 9) return "2 Jiggers";
}

// returns a string representing amount/units, including lingo
export function createMeasurementString(amount, units, useLingo) {
  return (
    (useLingo && lingoForClMeasure(amount)) ||
    `${convertMeasurementFromCl(amount, units)} ${units}`
  );
}
