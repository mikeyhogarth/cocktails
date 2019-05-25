const initialState = {
  db: {
    cocktails: [],
    ingredients: []
  },
  filter: {
    ingredients: [],
    rule: "mustInclude",
    barOnly: false
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
        filter: {
          ...state.filter,
          ...action.payload
        }
      };
    case "SET_BAR":
      return { ...state, bar: action.payload };
    default:
      return state;
  }
}
