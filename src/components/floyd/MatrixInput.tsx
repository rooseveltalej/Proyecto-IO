import React, { useState, useEffect } from "react";

const MatrixInput = ({ matrix, handleInputChange }) => {
  const [nodeNames, setNodeNames] = useState([]);

  // Sincroniza los nombres de los nodos con el tamaño de la matriz
  useEffect(() => {
    setNodeNames((prev) => {
      const newNames = [...prev];
      for (let i = prev.length; i < matrix.length; i++) {
        newNames.push(String.fromCharCode(65 + i));
      }
      return newNames.slice(0, matrix.length); // Ajusta el tamaño si la matriz se reduce
    });
  }, [matrix]);

  const handleNodeNameChange = (index, newName) => {
    setNodeNames((prev) => {
      const updated = [...prev];
      updated[index] = newName || String.fromCharCode(65 + index); // Valor predeterminado si está vacío
      return updated;
    });
  };

  return (
    <div>
      <h2>Input Matrix (Adjacency)</h2>
      <table>
        <thead>
          <tr>
            <th></th> {/* Celda vacía en la esquina superior izquierda */}
            {nodeNames.map((name, index) => (
              <th key={index}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNodeNameChange(index, e.target.value)}
                  style={{ width: "30px", textAlign: "center" }}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              <th>
                <input
                  type="text"
                  value={nodeNames[i]}
                  onChange={(e) => handleNodeNameChange(i, e.target.value)}
                  style={{ width: "30px", textAlign: "center" }}
                />
              </th>
              {row.map((value, j) => (
                <td key={j}>
                  <input
                    type="text"
                    value={value === Infinity ? "" : value}
                    onChange={(e) =>
                      handleInputChange(i, j, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixInput;
