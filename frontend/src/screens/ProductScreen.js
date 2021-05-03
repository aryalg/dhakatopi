import React from "react";
import { Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import products from "../products";

const ProductScreen = ({ match }) => {
  const product = products.find((p) => p._id === match.params.id);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      <Row md={6}>
        <Image src={product.image} alt={product.name}></Image>
      </Row>

      <Row md={3}></Row>
    </>
  );
};

export default ProductScreen;
