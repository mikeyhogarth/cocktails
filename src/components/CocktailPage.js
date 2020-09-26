import React, { useEffect } from "react";
import useScrollTop from "../hooks/useScrollTop";
import { connect } from "react-redux";
import { Fade, Box, Grid } from "@material-ui/core";
import { currentCocktailSelector } from "../selectors";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { enrichCocktail } from "../actions";
import CocktailDetail from "./CocktailPage/CocktailDetail";
import CocktailVariantList from "./CocktailPage/CocktailVariantList";

const fullHeight = "92vh";

const styles = theme => ({
  cocktailDetail: {
    overflow: "auto",
    [theme.breakpoints.up("sm")]: {
      height: fullHeight
    }
  },
  cocktailDetailContent: {
    padding: theme.spacing(2)
  },
  cocktailImage: {
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.grey[400],
    backgroundRepeatY: "no-repeat",
    backgroundSize: "cover",
    [theme.breakpoints.up("xs")]: {
      height: fullHeight
    }
  },
  mobileImage: {
    height: "20vh",
    backgroundPosition: "center"
  }
});

const CocktailPage = ({ cocktail, enrichCocktail, classes }) => {
  useScrollTop();
  useEffect(() => {
    enrichCocktail(cocktail);
  }, [enrichCocktail, cocktail]);

  const image = cocktail.enrichment && cocktail.enrichment.image;

  return (
    <>
      <Box
        component="div"
        className={classes.mobileImage}
        display={{ xs: "block", md: "none" }}
        style={{ backgroundImage: `url(${image})` }}
      />
      <Grid container className={classes.root}>
        <Grid className={classes.cocktailDetail} item md={6} xs={12}>
          <div className={classes.cocktailDetailContent}>
            <CocktailDetail cocktail={cocktail} />
            <CocktailVariantList cocktail={cocktail} />
          </div>
        </Grid>
        <Grid item md={6} xs={false}>
          <Fade in={!!image}>
            <div
              style={{
                backgroundImage: `url(${image})`
              }}
              className={classes.cocktailImage}
            />
          </Fade>
        </Grid>
      </Grid>
    </>
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
