import React from "react";

const IntermediateMatrices = ({ intermediateMatrices }) => {
  if (intermediateMatrices.length === 0) return null;

  return (
    <div>
      <h2>Intermediate Matrices</h2>
      {intermediateMatrices.map((matrix, k) => (
        <div key={k}>
          <h3>D({k})</h3>
          <table>
            <tbody>
              {matrix.map((row, i) => (
                <tr key={i}>
                  {row.map((value, j) => (
                    <td key={j}>
                      {value === Infinity ? "∞" : value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default IntermediateMatrices;
