import { Card, Select, Spin, Table } from "antd";
import { axiosGet, PATH } from "../../../../public/helpers";
import { useEffect, useState } from "react";

export default function TableStock() {
  //ESTADOS
  const [state, setState] = useState(false);
  const [data, setData] = useState([]);
  const [productos, setProductos] = useState([]);
  const columns = [
    {
      title: "Producto",
      dataIndex: "nombre",
      key: "age",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "address",
    },
  ];

  async function getProductoStock() {
    const URL = `${PATH}/inventario/productos`;
    await axiosGet(URL, setState, setProductos);
    setData(data);
  }
  function filterProductos(value) {
    const index = data.findIndex((item) => item.id == value);
    if (index >= 0) {
      setData([data[index]]);
    }
  }
  useEffect(() => {
    getProductoStock();
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
      <h4>Stock</h4>
      <Card
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", width: "100%" }}
      >
        <Select
          showSearch
          style={{ width: "40%" }}
          placeholder="Seleccione el producto"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            (optionA.children ?? "")
              .toLowerCase()
              .localeCompare((optionB.children ?? "").toLowerCase())
          }
          onChange={(e) => {
            filterProductos(e);
          }}
        >
          <Select.Option value={-1} key={100}>
            TODOS
          </Select.Option>
          {data.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.nombre}
            </Select.Option>
          ))}
        </Select>
        <Table
          scroll={{
            y: 50 * 5,
          }}
          columns={columns}
          dataSource={productos}
          style={{ marginTop: "20px" }}
        />
      </Card>
    </div>
  );
}
