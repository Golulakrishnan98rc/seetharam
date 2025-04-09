import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useProductStore } from "../store/products";
import { useSnackbarStore } from "../store/useSnackbarStore";

const ProductCard = ({ product }) => {
  const { handleFavourites, isFavourited } = useProductStore();
  const isFav = isFavourited(product._id);
  const showSnackbar = useSnackbarStore((state) => state.showSnackbar);

  return (
    <Card
      sx={{
        maxWidth: { lg: "265px", md: "270px", sm: "245px", xs: "170px" },
        transition: "0.3s ease !important",
        ":hover": { transform: "scale(1.02)" },
        position: "relative",
      }}
      variant="plain"
    >
      <Box sx={{ position: "relative" }}>
        <Link to={`/product/${product._id}`}>
          <CardMedia
            component={"img"}
            alt={product.name}
            height={""}
            image={`https://seetharam.onrender.com/images/${product.image}`}
            onClick={window.scrollTo(0, 0)}
          />
        </Link>
        <IconButton
          onClick={() => {
            console.log("Clicked product:", product);
            handleFavourites(product, showSnackbar);
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            cursor: "pointer",
          }}
        >
          {isFav ? (
            <Favorite sx={{ color: "red" }} />
          ) : (
            <FavoriteBorder sx={{ color: "white" }} />
          )}
        </IconButton>
      </Box>
      <CardContent
        sx={{
          paddingRight: "0",
          paddingLeft: "0",
        }}
      >
        <Typography variant="p" sx={{ fontWeight: "500" }}>
          {product.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <Typography variant="p">₹{product.new_price}</Typography>
          <Typography
            variant="p"
            sx={{ color: "gray", textDecoration: "line-through" }}
          >
            ₹{product.old_price}
          </Typography>
        </Box>
        {/* <Button
            variant="outlined"
            sx={{ borderColor: "#d90234", color: "#d90234" }}
            fullWidth
            onClick={() => addToCart(product.id)}
          >
            Add to cart
          </Button> */}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
