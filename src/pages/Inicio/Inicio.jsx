import { Card } from "antd";

export default function Inicio() {
  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
      }}
    >
      <Card
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <h2>Bienvenido al sistema de ventas</h2>
      </Card>
    </div>
  );
}
