import {
  Box,
  Button,
  Container,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const NewsLetter = () => {
  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          padding: "80px 50px 100px",
          marginBottom: "100px",
          bgcolor: "#fdd6df",
        }}
      >
        <Stack direction={"column"} textAlign={"center"}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "22px", sm: "25px", md: "32px", lg: "36px" },
            }}
            color="#d90236"
          >
            Get Exclusive Offers On Your Email
          </Typography>
          <Typography
            variant="body1"
            sx={{ margin: "25px 0", fontSize: { xs: "14px", sm: "18px" } }}
          >
            Subscribe to our newsletter and stay updated
          </Typography>
          <Box>
            <TextField
              size="small"
              sx={{
                "& fieldset": { border: "none" },
                border: "1px solid #d90236",
                borderRadius: "50px",
                marginBottom: "15px",
              }}
              placeholder="Your Mail Id"
            />
            <Button
              variant="contained"
              sx={{ borderRadius: "50px" }}
              size="large"
              color="error"
            >
              Subscribe
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default NewsLetter;
