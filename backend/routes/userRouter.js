import express from "express";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

const PORT = process.env.PORT || 5000;

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, cartData } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    let products = await Product.find({}, "_id");

    let cart = {};
    products.forEach((product) => {
      cart[product._id] = 0;
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      cartData: cart,
    });
    await user.save();

    const token = jwt.sign(
      { user: { id: user.id } },
      process.env.JWT_SECRET || "secret_ecom",
      {
        expiresIn: "1h",
      }
    );

    return res
      .status(201)
      .json({ success: true, message: "User signin successfully", token });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { user: { id: user.id } },
      process.env.JWT_SECRET || "secret_ecom",
      { expiresIn: "1d" }
    );
    return res
      .status(200)
      .json({ success: true, message: "Successfully logged in", token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please authenticate using valid token",
    });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Please authenticate using valid token",
    });
  }
};

router.post("/addtocart", fetchUser, async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!userData.cartData) {
      userData.cartData = {};
    }

    let updatedCart = { ...userData.cartData };

    updatedCart[req.body.itemId] = (updatedCart[req.body.itemId] || 0) + 1;

    await User.findByIdAndUpdate(userData._id, { cartData: updatedCart });

    res.json({
      success: true,
      message: "Item added to cart",
      cartData: updatedCart,
    });
  } catch (error) {
    console.log("Error adding to cart", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!userData.cartData || !userData.cartData[req.body.itemId]) {
      return res
        .status(400)
        .json({ success: false, message: "Item not in cart" });
    }

    let updatedCart = { ...userData.cartData };

    if (updatedCart[req.body.itemId] > 0) {
      updatedCart[req.body.itemId] -= 1;

      if (updatedCart[req.body.itemId] === 0) {
        delete updatedCart[req.body.itemId];
      }

      await User.findByIdAndUpdate(userData._id, { cartData: updatedCart });
      return res.json({
        success: true,
        message: "Cart item removed",
        cartData: updatedCart,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Item quantity already zero" });
    }
  } catch (error) {
    console.log("Error removing  to cart", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/getcart", fetchUser, async (req, res) => {
  try {
    let userData = await User.findOne({ _id: req.user.id });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: userData.cartData || {} });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.get("/favourites", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const favouriteProducts = await Product.find({
      _id: { $in: user.favourites },
    });

    res.json({ success: true, favourites: favouriteProducts });
  } catch (error) {
    console.error("Error fetching favourites:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.post("/togglefavourite", async (req, res) => {
  const token = req.headers["auth-token"];
  const { productId } = req.body;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    const userId = decoded.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const index = user.favourites.findIndex(
      (fav) => String(fav) === String(productId)
    );

    if (index === -1) {
      user.favourites.push(productId); // Add to favourites
    } else {
      user.favourites.splice(index, 1); // Remove from favourites
    }

    await user.save();

    res.status(200).json({ success: true, favourites: user.favourites });
  } catch (error) {
    console.error("Toggle favourite error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.get("/getfavourites", async (req, res) => {
  const token = req.headers["auth-token"];

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    const user = await User.findById(decoded.user.id);

    const favourites = await Product.find({ _id: { $in: user.favourites } });

    res.status(200).json({ success: true, favourites });
  } catch (error) {
    console.error("Error getting favourites:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
