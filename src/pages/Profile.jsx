import React from "react";
import useAuth from "../hooks/useAuth";
import avatar from "../assets/6596121.png";

const Profile = () => {
  const { logout } = useAuth();
  const data = JSON.parse(localStorage.getItem("user"));
  console.log(data.name);
  return (
    <div className="container">
      <div className="profile-content">
        <div className="left">
          <img  src={avatar} alt="" />
          <div className="btns">
            <button className="out" onClick={logout}>logout </button>
            <button className="copy">Copy Username </button>
          </div>
        </div>
        <div className="right">
          <h2>Name: {data.name}</h2>
          <h2>Username: {data.username}</h2>
          <h2>Status: {data.status  }</h2>

        </div>
      </div>
    </div>
  );
};

export default Profile;
