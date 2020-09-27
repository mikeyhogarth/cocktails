import React from "react";
import renderer from "react-test-renderer";
import TableView from "./TableView";
import store from "../store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { loadDatabase } from "../utilities/db.utils";

beforeAll(async () => {
  await loadDatabase(store);
});

it("does not explode when rendered", async () => {
  const displayedCocktails = [store.getState().db.cocktails[0]];

  const tree = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <TableView displayedCocktails={displayedCocktails} />
      </MemoryRouter>
    </Provider>
  );

  expect(tree).toMatchSnapshot();
});
