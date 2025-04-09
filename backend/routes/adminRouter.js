import express from "express";
import { uploads } from "../middleware/uploadMiddleware.js";
import Product from "../models/productModel.js";

const router = express.Router();

const PORT = process.env.PORT || 5000;

router.post("/upload", uploads.single("product"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  res.json({
    success: true,
    filename: req.file.filename, // just store the filename
  });
});

router.post("/addproduct", async (req, res) => {
  try {
    const { name, category, new_price, old_price, image } = req.body;

    if (!name || !category || !new_price || !old_price || !image) {
      return res
        .status(400)
        .json({ success: false, message: "All field are required" });
    }

    const product = new Product({
      name,
      category,
      new_price,
      old_price,
      image,
    });

    await product.save();
    res
      .status(201)
      .json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/removeproduct", async (req, res) => {
  const { id } = req.body;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
