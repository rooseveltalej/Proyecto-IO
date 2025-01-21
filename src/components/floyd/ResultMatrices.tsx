import React from "react";

const ResultMatrices = ({ result }) => {
  if (!result) return null;

  return (
    <div>
      <h2>Result Matrix (Shortest Paths)</h2> 
      <table>
        <tbody>
          {result.map((row, i) => (
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
  );
};

export default ResultMatrices;
