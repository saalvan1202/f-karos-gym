import React, { useEffect, useState } from "react";
import "./styles/TableP.css";
import { Avatar, Button } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  RestOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { warning } from "./Default/ModalesAction";
export default function TableP({ productos }) {
  //ACTIONS
  function destroy() {
    setDeletes(true);
  }
  //ESTADOS
  const [deletes, setDeletes] = useState(false);
  //MODALES
  function onWarning() {
    warning("Eliminar", "¿Estás seguro de eliminar este registro", destroy);
  }

  const [productosT, setProductosT] = useState([]);
  useEffect(() => {
    if (productos) {
      setProductosT(productos);
    }
  }, [productosT]);
  console.log(productosT);
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
              {producto.inventario ? (
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
                onClick={onWarning}
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
