import { countIngredients, convertMeasurementFromCl } from "./cocktail.utils";

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

    const somethingSpecial = {
      ingredients: [{ special: "I dunno, some mint or something" }]
    };

    const cocktails = [
      americano,
      derby,
      somethingSpecial,
      martini,
      monkeyGland
    ];

    expect(countIngredients(cocktails)).toEqual([
      { name: "Gin", count: 3 },
      { name: "Vermouth", count: 2 },
      { name: "Campari", count: 1 },
      { name: "Orange Juice", count: 1 }
    ]);
  });
});

describe("convertMeasurementFromCl", () => {
  describe("when unit is cl or parts", () => {
    it("does nothing - these are already the units we passed in", () => {
      expect(convertMeasurementFromCl(1, "cl")).toEqual(1);
      expect(convertMeasurementFromCl(1, "parts")).toEqual(1);
    });
  });
  describe("when unit is ml", () => {
    it("performs the conversion", () => {
      expect(convertMeasurementFromCl(1, "ml")).toEqual(10);
    });
  });

  describe("when unit is oz", () => {
    it("performs the conversion", () => {
      expect(convertMeasurementFromCl(1, "oz")).toEqual(0.5);
    });
  });
});
