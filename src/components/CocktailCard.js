import React from "react";
import { updateFavourites } from "../actions";
import { connect } from "react-redux";
import { isFavouriteSelector, allGlassesSelector } from "../selectors";
import CocktailAvatar from "./CocktailAvatar";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  Typography
} from "@material-ui/core";
import CocktailActions from "./CocktailActions";
import GlassIcon from "./GlassIcon";
import VeganIcon from "@material-ui/icons/FilterVintage";

import Redo from "@material-ui/icons/Redo";

import { withStyles } from "@material-ui/core/styles";
import Ingredient from "./IngredientDetail";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";

const styles = theme => ({
  ingredientList: {
    paddingLeft: theme.spacing(2)
  },
  card: {
    width: theme.spacing(40),
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  cardMain: {
    flexGrow: 10
  },
  actions: {
    alignSelf: "flex-end",
    flexGrow: 1
  },
  title: {
    fontSize: 20,
    marginTop: 0,
    marginBottom: 0
  },
  subHeader: {
    fontSize: 14,
    fontStyle: "italic"
  },
  category: {
    fontSize: 12
  },
  prep: {
    fontStyle: "italic"
  }
});

const CocktailCard = ({
  cocktail,
  classes,
  allGlasses,
  favourite,
  favourites,
  updateFavourites
}) => {
  if (!cocktail) return null;

  return (
    <Card className={classes.card}>
      <CardActionArea
        className={classes.cardMain}
        component={Link}
        to={`/cocktails/${cocktail.slug}`}
      >
        <CardHeader
          title={<h1 className={classes.title}>{cocktail.name}</h1>}
          avatar={<CocktailAvatar cocktail={cocktail} />}
          subheader={
            <span className={classes.subHeader}>{cocktail.category}</span>
          }
        />
        <CardContent className={classes.cardContent}>
          <ul className={classes.ingredientList}>
            {cocktail.ingredients.map((item, idx) => (
              <li key={idx}>
                <Typography>
                  <Ingredient item={item} />
                </Typography>
              </li>
            ))}
          </ul>

          <br />

          {!cocktail.iba && (
            <Typography component="p" color="textSecondary">
              Non-IBA
            </Typography>
          )}

          {cocktail.glass && (
            <Typography component="p" color="textSecondary">
              <GlassIcon glass={cocktail.glass} fontSize="inherit" />
              &nbsp;
              {allGlasses[cocktail.glass.toString()].name}
            </Typography>
          )}
          {cocktail.garnish && (
            <Typography component="p" color="textSecondary">
              <Redo fontSize="inherit" />
              &nbsp;
              {cocktail.garnish}
            </Typography>
          )}

          {!cocktail.vegan && (
            <Typography component="p" color="textSecondary">
              <VeganIcon fontSize="inherit" />
              &nbsp; Non-vegan
            </Typography>
          )}
        </CardContent>
      </CardActionArea>

      <CardActions className={classes.actions}>
        <CocktailActions cocktail={cocktail} />
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => ({
  favourite: isFavouriteSelector(state, ownProps),
  favourites: state.favourites,
  allGlasses: allGlassesSelector(state)
});

const mapDispatchToProps = dispatch => ({
  updateFavourites: bindActionCreators(updateFavourites, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CocktailCard));
