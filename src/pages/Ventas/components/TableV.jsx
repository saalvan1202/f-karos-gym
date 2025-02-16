import React, { useEffect, useState } from "react";
import "./TableV.css";
import { Avatar, Button, Form, Input, Modal, Select, Spin } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  EyeFilled,
  PlusCircleOutlined,
  RestOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { axiosDelete, axiosEdit } from "/public/helpers";
import ModalD from "../../../components/Default/ModalD";
import { axiosGet, axiosPost, PATH } from "../../../../public/helpers";
export default function TableV({
  windowState,
  setIsModalOpen,
  isModalOpen,
  setProducto,
  detalle,
  setDetalle,
  total,
  setTotal,
  idVenta,
  setIdVenta,
}) {
  //CONSTANTES
  const { confirm } = Modal;
  const { Search } = Input;
  //ESTADOS
  const [deletes, setDeletes] = useState(false);
  const [edites, setEdites] = useState(false);
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [venta, setVenta] = useState();
  const [action, setAction] = useState(false);
  const [state, setState] = useState(false);
  const [stateW, setStateW] = useState(false);
  const [promise, setPromise] = useState(false);
  //FORMULARIO
  const [form] = Form.useForm();
  const handleOk = () => {
    const venta = {
      id: idVenta,
      total: total,
      usuario_responsable: "ADMIN",
      detalles: detalle,
    };
    console.log(venta);
    const URL = `${PATH}/ventas/detalle/`;
    axiosPost(URL, venta, setStateW, setIsModalOpen);
    setDetalle([]);
    setTotal(0);
    setIdVenta(-1);
  };
  const handleCancel = () => {
    setIdVenta(-1);
    setIsModalOpen(false);
  };

  //ACTIONS
  function getProductos() {
    const URL = `${PATH}/inventario/productos/`;
    axiosGet(URL, setPromise, setProductos);
  }
  function getVentas() {
    const URL = `${PATH}/ventas/detalle/`;
    axiosGet(URL, setState, setVentas);
  }
  function addProductosDetalle(item) {
    item.sub_total = item.precio;
    item.cantidad = 1;
    item.precio_unitario = item.precio;
    item.producto = item.id;
    setDetalle([...detalle, item]);
    calcularTotal([...detalle, item]);
  }
  function calcularSubTotalProducto(id, cantidad) {
    const productoDetalle = detalle.find((item) => item.producto == id);
    if (productoDetalle) {
      productoDetalle.cantidad = cantidad;
      productoDetalle.sub_total =
        productoDetalle.precio_unitario * parseInt(cantidad);
      setDetalle([...detalle]);
      calcularTotal([...detalle]);
    }
  }
  function deleteDetalle(id) {
    const index = detalle.findIndex((item) => item.producto == id);
    console.log(index);
    if (index != -1) {
      detalle.splice(index, 1);
      setDetalle([...detalle]);
      calcularTotal([...detalle]);
    }
  }
  function calcularTotal(array) {
    let calculo = 0;
    array.forEach((element) => {
      calculo = calculo + parseFloat(element.sub_total);
    });
    setTotal(calculo);
  }
  useEffect(() => {
    getProductos();
    getVentas();
  }, [stateW, !deletes]);
  function destroy(id) {
    const URL = `${PATH}/ventas/detalle/${id}/`;
    setDeletes(true);
    axiosDelete(URL, setDeletes);
    setState(!state);
  }
  async function edit(id) {
    const URL = `${PATH}/ventas/detalle/${id}/`;
    await axiosEdit(URL, setVenta, setEdites, setIsModalOpen);
    console.log(venta);
  }
  useEffect(() => {
    if (venta) {
      setDetalle(venta.detalles);
      setTotal(venta.total);
      setIdVenta(venta.id);
    }
  }, [venta]);
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
  if (!state && !promise) {
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
        <span>Cargando Ventas...</span>
      </div>
    );
  }
  return (
    <div className="table-general">
      <div className="tr-general">
        <section className="th-general">#</section>
        <section className="th-general-i">FECHA</section>
        <section className="th-general">HORA</section>
        <section className="th-general">TOTAL</section>
        <section className="th-general">USUARIO</section>
        <section className="th-general-f">ACCIONES</section>
      </div>
      <div
        className="tr-general-d"
        style={{ maxHeight: "75vh", overflow: "auto" }}
      >
        {ventas.map((item, index) => (
          <div className="tds" key={item.id}>
            <section className="td-general">{ventas.length - index}</section>
            <section className="td-general">{item.fecha_formateada}</section>
            <section className="td-general">{item.hora_formateada}</section>
            <section className="td-general">
              S/ {parseFloat(item.total)}
            </section>
            <section className="td-general">{item.usuario_responsable}</section>
            <section className="td-general-b">
              <Button
                style={{
                  backgroundColor: "#f1d796",
                  color: "#c3671c",
                }}
                onClick={() => {
                  edit(item.id);
                }}
                loading={edites}
              >
                <EditOutlined />
              </Button>
              <Button
                style={{ backgroundColor: "#fecdd5", color: "#d71d4c" }}
                onClick={() => {
                  onWarning(item.id);
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
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title="Nueva Venta"
        handleOk={handleOk}
        width="1000px"
        action={action}
        handleCancel={handleCancel}
      >
        <div>
          <div>
            <Select
              showSearch
              style={{
                width: 400,
              }}
              placeholder="Buscar Producto"
              optionFilterProp="children"
              filterSort={(optionA, optionB) =>
                (optionA?.children ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.children ?? "").toLowerCase())
              }
              onChange={(value) => {
                const item = productos.find((item) => item.id == value);
                if (item) {
                  addProductosDetalle(item);
                }
              }}
            >
              {productos.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.nombre}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <table className="table-detalle-ventas">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>P/U</th>
                  <th>Cantidad</th>
                  <th>SubTotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {detalle.map((item) => (
                  <tr key={item.producto}>
                    <td>{item.nombre}</td>
                    <td>S/{parseFloat(item.precio_unitario)}</td>
                    <td>
                      <input
                        type="number"
                        defaultValue={item.cantidad}
                        onChange={(value) => {
                          calcularSubTotalProducto(
                            item.producto,
                            value.target.value
                          );
                        }}
                      />
                    </td>
                    <td>S/{parseFloat(item.sub_total)}</td>
                    <td>
                      <Button
                        title="Eliminar"
                        style={{ backgroundColor: "#fecdd5", color: "#d71d4c" }}
                        onClick={() => {
                          deleteDetalle(item.producto);
                        }}
                      >
                        <DeleteOutlined />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tbody>
                {detalle.length == 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      + Agrega Productos
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <hr />
                    </td>
                  </tr>
                )}
              </tbody>

              <tfoot>
                <tr>
                  <th colSpan={3} style={{ textAlign: "end" }}>
                    Total:
                  </th>
                  <th colSpan={1}>S/{total}</th>
                  <th colSpan={1}>-</th>
                </tr>
              </tfoot>
            </table>
          </div>
          <hr />
        </div>
      </ModalD>
    </div>
  );
}
