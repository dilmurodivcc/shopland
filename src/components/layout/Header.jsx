import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Popover } from "antd";
import img from "../../assets/6596121.png";
import { useGroups } from "../../hooks/useGroups";

const Header = () => {
  const [group, setGroup] = useState("");
  const { groups, isLoadingGroups, isErrorGroups } = useGroups(group);
  console.log(groups);

  return (
    <div className="container">
      <header>
        <h3 className="logo">shopland</h3>
        <div className="input-container">
          <div className="input-bar">
            <input
              type="text"
              placeholder="Search the groups...."
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
            <button>Search</button>
          </div>
          {group.length > 0 && (
            <div className="search-content">
              {isLoadingGroups ? (
                <p className="loading">Loading groups...</p>
              ) : groups.length > 0 ? (
                groups.map((group, index) => (
                  <div key={group.id || index} className="line">
                    <p>{group.name}</p>
                    <button>join</button>
                  </div>
                ))
              ) : (
                <p className="no-results">No groups found</p>
              )}
            </div>
          )}
        </div>
        {/* <label>
          <input
            type="text"
            placeholder="Search..."
            className="input"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
          {group.length > 0 && (
            <div className="search-results">
              {groups.length > 0 && !isLoadingGroups && <h3>Groups</h3>}
              <ul>
                {isLoadingGroups ? (
                  <p className="loading">Loading groups...</p>
                ) : groups.length > 0 ? (
                  groups.map((group, index) => (
                    <li key={group.id || index + 1}>
                      <div className="user">
                        <div className="user-info">
                          <h4>{group.name}</h4>
                          <span>
                            {group.createdAt
                              ? new Date(group.createdAt)
                                  .toISOString()
                                  .slice(0, 19)
                                  .replace("T", " ")
                              : "Unknown date"}
                          </span>
                        </div>
                        <p>
                          Created By:{" "}
                          <span>{group.owner?.name || "Unknown"}</span>
                        </p>
                      </div>
                      <Popover
                        content={() => joinPopoverContent(group)}
                        title="Group password"
                        trigger="click"
                      >
                        <button className="join-btn">Join</button>
                      </Popover>
                    </li>
                  ))
                ) : (
                  <p className="no-results">No groups found</p>
                )}
              </ul>
            </div>
          )}
        </label> */}
        <nav>
          <NavLink className="nav-link" to={"/"}>
            Home
          </NavLink>
          <NavLink className="nav-link" to={"/groups"}>
            Groups
          </NavLink>
          <NavLink className="nav-avatar" to="/profile">
            <img className="avatar" src={img} alt="Profile" />
          </NavLink>
        </nav>
      </header>
    </div>
  );
};

export default Header;
