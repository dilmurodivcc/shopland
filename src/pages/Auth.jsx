import React from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import useStore from "../hooks/useStore";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const { authMode } = useStore();
  if (localStorage.getItem("token")) {
   return <Navigate to="/profile" replace={true} />;
  }
  return (
    <>
      <div className="auth">
        <div className="container">
          {authMode === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </>
  );
};

export default Auth;
