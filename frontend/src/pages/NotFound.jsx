import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useNavigate} from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Row>
        <Col className="justify-content-center align-items-center py-3 d-flex flex-column">
          <h3 className="text-danger">404 page not found</h3>
          <p>We are sorry but the page you are looking for does not exist.</p>
          <button className="btn btn-outline-dark my-2" onClick={()=>navigate("/")}>Back To Home Page</button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
