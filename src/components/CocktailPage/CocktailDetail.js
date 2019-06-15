import React from "react";
import { Typography } from "@material-ui/core";
import IngredientDetail from "../IngredientDetail";
import Definition from "./Definition";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  definitions: {
    marginTop: "1em"
  }
});

const CocktailPage = ({ cocktail, classes }) => {
  const {
    name,
    ingredients,
    preparation,
    category,
    glass,
    garnish,
    enrichment,
    enriched
  } = cocktail;

  return (
    <>
      <Typography variant="h3" gutterBottom>
        {name}
      </Typography>
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
      <Typography className={classes.definitions} component="dl" gutterBottom>
        <>
          <Definition title="Category" description={category} />
          <Definition title="Glass" description={glass} />
          <Definition title="Preparation" description={preparation} />
          <Definition title="Garnish" description={garnish} />
          {enriched && enrichment.ibaCategory && (
            <Definition
              title="IBA Category"
              description={enrichment.ibaCategory}
            />
          )}
        </>
      </Typography>
    </>
  );
};

export default withStyles(styles)(CocktailPage);
