import produce from "immer";
import { loadPersistedState } from "../utilities/persistence";
import { hasDialog } from "../filterConfig";
import defaultAliases from "../data/ingredientAliases.json";

import * as actionTypes from "../actionTypes";

// Normalise a bar item: plain strings become {ingredient, source:"manual"}
function migrateBarItem(item) {
  if (typeof item === "string") return { ingredient: item, source: "manual" };
  return item;
}

const defaultState = {
  db: {
    cocktails: [],
    ingredients: [],
    glasses: [],
  },
  filterOptions: {
    activeFilters: [],
    activeDialog: null,
    ingredients: [],
    ingredientsRule: "mustInclude",
    barOnly: false,
    categories: [],
    glasses: [],
  },
  bar: [],
  favourites: [],
  settings: {
    theme: "light",
    color: "indigo",
    browserMode: "card",
    units: "cl",
    pride: false,
    lingo: false,
    robot: {
      url: "",
      token: "",
      ingredientAliases: defaultAliases,
    },
  },
  robot: {
    connected: false,
    robotState: null,
    robotConfig: null,
    activeJobId: null,
    unresolvedLiquids: [],
  },
};

const persistedState = loadPersistedState();

const initialState = produce(
  { ...defaultState, ...persistedState },
  (draft) => {
    // Merge settings deeply so robot sub-object is preserved
    draft.settings = {
      ...defaultState.settings,
      ...draft.settings,
      ...(persistedState ? persistedState.settings : null),
      robot: {
        ...defaultState.settings.robot,
        ...(draft.settings && draft.settings.robot ? draft.settings.robot : {}),
      },
    };

    // Migrate any legacy plain-string bar entries to object shape
    if (Array.isArray(draft.bar)) {
      draft.bar = draft.bar.map(migrateBarItem);
    }

    // Robot slice is never persisted — always starts fresh
    draft.robot = defaultState.robot;
  },
);

/**
 * Main reducer
 */
export default (state = initialState, action) =>
  produce(state, (draft) => {
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
        // Payload is a string[] from IngredientPicker -- convert to objects,
        // but preserve any existing robot-sourced entries
        {
          const robotEntries = draft.bar.filter(
            (item) => item && item.source === "robot",
          );
          const manualEntries = action.payload.map((name) => {
            const existing = draft.bar.find(
              (item) =>
                item && item.source !== "robot" && item.ingredient === name,
            );
            return existing || { ingredient: name, source: "manual" };
          });
          draft.bar = [...manualEntries, ...robotEntries];
        }
        break;
      case actionTypes.ADD_TO_BAR:
        {
          const name =
            typeof action.payload === "string"
              ? action.payload
              : action.payload.ingredient;
          const alreadyInBar = draft.bar.some(
            (item) => item && item.ingredient === name,
          );
          if (!alreadyInBar) {
            draft.bar.push({ ingredient: name, source: "manual" });
          }
        }
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
      case actionTypes.START_ENRICH_COCKTAIL:
        draft.db.cocktails.find((c) => c.name === action.payload).enriching =
          true;
        break;
      case actionTypes.FAIL_ENRICH_COCKTAIL:
        Object.assign(
          draft.db.cocktails.find(
            (c) => c.name === action.payload.cocktailName,
          ),
          {
            enriching: false,
            enrichmentFailed: true,
            enrichmentFailedError: action.payload.error.message,
          },
        );
        break;
      case actionTypes.FINISH_ENRICH_COCKTAIL:
        Object.assign(
          draft.db.cocktails.find(
            (c) => c.name === action.payload.cocktailName,
          ),
          {
            enriching: false,
            enriched: true,
            enrichment: action.payload.enrichment,
          },
        );
        break;

      // Robot slice
      case actionTypes.ROBOT_CONNECTED:
        draft.robot.connected = true;
        break;
      case actionTypes.ROBOT_DISCONNECTED:
        draft.robot.connected = false;
        draft.robot.robotState = null;
        break;
      case actionTypes.ROBOT_STATE_CHANGED:
        draft.robot.robotState = action.payload;
        break;
      case actionTypes.ROBOT_CONFIG_LOADED:
        draft.robot.robotConfig = action.payload;
        break;
      case actionTypes.ROBOT_JOB_UPDATED:
        draft.robot.activeJobId = action.payload;
        break;
      case actionTypes.ROBOT_BAR_SYNCED:
        {
          // Replace all robot-sourced bar entries with the new set
          const nonRobotEntries = draft.bar.filter(
            (item) => !item || item.source !== "robot",
          );
          draft.bar = [...nonRobotEntries, ...action.payload.barEntries];
          draft.robot.unresolvedLiquids = action.payload.unresolvedLiquids;
        }
        break;
      default:
    }
  });
