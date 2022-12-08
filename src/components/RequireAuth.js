import React, { useContext } from "react";
import { authContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { user } = useContext(authContext);
  console.log(user, "require auth");
  if (!user.userName) {
    return <Navigate to="/signup" />;
  } else {
    return children;
  }
}
export default RequireAuth;
