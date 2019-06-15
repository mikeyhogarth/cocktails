import React from "react";
import { Typography, GridList } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CocktailVariant from "./CocktailVariant";

const styles = theme => ({
  gridList: {
    justifyContent: "center"
  }
});

const CocktailPage = ({ cocktail, classes }) => {
  const { enrichment, enriched } = cocktail;

  if (!enriched || !enrichment.variants || !enrichment.variants.length)
    return null;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Variants
      </Typography>

      <GridList className={classes.gridList}>
        {enrichment.variants.map(variant => {
          return <CocktailVariant key={variant.name} cocktail={variant} />;
        })}
      </GridList>
    </>
  );
};

export default withStyles(styles)(CocktailPage);
