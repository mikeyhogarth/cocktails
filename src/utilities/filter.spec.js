import cocktails from "../data/cocktails.json";
import { applyFilter, applyFilters } from "./filter";

describe("makeableFrom rule", () => {
  it("returns cocktails makeable from the passed-in ingredients", () => {
    const filter = {
      rule: "makeableFrom",
      ingredients: ["Cognac", "Champagne"]
    };

    const results = applyFilter(cocktails, filter);
    expect(results.length).toEqual(1);
    expect(results[0]).toHaveProperty("name", "Champagne Cocktail");
  });

  it("allows for rogue ingredients", () => {
    const filter = {
      rule: "makeableFrom",
      ingredients: ["Cognac", "Champagne", "Somethign else"]
    };

    const results = applyFilter(cocktails, filter);
    expect(results.length).toEqual(1);
    expect(results[0]).toHaveProperty("name", "Champagne Cocktail");
  });

  it("should return no results if the ingredients are empty", () => {
    const filter = {
      rule: "makeableFrom",
      ingredients: []
    };
    const results = applyFilter(cocktails, filter);
    expect(results.length).toEqual(0);
  });
});

describe("mustInclude rule", () => {
  it("returns cocktails that include the passed in ingredients", async () => {
    const filter = {
      rule: "mustInclude",
      ingredients: ["Gin", "Cherry liqueur", "Orange Bitters", "Lemon juice"]
    };
    const results = applyFilter(cocktails, filter);
    expect(results.length).toEqual(1);
    expect(results[0]).toHaveProperty("name", "Casino");
  });

  it("does not return cocktails if a rogue ingredient exists", () => {
    const filter = {
      rule: "mustInclude",
      ingredients: [
        "Gin",
        "Cherry liqueur",
        "Orange Bitters",
        "Lemon juice",
        "Foobar"
      ]
    };
    const results = applyFilter(cocktails, filter);
    expect(results.length).toEqual(0);
  });
});

describe("canInclude rule", () => {
  it("returns cocktails that include any of the ingredients", () => {
    const filter = {
      rule: "canInclude",
      ingredients: ["Cola", "Cream liqueur"]
    };
    const results = applyFilter(cocktails, filter);
    expect(results.length).toEqual(2);
    expect(results[0]).toHaveProperty("name", "Cuba Libre");
    expect(results[1]).toHaveProperty("name", "B52");
  });
});

describe("combining filters", () => {
  it("allows you to combine filters", () => {
    // this one should return 5 results.
    const filter1 = {
      rule: "makeableFrom",
      ingredients: ["Campari", "Vermouth", "Gin"]
    };
    expect(applyFilter(cocktails, filter1).length).toEqual(5);

    // This one should return 7 results
    const filter2 = {
      rule: "mustInclude",
      ingredients: ["Vermouth"]
    };
    expect(applyFilter(cocktails, filter2).length).toEqual(7);

    // if you combine them though, you should only get 4 results
    // which will be everything from filter 1 that contains vermouth -
    // so that excludes the "Derby" which does not have vermouth in it.
    expect(applyFilters(cocktails, [filter1, filter2]).length).toEqual(4);
  });
});
