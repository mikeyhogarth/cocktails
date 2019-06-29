import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import { ReactComponent as Martini } from "../images/glasses/Martini.svg";

// Glass SVGs
// Note that currently not all of these are completed, these are just placeholders
// for if someone at some point makes some real SVGs. Note that there are
// a few constraints on the SVG format for material UI's SVG icon;
//
// https://material-ui.com/style/icons/#svg-icons
//
// * SVG elements should be scaled for a 24x24px viewport.
// * The first child should be a 'path' element.
//
import { ReactComponent as OldFashioned } from "../images/glasses/OldFashioned.svg";
import { ReactComponent as Collins } from "../images/glasses/Collins.svg";
import { ReactComponent as Highball } from "../images/glasses/Highball.svg";
import { ReactComponent as ChampagneFlute } from "../images/glasses/ChampagneFlute.svg";
import { ReactComponent as ChampagneTulip } from "../images/glasses/ChampagneTulip.svg";
import { ReactComponent as Margarita } from "../images/glasses/Margarita.svg";
import { ReactComponent as Hurricane } from "../images/glasses/Hurricane.svg";
import { ReactComponent as Shot } from "../images/glasses/Shot.svg";
import { ReactComponent as HotDrink } from "../images/glasses/HotDrink.svg";
import { ReactComponent as WhiteWine } from "../images/glasses/WhiteWine.svg";

const glassSvgLookup = {
  martini: Martini,
  "old-fashioned": OldFashioned,
  collins: Collins,
  highball: Highball,
  "champagne-flute": ChampagneFlute,
  margarita: Margarita,
  "champagne-tulip": ChampagneTulip,
  hurricane: Hurricane,
  shot: Shot,
  "hot-drink": HotDrink,
  "white-wine": WhiteWine
};

const GlassIcon = ({ glass = "martini", ...otherProps }) => {
  const GlassSvg = glassSvgLookup[glass.toString()];

  return (
    <SvgIcon {...otherProps}>
      <GlassSvg />
    </SvgIcon>
  );
};

export default GlassIcon;
