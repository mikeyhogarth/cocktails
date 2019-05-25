import { countIngredients } from "./cocktail.utils";

describe("countIngredients", () => {
  it("returns a list showing ingredient coutns based on passed-in cocktails", () => {
    const derby = {
      ingredients: [{ ingredient: "Gin" }]
    };

    const martini = {
      ingredients: [{ ingredient: "Gin" }, { ingredient: "Vermouth" }]
    };

    const monkeyGland = {
      ingredients: [{ ingredient: "Gin" }, { ingredient: "Orange Juice" }]
    };

    const americano = {
      ingredients: [{ ingredient: "Campari" }, { ingredient: "Vermouth" }]
    };

    const cocktails = [americano, derby, martini, monkeyGland];
    expect(countIngredients(cocktails)).toEqual([
      { name: "Gin", count: 3 },
      { name: "Vermouth", count: 2 },
      { name: "Campari", count: 1 },
      { name: "Orange Juice", count: 1 }
    ]);
  });
});
