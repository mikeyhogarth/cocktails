import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import LocalBar from "@material-ui/icons/LocalBar";
import Redo from "@material-ui/icons/Redo";
import isArray from "lodash/isArray";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";
import Ingredient from "./IngredientDetail";

const styles = {
  circle: {
    width: ".8em",
    height: ".8em",
    display: "inline-block",
    float: "right"
  },
  card: {
    width: "20em",
    margin: ".5em"
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
  },
  glass: {}
};

const CocktailItem = ({ cocktail, classes }) => {
  const colors = isArray(cocktail.colors) ? cocktail.colors : [cocktail.colors];

  return (
    <Card className={classes.card}>
      <CardHeader
        title={
          <h1 className={classes.title}>
            {cocktail.name}
            {colors.map(color => (
              <i
                key={color}
                className={classes.circle}
                style={{ background: color }}
              />
            ))}
          </h1>
        }
        subheader={
          <span className={classes.subHeader}>{cocktail.category}</span>
        }
      />
      <CardContent>
        <ul>
          {cocktail.ingredients.map((item, idx) => (
            <li key={idx}>
              <Typography className={classes.ingredients}>
                <Ingredient item={item} />
              </Typography>
            </li>
          ))}
        </ul>
        <br />
        <Typography component="p" className={classes.prep}>
          {cocktail.preparation}
        </Typography>
        <br />
        {cocktail.glass && (
          <Typography component="p" color="textSecondary">
            <LocalBar fontSize="inherit" />
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
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(CocktailItem);
