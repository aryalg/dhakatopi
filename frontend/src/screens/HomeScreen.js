import { Col, Row } from "react-bootstrap";
// import products from "../products";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarsousel from "../components/ProductCarsousel";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <ProductCarsousel />
      <h1>Latest Products</h1>
      <Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
