import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../store/context";
import axios from "axios";
import { emptyCart } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

function NavbarComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { flag, removeToken, getToken, adminButton, AdminBtn,url } =
    useGlobalContext();

  useEffect(() => {
    const token = getToken();
  }, [flag]);

  const logoutHandler = () => {
    removeToken();
    navigate("/login");
    localStorage.removeItem("cart");
    dispatch(emptyCart());
  };

  const fetchData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
      const user_detail = await axios.get(
        `${url}/api/v1/user/logged-user`,
        { headers }
      );

      if (user_detail.data.user._id) {
        AdminBtn(user_detail.data.user.isAdmin);
      }
    } catch (error) {
      toast.error(error?.user_detail?.data?.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          bg="dark"
          data-bs-theme="dark"
          className="bg-body-tertiary"
        >
          <Container fluid>
            <Navbar.Brand href="/">Food Point</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Food Point
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "nav-list-item2 fs-4" : "nav-list-item1 fs-4"
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                  {flag ? (
                    <>
                      {!adminButton && (
                        <>
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "nav-list-item2 fs-4" : "nav-list-item1 fs-4"
                            }
                            to="/mycart"
                          >
                            My Cart
                          </NavLink>

                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "nav-list-item2 fs-4" : "nav-list-item1 fs-4"
                            }
                            to="/orderHistory"
                          >
                            Orders History
                          </NavLink>

                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "nav-list-item2 fs-4" : "nav-list-item1 fs-4"
                            }
                            to="/changePassword"
                          >
                            Change Password
                          </NavLink>
                        </>
                      )}
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "nav-list-item2 fs-4" : "nav-list-item1 fs-4"
                        }
                        to="/login"
                        onClick={logoutHandler}
                      >
                        Logout
                      </NavLink>

                      {adminButton && (
                        <>
                          <NavLink
                            className={({ isActive }) =>
                              isActive ? "nav-list-item2 fs-4" : "nav-list-item1 fs-4"
                            }
                            to="/changeAdminPassword"
                          >
                            Change Password
                          </NavLink>
                          <button
                            className="btn btn-warning my-2"
                            onClick={() => navigate("/admin")}
                          >
                            Admin
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "nav-list-item2 fs-4" : "nav-list-item1 fs-4"
                        }
                        to="/login"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "nav-list-item2 fs-4" : "nav-list-item1 fs-4"
                        }
                        to="/signup"
                      >
                        Sign-Up
                      </NavLink>
                    </>
                  )}
                </Nav>
               
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarComponent;
