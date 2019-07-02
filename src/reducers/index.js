import produce from "immer";
import { loadPersistedState } from "../utilities/persistence";
import { hasDialog } from "../filterConfig";

import { LOAD_COCKTAILS, LOAD_INGREDIENTS, LOAD_GLASSES, UPDATE_FILTER,
  ACTIVATE_FILTER_DIALOG, CLOSE_FILTER_DIALOG, SET_BAR, UPDATE_FAVOURITES,
  ADD_TO_BAR, UPDATE_SETTINGS, TOGGLE_PRIDE, TOGGLE_LINGO, START_ENRICH_COCKTAIL,
  FAIL_ENRICH_COCKTAIL, FINISH_ENRICH_COCKTAIL } from "../actionTypes";

const defaultState = {
  db: {
    cocktails: [],
    ingredients: [],
    glasses: []
  },
  filterOptions: {
    activeFilters: [],
    activeDialog: null,
    ingredients: [],
    ingredientsRule: "mustInclude",
    barOnly: false,
    categories: [],
    glasses: []
  },
  bar: [],
  favourites: [],
  settings: {
    theme: "light",
    color: "indigo",
    units: "cl",
    pride: false,
    lingo: false
  }
};

// Parts of the initial state will be from our persistence layer.

const persistedState = loadPersistedState();

const initialState = produce({ ...defaultState, ...persistedState }, draft => {
  draft.filterOptions = {
    ...draft.filterOptions,
    ...(persistedState ? persistedState.filterOptions : null)
  };
  draft.settings = {
    ...draft.settings,
    ...(persistedState ? persistedState.settings : null)
  };
});

/**
 * Main reducer
 */
export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_COCKTAILS:
        draft.db.cocktails = action.payload;
        break;
      case LOAD_INGREDIENTS:
        draft.db.ingredients = action.payload;
        break;
      case LOAD_GLASSES:
        draft.db.glasses = action.payload;
        break;
      case UPDATE_FAVOURITES:
        draft.favourites = action.payload;
        break;
      case UPDATE_FILTER:
        draft.filterOptions = { ...draft.filterOptions, ...action.payload };
        break;
      case ACTIVATE_FILTER_DIALOG:
        draft.filterOptions.activeDialog =
          action.payload && hasDialog(action.payload) ? action.payload : null;
        break;
      case CLOSE_FILTER_DIALOG:
        draft.filterOptions.activeDialog = null;
        break;
      case SET_BAR:
        draft.bar = action.payload;
        break;
      case TOGGLE_PRIDE:
        draft.settings.pride = !draft.settings.pride;
        break;
      case TOGGLE_LINGO:
        draft.settings.lingo = !draft.settings.lingo;
        break;
      case UPDATE_SETTINGS:
        draft.settings = { ...draft.settings, ...action.payload };
        break;
      case ADD_TO_BAR:
        draft.bar = new Set([...draft.bar, action.payload]);
        break;
      case START_ENRICH_COCKTAIL:
        draft.db.cocktails.find(
          c => c.name === action.payload
        ).enriching = true;
        break;
      case FAIL_ENRICH_COCKTAIL:
        Object.assign(
          draft.db.cocktails.find(c => c.name === action.payload.cocktailName),
          {
            enriching: false,
            enrichmentFailed: true,
            enrichmentFailedError: action.payload.error.message
          }
        );
        break;
      case FINISH_ENRICH_COCKTAIL:
        Object.assign(
          draft.db.cocktails.find(c => c.name === action.payload.cocktailName),
          {
            enriching: false,
            enriched: true,
            enrichment: action.payload.enrichment
          }
        );
        break;
      default:
    }
  });
