import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../components/Card-Component";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import CarouselComponent from "../utils/CarouselComponent";
import Spinner from "react-bootstrap/Spinner";
import { useGlobalContext } from "../store/context";

const Home = () => {
  const [foodData, setFoodData] = useState([]);
  const [copyFoodData, setCopyFoodData] = useState([]);
  const [stateChange, setStateChange] = useState(false);
  const [filteredData, setFilteredData] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const {url} = useGlobalContext()

  const fetchFoodData = async () => {
    try {
      const response = await axios.get(
        `${url}/api/v1/food/get-all-food-items`
      );
      setFoodData(response?.data?.data);
      setCopyFoodData(response?.data?.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      toast.error(error.message);
      setLoading(false); // Also set loading to false in case of error
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, [stateChange]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setFilteredData(searchTerm);
    const data = copyFoodData.filter((ele) =>
      ele.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFoodData(data);
  };

  return (
    <>
      <CarouselComponent />
      <Container>
        <div className="container my-2 my-md-4">
          {loading &&
            foodData.length === 0 && ( // Display spinner only if loading and no data
              <div className="d-flex mb-2 justify-content-center align-items-center">
                <Spinner animation="border" variant="info" size="md" />
              </div>
            )}
          {foodData.length === 0 &&
            !loading && ( // Show no item found message
              <>
                {/* <h2>No Item Found</h2> */}
                <Form className="d-flex" onSubmit={handleSearchSubmit}>
                  <Form.Control
                    type="search"
                    placeholder="Search Food Item"
                    className="me-2"
                    aria-label="Search"
                    value={filteredData}
                    onChange={handleSearchChange}
                  />
                </Form>
              </>
            )}
          {foodData.length > 0 && ( // Display search input when there are items
            <Form className="d-flex" onSubmit={handleSearchSubmit}>
              <Form.Control
                type="search"
                placeholder="Search Food Item"
                className="me-2"
                aria-label="Search"
                value={filteredData}
                onChange={handleSearchChange}
              />
            </Form>
          )}
        </div>
        <Row className="py-2">
          {foodData.length > 0 ? (
            foodData.map((ele) => (
              <Col key={ele._id} xs={12} md={6} lg={4} className="my-2">
                <CardComponent setStateChange={setStateChange} {...ele} />
              </Col>
            ))
          ) : foodData.length <= 0 && loading == false ? (
            <Col xs={12}>
              <h2>No Item Found</h2>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </Container>
    </>
  );
};

export default Home;
