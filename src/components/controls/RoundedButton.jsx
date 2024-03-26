import React from "react";
import { Fab } from "@mui/material";
import { styled } from "@mui/system";

export default function MyFab(props) {
  const { label, icon, onClick, x, y } = props;

  return (
    <>
      <StyledFab
        onClick={onClick}
        style={{
          bottom: x,
          right: y,
        }}>
        {icon}
        {label}
      </StyledFab>
    </>
  );
}

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: purple[400],
  color: "#fff",
  "&:hover": {
    backgroundColor: purple[700],
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
