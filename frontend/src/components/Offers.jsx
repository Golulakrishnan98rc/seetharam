import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import offer_img from "../assets/offers.png";

const Offers = () => {
  return (
    <Container>
      <Box
        sx={{
          bgcolor: "#fdd6df",
          width: "100%",
          padding: { lg: "50px 80px 0", xs: "50px 40px 0" },
        }}
      >
        <Stack
          direction={{ lg: "row", md: "column" }}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              textAlign: { xs: "center", sm: "start" },
              marginBottom: { xs: "30px" },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: "22px", sm: "25px", md: "32px", lg: "36px" },
              }}
              color="#d90236"
            >
              Exclusive offers for you!
            </Typography>
            <Typography
              variant="body1"
              sx={{ margin: "15px 0", fontSize: { xs: "14px", sm: "18px" } }}
            >
              Only on best seller products
            </Typography>
            <Button variant="outlined" color="error" size="large">
              Check Now
            </Button>
          </Box>
          <Box>
            <img src={offer_img} alt="" />
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default Offers;
