import React from "react";

type KnapsackTableProps = {
  values: number[][];
  count: number[][];
  numVariables: number;
  mochilaLimit: number;
  objective: string;
};

const KnapsackTable: React.FC<KnapsackTableProps> = ({
  values,
  count,
  numVariables,
  mochilaLimit,
  objective,
}) => {
  const highlightValue = () => {
    return objective === "Maximizar"
      ? Math.max(...values[mochilaLimit].slice(1))
      : Math.min(...values[mochilaLimit].slice(1));
  };

  const targetValue = highlightValue();

  return (
    <div style={{ marginTop: "20px", fontFamily: "Arial, sans-serif" }}>
      <h3>Tabla Fusionada</h3>
      <table style={{ borderCollapse: "collapse", width: "100%", color: "white" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid white", padding: "12px" }}>Límite  de la mochila</th>
            {Array.from({ length: numVariables }, (_, index) => (
              <th key={index} style={{ border: "1px solid white", padding: "12px" }}>
                x<sub>{index + 1}</sub>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((row, w) => (
            <tr key={w}>
              <td style={{ border: "1px solid white", padding: "12px" }}>{w}</td>
              {Array.from({ length: numVariables }, (_, i) => (
                <td
                  key={i}
                  style={{
                    border: "1px solid white",
                    padding: "12px",
                    backgroundColor: count[w][i + 1] > 0 ? "green" : "red",
                    color: w === mochilaLimit && values[w][i + 1] === targetValue ? "yellow" : "white",
                  }}
                >
                  {values[w][i + 1]}, x<sub>{i + 1}</sub> = {count[w][i + 1] || 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KnapsackTable;