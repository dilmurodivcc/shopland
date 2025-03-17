import React, { useState } from "react";
import useStore from "../../hooks/useStore"; // Zustand store ni import qilamiz
import img from "../../assets/authimg.webp"
import useAuth from "../../hooks/useAuth";


const RegisterForm = () => {
  const { toggleAuth } = useStore(); 
  const [isReversed, setIsReversed] = useState(false);
  const {registerMutation} = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();

    registerMutation.mutate({ name: e.target[0].value, username: e.target[1].value, password: e.target[2].value});
    
    console.log({name: e.target[0].value, username: e.target[1].value, password: e.target[2].value});
    
    
  };
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
            <button onClick={handleToggle}>Log In</button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button>Sign in</button>
        </form>
        <img className="img-auth" src={img} alt="" />
      </div>
    </>
  );
};

export default RegisterForm;
