import React from "react";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { useGlobalContext } from "../store/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CardComponent = ({ setStateChange, ...ele }) => {
  const dispatch = useDispatch();
  const { flag, adminButton, url} = useGlobalContext();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.delete(
        `${url}/api/v1/food/delete-item/${id}`,
        { headers }
      );

      if (response.data.success) {
        setStateChange(true);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...ele, qty: 1 }));
    toast.success("Item Has Been Added To Cart");
  };

  return (
    <>
      <Card className="my-2 h-100">
        <Card.Img
          variant="top"
          src={ele.imgURL}
          width={50}
          height={200}
          alt="Picture"
        />
        <Card.Body>
          <Card.Title>{ele.name}</Card.Title>
          <Card.Text>{ele.description}</Card.Text>
          <p>Category : {ele.categoryName}</p>
          <h6>Price : ₹{ele.price}</h6>
          <p>{ele.options}</p>
        </Card.Body>
        {flag && !adminButton && (
          <button
            className="btn btn-outline-secondary m-2"
            onClick={() => handleAddToCart()}
          >
            Add To Cart
          </button>
        )}

        {flag && adminButton && (
          <div className="d-flex justify-content-between gap-1 flex-wrap align-items-center">
            <button
              className="btn btn-outline-secondary m-2"
              onClick={() => navigate(`/update-food-item/${ele._id}`)}
            >
              Edit
            </button>
            <button
              className="btn btn-outline-danger m-2"
              onClick={() => handleDelete(ele._id)}
            >
              Delete
            </button>
          </div>
        )}
      </Card>
    </>
  );
};

export default CardComponent;
