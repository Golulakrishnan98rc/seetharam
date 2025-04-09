import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import slider1 from "../assets/slider1.webp";
import slider2 from "../assets/slider2.webp";
import slider3 from "../assets/slider3.webp";
import "../styles/hero.css";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    {
      id: 0,
      slider: slider1,
    },
    {
      id: 1,
      slider: slider2,
    },
    {
      id: 2,
      slider: slider3,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <Box className="hero-section">
      <ArrowCircleLeftIcon onClick={handlePrev} className="arrow left-arrow" />
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.slider}
          className={
            currentSlide === index ? "current-slide" : "current-slide inactive"
          }
        />
      ))}
      <ArrowCircleRightIcon
        onClick={handleNext}
        className="arrow right-arrow"
      />
    </Box>
  );
};

export default Hero;
