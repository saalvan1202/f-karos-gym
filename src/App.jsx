import React, { useState } from "react";
import "./App.css";
import MenuPrincipal from "./components/MenuPrincipal";
import Productos from "./pages/Inventario/Productos";
import Ventas from "./pages/Ventas/Ventas";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio/Inicio";

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
    <Router>
      <div className="App">
        <MenuPrincipal />
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/productos" element={<Productos />}></Route>
          <Route path="/ventas" element={<Ventas />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
