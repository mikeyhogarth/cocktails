import React from "react";
import { Typography, Paper } from "@material-ui/core";
import IngredientDetail from "../IngredientDetail";
import Definition from "./Definition";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  definitions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(5)
  },
  cocktailDetailPaper: {
    padding: theme.spacing(2)
  },
  cocktailTitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "4rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "5rem"
    }
  }
});

const CocktailPage = ({ cocktail, classes }) => {
  const {
    name,
    ingredients,
    preparation,
    category,
    glass,
    vegan,
    garnish,
    enrichment,
    enriched
  } = cocktail;

  return (
    <>
      <Typography className={classes.cocktailTitle} variant="h1">
        {name}
      </Typography>

      <div className={classes.definitions}>
        <Definition title="Category" description={category} />
        <Definition title="Glass" description={glass} />
        <Definition title="Garnish" description={garnish} />
        {!vegan && <Definition title="Vegan" description={"Non-vegan"} />}

        {enriched && enrichment.ibaCategory && (
          <Definition
            title="IBA Category"
            description={enrichment.ibaCategory}
          />
        )}
      </div>
      <Paper className={classes.cocktailDetailPaper}>
        <Typography component="ul" gutterBottom>
          <>
            {ingredients.map((ingredient, idx) => {
              return (
                <li key={`ingredient-${idx}`}>
                  <IngredientDetail item={ingredient} />
                </li>
              );
            })}
          </>
        </Typography>
        <br />
        <Typography component="p">{preparation}</Typography>
      </Paper>
    </>
  );
};

export default withStyles(styles)(CocktailPage);
