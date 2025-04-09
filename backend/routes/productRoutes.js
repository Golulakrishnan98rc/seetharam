import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

const PORT = process.env.PORT || 5000;

router.get("/allproducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send({ success: true, data: products });
  } catch (error) {
    res.json({ success: false, message: "Error fetching the product" });
  }
});

router.get("/silksarees", async (req, res) => {
  try {
    const products = await Product.find({ category: "silk_sarees" });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.json({ success: false, message: error });
  }
});

router.get("/newarrivals", async (req, res) => {
  try {
    const products = await Product.find({ category: "new_arrivals" });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.json({ success: false, message: error });
  }
});

export default router;
