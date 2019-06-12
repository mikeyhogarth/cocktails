import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  image: {
    padding: ".3em",
    marginRight: "2em",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)"
  }
};

const CocktailImage = ({ name, image, classes }) => (
  <img width="100%" className={classes.image} src={image} alt={{ name }} />
);

export default withStyles(styles)(CocktailImage);
