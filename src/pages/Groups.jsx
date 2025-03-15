import React, { useState } from "react";
import { Modal, Input, Button, Empty } from "antd";
import avatar from "../assets/6596121.png";
import { IoIosArrowDown } from "react-icons/io";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Groups = () => {
  const userdata = JSON.parse(localStorage.getItem("user"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [password, setPassword] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("Group Name:", groupName);
    console.log("Password:", password);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="groups">
        <div className="drawer">
          <Link className="username" to="/profile">
            <img src={avatar} alt="User Avatar" />
            <h3>{userdata.username}</h3>
          </Link>
          <div className="group-items">
            <div className="title">
              <h3>Groups</h3>
              <IoIosArrowDown className="arrow" />
            </div>
            <div
              className="group-item"
              onClick={showModal}
              style={{ cursor: "pointer" }}
            >
              <BsArrowReturnRight className="return" />
              <h4>
                {" "}
                Create Group <FaPlus />
              </h4>
            </div>
          </div>
          <div className="group-list">
            <div className="group-item">
              <Empty
                className="empty"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No groups found"
              />
            </div>
          </div>
        </div>

        <div className="product-container"></div>
        <div className="drawer-user ">
          <Link className="username" to="/profile">
            <img src={avatar} alt="User Avatar" />
            <h3>{userdata.username}</h3>
          </Link>
          <div className="group-items">
            <div className="title">
              <h3>Groups</h3>
              <IoIosArrowDown className="arrow" />
            </div>
            <div
              className="group-item"
              onClick={showModal}
              style={{ cursor: "pointer" }}
            >
              <BsArrowReturnRight className="return" />
              <h4>
                {" "}
                Create Group <FaPlus />
              </h4>
            </div>
          </div>
          <div className="group-list">
            <div className="group-item">
              <Empty
                className="empty"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No groups found"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Group name and password"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input.Password
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default Groups;
