import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const ContactCard = ({ icon, title, description }) => {
  return (
    <Card sx={{ width: { md: "450px" }, marginBottom: "25px" }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Box sx={{ color: "#d90234" }}>{icon}</Box>
        <Typography variant="h6" sx={{ margin: "10px 0" }}>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
