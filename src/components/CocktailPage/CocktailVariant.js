import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import LocalBar from "@material-ui/icons/LocalBar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  circle: {
    width: ".8em",
    height: ".8em",
    display: "inline-block",
    float: "right"
  },
  card: {
    width: "30%",
    margin: ".5em"
  },
  cardContent: {
    padding: "1em"
  },
  button: {
    padding: "0.5em 1em"
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
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  prep: {
    fontStyle: "italic"
  },
  glass: {}
};

const CocktailVariant = ({
  cocktail: { name, image, category, glass, preparation, ingredients } = {},
  classes
}) => {
  return (
    <Card className={classes.card}>
      <CardHeader
        title={<h1 className={classes.title}>{name}</h1>}
        subheader={<span className={classes.subHeader}>{category}</span>}
      />
      <CardMedia className={classes.media} image={image} title={name} />

      <CardContent className={classes.cardContent}>
        <ul>
          {ingredients &&
            ingredients.map((item, idx) => (
              <li key={idx}>
                <Typography className={classes.ingredients}>{item}</Typography>
              </li>
            ))}
        </ul>
        <br />
        <Typography component="p" className={classes.prep}>
          {preparation}
        </Typography>
        <br />
        {glass && (
          <Typography component="p" color="textSecondary">
            <LocalBar fontSize="inherit" />
            &nbsp;
            {glass}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(CocktailVariant);
