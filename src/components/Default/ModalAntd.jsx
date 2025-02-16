import React, { useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import "./ModalAntd.css";
import { axiosPost, PATH } from "../../../public/helpers";
const ModalAntd = ({
  isModalOpen,
  setIsModalOpen,
  setWindowState,
  producto,
}) => {
  //Iniciamos la referencia del formulario
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    form.submit();
  };
  //ESTADOS
  const [initialValues, setInitialValues] = useState({
    id: -1,
    nombre: "",
    stock: "",
    precio: "",
    remember: true,
  });
  useEffect(() => {
    if (isModalOpen && producto) {
      // Solo actualiza si isModalOpen es true *y* hay un producto
      form.setFieldsValue(producto); // Usa form.setFieldsValue para actualizar los valores del formulario
    } else if (isModalOpen) {
      // Si es una creación, resetea los campos
      form.setFieldsValue({
        id: -1,
        nombre: "",
        stock: "",
        precio: "",
      });
    }
  }, [producto, form]);
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    values.id = -1;
    if (producto.id) {
      values.id = producto.id;
    }
    const URL = `${PATH}/inventario/productos/`;
    axiosPost(URL, values, setLoading, setIsModalOpen);
    setWindowState(true);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal
        title="Productos"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form
          form={form}
          name="basic"
          initialValues={initialValues}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr 1fr",
            height: "auto",
            maxWidth: 600,
            gap: "30px",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            layout="vertical"
            label="Nombre"
            name="nombre"
            rules={[
              {
                required: true,
                message: "Ingrese el nombre!",
              },
            ]}
          >
            <Input style={{ height: "5vh" }} />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Stock"
            name="stock"
            rules={[
              {
                required: true,
                message: "Ingrese stock!",
              },
            ]}
          >
            <Input style={{ height: "5vh" }} />
          </Form.Item>

          <Form.Item
            layout="vertical"
            label="Precio"
            name="precio"
            rules={[
              {
                required: true,
                message: "Ingrese precio!",
              },
            ]}
          >
            <Input style={{ height: "5vh" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalAntd;
