import React from "react";
import { removeOrAddItemFromArray } from "../utilities/util";
import { updateFavourites } from "../actions";
import { connect } from "react-redux";
import { isFavouriteSelector } from "../selectors";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  Button,
  Typography,
  Avatar
} from "@material-ui/core";
import CocktailIcon from "@material-ui/icons/LocalBar";
import UnFavouriteIcon from "@material-ui/icons/Favorite";
import FavouriteIcon from "@material-ui/icons/FavoriteBorder";
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

  cardContent: {},
  button: {
    padding: theme.spacing(0.5, 1)
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

const CocktailItem = ({
  cocktail,
  classes,
  favourite,
  favourites,
  updateFavourites
}) => (
  <Card className={classes.card}>
    <CardActionArea
      className={classes.cardMain}
      component={Link}
      to={`/cocktails/${cocktail.slug}`}
    >
      <CardHeader
        title={<h1 className={classes.title}>{cocktail.name}</h1>}
        avatar={
          <Avatar
            style={{
              backgroundColor: cocktail.colors[0],
              background: `linear-gradient(${cocktail.colors.join(",")})`
            }}
            aria-label="Recipe"
            className={classes.avatar}
          >
            <CocktailIcon />
          </Avatar>
        }
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
            <CocktailIcon fontSize="inherit" />
            &nbsp;
            {cocktail.glass}
          </Typography>
        )}
        {cocktail.garnish && (
          <Typography component="p" color="textSecondary">
            <Redo fontSize="inherit" />
            &nbsp;
            {cocktail.garnish}
          </Typography>
        )}

        <Typography component="p" color="textSecondary">
          <VeganIcon fontSize="inherit" />
          &nbsp;
          {cocktail.vegan ? "Vegan" : "Non-vegan"}
        </Typography>
      </CardContent>
    </CardActionArea>

    <CardActions className={classes.actions}>
      <Button
        className={classes.button}
        size="large"
        color="secondary"
        onClick={() => {
          updateFavourites(removeOrAddItemFromArray(cocktail.slug, favourites));
        }}
      >
        {favourite ? <UnFavouriteIcon /> : <FavouriteIcon />}
        Favourite
      </Button>

      <Button
        component={Link}
        to={`/cocktails/${cocktail.slug}`}
        className={classes.button}
        size="large"
        color="secondary"
      >
        Learn More
      </Button>
    </CardActions>
  </Card>
);

const mapStateToProps = (state, ownProps) => ({
  favourite: isFavouriteSelector(state, ownProps),
  favourites: state.favourites
});

const mapDispatchToProps = dispatch => ({
  updateFavourites: bindActionCreators(updateFavourites, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CocktailItem));
