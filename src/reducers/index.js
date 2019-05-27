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
    default:
      return state;
  }
}
