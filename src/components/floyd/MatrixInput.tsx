import React from "react";

const MatrixInput = ({ matrix, handleInputChange }) => {
  const getNodeName = (index) => String.fromCharCode(65 + index);

  return (
    <div>
      <h2>Input Matrix (Adjacency)</h2>
      <table>
        <thead>
          <tr>
            <th></th> {/* Celda vacía en la esquina superior izquierda */}
            {matrix.map((_, index) => (
              <th key={index}>{getNodeName(index)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              <th>{getNodeName(i)}</th>
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