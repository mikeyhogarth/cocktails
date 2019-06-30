import {
  fetchCocktails,
  fetchIngredients,
  fetchGlasses
} from "../services/cocktail.service";
import { loadCocktails, loadIngredients, loadGlasses } from "../actions";

export async function loadDatabase(store) {
  const glasses = await fetchGlasses();
  store.dispatch(loadGlasses(glasses));

  const ingredients = await fetchIngredients();
  store.dispatch(loadIngredients(ingredients));

  // This should always be the last import as the views will be
  // interrogating the rest of the database when rendering these.
  const cocktails = await fetchCocktails();
  store.dispatch(loadCocktails(cocktails));
}
