import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ token, element }) => {
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: window.location.pathname }}
      />
    );
  }

  return element;
};

export default PrivateRoute;
