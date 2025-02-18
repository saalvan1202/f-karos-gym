import { Card, DatePicker, Select, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { axiosGet, PATH } from "../../../../public/helpers";

export default function TableResumen() {
  const [data, setData] = useState([]);
  const [state, setState] = useState(false);
  const columns = [
    {
      title: "Producto",
      dataIndex: "nombre",
      key: "age",
    },
    {
      title: "Salidas",
      dataIndex: "SumCantidad",
      key: "address",
    },
  ];
  //FUNCIONES
  function getResumen() {
    const URL = `${PATH}/ventas/resumen/`;
    axiosGet(URL, setState, setData);
  }
  useEffect(() => {
    getResumen();
  }, []);
  if (!state) {
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
        <span>Cargando Stock...</span>
      </div>
    );
  }
  return (
    <div>
      <h4>Resumen</h4>

      <Card
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
          marginTop: "10px",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <DatePicker
          style={{ width: "40%" }}
          placeholder="Seleccione el día"
        ></DatePicker>
        <Table
          columns={columns}
          style={{ marginTop: "20px" }}
          dataSource={data}
        />
      </Card>
    </div>
  );
}
