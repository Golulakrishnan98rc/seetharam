import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useProductStore } from "../store/products";
import ProductCard from "../components/ProductCard";

const ShopNewArrivals = () => {
  const { fetchShopNewArrivals, newarrivals } = useProductStore();

  useEffect(() => {
    fetchShopNewArrivals();
  }, [fetchShopNewArrivals]);
  return (
    <>
      <Container sx={{ padding: "90px 0" }}>
        <Box
          sx={{
            paddingBottom: "30px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "20px", sm: "26px", md: "32px", lg: "38px" },
            }}
            className="title-border"
          >
            Shop New Arrivals
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center" },
            flexWrap: "wrap",
            gap: { lg: "30px", md: "20px", sm: "20px", xs: "10px" },
          }}
        >
          {newarrivals.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default ShopNewArrivals;
