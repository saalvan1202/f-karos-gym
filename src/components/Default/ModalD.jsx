import React, { Children, useEffect, useState } from "react";
import { Form, Input, Modal } from "antd";
import "./ModalAntd.css";
import { axiosPost } from "../../../public/helpers";
const ModalD = ({
  isModalOpen,
  setIsModalOpen,
  setWindowState,
  handleOk,
  handleCancel,
  title,
  children,
  width,
  action,
}) => {
  //Iniciamos la referencia del formulario

  const [loading, setLoading] = useState(false);

  //ESTADOS

  // const [initialValues, setInitialValues] = useState({
  //   id: -1,
  //   nombre: "",
  //   stock: "",
  //   precio: "",
  //   remember: true,
  // });
  // useEffect(() => {
  //   if (isModalOpen && producto) {
  //     // Solo actualiza si isModalOpen es true *y* hay un producto
  //     form.setFieldsValue(producto); // Usa form.setFieldsValue para actualizar los valores del formulario
  //   } else if (isModalOpen) {
  //     // Si es una creación, resetea los campos
  //     form.setFieldsValue({
  //       id: -1,
  //       nombre: "",
  //       stock: "",
  //       precio: "",
  //     });
  //   }
  // }, [producto, form]);

  return (
    <>
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        width={width}
        onCancel={handleCancel}
        confirmLoading={action}
        okText="Guardar"
        cancelText="Cancelar"
      >
        {children}
      </Modal>
    </>
  );
};
export default ModalD;
