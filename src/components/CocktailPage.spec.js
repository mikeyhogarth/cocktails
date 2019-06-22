import React from "react";
import renderer from "react-test-renderer";
import CocktailPage from "./CocktailPage";
import store from "../store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { noop } from "lodash";
import cocktails from "../data/cocktails.json";

it("does not explode when rendered", () => {
  // jsdom does not implement scrollTo so we need to mock it.
  const jsdomAlert = window.scrollTo;
  window.scrollTo = noop;

  const tree = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <CocktailPage cocktail={cocktails[0]} enrichCocktail={noop} />
      </MemoryRouter>
    </Provider>
  );

  window.scrollTo = jsdomAlert;
  expect(tree).toMatchSnapshot();
});
