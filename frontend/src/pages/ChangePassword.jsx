import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from 'react-toastify';
import { useGlobalContext } from "../store/context";

const ChangePassword = () => {
    const [data, setData] = useState({
        password:"", confirmPassword:""
    })
    const [freeze, setFreeze] = useState(false)
    const navigate = useNavigate()
    const {url} = useGlobalContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) return;
      
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
    
        if (!data.confirmPassword || !data.password) {
          return toast.error("All fields are required");
        }
    
        try {
          setFreeze(true); // Disable the button
          const response = await axios.post(
            `${url}/api/v1/user/change-password`,
            {
              confirmPassword: data.confirmPassword,
              password: data.password,
            },
            {headers}
          );
    
          if (response.data.success) {
            toast.success(response.data.message);
            navigate("/");
          }
        } catch (error) {
          // console.error("Error:", error);
          toast.error(error.response.data.message);
        } finally {
          setFreeze(false); // Enable the button
        }
      };

  return (
    <Container>
      <Row className="pb-md-3 justify-content-between">
        <Col xs={12} md={6} lg={4} className="justify-content-center">
          <img
            src="https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Picture"
            className="h-auto object-fit-cover w-100"
          />
        </Col>

        <Col xs={12} md={6} lg={4} className="justify-content-center">
          <Form onSubmit={handleSubmit}>
            <h2>Change Password</h2>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                value={data.password}
                required
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter New Confirm Password"
                value={data.confirmPassword}
                required
                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
              />
            </Form.Group>

            <button className="btn btn-outline-success my-2" disabled={freeze}>{freeze ? "Sending..." :"Submit"}</button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
