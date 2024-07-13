import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  color: theme.palette.mode === "dark" ? purple[300] : purple[700],
  padding: "16px",
  borderRadius: "8px",
  boxShadow: `0px 2px 4px ${
    theme.palette.mode === "dark" ? purple[900] : purple[200]
  }`,
  fontFamily: "inherit",
  fontSize: "3.5rem",
  fontWeight: "bold",
  textAlign: "center",
  minWidth: "100px",
  minHeight: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const MyBox = ({ text, defaultText = "0" }) => {
  const displayText = text || defaultText;

  return <StyledBox>{displayText}</StyledBox>;
};

export default MyBox;

// Definición de colores púrpura
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
