import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivatePage() {
  if (localStorage.getItem("token")) {
    return <Outlet />;
  } else {
    return <Navigate to="/auth" replace={true} />;
  }
}

export default PrivatePage;
