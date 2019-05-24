import React from "react";
import IngredientDetail from "./IngredientDetail";
import renderer from "react-test-renderer";

it("renders special ingredients correctly", () => {
  const item = {
    special: "1 cup of sugar"
  };
  const tree = renderer.create(<IngredientDetail item={item} />);
  expect(tree).toMatchSnapshot();
});

it("renders normal ingredients correctly", () => {
  const item = {
    name: "Vodka",
    amount: 1,
    unit: "cl"
  };
  const tree = renderer.create(<IngredientDetail item={item} />);
  expect(tree).toMatchSnapshot();
});

it("uses label instead of name if provided", () => {
  const item = {
    label: "Smirnoff",
    amount: 1,
    unit: "cl"
  };
  const tree = renderer.create(<IngredientDetail item={item} />);
  expect(tree).toMatchSnapshot();
});
