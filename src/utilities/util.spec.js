import { removeOrAddItemFromArray } from "./util";

describe("removeOrAddItemFromArray", () => {
  it("adds an item to the array if it doesnt exist", () => {
    const array = [1, 2, 3, 4, 5];
    const item = 6;

    const result = removeOrAddItemFromArray(item, array);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);

    // also ensure this is a *new* array...
    expect(result === array).toEqual(false);
  });

  it("removes an item from the array if it exists", () => {
    const array = [1, 2, 3, 4, 5];
    const item = 5;

    const result = removeOrAddItemFromArray(item, array);
    expect(result).toEqual([1, 2, 3, 4]);

    // also ensure this is a *new* array...
    expect(result === array).toEqual(false);
  });
});
