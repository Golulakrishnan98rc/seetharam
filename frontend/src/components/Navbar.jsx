import {
  Box,
  Stack,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Badge,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import logo from "../assets/logo.webp";
import { useProductStore } from "../store/products.js";

const Navbar = () => {
  const {
    getTotalCartItem,
    fetchCart,
    logout,
    fetchFavourites,
    getTotalFavouriteItem,
  } = useProductStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMediumOrBelow = useMediaQuery(theme.breakpoints.down("md"));
  const totalFavourites =
    useProductStore((state) => state.getTotalFavouriteItem()) || 0;
  const totalCartItems =
    useProductStore((state) => state.getTotalCartItem()) || 0;

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      fetchCart();
      fetchFavourites();
    }
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuLinks = (
    <List sx={{ width: "250px" }}>
      {["Home", "Silk Sarees", "New Arrivals", "Contact"].map((text) => (
        <ListItem
          button
          key={text}
          component={Link}
          to={
            text === "Home" ? "/" : `/${text.toLowerCase().replace(/\s/g, "")}`
          }
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
      <ListItem button component={Link} to={"/loginsignup"}>
        <ListItemText
          primary={localStorage.getItem("auth-token") ? "Logout" : "Login"}
          onClick={() => {
            if (localStorage.getItem("auth-token")) {
              localStorage.removeItem("auth-token");
              logout();
              window.location.replace("/");
            }
          }}
        />
      </ListItem>
      <ListItem>
        <Badge color="warning" badgeContent={totalFavourites} sx={{ mr: 2 }}>
          <Link to={"/favourites"}>
            <FavoriteBorderOutlinedIcon />
          </Link>
        </Badge>
        <Badge color="warning" badgeContent={totalCartItems}>
          <Link to={"/cart"}>
            <ShoppingCartOutlinedIcon style={{ color: "#000" }} />
          </Link>
        </Badge>
      </ListItem>
    </List>
  );

  return (
    <Box
      sx={{
        bgcolor: "white",
        boxShadow: 1,
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 99,
      }}
    >
      <Link to={"/"}>
        <Box
          component="img"
          sx={{ width: { xs: "70%", sm: "220px" } }}
          alt={"Logo"}
          src={logo}
        />
      </Link>

      {isMediumOrBelow ? (
        <>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
          >
            {menuLinks}
          </Drawer>
        </>
      ) : (
        <Stack direction="row" spacing={4} alignItems="center">
          <Link to="/" style={{ textDecoration: "none", color: "#0d0d0d" }}>
            Home
          </Link>
          <Link
            to="/silksarees"
            style={{ textDecoration: "none", color: "#0d0d0d" }}
          >
            Silk Sarees
          </Link>
          <Link
            to="/newarrivals"
            style={{ textDecoration: "none", color: "#0d0d0d" }}
          >
            New Arrivals
          </Link>
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "#0d0d0d" }}
          >
            Contact Us
          </Link>

          {localStorage.getItem("auth-token") ? (
            <IconButton
              component={Link}
              to="/loginsignup"
              onClick={() => {
                localStorage.removeItem("auth-token");
                logout();
                window.location.replace("/");
              }}
            >
              <LogoutIcon />
            </IconButton>
          ) : (
            <IconButton component={Link} to="/loginsignup">
              <LoginIcon />
            </IconButton>
          )}
          <Badge color="warning" badgeContent={totalFavourites}>
            <Link to={"/favourites"}>
              <FavoriteBorderOutlinedIcon />
            </Link>
          </Badge>
          <Badge color="warning" badgeContent={totalCartItems}>
            <Link to="/cart">
              <ShoppingCartOutlinedIcon />
            </Link>
          </Badge>
        </Stack>
      )}
    </Box>
  );
};

export default Navbar;
