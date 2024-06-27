import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useGlobalContext } from "../store/context";

const UpdateFoodItemPage = () => {
  const [data, setData] = useState({
    categoryName: "",
    name: "",
    imgURL: "",
    description: "",
    price: "",
    options: "available",
  });
  const [freeze, setFreeze] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const {url} = useGlobalContext()

  if (!token) return;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const fetchFoodData = async () => {
    const response = await axios.get(
      `${url}/api/v1/food/food-item/${id}`,
      { headers }
    );
    if (response.data.success) {
      setData({
        categoryName: response.data.item.categoryName,
        name: response.data.item.name,
        imgURL: response.data.item.imgURL,
        description: response.data.item.description,
        price: response.data.item.price,
        options: response.data.item.options,
      });
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFreeze(true); // Disable the button
      if (
        !data.categoryName ||
        !data.name ||
        !data.imgURL ||
        !data.description ||
        !data.price
      ) {
        return toast.error("All Fields Are Required");
      } else {
        const response = await axios.put(
          `${url}/api/v1/food/update-item/${id}`,
          {
            categoryName: data.categoryName,
            name: data.name,
            imgURL: data.imgURL,
            description: data.description,
            price: data.price,
            options: data.options,
          },
          { headers } // Pass headers as the third argument
        );
        // console.log(response);

        if (response.data.success) {
          toast.success("Data Added");
          navigate("/");
        }
      }
    } catch (error) {
      // console.error("Error:", error);
      toast.error(error.response.data.message);
    } finally {
      setFreeze(false); // Enable the button
    }
  };

  return (
    <Container className="">
      <h2>Update Food Item</h2>
      <Row className="pb-md-3 justify-content-between">
        <Col sm={12} md={5} className="d-none d-md-block">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Picture"
            className="w-100 h-auto object-fit-cover"
          />
        </Col>

        <Col sm={12} md={5} className="">
          <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-md-row flex-column gap-1 justify-content-md-between align-content-md-center">
              <Form.Group className="mb-3" controlId="formCategory">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  required
                  value={data.categoryName}
                  onChange={(e) =>
                    setData({ ...data, categoryName: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  required
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
              </Form.Group>
            </div>

            <div className="d-flex flex-md-row flex-column gap-1 justify-content-md-between align-content-md-center">
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Price"
                  required
                  value={data.price}
                  onChange={(e) => setData({ ...data, price: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  required
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image Url"
                required
                value={data.imgURL}
                onChange={(e) => setData({ ...data, imgURL: e.target.value })}
              />
            </Form.Group>

            <Form.Select
              aria-label="Default select example"
              value={data.options}
              onChange={(e) => setData({ ...data, options: e.target.value })}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </Form.Select>

            <button className="btn my-2 btn-outline-dark" disabled={freeze}>
              {freeze ? "Sending..." : "Submit"}
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateFoodItemPage;
