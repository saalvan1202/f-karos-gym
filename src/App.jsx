import React, { useState } from "react";
import InventoryTable from "./components/InventoryTable";
import "./App.css";
import ExportToExcel from "./utils/ExportToExcel";
import MenuPrincipal from "./components/MenuPrincipal";
import Productos from "./components/Productos";

function App() {
  const [inventory, setInventory] = useState([]); // Inventory data
  const [sales, setSales] = useState([]); // Sales data

  // Handle adding a new product to inventory
  const addProduct = (product) => {
    setInventory([...inventory, product]);
  };

  // Handle registering a sale
  const registerSale = (sale) => {
    const updatedInventory = inventory.map((item) => {
      if (item.name === sale.productName) {
        if (item.stock < sale.quantity) {
          alert("Stock insuficiente");
          return item;
        }
        return { ...item, stock: item.stock - sale.quantity };
      }
      return item;
    });
    setInventory(updatedInventory);
    setSales([...sales, sale]);
  };

  return (
    <div className="App">
      <MenuPrincipal />
      <Productos />
    </div>
  );
}

export default App;
