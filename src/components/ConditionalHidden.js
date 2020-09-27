import React from "react";
import Hidden from "@material-ui/core/Hidden";

const ConditionalHidden = ({ hidden, children }) => {
  if (!hidden) return children;
  return <Hidden xsDown>{children}</Hidden>;
};

export default ConditionalHidden;
