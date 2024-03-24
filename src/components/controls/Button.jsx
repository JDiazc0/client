import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export default function MyButton(props) {
  const { type, text, variant, size, onClick } = props;

  return (
    <StyledButton
      type={type}
      variant={variant}
      sx={{ width: size }}
      onClick={onClick}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled(Button)(({ theme, variant }) => ({
  width: 400,
  margin: theme.spacing(1),
  backgroundColor: variant === "contained" ? purple[400] : "transparent",
  color: variant === "contained" ? "#fff" : purple[700],
  border: variant === "outlined" ? `1px solid ${purple[900]}` : "none",
  "&:hover": {
    backgroundColor:
      variant === "contained"
        ? purple[700]
        : variant === "outlined"
        ? purple[100]
        : "transparent",
    color: variant === "contained" ? "#fff" : purple[900],
  },
}));

const purple = {
  100: "#F5E5FF",
  200: "#E8CCFF",
  300: "#DBB2FF",
  400: "#CE99FF",
  500: "#C17FFF",
  600: "#B466FF",
  700: "#A74CFF",
  800: "#9A33FF",
  900: "#8D19FF",
};
