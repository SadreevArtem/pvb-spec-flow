import { Typography, TypographyProps } from "@mui/material";
import React from "react";

export type Props = { component?: string; children: string } & TypographyProps;

export const Text: React.FC<Props> = ({ children, className, ...props }) => {

  return (
    <Typography {...props} className={className}>
      {(children)}
    </Typography>
  );
};
