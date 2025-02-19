import React, { useEffect, useState } from "react";
import "./styles/MenuPrincipal.css";
import {
  DesktopOutlined,
  HomeOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import MenuVertical from "./MenuTypeWidth/MenuVertical";
import MenuHorizontal from "./MenuTypeWidth/MenuHorizontal";

const MenuPrincipal = ({ children }) => {
  const [widthMenu, setWidthMenu] = useState(window.innerWidth);
  window.addEventListener("resize", () => {
    setWidthMenu(window.innerWidth);
  });
  return widthMenu >= 750 ? (
    <MenuVertical>{children}</MenuVertical>
  ) : (
    <MenuHorizontal>{children}</MenuHorizontal>
  );
};
export default MenuPrincipal;
