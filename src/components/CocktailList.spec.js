import React from "react";
import renderer from "react-test-renderer";
import CocktailList from "./CocktailList";
import store from "../store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";

it("does not explode when rendered", () => {
  const tree = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <CocktailList />
      </MemoryRouter>
    </Provider>
  );
  expect(tree).toMatchSnapshot();
});
