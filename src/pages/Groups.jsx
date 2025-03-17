import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Empty, Spin } from "antd";
import { toast } from "sonner";
import avatar from "../assets/6596121.png";
import { IoIosArrowDown } from "react-icons/io";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaPlus, FaTrash, FaCartPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  useMember,
  useMyGroups,
  useCreateGroup,
  useGroupItems,
  useAddMember,
} from "../hooks/useGroups";

const Groups = () => {
  const userdata = JSON.parse(localStorage.getItem("user"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [password, setPassword] = useState("");
  const [searchText, setSearchText] = useState("");
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [itemTitle, setItemTitle] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);

  const { members, isLoadingMember } = useMember(searchText);
  const { myGroups, isLoadingMyGroups } = useMyGroups();
  const { mutate: createGroup } = useCreateGroup();
  const { addItemMutation, removeItemMutation, markItemAsBoughtMutation } =
    useGroupItems();
  const { mutate: addMember } = useAddMember();

  const activeGroup = myGroups.find((group) => group._id === activeGroupId);

  useEffect(() => {
    if (myGroups && myGroups.length > 0 && !activeGroupId) {
      setActiveGroupId(myGroups[0]._id);
    }
  }, [myGroups, activeGroupId]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showMemberModal = () => {
    setIsMemberModalOpen(true);
  };

  const handleOk = () => {
    createGroup({ name: groupName, password });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleMemberCancel = () => {
    setIsMemberModalOpen(false);
    setSearchText("");
  };

  const handleAddMember = (member) => {
    if (!activeGroupId) {
      toast.warning("Iltimos, avval guruhni tanlang");
      return;
    }

    if (!member || !member._id) {
      toast.error("A'zo ma'lumotlari to'liq emas");
      return;
    }

    const isMemberAlreadyInGroup = activeGroup?.members?.some(
      (existingMember) => existingMember._id === member._id
    );

    if (isMemberAlreadyInGroup) {
      toast.warning("Bu foydalanuvchi allaqachon guruhga qo'shilgan");
      return;
    }

    setIsAddingMember(true);
    console.log("Adding member to group:", {
      groupId: activeGroupId,
      memberId: member._id,
    });

    addMember(
      {
        groupId: activeGroupId,
        memberId: member._id,
      },
      {
        onSuccess: () => {
          setIsMemberModalOpen(false);
          setSearchText("");
          setIsAddingMember(false);
        },
        onError: (error) => {
          console.error("Error adding member in component:", error);
          setIsAddingMember(false);
        },
      }
    );
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (activeGroupId && itemTitle) {
      const isItemDuplicate = activeGroup?.items?.some(
        (item) => item.title.toLowerCase() === itemTitle.toLowerCase()
      );

      if (isItemDuplicate) {
        toast.warning("Bu nomli mahsulot allaqachon mavjud");
        return;
      }

      setIsAddingItem(true);
      addItemMutation.mutate(
        {
          groupId: activeGroupId,
          itemData: { title: itemTitle },
        },
        {
          onSuccess: () => {
            toast.success("Mahsulot muvaffaqiyatli qo'shildi!");
            setItemTitle("");
            setIsAddingItem(false);
          },
          onError: (error) => {
            toast.error(`Xatolik yuz berdi: ${error.message}`);
            setIsAddingItem(false);
          },
        }
      );
    } else {
      toast.warning("Iltimos, guruh va mahsulot nomini kiriting");
    }
  };

  const handleSelectGroup = (groupId) => {
    setActiveGroupId(groupId);
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
            {isLoadingMyGroups ? (
              <Spin />
            ) : myGroups.length > 0 ? (
              myGroups.map((group) => (
                <div
                  key={group._id}
                  className={`group ${
                    group._id === activeGroupId ? "active" : ""
                  }`}
                  onClick={() => handleSelectGroup(group._id)}
                >
                  <h4>{group.name}</h4>
                </div>
              ))
            ) : (
              <Empty
                className="empty"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No groups found"
              />
            )}
          </div>
        </div>

        <div className="product-container">
          <div className="product-header">
            <h3>
              {activeGroup ? activeGroup.name : "No Group Selected"} - Items
            </h3>
            <form onSubmit={handleAddItem}>
              <input
                type="text"
                placeholder="Write a Title of item.."
                value={itemTitle}
                onChange={(e) => setItemTitle(e.target.value)}
              />
              <button type="submit" disabled={isAddingItem || !itemTitle}>
                {isAddingItem ? "Qo'shilyapti..." : "Add Item"}
              </button>
            </form>
          </div>
          <div className="items">
            {activeGroup &&
            activeGroup.items &&
            activeGroup.items.length > 0 ? (
              activeGroup.items.map((item) => (
                <div key={item._id} className="item">
                  <h4>{item.title} <span>by</span> ({item.owner.username})</h4>
                <div className="btns">
                <button className="card">
                    <FaCartPlus />
                  </button>
                  <button className="delete">
                    <FaTrash />
                  </button>
                </div>
                </div>
              ))
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No items found"
              />
            )}
          </div>
        </div>
        <div className="drawer-user ">
          <div className="owner">
            <h3>Owner:</h3>
            <h4>
              {activeGroup && activeGroup.owner
                ? activeGroup.owner.username
                : "No group selected"}
            </h4>
          </div>
          <div className="group-items">
            <div className="title">
              <h3>Members</h3>
              <IoIosArrowDown className="arrow" />
            </div>
            <div
              className="group-item"
              onClick={showMemberModal}
              style={{ cursor: "pointer" }}
            >
              <BsArrowReturnRight className="return" />
              <h4>
                Add Member <FaPlus />
              </h4>
            </div>
          </div>
          <div className="group-list">
            {activeGroup &&
            activeGroup.members &&
            activeGroup.members.length > 0 ? (
              activeGroup.members.map((member) => (
                <div key={member._id} className="member">
                  <img src={avatar} alt="User Avatar" />
                  <h4>{member.username}</h4>
                </div>
              ))
            ) : (
              <Empty
                className="empty"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No members found"
              />
            )}
          </div>
        </div>
      </div>

      <Modal
        title="Group name and password"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="group-creation-modal"
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

      <Modal
        title="Add Member to Group"
        open={isMemberModalOpen}
        onCancel={handleMemberCancel}
        footer={null}
        className="member-modal"
      >
        <Input
          placeholder="Search users..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {isLoadingMember || isAddingMember ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Spin />
            </div>
          ) : members.length > 0 ? (
            members.map((member) => (
              <div
                key={member._id}
                className="member-list-item"
                onClick={() => !isAddingMember && handleAddMember(member)}
                style={{ cursor: isAddingMember ? "not-allowed" : "pointer" }}
              >
                <img src={avatar} alt="User Avatar" />
                <span>{member.username}</span>
              </div>
            ))
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No users found"
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default Groups;
