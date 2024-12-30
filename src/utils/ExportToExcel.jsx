import React from "react";
import * as XLSX from "xlsx";

function ExportToExcel({ data, fileName, label }) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <button
      onClick={handleExport}
      style={{
        margin: "10px",
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
      }}
    >
      {label}
    </button>
  );
}

export default ExportToExcel;
