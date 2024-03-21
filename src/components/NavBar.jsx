import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Person3Icon from "@mui/icons-material/Person3";
import CategoryIcon from "@mui/icons-material/Category";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function NavBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const drawerItems = [
    {
      text: "Crear Pedido",
      icon: <AddIcon style={{ color: "#000000" }} />,
      path: "/",
    },
    {
      text: "Pedidos",
      icon: <ShoppingBasketIcon style={{ color: "#000000" }} />,
      path: "/lista-pedidos",
    },
    {
      text: "Clientes",
      icon: <Person3Icon style={{ color: "#000000" }} />,
      path: "/lista-clientes",
    },
    {
      text: "Materia prima",
      icon: <CategoryIcon style={{ color: "#000000" }} />,
      path: "/materias-primas",
    },
    {
      text: "Productos",
      icon: <RestaurantIcon style={{ color: "#000000" }} />,
      path: "/productos",
    },
    {
      text: "Inventario",
      icon: <Inventory2Icon style={{ color: "#000000" }} />,
      path: "/inventario",
    },
    {
      text: "Balance",
      icon: <AccountBalanceIcon style={{ color: "#000000" }} />,
      path: "/balance",
    },
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {open ? (
              theme.direction === "rtl" ? (
                <ChevronRightIcon style={{ color: "#000000" }} />
              ) : (
                <ChevronLeftIcon style={{ color: "#000000" }} />
              )
            ) : (
              <MenuIcon style={{ color: "#000000" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {drawerItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
