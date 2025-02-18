import React, { useEffect, useState } from "react";
import "./styles/MenuPrincipal.css";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Menu } from "antd";
import { useNavigate } from "react-router-dom";
const items = [
  {
    key: "",
    icon: <HomeOutlined />,
    label: "Inicio",
  },
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

const MenuPrincipal = ({ children }) => {
  const [widthMenu, setWidthMenu] = useState(250);
  const [collapsed, setCollapsed] = useState(false);
  const [dKey, setDkey] = useState(localStorage.getItem("key"));
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    //Esta es la lógica para manejar condicionales de manera resumida
    setWidthMenu(widthMenu == 250 ? 80 : 250);
  };
  function redirect(e) {
    localStorage.setItem("key", e.key);
    console.log(e);
    navigate(`/${e.key}`);
  }
  useEffect(() => {
    const localKey = localStorage.getItem("key");
    console.log(localKey);
    setDkey(localKey);
  }, [dKey]);
  return (
    <div
      style={{
        width: "auto",
        minWidth: "100vw",
        overflowX: "auto",
        height: "auto",
        minHeight: "100vh",
        backgroundColor: "#ffff0",
        transition: "width 0.5s ease",
        boxShadow: "0px 4px 6px #c9c9c9",
      }}
    >
      {/* <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          margin: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}
      <div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1677ff",
              colorBorderBg: "white",
            },
            components: {
              List: {
                colorBgContainer: "white",
                colorBorderBg: "white",
              },
            },
          }}
        >
          <Menu
            onClick={redirect}
            defaultSelectedKeys={[dKey]}
            defaultOpenKeys={["sub1"]}
            mode="horizontal"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
          />
        </ConfigProvider>
      </div>
      {children}
    </div>
  );
};
export default MenuPrincipal;
