import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar-Component";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import Footer from "./components/Footer-Component";
import SignUp from "./pages/SignUp";
import PrivateComponent from "./components/Private-Component"; // Corrected import name
import AdminPage from "./pages/AdminPage";
import PrivatePages from "./components/Private-Pages";
import MyCart from "./pages/MyCart";
import UpdateFoodItemPage from "./pages/UpdateFoodItemPage";
import ChangePassword from "./pages/ChangePassword";
import Address from "./pages/Address"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import OrderHistory from "./pages/OrderHistory";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* If you want AdminPage to be accessible only when authenticated, wrap it with PrivateComponent */}
        <Route element={<PrivateComponent />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/update-food-item/:id" element={<UpdateFoodItemPage />} />
          <Route path="/changeAdminPassword" element={<ChangePassword />} />
        </Route>

        <Route element={<PrivatePages />}>
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/address" element={<Address/>}/>
          <Route path="/orderHistory" element={<OrderHistory/>}/>
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
