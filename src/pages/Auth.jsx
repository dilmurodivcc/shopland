import React from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import useStore from "../hooks/useStore"; 

const Auth = () => {
  const { authMode } = useStore(); 

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
