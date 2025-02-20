import { useEffect, useState } from "react";
import "./TableP.css";
import { Avatar, Button, Empty, Form, Input, Modal, notification } from "antd";
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
  idRow,
  setIdRow,
}) {
  const { confirm } = Modal;
  //ESTADOS
  const [deletes, setDeletes] = useState(false);
  const [edites, setEdites] = useState(false);
  const [loadStock, setLoadStock] = useState(false);
  const [modalStock, setModalStock] = useState(false);
  const [idProducto, setIdProducto] = useState(-1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [form] = Form.useForm();
  //ACTIONS
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, mensaje, descripcion) => {
    api[type]({
      message: mensaje,
      description: descripcion,
    });
  };
  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });
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
    if (windowWidth < 700) {
      if (idRow != -1) {
        const URL = `${PATH}/inventario/productos/${idRow}/`;
        axiosEdit(URL, setProducto, setEdites, setIsModalOpen);
      } else {
        openNotificationWithIcon(
          "warning",
          "Advertencia",
          "Para editar seleccione una fila"
        );
      }
    } else {
      const URL = `${PATH}/inventario/productos/${id}/`;
      axiosEdit(URL, setProducto, setEdites, setIsModalOpen);
    }
  }

  //MODALES
  function handleCancel() {
    setModalStock(false);
    setIdRow(-1);
  }
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

  const [productosT, setProductosT] = useState([]);
  useEffect(() => {
    if (productos) {
      setProductosT(productos);
    }
  }, [productosT]);
  return (
    <div className="table-general">
      {contextHolder}
      {windowWidth < 700 ? (
        <section
          style={{
            display: "flex",
            marginBottom: "20px",
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
        <section className="th-general-i">Nombre</section>
        <section className="th-general">Precio</section>
        <section className="th-general">Stock</section>
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
        {productos.length == 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          ""
        )}
        {productos.map((producto, index) => (
          <div
            onClick={() => {
              setIdRow(producto.id);
            }}
            className="tds"
            key={producto.id}
            style={{
              gridTemplateColumns:
                windowWidth >= 700
                  ? "0.2fr repeat(4, 1fr)"
                  : "0.2fr 1.5fr repeat(2, 1fr)",
            }}
          >
            <section className="td-general">{productos.length - index}</section>
            <section
              className="td-general"
              style={{ marginBottom: "5px", marginTop: "5px" }}
            >
              {producto.nombre}
            </section>

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
            {windowWidth >= 700 ? (
              <section className="td-general">
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
            ) : (
              ""
            )}
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
