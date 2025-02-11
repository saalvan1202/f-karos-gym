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
const items = [
  {
    key: "1",
    icon: <DesktopOutlined />,
    label: "Productos",
  },
  {
    key: "2",
    icon: <PieChartOutlined />,
    label: "Ventas",
  },
];

const MenuPrincipal = () => {
  const [widthMenu, setWidthMenu] = useState(250);
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    //Esta es la lógica para manejar condicionales de manera resumida
    setWidthMenu(widthMenu == 250 ? 80 : 250);
  };

  return (
    <div
      style={{
        width: widthMenu,
        height: "auto",
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
