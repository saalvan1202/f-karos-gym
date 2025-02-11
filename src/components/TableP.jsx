import React, { useEffect, useState } from "react";
import "./styles/TableP.css";
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
import { warning } from "./Default/ModalesAction";
import axios from "axios";
import { axiosDelete } from "../../public/helpers";
export default function TableP({ productos, windowState }) {
  const { confirm } = Modal;
  //ESTADOS
  const [deletes, setDeletes] = useState(false);
  //ACTIONS
  function destroy(id) {
    console.log(id);
    const URL = `http://127.0.0.1:8000/inventario/productos/${id}/`;
    setDeletes(true);
    axiosDelete(URL, setDeletes);
    windowState(true);
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
        <section className="th-general-i">Nombre</section>
        <section className="th-general">Precio</section>
        <section className="th-general">Stock</section>
        <section className="th-general-f">Estado</section>
        <section className="th-general-f">Acciones</section>
      </div>
      <div className="tr-general-d">
        {productos.map((producto) => (
          <div className="tds" key={producto.id}>
            <section className="td-general">
              <Avatar
                style={{
                  marginRight: "10px",
                  backgroundColor: "#87d068",
                }}
                icon={<RestOutlined />}
              />
              {producto.nombre}
            </section>
            <section className="td-general">S/ {producto.precio}</section>
            <section className="td-general">
              <Button
                style={{
                  backgroundColor: "#a1f9d3",
                  color: "#00a273",
                  borderRadius: "60px",
                  height: "30px",
                  width: "30px",
                }}
              >
                <PlusCircleOutlined />
              </Button>
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
                loading={true}
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
