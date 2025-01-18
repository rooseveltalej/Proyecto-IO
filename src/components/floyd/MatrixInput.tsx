import React from "react";

const MatrixInput = ({ matrix, handleInputChange }) => {
  return (
    <div>
      <h2>Input Matrix (Adjacency)</h2>
      <table>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
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
