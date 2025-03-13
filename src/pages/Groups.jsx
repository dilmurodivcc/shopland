import React from "react";
import avatar from "../assets/6596121.png";
import { IoIosArrowDown } from "react-icons/io";
import { BsArrowReturnRight } from "react-icons/bs";


const Groups = () => {
  const userdata = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="groups">
        <div className="drawer">
          <div className="username">
            <img src={avatar} alt="" />
            <h3>{userdata.username}</h3>
          </div>
          <div className="group-items">
            <div className="title">
              <h3>Groups</h3>
            <IoIosArrowDown className="arrow" />
            </div>
            <div className="group-item">
            <BsArrowReturnRight />
            Create Groups 

            </div>
          </div>
        </div>
        <div className="container"></div>
      </div>
    </>
  );
};

export default Groups;
