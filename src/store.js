import appReducer from "./reducers";
import { createStore } from "redux";
import { fetchCocktails, fetchIngredients } from "./services/cocktail.service";
import { loadCocktails, loadIngredients } from "./actions";

const store = createStore(
  appReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

fetchCocktails().then(function(response) {
  //store.dispatch({ type: "LOAD_COCKTAILS", payload: response });
  store.dispatch(loadCocktails(response));
});

fetchIngredients().then(function(response) {
  //store.dispatch({ type: "LOAD_INGREDIENTS", payload: response });
  store.dispatch(loadIngredients(response));
});

export default store;
