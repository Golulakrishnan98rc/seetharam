import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import logo from "../assets/logo.webp";
import whatsapp_icon from "../assets/whatsapp.svg";
import instagram_icon from "../assets/instagram.svg";
import facebook_icon from "../assets/facebook.svg";
import youtube_icon from "../assets/youtube.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Box sx={{ textAlign: "center", padding: "0px 0px 40px" }}>
        <Box
          sx={{
            width: { lg: "350px", sm: "250px", xs: "200px" },
            margin: "auto",
          }}
        >
          <img src={logo} width={"100%"} alt="" />
        </Box>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          sx={{
            margin: "40px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Typography
              variant="p"
              sx={{
                cursor: "pointer",
                color: "#0d0d0d",
                fontSize: { xs: "14px", sm: "16px" },
              }}
              onClick={window.scrollTo(0, 0)}
            >
              Home
            </Typography>
          </Link>
          <Link to={"/silksarees"} style={{ textDecoration: "none" }}>
            <Typography
              variant="p"
              sx={{
                cursor: "pointer",
                color: "#0d0d0d",
                fontSize: { xs: "14px", sm: "16px" },
              }}
              onClick={window.scrollTo(0, 0)}
            >
              Silk Sarees
            </Typography>
          </Link>
          <Link to={"/newarrivals"} style={{ textDecoration: "none" }}>
            <Typography
              variant="p"
              sx={{
                cursor: "pointer",
                color: "#0d0d0d",
                fontSize: { xs: "14px", sm: "16px" },
              }}
              onClick={window.scrollTo(0, 0)}
            >
              New Arrivals
            </Typography>
          </Link>
          <Link to={"/contact"} style={{ textDecoration: "none" }}>
            <Typography
              variant="p"
              sx={{
                cursor: "pointer",
                color: "#0d0d0d",
                fontSize: { xs: "14px", sm: "16px" },
              }}
              onClick={window.scrollTo(0, 0)}
            >
              Contact Us
            </Typography>
          </Link>
        </Stack>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={"https://wa.me/+919841278961"}>
            <img
              src={whatsapp_icon}
              alt=""
              style={{ width: "40px", cursor: "pointer" }}
            />
          </Link>
          <Link to={"https://www.facebook.com/sriseetharam.shopping/"}>
            <img
              src={facebook_icon}
              alt=""
              style={{ width: "40px", cursor: "pointer" }}
            />
          </Link>
          <Link to={"https://www.instagram.com/"}>
            <img
              src={instagram_icon}
              alt=""
              style={{ width: "40px", cursor: "pointer" }}
            />
          </Link>
          <Link to={"https://www.youtube.com/@sriseetharamstorereadymade4203"}>
            <img
              src={youtube_icon}
              alt=""
              style={{ width: "40px", cursor: "pointer" }}
            />
          </Link>
        </Stack>
        <Box
          sx={{
            borderTop: "1px solid #adadad",
            paddingTop: "25px",
            marginTop: "50px",
          }}
        >
          <Typography variant="p">
            Copyright @ 2025 - All right reserved
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Footer;
