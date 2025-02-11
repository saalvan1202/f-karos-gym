import React, { useState } from "react";
import { Form, Input, Modal } from "antd";
import "./ModalAntd.css";
import { axiosPost } from "../../../public/helpers";
const ModalAntd = ({ isModalOpen, setIsModalOpen, setWindowState }) => {
  //Iniciamos la referencia del formulario
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log(values);
    const URL = "http://127.0.0.1:8000/inventario/productos/";
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
          initialValues={{
            remember: true,
          }}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr 1fr",
            height: 260,
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
