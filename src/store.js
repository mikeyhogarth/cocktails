import appReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import {
  fetchCocktails,
  fetchIngredients,
  fetchGlasses
} from "./services/cocktail.service";
import { loadCocktails, loadIngredients, loadGlasses } from "./actions";
import {
  persistCurrentState,
  supportsPersistence
} from "./utilities/persistence";
import throttle from "lodash/throttle";

import thunk from "redux-thunk";

const devtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const middlewares = compose(
  applyMiddleware(thunk),
  devtools || (a => a)
);

const store = createStore(appReducer, middlewares);

// persist parts of the store whenever it changes.
if (supportsPersistence()) {
  store.subscribe(
    throttle(() => {
      persistCurrentState(store.getState(), ["bar", "settings", "favourites"]);
    })
  );
}

// Load glasses, ingredients and cocktails (order is important - cocktails
// needs to be loaded last as the views all assume ingredietns and glasses
// will be available to query)

// TODO: This could be a lot nicer - there is another ticket to
// look into using await/async syntax.
fetchGlasses()
  .then(function(glasses) {
    store.dispatch(loadGlasses(glasses));
  })
  .then(fetchIngredients)
  .then(function(ingredients) {
    store.dispatch(loadIngredients(ingredients));
  })
  .then(fetchCocktails)
  .then(function(cocktails) {
    store.dispatch(loadCocktails(cocktails));
  });

export default store;
