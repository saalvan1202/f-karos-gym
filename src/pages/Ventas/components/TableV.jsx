import React, { useEffect, useState } from "react";
import "./TableV.css";
import {
  Avatar,
  Button,
  Empty,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  notification,
} from "antd";
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
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, mensaje, descripcion) => {
    api[type]({
      message: mensaje,
      description: descripcion,
    });
  };
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
  const [buttonDisable, setButtonDisable] = useState(false);
  const [stateTipoDocumento, setStateTipoDocumento] = useState("-");
  const [editando, setEditando] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [idRow, setIdRow] = useState(-1);
  const [idRowas, setIdRowas] = useState(-1);
  //FORMULARIO
  const [form] = Form.useForm();
  const handleOk = () => {
    if (detalle.length == 0) {
      openNotificationWithIcon(
        "error",
        "Venta sin detalles",
        "Debe agregar productos para poder registrar una venta"
      );
    } else {
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
    }
  };
  const handleCancel = () => {
    setIdVenta(-1);
    setIdRow(-1);
    setIsModalOpen(false);
  };

  //ACTIONS
  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });
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
    const stock = productoDetalle.stock;
    console.log(stock);
    if (editando) {
      productoDetalle.stock =
        parseInt(productoDetalle.stock) + parseInt(productoDetalle.cantidad);
    }
    if (cantidad > productoDetalle.stock) {
      productoDetalle.stock = stock;
      openNotificationWithIcon(
        "error",
        "Stock Insuficiente",
        "La cantidad de productos añadidos excede a la cantidad del stock"
      );
      setButtonDisable(true);
    } else {
      productoDetalle.stock = stock;
      setButtonDisable(false);
      if (productoDetalle) {
        productoDetalle.cantidad = cantidad;
        productoDetalle.sub_total =
          productoDetalle.precio_unitario * parseInt(cantidad);
        setDetalle([...detalle]);
        calcularTotal([...detalle]);
      }
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
    if (windowWidth < 700) {
      if (idRow != -1) {
        const URL = `${PATH}/ventas/detalle/${idRow}/`;
        await axiosEdit(URL, setVenta, setEdites, setIsModalOpen);
        console.log(venta);
      } else {
        openNotificationWithIcon(
          "warning",
          "Advertencia",
          "Para editar seleccione una fila"
        );
      }
    } else {
      const URL = `${PATH}/ventas/detalle/${id}/`;
      await axiosEdit(URL, setVenta, setEdites, setIsModalOpen);
      console.log(venta);
    }
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
    if (windowWidth < 700) {
      if (idRow != -1) {
        confirm({
          title: "¿Estás seguro de eliminar este registro",
          icon: <ExclamationCircleFilled />,
          onOk() {
            destroy(idRow);
          },
          onCancel() {
            setIdRow(-1);
          },
        });
      } else {
        openNotificationWithIcon(
          "warning",
          "Advertencia",
          "Para eliminar seleccione una fila"
        );
      }
    } else {
      confirm({
        title: "¿Estás seguro de eliminar este registro",
        icon: <ExclamationCircleFilled />,
        onOk() {
          destroy(id);
        },
        onCancel() {
          setIdRow(-1);
        },
      });
    }
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
      {contextHolder}
      {windowWidth < 700 ? (
        <section
          style={{
            display: "flex",
            marginBottom: "20px",
            marginTop: "20px",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              backgroundColor: "#f1d796",
              color: "#c3671c",
              marginRight: "20px",
            }}
            onClick={() => {
              edit("");
            }}
            loading={edites}
          >
            <EditOutlined />
            <span>Editar</span>
          </Button>
          <Button
            style={{
              backgroundColor: "#fecdd5",
              color: "#d71d4c",
            }}
            onClick={() => {
              onWarning("");
            }}
            loading={deletes}
          >
            <DeleteOutlined />
            <span>Eliminar</span>
          </Button>
        </section>
      ) : (
        <></>
      )}
      <div
        className="tr-general"
        style={{
          gridTemplateColumns:
            windowWidth >= 700
              ? "0.2fr repeat(4, 1fr)"
              : "0.2fr 1.5fr repeat(2, 1fr)",
        }}
      >
        <section className="th-general">#</section>
        <section className="th-general-i">FECHA</section>
        <section className="th-general">HORA</section>
        <section className="th-general">TOTAL</section>
        {windowWidth >= 700 ? (
          <section className="th-general-f">Acciones</section>
        ) : (
          ""
        )}
      </div>
      <div
        className="tr-general-d"
        style={{ maxHeight: "65vh", overflow: "auto" }}
      >
        {ventas.length == 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          ""
        )}
        {ventas.map((item, index) => (
          <div
            onClick={() => {
              setIdRow(item.id);
            }}
            className="tds"
            key={item.id}
            style={{
              gridTemplateColumns:
                windowWidth >= 700
                  ? "0.2fr repeat(4, 1fr)"
                  : "0.2fr 1.5fr repeat(2, 1fr)",
            }}
          >
            <section className="td-general">{ventas.length - index}</section>
            <section className="td-general">{item.fecha_formateada}</section>
            <section className="td-general">{item.hora_formateada}</section>
            <section className="td-general">
              S/ {parseFloat(item.total)}
            </section>
            {windowWidth >= 700 ? (
              <section className="td-general">
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
            ) : (
              ""
            )}
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
        disableOk={buttonDisable}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              gap: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                gap: "15px",
              }}
            >
              <Select
                showSearch
                style={{
                  width: "50%",
                  minWidth: "300px",
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: "100%",
              }}
              className="label-tipoDocumento"
            >
              <Select
                defaultValue={stateTipoDocumento}
                onChange={(e) => {
                  setStateTipoDocumento(e);
                }}
                style={{
                  width: "50%",
                  minWidth: "300px",
                }}
                placeholder="Tipo de Documento"
              >
                <Select.Option value="-">SIN DOCUMENTO</Select.Option>
                <Select.Option value="1">
                  DOCUMENTO NACIAONAL DE IDENTIDAD
                </Select.Option>
              </Select>
              <Input
                placeholder="DNI"
                style={{
                  display: stateTipoDocumento == "-" ? "none" : "block",
                  width: 400,
                }}
              />
            </div>
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
                        min={1}
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
