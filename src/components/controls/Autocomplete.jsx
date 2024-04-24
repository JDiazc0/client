import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/system";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: purple[500],
  backgroundColor: grey[100],
}));

const GroupItems = styled("ul")({
  padding: 0,
});

export default function MyAutocomplete(props) {
  const { data, field, onChange, label } = props;

  const options = data.map((option) => {
    const firstLetter = option[field][0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      id="grouped-demo"
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option[field]}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={onChange}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
  );
}

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

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
