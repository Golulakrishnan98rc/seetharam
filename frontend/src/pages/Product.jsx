import React, { useEffect, useState } from "react";
import ProductDisplay from "../components/ProductDisplay";
import Breadcrum from "../components/Breadcrum";
import { useProductStore } from "../store/products";
import { useParams } from "react-router-dom";

const Product = () => {
  const { products, fetchProduct } = useProductStore(); // Fetch function from store
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let foundProduct = products.find((e) => e._id === productId);

      if (!foundProduct) {
        await fetchProduct();
        foundProduct = useProductStore
          .getState()
          .products.find((e) => e._id === productId);
      }

      setProduct(foundProduct);
      setLoading(false);
    };

    fetchData();
  }, [productId, products, fetchProduct]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <Breadcrum title={product?.name} />
      <ProductDisplay product={product} />
    </div>
  );
};

export default Product;
