import React, { useState } from "react";
import useStore from "../../hooks/useStore"; 
import img from "../../assets/authimg.webp";

const LoginForm = () => {
  const { toggleAuth } = useStore();
  const [isReversed, setIsReversed] = useState(false);

  const handleToggle = () => {
    setIsReversed(!isReversed);
    toggleAuth("register");
  };

  return (
    <div className={`login-content ${isReversed ? "reverse" : ""}`}>
      <form>
        <h2>Sign In</h2>
        <input type="email" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button>Sign In</button>
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
