import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useProductStore } from "../store/products";
import ProductCard from "../components/ProductCard";
import Breadcrum from "../components/Breadcrum";

const NewArrivals = () => {
  const { fetchNewArrivals, products } = useProductStore();

  useEffect(() => {
    fetchNewArrivals();
  }, [fetchNewArrivals]);

  return (
    <>
      <Breadcrum title={"New Arrivals"} />
      <Container sx={{ padding: "50px 0" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center" },
            flexWrap: "wrap",
            gap: { lg: "30px", md: "20px", sm: "20px", xs: "10px" },
          }}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default NewArrivals;
