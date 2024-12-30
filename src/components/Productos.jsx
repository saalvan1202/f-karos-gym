import React, { useState } from "react";
import ButtonAntd from "./Default/ButtonAntd";
import "./styles/Productos.css";
import { PlusOutlined } from "@ant-design/icons";
import TableP from "./TableP";
import ModalAntd from "./Default/ModalAntd";
import { warning } from "./Default/ModalesAction";
export default function Productos() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productos = [
    {
      id: 1,
      nombre: "GASEOSA INKA KOLA",
      precio: 3,
      stock: 12,
      inventario: false,
    },
    {
      id: 2,
      nombre: "GASEOSA KOKA KOLA",
      precio: 3,
      stock: 6,
      inventario: true,
    },
    {
      id: 3,
      nombre: "AGUA CIELO",
      precio: 3,
      stock: 5,
      inventario: false,
    },
    {
      id: 4,
      nombre: "SPORADE",
      precio: 3,
      stock: 10,
      inventario: true,
    },
  ];
  function openModal() {
    setIsModalOpen(true);
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
          <TableP productos={productos} />
        </div>
      </div>
      <ModalAntd isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
