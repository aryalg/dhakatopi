import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function OrderScreen({ match }) {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);

  const { order, loading, error } = orderDetails;

  // Calculate Price
  const itemsPrice = (o) =>
    o.cartItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [match, dispatch, orderId]);

  return loading ? (
    <Loader></Loader>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Successfully Fetched order</h1>
    </>
  );
}

export default OrderScreen;
