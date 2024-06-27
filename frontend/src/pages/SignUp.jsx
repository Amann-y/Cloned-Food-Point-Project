import React from "react";
import { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useGlobalContext } from "../store/context";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const SignUp = () => {
  const [data, setData] = useState({ name: "", password: "", email: "" });
  const [freeze, setFreeze] = useState(false);

  const {storeToken, flag,url} = useGlobalContext()
  const navigate = useNavigate();

  useEffect(() => {
    if (flag) {
      navigate("/"); // Redirect to home if already logged in
    }
  }, [flag, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password) {
      return toast.error("All fields are required");
    }
    try {
      setFreeze(true); // Disable the button
      const response = await axios.post(
        `${url}/api/v1/user/create-User`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      );
  
      // console.log(response); Check if this logs the response object
      if (response.data.success) {
        storeToken(response.data.token)
        setData({ name: "", email: "", password: "" });
        navigate("/");
        return toast.success(response.data.message);
      } else {
        return toast.error(response.data.message);
      }
    } catch (error) {
      // console.error("Error:", error); Log any errors that occur
      return toast.error(error.response.data.message);
    }finally {
      setFreeze(false); // Enable the button
    }
  };
  

  return (
    <section className="container py-2">
      <h2>Register Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </Form.Group>

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
          {freeze ? "Registering ..." : "Register"}
        </Button>
      </Form>
    </section>
  );
};

export default SignUp;
