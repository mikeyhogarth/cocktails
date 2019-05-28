import uniq from "lodash/uniq";

const initialState = {
  db: {
    cocktails: [],
    ingredients: []
  },
  filterOptions: {
    ingredients: [],
    ingredientsRule: "mustInclude",
    barOnly: false,
    categories: [],
    glasses: []
  },
  bar: []
};

export default function(state = initialState, action) {
  let cocktailDb;

  switch (action.type) {
    case "LOAD_COCKTAILS":
      return { ...state, db: { ...state.db, cocktails: action.payload } };

    case "LOAD_INGREDIENTS":
      return { ...state, db: { ...state.db, ingredients: action.payload } };

    case "UPDATE_FILTER":
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          ...action.payload
        }
      };
    case "SET_BAR":
      return { ...state, bar: [...action.payload] };
    case "ADD_TO_BAR":
      return { ...state, bar: uniq([...state.bar, action.payload]) };
    case "START_ENRICH_COCKTAIL":
      cocktailDb = state.db.cocktails.map(cocktail => {
        if (cocktail.name === action.payload) {
          cocktail.enriching = true;
          return { ...cocktail };
        }
        return cocktail;
      });
      return { ...state, db: { ...state.db, cocktails: cocktailDb } };

    case "FINISH_ENRICH_COCKTAIL":
      cocktailDb = state.db.cocktails.map(cocktail => {
        if (cocktail.name === action.payload.cocktailName) {
          cocktail.enriching = false;
          cocktail.enriched = true;
          cocktail.enrichment = action.payload.enrichment;
          return { ...cocktail };
        }
        return cocktail;
      });
      return { ...state, db: { ...state.db, cocktails: cocktailDb } };
    default:
      return state;
  }
}
