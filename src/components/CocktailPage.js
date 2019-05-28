import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Definition from "./CocktailPage/Definition";
import IngredientDetail from "./IngredientDetail";
const styles = theme => ({
  paper: {
    marginBottom: "1em",
    padding: "1em 2em"
  },
  root: {
    ...theme.mixins.gutters,
    justifyContent: "center"
  },
  definitions: {
    marginTop: "1.5em"
  }
});

const CocktailPage = ({ allCocktails, allIngredients, classes, match }) => {
  const cocktail = allCocktails.find(c => c.slug === match.params.slug);
  if (!cocktail) return null;

  const { name, ingredients, preparation, category, glass } = cocktail;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography component="p" color="inherit" gutterBottom>
          <Link to="/cocktails">Cocktails</Link> / {name}
        </Typography>
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
          </>
        </Typography>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => ({
  allCocktails: state.db.cocktails,
  allIngredients: state.db.ingredients
});

export default connect(mapStateToProps)(withStyles(styles)(CocktailPage));
