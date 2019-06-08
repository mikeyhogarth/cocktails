import appReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { fetchCocktails, fetchIngredients } from "./services/cocktail.service";
import { loadCocktails, loadIngredients } from "./actions";
import { persistStore } from "./utilities/persistence";
import thunk from "redux-thunk";

const devtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const middlewares = compose(
  applyMiddleware(thunk),
  devtools || (a => a)
);

const store = createStore(appReducer, middlewares);

// persist parts of the store whenever it changes.
persistStore(store, ["bar", "settings"]);

fetchCocktails().then(function(response) {
  store.dispatch(loadCocktails(response));
});

fetchIngredients().then(function(response) {
  store.dispatch(loadIngredients(response));
});

export default store;
