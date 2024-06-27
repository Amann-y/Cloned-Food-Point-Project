import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../store/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import CurrentDateFormat from "../utils/CurrentDateFormat";
import Pagination from "../utils/PaginationComponent"; // Import your pagination component

const OrderHistory = () => {
  const { adminButton, url } = useGlobalContext();
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Change this value according to your preference

  if (adminButton) {
    navigate("/");
    return null; // Return null after navigation
  }

  const token = localStorage.getItem("token");
  if (!token) return null; // Return null if token is not present

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const fetchUserOrderHistory = async () => {
    try {
      const response = await axios.get(
        `${url}/api/v1/order/get-user-order-history`,
        { headers }
      );

      if (response.data.success) {
        setOrderHistory(response.data.cartItem);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUserOrderHistory();
  }, []);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderHistory.reverse()
    .slice(indexOfFirstItem, indexOfLastItem)


  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mb-4">
      <Row>
        <h2>Orders' History</h2>
        {orderHistory.length > 0 ? (
          currentItems.map((ele) => (
            <Col
              key={ele._id}
              xs={12}
              md={6}
              lg={4}
              className="justify-content-center my-2 mb-3"
            >
              <Card className="my-1 h-100">
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
                  <p>Quantity : {ele.qty}</p>
                  <h6>Price : ₹{ele.price}</h6>
                  <p className="text-danger fs-6">
                    Order Date : {CurrentDateFormat(ele.createdAt)}{" "}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <h4 className="text-danger">No Order History</h4>
        )}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={orderHistory.length}
          paginate={paginate}
        />
      </Row>
    </Container>
  );
};

export default OrderHistory;

