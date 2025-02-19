import { Card, Select, Spin, Table } from "antd";
import { axiosGet, PATH } from "../../../../public/helpers";
import { useEffect, useState } from "react";
import axios from "axios";

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
    setState(false);
    try {
      const response = await axios.get(URL);
      setData(response.data);
      setProductos(response.data);
      setState(true);
    } catch (error) {
      console.log(error);
    }
  }
  function filterProductos(value) {
    setData([...productos]);
    const index = productos.findIndex((item) => item.id == value);
    if (index >= 0) {
      setData([productos[index]]);
    }
  }
  useEffect(() => {
    getProductoStock();
  }, []);
  return (
    <div>
      <h4>Stock</h4>
      <Card
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)", maxWidth: "100%" }}
      >
        <Select
          showSearch
          style={{ width: "40%", minWidth: "140px" }}
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
            setData(productos);
            filterProductos(e);
          }}
        >
          <Select.Option value={-1} key={-1}>
            TODOS
          </Select.Option>
          {productos.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.nombre}
            </Select.Option>
          ))}
        </Select>
        <Table
          pagination={{
            pageSize: 50,
          }}
          loading={!state}
          columns={columns}
          dataSource={data}
          style={{ marginTop: "20px", width: "100%" }}
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
