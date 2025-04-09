import { Box, Typography } from "@mui/material";
import React from "react";

const Breadcrum = ({ title }) => {
  return (
    <Box
      sx={{
        bgcolor: "#ffedf2",
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "20px", sm: "26px", md: "32px", lg: "38px" },
        }}
      >
        {title ? title : "Breadcrum title"}
      </Typography>
    </Box>
  );
};

export default Breadcrum;
