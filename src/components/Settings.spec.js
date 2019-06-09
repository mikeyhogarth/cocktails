import React from "react";
import renderer from "react-test-renderer";
import Settings from "./Settings";
import store from "../store";
import { Provider } from "react-redux";

it("does not explode when rendered", () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Settings />
    </Provider>
  );
  expect(tree).toMatchSnapshot();
});
