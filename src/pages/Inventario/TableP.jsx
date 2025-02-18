import React, { useEffect, useState } from "react";
import "./TableP.css";
import { Avatar, Button, Form, Input, Modal } from "antd";
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
import {
  axiosDelete,
  axiosEdit,
  axiosPost,
  PATH,
} from "../../../public/helpers";
import ModalD from "../../components/Default/ModalD";
import { useForm } from "antd/es/form/Form";
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
  const [loadStock, setLoadStock] = useState(false);
  const [modalStock, setModalStock] = useState(false);
  const [idProducto, setIdProducto] = useState(-1);
  const [form] = Form.useForm();
  //ACTIONS
  //SUBIR FORM
  function handleOk() {
    form.submit();
  }
  function storeInventario(value) {
    value.id_producto = idProducto;
    const URL = `${PATH}/inventario/inventarios/`;
    axiosPost(URL, value, setLoadStock, setModalStock);
    windowState(true);
  }
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
  function handleCancel() {
    setModalStock(false);
  }
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
              <Button
                title="Agregar Stock"
                style={{
                  backgroundColor: "#a1f9d3",
                  color: "#00a273",
                  borderRadius: "60px",
                  height: "30px",
                  width: "30px",
                }}
                onClick={() => {
                  setModalStock(true);
                  setIdProducto(producto.id);
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
      <ModalD
        title="Agregar Stock"
        isModalOpen={modalStock}
        setIsModalOpen={setModalStock}
        handleCancel={handleCancel}
        handleOk={handleOk}
        action={loadStock}
      >
        <Form
          style={{ height: "auto", marginTop: "20px" }}
          form={form}
          onFinish={storeInventario}
        >
          <Form.Item
            label="Cantidad"
            name="cantidad"
            rules={[
              {
                required: true,
                message: "Ingrese la cantidad!",
              },
            ]}
          >
            <Input style={{ width: "40%" }}></Input>
          </Form.Item>
        </Form>
      </ModalD>
    </div>
  );
}
