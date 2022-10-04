import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const SideBarMenu = () => {
  const navigate = useNavigate();

  // const deleteItem = () => {
  //   localStorage.removeItem("profile");
  // };

  return (
    <div>
      <Menu
        onClick={({ key }) => {
          if (key === "signout") {
            // deleteItem();
            // navigate("/");
          } else {
            navigate(key);
          }
        }}
        items={[
          {
            label: "Home",
            key: "/home",
            icon: <HomeOutlined />,
          },
          {
            label: "Wishlist",
            key: "/wishlist",
            icon: <DashboardOutlined style={{ color: "red" }} />,
          },
          {
            label: "Cart List",
            key: "/cartlist",
            icon: <UnorderedListOutlined />,
          },
          {
            label: "Profile",
            key: "/profile",
            icon: (
              <i className="fa fa-user" style={{ color: "darkorange" }}></i>
            ),
          },
          // {
          //   label: "SignOut",
          //   key: "/signout",
          //   icon: <PoweroffOutlined />,
          //   danger: true,
          // },
        ]}
      ></Menu>
    </div>
  );
};

export default SideBarMenu;
