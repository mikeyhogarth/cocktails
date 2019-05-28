import appReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { fetchCocktails, fetchIngredients } from "./services/cocktail.service";
import { loadCocktails, loadIngredients } from "./actions";
import thunk from "redux-thunk";

const devtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const middlewares = compose(
  applyMiddleware(thunk),
  devtools || (a => a)
);

const store = createStore(appReducer, middlewares);

fetchCocktails().then(function(response) {
  store.dispatch(loadCocktails(response));
});

fetchIngredients().then(function(response) {
  store.dispatch(loadIngredients(response));
});

export default store;
