import { Button, Menu } from "antd";
import "../MenuPrincipal";
import {
  DesktopOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function MenuVertical({ children }) {
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

  const [widthMenu, setWidthMenu] = useState(220);
  const [collapsed, setCollapsed] = useState(false);
  const [dKey, setDkey] = useState(localStorage.getItem("key"));
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    //Esta es la lógica para manejar condicionales de manera resumida
    setWidthMenu(widthMenu == 220 ? 80 : 220);
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
        display: "flex",
        width: "auto",
        minWidth: "100%",
        overflowX: "auto",
        height: "auto",
        minHeight: "100vh",
        backgroundColor: "#ffff0",

        boxShadow: "0px 4px 6px #c9c9c9",
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: "#001529",
          borderTopRightRadius: "10px",
          transition: "width 0.5s ease",
          width: widthMenu,
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
          defaultSelectedKeys={[dKey]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          style={{ width: "auto" }}
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <div style={{ width: "100%", overflow: "auto", maxHeight: "100vh" }}>
        {children}
      </div>
    </div>
  );
}
