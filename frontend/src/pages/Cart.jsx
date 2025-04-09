import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/products";
import {
  Box,
  Button,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Breadcrum from "../components/Breadcrum";

const Cart = () => {
  const {
    fetchProduct,
    fetchCart,
    getTotalCartAmount,
    removeFromCart,
    cartItems,
    products,
  } = useProductStore();

  const [loading, setLoading] = useState(true); // ✅ Track loading state

  useEffect(() => {
    const fetchData = async () => {
      await fetchProduct();
      await fetchCart();
      setLoading(false); // ✅ Mark loading as complete
    };
    fetchData();
  }, []);

  if (loading) {
    return <Typography align="center">Loading cart...</Typography>;
  }

  return (
    <>
      <Breadcrum title={"Cart"} />
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
        <Box>
          <TableContainer sx={{ boxShadow: "1" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(cartItems).length === 0 ||
                products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography>No products in cart</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => {
                    if (cartItems[product._id] > 0) {
                      return (
                        <TableRow key={product._id}>
                          <TableCell sx={{ width: "130px" }}>
                            <img
                              src={`https://seetharam.onrender.com/images/${product.image}`}
                              alt={product.name}
                              width="100%"
                            />
                          </TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>₹{product.new_price}</TableCell>
                          <TableCell>
                            <Stack direction="row">
                              <Box
                                sx={{
                                  border: "1px solid #ccc",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  padding: "5px 15px",
                                }}
                                onClick={() => removeFromCart(product._id)}
                              >
                                -
                              </Box>{" "}
                              <Box
                                sx={{
                                  border: "1px solid #ccc",
                                  borderRadius: "5px",
                                  padding: "5px 15px",
                                }}
                              >
                                {cartItems[product._id]}
                              </Box>{" "}
                              <Box
                                sx={{
                                  border: "1px solid #ccc",
                                  borderRadius: "5px",
                                  cursor: "pointer",
                                  padding: "5px 15px",
                                }}
                                onClick={() =>
                                  useProductStore
                                    .getState()
                                    .addToCart(product._id)
                                }
                              >
                                +
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            ₹{product.new_price * cartItems[product._id]}
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => removeFromCart(product._id)}
                              color="error"
                            >
                              x
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                    return null;
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ paddingTop: "70px", width: { xs: "100%", sm: "50%" } }}>
          <Typography variant="h4" sx={{ marginBottom: "25px" }}>
            Cart Total
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "18px",
            }}
          >
            <Typography>Subtotal</Typography>
            <Typography>₹{getTotalCartAmount()}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "18px",
            }}
          >
            <Typography>Shipping fee</Typography>
            <Typography>Free</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #ccc",
              paddingTop: "25px",
            }}
          >
            <Typography>Total</Typography>
            <Typography>₹{getTotalCartAmount()}</Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Cart;
