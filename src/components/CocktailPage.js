import React from "react";
import { connect } from "react-redux";
import { Paper, Fade, Box, Grid, Typography } from "@material-ui/core";
import { currentCocktailSelector } from "../selectors";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { enrichCocktail } from "../actions";
import CocktailDetail from "./CocktailPage/CocktailDetail";

const styles = theme => {
  //debugger;
  return {
    root: {
      display: "flex",
      alignItems: "stretch",
      height: "100vh"
    },
    cocktailDetail: {
      height: "100vh",
      overflow: "scroll"
    },
    cocktailDetailContent: {
      padding: theme.spacing(3, 5)
    },
    cocktailImage: {
      height: "100%",
      backgroundColor: theme.palette.grey[400],
      backgroundRepeatY: "no-repeat",
      backgroundSize: "cover",
      height: "100vh"
    },
    mobileImage: {
      height: "20vh",
      backgroundPosition: "center"
    }
  };
};

const CocktailPage = ({ cocktail, enrichCocktail, classes }) => {
  if (!cocktail) return <span>Cocktail Not Found</span>;

  enrichCocktail(cocktail);

  const { name, enrichment } = cocktail;
  const image = enrichment && enrichment.image;

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
          </div>
        </Grid>
        <Grid item md={6} xs={0}>
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
