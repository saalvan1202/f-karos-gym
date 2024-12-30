import React, { useState } from "react";

function InventoryTable({ inventory, addProduct }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: 0,
    price: 0,
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === "stock" || name === "price" ? parseFloat(value) : value,
    });
  };

  const handleImageUpload = (e) => {
    setNewProduct({
      ...newProduct,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.stock <= 0 || newProduct.price <= 0) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }
    addProduct(newProduct);
    setNewProduct({ name: "", stock: 0, price: 0, image: null });
  };

  return (
    <div>
      <h2>Inventario</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.price}</td>
              <td>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "50px" }}
                  />
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Agregar Producto</h3>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Cantidad en stock"
          value={newProduct.stock}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={handleAddProduct}>Agregar</button>
      </div>
    </div>
  );
}

export default InventoryTable;
