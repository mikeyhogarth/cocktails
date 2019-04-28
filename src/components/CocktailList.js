import React from "react";
import CocktailItem from "./CocktailItem";
import GridList from "@material-ui/core/GridList";
import { withStyles } from "@material-ui/core/styles";
import { filterCocktails } from "../utilities/cocktail.utils";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    justifyContent: "center"
  }
});

const CocktailList = ({
  conjunction,
  selectedIngredients,
  classes,
  cocktails = []
}) => {
  let filteredCocktails = filterCocktails(
    cocktails,
    conjunction,
    selectedIngredients
  );

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList}>
        {filteredCocktails.map(cocktail => (
          <CocktailItem key={cocktail.name} cocktail={cocktail} />
        ))}
      </GridList>
    </div>
  );
};

export default withStyles(styles)(CocktailList);
