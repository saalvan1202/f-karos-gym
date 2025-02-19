import { Card, DatePicker, Select, Spin, Table } from "antd";
import { useEffect, useState } from "react";
import { axiosGet, PATH } from "../../../../public/helpers";
import moment from "moment";
export default function TableResumen() {
  const [data, setData] = useState();
  const [state, setState] = useState(false);
  const [fecha, setFecha] = useState(moment().format("YYYY-MM-DD"));
  const columns = [
    {
      title: "Producto",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Salidas",
      dataIndex: "SumCantidad",
      key: "salidas",
    },
  ];
  //FUNCIONES
  function getResumen() {
    const URL = `${PATH}/ventas/resumen/?fecha=${fecha}`;
    axiosGet(URL, setState, setData);
  }
  useEffect(() => {
    if (fecha) {
      getResumen();
    }
  }, [fecha]);
  return (
    <div>
      <h4>Resumen</h4>

      <Card
        style={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
          marginTop: "10px",
          marginBottom: "20px",
          maxWidth: "100%",
        }}
      >
        <DatePicker
          onChange={(e) => {
            const formattedDate = new Date(e).toISOString().split("T")[0];
            setFecha(formattedDate);
          }}
          format="YYYY-MM-DD"
          style={{ width: "40%", minWidth: "140px" }}
          defaultValue={moment()}
          placeholder="Seleccione el día"
        ></DatePicker>
        <Table
          pagination={{
            pageSize: 10,
          }}
          loading={!state}
          columns={columns}
          style={{ marginTop: "20px", width: "100%" }}
          dataSource={data}
          size="small"
          components={{
            header: {
              cell: (props) => (
                <th
                  {...props}
                  style={{ backgroundColor: "#0e3774", color: "#fff" }}
                />
              ),
            },
          }}
        />
      </Card>
    </div>
  );
}
