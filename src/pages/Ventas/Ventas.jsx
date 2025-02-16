import { PlusOutlined, TruckFilled } from "@ant-design/icons";
import { Button } from "antd";
import "./Ventas.css";
import TableV from "./components/TableV";
import { useState } from "react";
import ButtonAntd from "../../components/Default/ButtonAntd";
import MenuPrincipal from "../../components/MenuPrincipal";
export default function Ventas() {
  //ESTADOS
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detalle, setDetalle] = useState([]);
  const [total, setTotal] = useState(0);
  const [idVenta, setIdVenta] = useState(-1);
  return (
    <MenuPrincipal>
      <div className="ventas">
        <div className="ventas-header">
          <div>
            <h1>Ventas</h1>
          </div>
          <ButtonAntd
            type="primary"
            fn={() => {
              setIsModalOpen(true);
              setDetalle([]);
              setTotal(0);
              setIdVenta(-1);
            }}
          >
            <PlusOutlined />
            Nueva Venta
          </ButtonAntd>
        </div>
        <div>
          <TableV
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            detalle={detalle}
            setDetalle={setDetalle}
            total={total}
            setTotal={setTotal}
            idVenta={idVenta}
            setIdVenta={setIdVenta}
          />
        </div>
      </div>
    </MenuPrincipal>
  );
}
