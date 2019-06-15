import React from "react";
import { connect } from "react-redux";
import {
  Typography,
  Paper,
  CircularProgress,
  GridList,
  Grid
} from "@material-ui/core";
import IngredientDetail from "./IngredientDetail";
import Definition from "./CocktailPage/Definition";
import { currentCocktailSelector } from "../selectors";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { enrichCocktail } from "../actions";
import CocktailVariant from "./CocktailPage/CocktailVariant";
import CocktailImage from "./CocktailPage/CocktailImage";
const styles = theme => ({
  paper: {
    padding: "1em"
  },
  root: {
    ...theme.mixins.gutters,
    justifyContent: "center"
  },
  gridList: {
    justifyContent: "center"
  },
  definitions: {
    marginTop: "1em"
  },
  progress: {
    width: "100%"
  }
});

const CocktailPage = ({ cocktail, enrichCocktail, classes, match }) => {
  if (!cocktail) return null;

  const { enriched, enriching, enrichmentFailed } = cocktail;

  if (!enriching && !enriched && !enrichmentFailed) enrichCocktail(cocktail);

  const {
    name,
    ingredients,
    preparation,
    category,
    glass,
    garnish,
    enrichment
  } = cocktail;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} square>
        <Grid container className={classes.innerContainer} spacing={10}>
          <Grid item md={8} xs={12}>
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
            <Typography
              className={classes.definitions}
              component="dl"
              gutterBottom
            >
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
          </Grid>
          <Grid item md={4} xs={12}>
            <div style={{ textAlign: "center" }}>
              {enriching && (
                <CircularProgress size="50%" className={classes.progress} />
              )}
              {enriched && enrichment.image && (
                <div style={{ marginRight: "1em" }}>
                  <CocktailImage image={enrichment.image} name={name} />
                </div>
              )}
            </div>
          </Grid>
        </Grid>
        <br />

        {enriched && enrichment.variants && enrichment.variants.length > 0 && (
          <>
            <Typography variant="h4" gutterBottom>
              Variants
            </Typography>

            <GridList className={classes.gridList}>
              {enrichment.variants.map(variant => {
                return (
                  <CocktailVariant key={variant.name} cocktail={variant} />
                );
              })}
            </GridList>
          </>
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  cocktail: currentCocktailSelector(state, ownProps)
});

const mapDispatchToProps = dispatch => ({
  enrichCocktail: bindActionCreators(enrichCocktail, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CocktailPage));
