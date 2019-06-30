import React from "react";
import renderer from "react-test-renderer";
import CocktailPage from "./CocktailPage";
import store from "../store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { noop } from "lodash";
import cocktails from "../data/cocktails.json";

beforeAll(() => {
  // jsdom does not implement scrollTo so we need to mock it.
  window.scrollToMemo = window.scrollTo;
  window.scrollTo = noop;
});

afterAll(() => {
  window.scrollTo = window.scrollToMemo;
  delete window.scrollToMemo;
});

it("does not explode when rendered", () => {
  const tree = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <CocktailPage cocktail={cocktails[0]} enrichCocktail={noop} />
      </MemoryRouter>
    </Provider>
  );

  expect(tree).toMatchSnapshot();
});
