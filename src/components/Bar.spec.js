import React from "react";
import renderer from "react-test-renderer";
import Bar from "./Bar";
import store from "../store";
import { Provider } from "react-redux";

it("does not explode when rendered", () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Bar />
    </Provider>
  );
  expect(tree).toMatchSnapshot();
});
