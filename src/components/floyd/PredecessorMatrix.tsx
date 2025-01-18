import React from "react";

const PredecessorMatrix = ({ predecessorMatrix }) => {
  if (!predecessorMatrix) return null;

  return (
    <div>
      <h2>Predecessor Matrix (P)</h2>
      <table>
        <tbody>
          {predecessorMatrix.map((row, i) => (
            <tr key={i}>
              {row.map((value, j) => (
                <td key={j}>{value === -1 ? "N/A" : value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredecessorMatrix;
