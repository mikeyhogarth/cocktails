import React from "react";
import { Typography, List, Divider, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CocktailVariant from "./CocktailVariant";

const styles = theme => ({});

const CocktailVariantList = ({ cocktail, classes }) => {
  const { enrichment, enriched } = cocktail;

  if (!enriched || !enrichment.variants || !enrichment.variants.length)
    return null;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Variants
      </Typography>

      <Paper>
        <List className={classes.list}>
          {enrichment.variants.map((variant, idx) => {
            return (
              <>
                <CocktailVariant cocktail={variant} key={variant.name} />
                {idx !== enrichment.variants.length - 1 && <Divider />}
              </>
            );
          })}
        </List>
      </Paper>
    </>
  );
};

export default withStyles(styles)(CocktailVariantList);
