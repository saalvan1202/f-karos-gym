import React, { useEffect, useState } from "react";
import ButtonAntd from "./Default/ButtonAntd";
import "./styles/Productos.css";
import { PlusOutlined } from "@ant-design/icons";
import TableP from "./TableP";
import ModalAntd from "./Default/ModalAntd";
import { warning } from "./Default/ModalesAction";
import { axiosGet } from "../../public/helpers";
export default function Productos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productos, setProductos] = useState({});
  const [estado, setEstado] = useState(false);
  const [windowState, setWindowState] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }
  //FUNCIONES
  function getProductos() {
    const URL = "http://127.0.0.1:8000/inventario/productos/";
    setWindowState(false);
    axiosGet(URL, setEstado, setProductos);
  }
  useEffect(() => {
    getProductos();
  }, [windowState]);
  if (!estado) {
    return "Cargando Productos...";
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
          <TableP productos={productos} windowState={setWindowState} />
        </div>
      </div>
      <ModalAntd
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setWindowState={setWindowState}
      />
    </div>
  );
}
