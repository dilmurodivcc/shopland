import React from "react";
import { Link, NavLink } from "react-router-dom";
import img from "../../assets/6596121.png";

const Header = () => {
  return (
    <>
      <div className="container">
        <header>
          <h3 className="logo">shopland</h3>
          <div className="input-bar">
            <input type="text" placeholder="Search the groups...." />
            <button>Search</button>
          </div>
          <nav>
            <NavLink className="nav-link" to={"/"}>
              Home
            </NavLink>
            <NavLink className="nav-link" to={"/groups"}>
              Groups
            </NavLink>
            <Link to="/profile">
              <img className="avatar" src={img} alt="" />
            </Link>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Header;
