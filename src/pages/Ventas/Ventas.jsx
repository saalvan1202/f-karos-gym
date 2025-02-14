import { PlusOutlined, TruckFilled } from "@ant-design/icons";
import { Button } from "antd";
import "./Ventas.css";
import TableV from "./components/TableV";
import { useState } from "react";
export default function Ventas() {
  //ESTADOS
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="ventas">
      <div className="ventas-header">
        <div>
          <h1>Ventas</h1>
        </div>
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <PlusOutlined />
          Nueva Venta
        </Button>
      </div>
      <div>
        <TableV isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
    </div>
  );
}
