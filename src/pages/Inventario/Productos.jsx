import React, { useEffect, useState } from "react";
import ButtonAntd from "../../components/Default/ButtonAntd";
import "./Productos.css";
import { PlusOutlined } from "@ant-design/icons";

import ModalAntd from "../../components/Default/ModalAntd";
import { warning } from "../../components/Default/ModalesAction";
import { axiosGet, PATH } from "../../../public/helpers";
import TableP from "./TableP";
import { Spin } from "antd";
export default function Productos() {
  //ESTADOS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productos, setProductos] = useState({});
  const [producto, setProducto] = useState({
    id: -1,
    nombre: "",
    stock: "",
    precio: "",
    remember: true,
  });
  const [estado, setEstado] = useState(false);
  const [windowState, setWindowState] = useState();
  function openModal() {
    setProducto({
      id: -1,
      nombre: "",
      stock: "",
      precio: "",
      remember: true,
    });
    setIsModalOpen(true);
  }
  //FUNCIONES
  function getProductos() {
    const URL = `${PATH}/inventario/productos/`;
    setWindowState(false);
    axiosGet(URL, setEstado, setProductos);
  }
  useEffect(() => {
    getProductos();
  }, [!windowState]);
  if (!estado) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        <Spin />
        <span>Cargando Productos...</span>
      </div>
    );
  }
  return (
    <div className="productos">
      <div className="productos-header">
        <h1>Productos</h1>
        <ButtonAntd type="primary" title="Agregar" fn={openModal}>
          <PlusOutlined />
          Agregar Producto
        </ButtonAntd>
      </div>
      <div className="productos-body">
        <div className="productos-table">
          <TableP
            productos={productos}
            windowState={setWindowState}
            setIsModalOpen={setIsModalOpen}
            setProducto={setProducto}
          />
        </div>
      </div>
      <ModalAntd
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setWindowState={setWindowState}
        producto={producto}
      />
    </div>
  );
}
