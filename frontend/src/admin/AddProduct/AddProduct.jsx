import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    new_price: "",
    old_price: "",
    category: "",
    image: "",
  });
  const handleChange = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image");
      return;
    }
    let responseData;
    let product = { ...productDetails };
    let formData = new FormData();
    formData.append("product", image);

    await fetch("http://localhost:5000/api/admin/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      product.image = responseData.image_url;
      await fetch("http://localhost:5000/api/admin/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Product added");
            setProductDetails({
              name: "",
              new_price: "",
              old_price: "",
              category: "",
              image: "",
            });
            setImage(null);
          } else {
            alert("Product addition failed");
          }
        });
    } else {
      alert("Image upload failed");
    }
  };

  return (
    <Container sx={{ padding: "50px 0" }}>
      <Card
        variant="outlined"
        sx={{ maxWidth: "500px", padding: "20px", margin: "50px auto" }}
      >
        <Box
          component={"form"}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
          onSubmit={handleSubmitProduct}
        >
          <FormControl>
            <FormLabel htmlFor="name">Product</FormLabel>
            <TextField
              id="name"
              type="text"
              name="name"
              placeholder="Enter product name"
              variant="outlined"
              required
              fullWidth
              onChange={handleChange}
              value={productDetails.name}
            />
          </FormControl>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="new_price">New Price</FormLabel>
              <TextField
                id="new_price"
                name="new_price"
                type="number"
                placeholder="New Price"
                variant="outlined"
                required
                onChange={handleChange}
                value={productDetails.new_price}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="old_price">Old Price</FormLabel>
              <TextField
                id="old_price"
                name="old_price"
                type="number"
                placeholder="Old Price"
                variant="outlined"
                required
                onChange={handleChange}
                value={productDetails.old_price}
              />
            </FormControl>
          </Box>
          <FormControl>
            <FormLabel htmlFor="category">Category</FormLabel>
            <Select
              id="category"
              name="category"
              variant="outlined"
              required
              onChange={handleChange}
              value={
                productDetails.category === ""
                  ? "Select Category"
                  : productDetails.category
              }
            >
              <MenuItem value="" disabled>
                Select Category
              </MenuItem>
              <MenuItem value="silk_sarees">Silk Sarees</MenuItem>
              <MenuItem value="new_arrivals">New Arraivals</MenuItem>
              <MenuItem value="best_sellings">Best Sellings</MenuItem>
              <MenuItem value="latest_collections">Latest Collections</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel
              htmlFor="upload_file"
              sx={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              Upload Image
              <img
                src={image ? URL.createObjectURL(image) : upload_area}
                width={"125px"}
                alt=""
              />
            </FormLabel>
            <TextField
              id="upload_file"
              name="upload_file"
              type="file"
              sx={{ display: "none" }}
              required
              onChange={imageHandler}
            />
          </FormControl>
          <Button type="submit" color="error" fullWidth variant="contained">
            Submit
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default AddProduct;
