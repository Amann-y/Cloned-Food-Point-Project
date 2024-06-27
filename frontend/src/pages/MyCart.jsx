import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  minusFromCart,
  removeFromCart,
  emptyCart,
} from "../utils/cartSlice";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Pagination from "../utils/PaginationComponent"; // Import your pagination component
import { useGlobalContext } from "../store/context";
import axios from "axios";
import { toast } from 'react-toastify';

const MyCart = () => {
  const { adminButton, flag,url } = useGlobalContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Change this value according to your preference
  const [freeze, setFreeze] = useState(false);


  if (adminButton) {
    return navigate("/");
  }

  const handleMinusFromCart = (item) => {
    dispatch(minusFromCart(item));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

   // Update Redux state when cart data changes in localStorage
   useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch({ type: "cart/updateCart", payload: storedCart });
  }, [dispatch]);

  // Update localStorage when cart state changes in Redux
  useEffect(() => {
    let t = 0;
    localStorage.setItem("cart", JSON.stringify(cartItems));
    cartItems?.map((ele) => {
      t = t + ele.price * ele.qty;
      setSubTotal(t);
      return setTotal(Number(((t / 100) * 5).toFixed(2)) + t);
    });
  }, [cartItems]);

  const handleCheckOut = async () => {
    navigate("/address")
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="container">
      <div className="row">
        <header className="container">
          <h1>Shopping Cart</h1>
          <span className="count">
            {cartItems.length ? cartItems.length : 0} items in the bag
          </span>
        </header>
        {currentItems.length > 0
          ? currentItems.map((ele) => (
              <Col
                key={ele._id}
                xs={12}
                md={6}
                lg={4}
                className="justify-content-center my-2"
              >
                <Card>
                  <Card.Img
                    variant="top"
                    className="d-none d-sm-block"
                    src={ele.imgURL}
                    width={15}
                    height={150}
                    alt="Picture"
                  />

                  <Card.Body>
                    <Card.Title>Name : {ele.name}</Card.Title>
                    <Card.Text>Description : {ele.description}</Card.Text>
                    <p>Category : {ele.categoryName}</p>
                    <p>{ele.options}</p>
                    <div className="d-flex justify-content-between align-items-center gap-1 flex-wrap my-2">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleMinusFromCart({ ...ele })}
                      >
                        -
                      </button>
                      <h6>{ele.qty}</h6>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => handleAddToCart({ ...ele })}
                      >
                        +
                      </button>
                    </div>
                    <div className="d-flex justify-content-between flex-wrap gap-1 align-items-center">
                      <button
                        variant="primary"
                        className="btn btn-outline-danger"
                        onClick={() => handleRemoveFromCart({ ...ele })}
                      >
                        Remove
                      </button>
                      <button
                        variant="primary"
                        className="btn btn-outline-success"
                      >
                        Total: ₹{Number(ele.qty) * Number(ele.price)}
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : ""}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={cartItems.length}
          paginate={paginate}
        />

        {cartItems.length > 0 && (
          <Col>
            <Card className="my-2 d-flex justify-content-between">
              <Card.Body>
                <Card.Title>Sub-Total : ₹{subTotal}</Card.Title>
                <Card.Text className="text-danger">Tax : 5%</Card.Text>
                <h2>Total : ₹{total}</h2>
              </Card.Body>
              <button
                className="btn btn-outline-secondary m-2 fs-5"
                onClick={() => handleCheckOut()}
                disabled={freeze}
              >
                {freeze ? "Wait..." : "Check Out"}
              </button>
            </Card>
          </Col>
        )}
      </div>
    </section>
  );
};

export default MyCart;
