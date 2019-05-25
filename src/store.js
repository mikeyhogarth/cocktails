import appReducer from "./reducers";
import { createStore } from "redux";
import { fetchCocktails, fetchIngredients } from "./services/cocktail.service";

const store = createStore(
  appReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

fetchCocktails().then(function(response) {
  store.dispatch({ type: "LOAD_COCKTAILS", payload: response });
});

fetchIngredients().then(function(response) {
  store.dispatch({ type: "LOAD_INGREDIENTS", payload: response });
});

export default store;
