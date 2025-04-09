import React from "react";
import Breadcrum from "../components/Breadcrum";
import { Container, Box, Stack } from "@mui/material";
import ContactCard from "../components/ContactCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const Contact = () => {
  const contactDetails = [
    {
      id: 1,
      icon: <LocationOnIcon />,
      title: "Address",
      description:
        "191/1, Main Road, Nagudi, Aranthangi(Tk.), Pudukkottai - 614616",
    },
    {
      id: 2,
      icon: <CallIcon />,
      title: "Phone Number",
      description: "+91 9841278961",
    },
    {
      id: 3,
      icon: <EmailIcon />,
      title: "Email Id",
      description: "sriseetharam.nagudi@gmail.com",
    },
  ];

  return (
    <>
      <Breadcrum title={"Contact Us"} />
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
        <Stack
          direction={{ md: "row" }}
          spacing={4}
          sx={{ paddingBottom: "50px" }}
        >
          {contactDetails.map((detail) => (
            <ContactCard
              key={detail.id}
              icon={detail.icon}
              title={detail.title}
              description={detail.description}
            />
          ))}
        </Stack>
        <Box>
          <iframe
            width={"100%"}
            height={"400px"}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.3541201393887!2d79.1094509!3d10.151843200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0015d79ddb89d7%3A0xfd22dda5fc875e81!2z4K644K-N4K6w4K-AIOCumuCvgOCupOCuvuCusOCuvuCuruCvjSDgrrjgr43grp_gr4vgrrDgr43grrjgr40gJiDgrrDgr4bgrp_grr_grq7gr4fgrp_gr43grrjgr40gLSDgrqjgrr7grpXgr4Hgrp_grr8!5e0!3m2!1sen!2sin!4v1744025183151!5m2!1sen!2sin"
          ></iframe>
        </Box>
      </Container>
    </>
  );
};

export default Contact;
