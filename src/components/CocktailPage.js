import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Definition from "./CocktailPage/Definition";
import IngredientDetail from "./IngredientDetail";
import { bindActionCreators } from "redux";
import { enrichCocktail } from "../actions";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import CocktailVariant from "./CocktailPage/CocktailVariant";
import CocktailImage from "./CocktailPage/CocktailImage";
const styles = theme => ({
  paper: {
    margin: 0,
    padding: "1em 2em",
    marginBottom: "1em"
  },
  root: {
    ...theme.mixins.gutters,
    justifyContent: "center"
  },
  definitions: {
    marginTop: "1.5em"
  }
});

const CocktailPage = ({ allCocktails, enrichCocktail, classes, match }) => {
  const cocktail = allCocktails.find(c => c.slug === match.params.slug);
  if (!cocktail) return null;

  if (!cocktail.enriching && !cocktail.enriched) enrichCocktail(cocktail.name);

  const {
    name,
    ingredients,
    preparation,
    category,
    glass,
    garnish,
    enriched,
    enrichment
  } = cocktail;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} square>
        <Grid container className={classes.root}>
          <Grid item md={8} xs={12}>
            <Typography variant="h2" color="inherit" gutterBottom>
              {name}
            </Typography>
            <Typography component="ul" color="inherit" gutterBottom>
              <>
                {ingredients.map(ingredient => {
                  return (
                    <li>
                      <IngredientDetail item={ingredient} />
                    </li>
                  );
                })}
              </>
            </Typography>
            <Typography
              className={classes.definitions}
              component="dl"
              color="inherit"
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
            {enriched && enrichment.image && (
              <div style={{ marginRight: "1em" }}>
                <CocktailImage image={enrichment.image} name={name} />
              </div>
            )}
          </Grid>
        </Grid>
        <br />
        {enriched && enrichment.variants && (
          <GridList className={classes.gridList}>
            {enrichment.variants.map(variant => {
              return <CocktailVariant key={variant.name} cocktail={variant} />;
            })}
          </GridList>
        )}
      </Paper>
    </div>
  );
};

const mapStateToProps = state => ({
  allCocktails: state.db.cocktails,
  allIngredients: state.db.ingredients
});

const mapDispatchToProps = dispatch => ({
  enrichCocktail: bindActionCreators(enrichCocktail, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CocktailPage));
