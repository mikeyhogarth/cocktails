import React from "react";
import { removeOrAddItemFromArray } from "../utilities/util";
import { updateFavourites } from "../actions";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import ReadMoreIcon from "@material-ui/icons/MenuBook";
import UnFavouriteIcon from "@material-ui/icons/Favorite";
import FavouriteIcon from "@material-ui/icons/FavoriteBorder";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";

const styles = theme => ({
  button: {
    padding: theme.spacing(0.5, 1)
  }
});

const CocktailActions = ({
  updateFavourites,
  classes,
  cocktail,
  favourites
}) => {
  return (
    <>
      <Button
        className={classes.button}
        size="large"
        color="secondary"
        onClick={() => {
          updateFavourites(removeOrAddItemFromArray(cocktail.slug, favourites));
        }}
      >
        {favourites.includes(cocktail.slug) ? (
          <UnFavouriteIcon />
        ) : (
          <FavouriteIcon />
        )}
        Favourite
      </Button>
      <Button
        component={Link}
        to={`/cocktails/${cocktail.slug}`}
        className={classes.button}
        size="large"
        color="secondary"
      >
        <ReadMoreIcon /> Learn More
      </Button>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  favourites: state.favourites
});

const mapDispatchToProps = dispatch => ({
  updateFavourites: bindActionCreators(updateFavourites, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CocktailActions));
