import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
// import silk_sarees from "../assets/silk_saress_1.webp";
import StarIcon from "@mui/icons-material/Star";
import { useProductStore } from "../store/products";
import { useSnackbarStore } from "../store/useSnackbarStore";

const ProductDisplay = ({ product }) => {
  const { addToCart, handleFavourites, isFavourited } = useProductStore();
  const isFav = isFavourited(product._id);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  return (
    <Container
      sx={{
        padding: {
          xs: "70px 30px",
          sm: "90px 30px",
          md: "90px 30px",
          lg: "90px 0px",
        },
      }}
    >
      <Stack direction={{ md: "row", sm: "column" }} spacing={{ md: 4, lg: 8 }}>
        <Box>
          <Box
            component="img"
            sx={{ width: { xs: "100%", sm: "450px" } }}
            alt={product?.name}
            src={`https://seetharam.onrender.com/images/${product.image}`}
          />
        </Box>
        <Box sx={{ sm: { marginTop: "30px" } }}>
          <Typography
            variant="body2"
            sx={{
              textTransform: "uppercase",
              fontSize: "18px",
            }}
          >
            {product?.category}
          </Typography>
          <Typography variant="h4" sx={{ margin: "10px 0" }}>
            {product?.name}
          </Typography>
          <Stack
            direction={"row"}
            spacing={0}
            sx={{
              borderBottom: "1px solid #ccc",
              paddingBottom: "20px",
              marginBottom: "20px",
            }}
          >
            <StarIcon sx={{ color: "#db0136" }} />
            <StarIcon sx={{ color: "#db0136" }} />
            <StarIcon sx={{ color: "#db0136" }} />
            <StarIcon sx={{ color: "#db0136" }} />
            <StarIcon sx={{ color: "#db0136" }} />
          </Stack>
          <Stack direction={"row"} spacing={1} alignItems={"baseline"}>
            <Typography variant="h5">₹{product?.new_price}</Typography>
            <Typography
              variant="body1"
              sx={{ textDecoration: "line-through", color: "gray" }}
            >
              ₹{product?.old_price}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color="grey"
            sx={{ marginBottom: "10px" }}
          >
            Inclusive of all Taxes
          </Typography>

          <Typography
            variant="body1"
            sx={{
              borderTop: "1px solid #ccc",
              paddingTop: "20px",
              margin: "20px 0 20px",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit,
            nihil suscipit aliquid porro necessitatibus beatae minima culpa!
            Magnam omnis ratione labore laborum maiores quibusdam adipisci.
          </Typography>

          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "500", fontSize: "18px", marginBottom: "10px" }}
            >
              Product details
            </Typography>
            <Stack direction={"row"} spacing={3} sx={{ marginBottom: "5px" }}>
              <Typography variant="body1">Saree Fabric</Typography>
              <Typography variant="body1" color="gray">
                Silk
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{ marginBottom: "5px" }}>
              <Typography variant="body1">Saree Length</Typography>
              <Typography variant="body1" color="gray">
                Saree- 5.5 || Blouse Piece Length: 0.8 Mtr
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{ marginBottom: "5px" }}>
              <Typography variant="body1">Occasion type</Typography>
              <Typography variant="body1" color="gray">
                Festival, Wedding, Party, Ceremony
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={3} sx={{ marginBottom: "25px" }}>
              <Typography variant="body1">Package Contains</Typography>
              <Typography variant="body1" color="gray">
                1 Saree with 1 unstitched Blouse Piece
              </Typography>
            </Stack>
          </Box>

          <Stack direction={"row"} spacing={4}>
            <Box
              sx={{
                border: "1px solid #0d0d0d",
                borderRadius: "50px",
                cursor: "pointer",
                width: "100%",
                textAlign: "center",
                padding: { lg: "10px 35px", md: "10px 8px", xs: "10px 20px" },
              }}
              onClick={() => addToCart(product._id, showSnackbar)}
            >
              Add to cart
            </Box>
            <Box
              onClick={() => handleFavourites(product, showSnackbar)}
              sx={{
                border: "1px solid #0d0d0d",
                borderRadius: "50px",
                cursor: "pointer",
                width: "100%",
                textAlign: "center",
                padding: { lg: "10px 35px", md: "10px 8px", xs: "10px 20px" },
              }}
            >
              Add to favourites
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ProductDisplay;
