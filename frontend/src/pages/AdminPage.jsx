import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useGlobalContext } from "../store/context";

const AdminPage = () => {
  const [data, setData] = useState({
    categoryName: "",
    name: "",
    imgURL: "",
    description: "",
    price: "",
    options: "available",
  });
  const [freeze, setFreeze] = useState(false);
  const {url} = useGlobalContext()

  const navigate = useNavigate()

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
        const token = localStorage.getItem("token");

        if (!token) return;

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.post(
          `${url}/api/v1/food/create-food`,
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

        if (response.data.success) {
          toast.success("Data Added");
          navigate("/")
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
    <>
      <Container className="">
        <h2>Admin Panel</h2>
        <Row className="pb-md-3 justify-content-between">
          <Col sm={12} md={5} className="d-none d-md-block">
            <img
              src="https://images.unsplash.com/photo-1474377207190-a7d8b3334068?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                    onChange={(e) =>
                      setData({ ...data, price: e.target.value })
                    }
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

              <button className="btn my-2 btn-outline-dark">
                {freeze ? "Sending..." : "Submit"}
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPage;
