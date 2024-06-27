import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

const PrivatePages = () => {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />;
      }else{
        return <Outlet />;
      }
    
}

export default PrivatePages