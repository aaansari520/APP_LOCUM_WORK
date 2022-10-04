import React from "react";
import { Navigate, Redirect, Route } from "react-router-dom";

const ProtectedRoutes = ({ component: Component, isAuth, ...rest }) => {
  const hasAuthToken = localStorage.getItem("profile");
  return (
    <Route
      {...rest}
      render={(props) =>
        hasAuthToken ? (
          <Component {...props} />
        ) : (
          <Navigate to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoutes;
