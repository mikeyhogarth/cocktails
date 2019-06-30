import React from "react";
import renderer from "react-test-renderer";
import Bar from "./Bar";
import store from "../store";
import { Provider } from "react-redux";
import { loadDatabase } from "../utilities/db.utils";

beforeAll(async () => {
  await loadDatabase(store);
});

it("does not explode when rendered", async () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Bar />
    </Provider>
  );
  expect(tree).toMatchSnapshot();
});
