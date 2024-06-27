import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../store/context";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart} from "../utils/cartSlice";

const Address = () => {
  const [data, setData] = useState({
    fullName: "",
    phone: "",
    pinCode: "",
    city: "",
    state: "",
    address: "",
  });
  const [freeze, setFreeze] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { adminButton, url } = useGlobalContext();
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  if (adminButton) {
    return navigate("/");
  }

  const token = localStorage.getItem("token");

  if (!token) return;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const fetchUserAddress = async () => {
    const response = await axios.get(`${url}/api/v1/address/user-address`, {
      headers,
    });

    if (response.data.success) {
      setData({
        address: response.data.userAddressDetail.address,
        pinCode: response.data.userAddressDetail.pinCode,
        city: response.data.userAddressDetail.city,
        state: response.data.userAddressDetail.state,
        phone: response.data.userAddressDetail.phone,
        fullName: response.data.userAddressDetail.fullName,
      });
    }
  };

  useEffect(() => {
    fetchUserAddress();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) return;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    if (
      !data.fullName ||
      !data.phone ||
      !data.pinCode ||
      !data.city ||
      !data.state ||
      !data.address
    ) {
      return toast.error("All fields are required");
    }

    try {
      setFreeze(true); // Disable the button
      const response = await axios.post(
        `${url}/api/v1/address/address`,
        {
          fullName: data.fullName,
          phone: data.phone,
          pinCode: data.pinCode,
          city: data.city,
          state: data.state,
          address: data.address,
        },
        { headers }
      );

      handleCheckOut();

      if (response.data.success) {
        // toast.success(response.data.message);
        toast.success("Payment Is Done Successfully");
        navigate("/");
      }
    } catch (error) {
      // console.error("Error:", error);
      toast.error(error.response.data.message);
    } finally {
      setFreeze(false); // Enable the button
    }
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
    setFreeze(true); // Disable the button
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(`${url}/api/v1/user/logged-user`, {
        headers,
      });

      const userId = response.data.user._id;
      if (!userId) return;

      for (const item of cartItems) {
        const resp = await axios.post(
          `${url}/api/v1/cart/add-to-cart`,
          {
            userId,
            productId: item._id,
            imgURL: item.imgURL,
            name: item.name,
            description: item.description,
            price: item.price,
            qty: item.qty,
          },
          { headers }
        );

     
        if (resp?.data?.success) {
          dispatch(emptyCart());
          localStorage.removeItem("cart");
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      // console.log(error.resp.data.message);
    } finally {
      setFreeze(false); // Enable the button
   
    }
  };

  return (
    <Container>
      <Row className="pb-md-3 justify-content-between">
        <h2>Address Details</h2>
        <Col sm={12} md={5} className="d-none d-md-block">
          <img
            src="https://plus.unsplash.com/premium_photo-1682310158823-917a4f726802?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Picture"
            className="w-100 h-auto object-fit-cover"
          />
        </Col>

        <Col sm={12} md={5}>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-md-row flex-column gap-1 justify-content-md-between align-content-md-center">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Full Name"
                  required
                  value={data.fullName}
                  onChange={(e) =>
                    setData({ ...data, fullName: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  required
                  value={data.city}
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                />
              </Form.Group>
            </div>

            <div className="d-flex flex-md-row flex-column gap-1 justify-content-md-between align-content-md-center">
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Phone Number"
                  required
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPinCode">
                <Form.Label>Pin Code</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Pin Code"
                  required
                  value={data.pinCode}
                  onChange={(e) =>
                    setData({ ...data, pinCode: e.target.value })
                  }
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                required
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                required
                value={data.state}
                onChange={(e) => setData({ ...data, state: e.target.value })}
              />
            </Form.Group>
            <button className="btn btn-outline-info my-2" disabled={freeze}>
              {freeze ? "Loading..." : "Proceed To Pay"}
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Address;
