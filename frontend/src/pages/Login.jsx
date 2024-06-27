import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useGlobalContext } from "../store/context";
import { toast } from 'react-toastify';

const Login = () => {
  const [data, setData] = useState({ password: "", email: "" });
  const [freeze, setFreeze] = useState(false);
  const { storeToken, AdminBtn, flag, url} = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (flag) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [flag, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      return toast.error("All fields are required");
    }

    try {
      setFreeze(true); // Disable the button
      const response = await axios.post(
        `${url}/api/v1/user/login-User`,
        {
          email: data.email,
          password: data.password,
        }
      );

      if (response.data.success) {
        setData({ email: "", password: "" });
        storeToken(response.data.token);
        navigate("/");
        toast.success(response.data.message);
        const headers = {
          Authorization: `Bearer ${response.data.token}`,
          "Content-Type": "application/json",
        };
        const user_detail = await axios.get(
          `${url}/api/v1/user/logged-user`,
          { headers }
        );
      
        if (user_detail.data.user._id) {
          AdminBtn(user_detail.data.user.isAdmin);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setFreeze(false); // Enable the button
    }
  };

  return (
    <section className="container py-2">
      <h2>Login Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </Form.Group>

        <Button variant="secondary" type="submit" disabled={freeze}>
          {freeze ? "Login..." : "Login"}
        </Button>
      </Form>
    </section>
  );
};

export default Login;

