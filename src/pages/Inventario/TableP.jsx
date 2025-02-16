import React, { useEffect, useState } from "react";
import "./TableP.css";
import { Avatar, Button, Modal } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  PlusCircleOutlined,
  RestOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { warning } from "../../components/Default/ModalesAction";
import axios from "axios";
import { axiosDelete, axiosEdit, PATH } from "../../../public/helpers";
export default function TableP({
  productos,
  windowState,
  setIsModalOpen,
  setProducto,
}) {
  const { confirm } = Modal;
  //ESTADOS
  const [deletes, setDeletes] = useState(false);
  const [edites, setEdites] = useState(false);
  //ACTIONS
  function destroy(id) {
    const URL = `${PATH}/inventario/productos/${id}/`;
    setDeletes(true);
    axiosDelete(URL, setDeletes);
    windowState(true);
  }
  function edit(id) {
    const URL = `${PATH}/inventario/productos/${id}/`;
    axiosEdit(URL, setProducto, setEdites, setIsModalOpen);
  }

  //MODALES
  function onWarning(id) {
    confirm({
      title: "¿Estás seguro de eliminar este registro",
      icon: <ExclamationCircleFilled />,
      onOk() {
        destroy(id);
      },
    });
  }

  const [productosT, setProductosT] = useState([]);
  useEffect(() => {
    if (productos) {
      setProductosT(productos);
    }
  }, [productosT]);
  return (
    <div className="table-general">
      <div className="tr-general">
        <section className="th-general">#</section>
        <section className="th-general-i">Nombre</section>
        <section className="th-general">Precio</section>
        <section className="th-general">Stock</section>
        <section className="th-general-f">Estado</section>
        <section className="th-general-f">Acciones</section>
      </div>
      <div
        className="tr-general-d"
        style={{ maxHeight: "65vh", overflow: "auto" }}
      >
        {productos.map((producto, index) => (
          <div className="tds" key={producto.id}>
            <section className="td-general">{productos.length - index}</section>
            <section className="td-general">{producto.nombre}</section>

            <section className="td-general">S/ {producto.precio}</section>
            <section className="td-general" style={{ textAlign: "center" }}>
              {/* <Button
                style={{
                  backgroundColor: "#a1f9d3",
                  color: "#00a273",
                  borderRadius: "60px",
                  height: "30px",
                  width: "30px",
                }}
              >
                <PlusCircleOutlined />
              </Button> */}
              {producto.stock}
            </section>
            <section className="td-general">
              {producto.estado ? (
                <p className="p-true">
                  <CheckCircleOutlined />
                  Activo
                </p>
              ) : (
                <p className="p-false">
                  <CloseCircleOutlined />
                  Inactivo
                </p>
              )}
            </section>
            <section className="td-general-b">
              <Button
                style={{
                  backgroundColor: "#f1d796",
                  color: "#c3671c",
                }}
                onClick={() => {
                  edit(producto.id);
                }}
                loading={edites}
              >
                <EditOutlined />
              </Button>
              <Button
                style={{ backgroundColor: "#fecdd5", color: "#d71d4c" }}
                onClick={() => {
                  onWarning(producto.id);
                }}
                loading={deletes}
              >
                <DeleteOutlined />
              </Button>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
