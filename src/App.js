import React from "react";
import Theme from "./theme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocalBar from "@material-ui/icons/LocalBar";
import CocktailList from "./components/CocktailList";
import CocktailFilter from "./components/CocktailFilter";
import cocktails from "./data/cocktails.json";
import ingredients from "./data/ingredients.json";
import useFilter from "./hooks/useFilter";

function App() {
  //const [selectedIngredients, setIngredients] = useState([]);
  //const [conjunction, setConjunction] = useState("and");
  const [filter, setFilter] = useFilter({});

  return (
    <Theme>
      <AppBar position="static">
        <Toolbar>
          <LocalBar />
          <Typography color="inherit">Cocktails</Typography>
        </Toolbar>
      </AppBar>

      <CocktailFilter
        allIngredients={ingredients}
        filter={filter}
        setFilter={setFilter}
      />

      <CocktailList
        filter={filter}
        cocktails={cocktails.sort((a, b) => (a.name > b.name ? 1 : -1))}
      />
    </Theme>
  );
}

export default App;
