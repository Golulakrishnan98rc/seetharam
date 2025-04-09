import React from "react";
import Breadcrum from "../components/Breadcrum";
import ShopSilkSarees from "../components/ShopSilkSarees";
import ShopNewArrivals from "../components/ShopNewArrivals";
import Hero from "../components/Hero";
import Offers from "../components/Offers";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <ShopSilkSarees />
      <Offers />
      <ShopNewArrivals />
      <NewsLetter />
    </>
  );
};

export default Home;
