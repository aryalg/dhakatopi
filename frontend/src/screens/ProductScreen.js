import React from "react";
import products from "../products";

const ProductScreen = ({ match }) => {
  const product = products.find((p) => p._id === match.params.id);
  return <div>{product.name}</div>;
};

export default ProductScreen;
