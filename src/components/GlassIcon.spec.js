import GlassIcon from "./GlassIcon";
import React from "react";
import renderer from "react-test-renderer";

const glasses = [
  "martini",
  "old-fashioned",
  "collins",
  "highball",
  "champagne-flute",
  "margarita",
  "champagne-tulip",
  "hurricane",
  "shot",
  "hot-drink",
  "white-wine"
];

it("does not explode when rendered", async () => {
  const tree = renderer.create(
    <>
      {glasses.map(g => (
        <GlassIcon key={g} glass={g} />
      ))}
    </>
  );

  expect(tree).toMatchSnapshot();
});
