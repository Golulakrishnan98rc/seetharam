import { Box, Typography, Container } from "@mui/material";
import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Breadcrum from "../components/Breadcrum";
import { useProductStore } from "../store/products";

const Favourites = () => {
  const { fetchFavourites, favourites } = useProductStore();

  useEffect(() => {
    fetchFavourites();
  }, []);

  return (
    <Box>
      <Breadcrum title={"Favourites"} />

      <Container sx={{ padding: "50px 0" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "start" },
            flexWrap: "wrap",
            gap: { lg: "30px", md: "20px", sm: "20px", xs: "15px" },
          }}
        >
          {!favourites || favourites.length === 0 ? (
            <Typography
              sx={{
                margin: "30px auto",
                fontSize: { xs: "20px", sm: "26px", md: "32px", lg: "38px" },
              }}
            >
              No favourites added yet.
            </Typography>
          ) : (
            favourites.map((product) =>
              product ? (
                <ProductCard key={product._id} product={product} />
              ) : null
            )
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Favourites;
