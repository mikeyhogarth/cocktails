import produce from "immer";
import { loadPersistedState } from "../utilities/persistence";
import { hasDialog } from "../filterConfig";

import * as actionTypes from "../actionTypes";

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
    browserMode: "card",
    units: "cl",
    pride: false,
    lingo: false
  }
};

// Parts of the initial state will be from our persistence layer.

const persistedState = loadPersistedState();

const initialState = produce({ ...defaultState, ...persistedState }, draft => {
  draft.settings = {
    ...defaultState.settings,
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
      case actionTypes.LOAD_COCKTAILS:
        draft.db.cocktails = action.payload;
        break;
      case actionTypes.LOAD_INGREDIENTS:
        draft.db.ingredients = action.payload;
        break;
      case actionTypes.LOAD_GLASSES:
        draft.db.glasses = action.payload;
        break;
      case actionTypes.UPDATE_FAVOURITES:
        draft.favourites = action.payload;
        break;
      case actionTypes.UPDATE_FILTER:
        draft.filterOptions = { ...draft.filterOptions, ...action.payload };
        break;
      case actionTypes.ACTIVATE_FILTER_DIALOG:
        draft.filterOptions.activeDialog =
          action.payload && hasDialog(action.payload) ? action.payload : null;
        break;
      case actionTypes.CLOSE_FILTER_DIALOG:
        draft.filterOptions.activeDialog = null;
        break;
      case actionTypes.SET_BAR:
        draft.bar = action.payload;
        break;
      case actionTypes.TOGGLE_PRIDE:
        draft.settings.pride = !draft.settings.pride;
        break;
      case actionTypes.TOGGLE_LINGO:
        draft.settings.lingo = !draft.settings.lingo;
        break;
      case actionTypes.UPDATE_SETTINGS:
        draft.settings = { ...draft.settings, ...action.payload };
        break;
      case actionTypes.ADD_TO_BAR:
        draft.bar = [...new Set([...draft.bar, action.payload])];
        break;
      case actionTypes.START_ENRICH_COCKTAIL:
        draft.db.cocktails.find(
          c => c.name === action.payload
        ).enriching = true;
        break;
      case actionTypes.FAIL_ENRICH_COCKTAIL:
        Object.assign(
          draft.db.cocktails.find(c => c.name === action.payload.cocktailName),
          {
            enriching: false,
            enrichmentFailed: true,
            enrichmentFailedError: action.payload.error.message
          }
        );
        break;
      case actionTypes.FINISH_ENRICH_COCKTAIL:
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
