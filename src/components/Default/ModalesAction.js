import { Modal } from "antd";

export const warning = (title, content, onOk) => {
  Modal.warning({
    title: title,
    content: content,
    onOk() {
      onOk();
    },
  });
};
