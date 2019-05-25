const initialState = {
  db: {
    cocktails: [],
    ingredients: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "LOAD_COCKTAILS":
      return { ...state, db: { ...state.db, cocktails: action.payload } };

    case "LOAD_INGREDIENTS":
      return { ...state, db: { ...state.db, ingredients: action.payload } };

    default:
      return state;
  }
}
