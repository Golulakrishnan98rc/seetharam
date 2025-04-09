import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/products";

const LoginSignUp = () => {
  const { fetchCart, fetchFavourites } = useProductStore(); // Fetch functions

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      state === "Login"
        ? "https://seetharam.onrender.com/api/users/login"
        : "https://seetharam.onrender.com/api/users/signup";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();

      if (res.ok && responseData.success) {
        await localStorage.setItem("auth-token", responseData.token); // Save auth token
        await useProductStore.getState().fetchCart(); // Fetch cart after login
        await useProductStore.getState().fetchFavourites(); // Fetch favourites after login
        navigate("/"); // Redirect to homepage
      } else {
        alert(responseData.error || `${state} Failed`);
      }
    } catch (error) {
      console.log(`${state} error`, error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Container sx={{ padding: "90px 0" }}>
      <Card sx={{ maxWidth: "550px", padding: "30px", margin: "0 auto" }}>
        <Box
          component={"form"}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" fontWeight={"500"}>
            {state}
          </Typography>

          {state === "Sign Up" && (
            <FormControl>
              <FormLabel htmlFor="name">User Name</FormLabel>
              <TextField
                name="name"
                type="text"
                id="name"
                placeholder="Your Username"
                variant="outlined"
                required
                fullWidth
                onChange={changeHandler}
              />
            </FormControl>
          )}

          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              name="email"
              type="email"
              id="email"
              placeholder="Your Email"
              variant="outlined"
              required
              fullWidth
              onChange={changeHandler}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              name="password"
              type="password"
              id="password"
              placeholder="Your Password"
              variant="outlined"
              required
              fullWidth
              onChange={changeHandler}
            />
          </FormControl>

          <Button
            variant="contained"
            color="error"
            size="large"
            fullWidth
            type="submit"
          >
            Submit
          </Button>

          {state === "Sign Up" ? (
            <Box>
              <Typography variant="caption" sx={{ fontSize: "16px" }}>
                Already have an account?{" "}
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: "16px", cursor: "pointer" }}
                color="error"
                onClick={() => setState("Login")}
              >
                Login
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="caption" sx={{ fontSize: "16px" }}>
                Create an account?{" "}
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: "16px", cursor: "pointer" }}
                color="error"
                onClick={() => setState("Sign Up")}
              >
                Click here
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
    </Container>
  );
};

export default LoginSignUp;
