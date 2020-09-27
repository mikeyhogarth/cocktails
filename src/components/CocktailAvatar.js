import React from "react";
import { Avatar } from "@material-ui/core";
import GlassIcon from "./GlassIcon";

export const CocktailAvatar = ({ cocktail }) => {
  return (
    <Avatar
      style={
        cocktail.colors && {
          backgroundColor: cocktail.colors[0],
          background: `linear-gradient(${cocktail.colors.join(",")})`
        }
      }
      aria-label="Recipe"
    >
      <GlassIcon glass={cocktail.glass} />
    </Avatar>
  );
};

export default CocktailAvatar;
