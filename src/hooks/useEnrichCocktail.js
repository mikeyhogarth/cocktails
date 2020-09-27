import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enrichCocktail } from "../actions";

// Hook for getting cocktail enrichment details
function useEnrichCocktail(cocktail) {
  const dispatch = useDispatch();

  useEffect(() => {
    cocktail && dispatch(enrichCocktail(cocktail));
  }, [dispatch, cocktail]);
}

export default useEnrichCocktail;
