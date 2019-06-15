import React from "react";
import { connect } from "react-redux";
import { Paper, CircularProgress, Grid } from "@material-ui/core";
import { currentCocktailSelector } from "../selectors";
import { withStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { enrichCocktail } from "../actions";
import CocktailDetail from "./CocktailPage/CocktailDetail";
import CocktailVariantList from "./CocktailPage/CocktailVariantList";
import CocktailImage from "./CocktailPage/CocktailImage";

const styles = theme => ({
  paper: {
    padding: "1em"
  },
  root: {
    ...theme.mixins.gutters,
    justifyContent: "center"
  },
  progress: {
    width: "100%"
  }
});

const CocktailPage = ({ cocktail, enrichCocktail, classes, match }) => {
  if (!cocktail) return <span>Cocktail Not Found</span>;

  enrichCocktail(cocktail);

  const { name, enrichment, enriching, enriched } = cocktail;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} square>
        <Grid container className={classes.innerContainer} spacing={10}>
          <Grid item md={8} xs={12}>
            <CocktailDetail cocktail={cocktail} />
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
        <CocktailVariantList cocktail={cocktail} />
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
