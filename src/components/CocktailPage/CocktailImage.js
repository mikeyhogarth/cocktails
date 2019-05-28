import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  image: {
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)",
    padding: ".3em",
    marginRight: "2em"
  }
};

const CocktailImage = ({ name, image, classes }) => (
  <img width="100%" className={classes.image} src={image} alt={{ name }} />
);

export default withStyles(styles)(CocktailImage);
