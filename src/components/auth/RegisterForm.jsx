import React, { useState } from "react";
import useStore from "../../hooks/useStore"; // Zustand store ni import qilamiz
import img from "../../assets/authimg.webp"


const RegisterForm = () => {
  const { toggleAuth } = useStore(); 
  const [isReversed, setIsReversed] = useState(false);

  const handleToggle = () => {
    setIsReversed(!isReversed);
    toggleAuth("login");
  };

  return (
    <>
      <div className= {`login-content ${isReversed ? "reverse" : ""}`}>
        <div className="toggle">
          <div className="toggle-stick"></div>
          <div className="btn-overlay">
            <button onClick={handleToggle}>Sign In</button>
          </div>
        </div>
        <form>
          <h2>Sign Up</h2>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
        <img className="img-auth" src={img} alt="" />
      </div>
    </>
  );
};

export default RegisterForm;
