import React from "react";
import Hidden from "@material-ui/core/Hidden";

const ConditionalHidden = ({ hideOnXS, children }) => {
  if (!hideOnXS) return children;
  return <Hidden xsDown>{children}</Hidden>;
};

export default ConditionalHidden;
