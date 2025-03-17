import React, { useState } from "react";
import useStore from "../../hooks/useStore"; 
import img from "../../assets/authimg.webp";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const { toggleAuth } = useStore();
  const [isReversed, setIsReversed] = useState(false);
  const {loginMutation} = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ username: e.target[0].value, password: e.target[1].value});
    
  };
  const handleToggle = () => {
    setIsReversed(!isReversed);
    toggleAuth("register");
  };

  return (
    <div className={`login-content ${isReversed ? "reverse" : ""}`}>
      <form onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Log In</button>
      </form>
      <div className="toggle">
        <div className="toggle-stick"></div>
        <div className="btn-overlay">
          <button onClick={handleToggle}>Sign Up</button>
        </div>
      </div>
      <img className="img-auth" src={img} alt="" />
    </div>
  );
};

export default LoginForm;
