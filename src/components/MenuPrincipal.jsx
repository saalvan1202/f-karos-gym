import React, { useState } from "react";
import "./styles/MenuPrincipal.css";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
const items = [
  {
    key: "productos",
    icon: <DesktopOutlined />,
    label: "Productos",
  },
  {
    key: "ventas",
    icon: <PieChartOutlined />,
    label: "Ventas",
  },
];

const MenuPrincipal = () => {
  const [widthMenu, setWidthMenu] = useState(250);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    //Esta es la lógica para manejar condicionales de manera resumida
    setWidthMenu(widthMenu == 250 ? 80 : 250);
  };
  function redirect(e) {
    console.log(e);
    navigate(`${e.key}`);
  }
  return (
    <div
      style={{
        width: widthMenu,
        height: "auto",
        minHeight: "100vh",
        backgroundColor: "#ffff0",
        transition: "width 0.5s ease",
        border: "1px solid #c9c9c9c4",
        borderRadius: "20px",
        boxShadow: "0px 4px 6px #c9c9c9",
      }}
    >
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          margin: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        onClick={redirect}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};
export default MenuPrincipal;
