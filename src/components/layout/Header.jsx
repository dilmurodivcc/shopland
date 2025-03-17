import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Popover } from "antd";
import img from "../../assets/6596121.png";
import { useGroups, useJoinGroup } from "../../hooks/useGroups";
import { toast } from "sonner";

const Header = () => {
  const [group, setGroup] = useState("");
  const { groups, isLoadingGroups, isErrorGroups } = useGroups(group);
  const { mutate: joinGroup, isLoading: isJoiningMutation } = useJoinGroup();
  const [isJoining, setIsJoining] = useState(false);
  const [joiningGroupId, setJoiningGroupId] = useState(null);

  const handleJoinGroup = (groupId) => {
    console.log("Joining group with ID:", groupId);
    setJoiningGroupId(groupId);

    const password = prompt("Iltimos, guruh parolini kiriting:");
    if (password) {
      setIsJoining(true);
      joinGroup(
        { groupId, password },
        {
          onSuccess: (data) => {
            setGroup("");
            setIsJoining(false);
            setJoiningGroupId(null);
          },
          onError: (error) => {
            setIsJoining(false);
            setJoiningGroupId(null);
          },
        }
      );
    } else if (password === "") {
      toast.warning("Parol kiritilmadi");
      setJoiningGroupId(null);
    } else {
      setJoiningGroupId(null);
    }
  };

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
                  <div key={group._id || group.id || index} className="line">
                    <p>{group.name}</p>
                    <button
                      onClick={() => handleJoinGroup(group._id || group.id)}
                      disabled={
                        isJoining && joiningGroupId === (group._id || group.id)
                      }
                    >
                      {isJoining && joiningGroupId === (group._id || group.id)
                        ? "Qo'shilyapti..."
                        : "Join"}
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-results">No groups found</p>
              )}
            </div>
          )}
        </div>
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
