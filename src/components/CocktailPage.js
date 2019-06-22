import React from "react";
import useScrollTop from "../hooks/useScrollTop";
import { connect } from "react-redux";
import { Fade, Box, Grid, Divider } from "@material-ui/core";
import { currentCocktailSelector } from "../selectors";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { enrichCocktail } from "../actions";
import CocktailDetail from "./CocktailPage/CocktailDetail";
import CocktailVariantList from "./CocktailPage/CocktailVariantList";

const styles = theme => ({
  root: {
    height: "50vh"
  },
  divider: {
    margin: theme.spacing(3, 5)
  },
  cocktailDetail: {
    overflow: "auto",
    height: "90vh"
  },
  cocktailDetailContent: {
    padding: theme.spacing(3, 5)
  },
  cocktailImage: {
    ...theme.mixins.toolbar,
    backgroundColor: theme.palette.grey[400],
    backgroundRepeatY: "no-repeat",
    backgroundSize: "cover",
    height: "90vh"
  },
  mobileImage: {
    height: "20vh",
    backgroundPosition: "center"
  }
});

const CocktailPage = ({ cocktail, enrichCocktail, classes }) => {
  useScrollTop();

  if (!cocktail) return <span>Cocktail Not Found</span>;

  enrichCocktail(cocktail);
  const image = cocktail.enrichment && cocktail.enrichment.image;

  return (
    <>
      <Box
        component="div"
        className={classes.mobileImage}
        display={{ xs: "block", sm: "none" }}
        style={{ backgroundImage: `url(${image})` }}
      />
      <Grid container className={classes.root}>
        <Grid className={classes.cocktailDetail} item md={6} xs={12}>
          <div className={classes.cocktailDetailContent}>
            <CocktailDetail cocktail={cocktail} />
            <Divider className={classes.divider} />
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
