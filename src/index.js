import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { loadDatabase } from "./utilities/db.utils";
import { Provider } from "react-redux";
import store from "./store";

async function start() {
  await loadDatabase(store);
  const root = createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

start();
