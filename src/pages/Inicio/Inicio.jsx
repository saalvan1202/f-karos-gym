import { Card } from "antd";
import MenuPrincipal from "../../components/MenuPrincipal";
import TableResumen from "./components/TableResumen";
import TableStock from "./components/TableStock";
import "./Inicio.css";
export default function Inicio() {
  return (
    <MenuPrincipal>
      <div
        style={{
          padding: "20px",
        }}
      >
        <Card
          style={{
            boxShadow: "0 4px 8px rgba(14, 55, 116, 0.47)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <h2>Bienvenido al sistema de ventas</h2>
        </Card>
      </div>
      <div
        className="tables-inicio"
        style={{ padding: "20px", paddingTop: "0px" }}
      >
        <TableResumen />
        <TableStock />
      </div>
    </MenuPrincipal>
  );
}
