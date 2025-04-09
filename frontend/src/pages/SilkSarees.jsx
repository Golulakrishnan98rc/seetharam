import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Box, Container, Stack } from "@mui/material";
import { useProductStore } from "../store/products";
import Breadcrum from "../components/Breadcrum";

const SilkSarees = () => {
  const { fetchSilkSarees, products } = useProductStore();
  useEffect(() => {
    fetchSilkSarees();
  }, [fetchSilkSarees]);

  return (
    <>
      <Breadcrum title={"Silk Sarees"} />
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

export default SilkSarees;
