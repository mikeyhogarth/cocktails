import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import LocalBar from "@material-ui/icons/LocalBar";

import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";
import Ingredient from "./IngredientDetail";

const styles = {
  card: {
    width: "20em",
    margin: ".5em"
  },
  title: {
    fontSize: 16
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
  return (
    <Card className={classes.card}>
      <CardHeader title={cocktail.name} subheader={cocktail.category}>
        <Typography className={classes.title} gutterBottom>
          {cocktail.name}
        </Typography>
      </CardHeader>
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
            {cocktail.glass}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(CocktailItem);
