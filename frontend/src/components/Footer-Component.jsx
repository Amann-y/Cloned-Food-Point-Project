import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function Footer() {
  return (
    <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container className="d-flex text-white flex-md-row flex-column align-content-md-center justify-content-between gap-1">
        <h2>Food Point</h2>
        <p>All rights are reserved</p>
      </Container>
    </Navbar>
  );
}

export default Footer;
