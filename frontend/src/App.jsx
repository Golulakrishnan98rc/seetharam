import React from "react";
import Navbar from "./components/Navbar";
import AddProduct from "./admin/AddProduct/AddProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SilkSarees from "./pages/SilkSarees";
import NewArrivals from "./pages/NewArrivals";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import LoginSignUp from "./pages/LoginSignUp";
import Product from "./pages/Product";
import Favourites from "./pages/Favourites";
import { Snackbar, Alert } from "@mui/material";
import { useSnackbarStore } from "./store/useSnackbarStore";

const App = () => {
  const { open, message, severity, closeSnackbar } = useSnackbarStore();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/silksarees" element={<SilkSarees />} />
        <Route path="/newarrivals" element={<NewArrivals />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/loginsignup" element={<LoginSignUp />} />
        <Route path="/admin" element={<AddProduct />} />
      </Routes>
      <Footer />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeSnackbar} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </BrowserRouter>
  );
};

export default App;
