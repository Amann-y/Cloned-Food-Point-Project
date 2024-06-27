import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../store/context";

const PrivateComponent = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const {url} = useGlobalContext()

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const response = await axios.get(
          `${url}/api/v1/user/logged-user`,
          { headers }
        );
        setIsAdmin(response.data.user.isAdmin);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, []);

  useEffect(() => {
    // console.log("isAdmin1:", isAdmin);
  }, [isAdmin]);

  // console.log("Final isAdmin:", isAdmin); // Check the isAdmin state before return

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    // Return a loading indicator while data is being fetched
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateComponent;
