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
      <table
        style={{ borderCollapse: "collapse", width: "100%", color: "white" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid white", padding: "12px" }}>
              Límite de la mochila
            </th>
            {Array.from({ length: numVariables }, (_, index) => (
              <th
                key={index}
                style={{ border: "1px solid white", padding: "12px" }}
              >
                x<sub>{index + 1}</sub>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((row, w) => (
            <tr key={w}>
              <td style={{ border: "1px solid white", padding: "12px" }}>
                {w}
              </td>
              {Array.from({ length: numVariables }, (_, i) => (
                <td
                  key={i}
                  style={{
                    border: "1px solid white",
                    padding: "12px",
                    backgroundColor: count[w][i + 1] > 0 ? "green" : "red",
                    color:
                      w === mochilaLimit &&
                      values[w][i + 1] === targetValue &&
                      count[w][i + 1] !== 0
                        ? "yellow"
                        : "white",
                  }}
                >
                  {values[w][i + 1]}, x<sub>{i + 1}</sub> ={" "}
                  {count[w][i + 1] || 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Solución Final</h3>
      <table
        style={{ borderCollapse: "collapse", width: "100%", color: "white" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid white", padding: "12px" }}>
              Variable
            </th>
            <th style={{ border: "1px solid white", padding: "12px" }}>
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            let remainingCapacity = mochilaLimit;
            const solution = new Array(numVariables).fill(0);

            // Revisar de atrás hacia adelante para determinar las cantidades seleccionadas
            for (let i = numVariables; i > 0; i--) {
              // Verificar si la variable fue seleccionada
              if (count[remainingCapacity] && count[remainingCapacity][i] > 0) {
                solution[i - 1] = count[remainingCapacity][i]; // Guardar la cantidad óptima de la variable
                remainingCapacity -= count[remainingCapacity][i] * i; // Reducir capacidad de la mochila
              }
            }

            // Renderizar la solución final en la tabla
            return solution.map((value, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid white", padding: "12px" }}>
                  x<sub>{index + 1}</sub>
                </td>
                <td style={{ border: "1px solid white", padding: "12px" }}>
                  {value}
                </td>
              </tr>
            ));
          })()}
        </tbody>
      </table>

      <h3>Solución Final</h3>
      <table
        style={{ borderCollapse: "collapse", width: "100%", color: "white" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid white", padding: "12px" }}>
              Variable
            </th>
            <th style={{ border: "1px solid white", padding: "12px" }}>
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            let remainingCapacity = mochilaLimit;
            const solution = new Array(numVariables).fill(0);
            let optimalValue = Math.max(...values[mochilaLimit].slice(1));

            // Encontrar la columna óptima (donde está el valor amarillo)
            let optimalColumnIndex = values[mochilaLimit].indexOf(optimalValue);

            // Reducir capacidad según la columna óptima
            remainingCapacity -=
              count[mochilaLimit][optimalColumnIndex] * optimalColumnIndex;
            solution[optimalColumnIndex - 1] =
              count[mochilaLimit][optimalColumnIndex];

            // Evaluamos las columnas a la izquierda de la óptima
            for (let i = optimalColumnIndex - 1; i > 0; i--) {
              if (count[remainingCapacity][i] > 0) {
                solution[i - 1] = count[remainingCapacity][i];
                remainingCapacity -= count[remainingCapacity][i] * i;
              }
            }

            // Renderizar la solución con Z incluida
            return (
              <>
                <tr>
                  <td style={{ border: "1px solid white", padding: "12px" }}>
                    Z
                  </td>
                  <td style={{ border: "1px solid white", padding: "12px" }}>
                    {optimalValue}
                  </td>
                </tr>
                {solution.map((value, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid white", padding: "12px" }}>
                      x<sub>{index + 1}</sub>
                    </td>
                    <td style={{ border: "1px solid white", padding: "12px" }}>
                      {value}
                    </td>
                  </tr>
                ))}
              </>
            );
          })()}
        </tbody>
      </table>

      <h3>Solución Final</h3>
      <table
        style={{ borderCollapse: "collapse", width: "100%", color: "white" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid white", padding: "12px" }}>
              Variable
            </th>
            <th style={{ border: "1px solid white", padding: "12px" }}>
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            let remainingCapacity = mochilaLimit;
            const solution = new Array(numVariables).fill(0);
            let optimalValue = Math.max(...values[mochilaLimit].slice(1));

            // Encontrar la columna óptima (donde está el valor amarillo)
            let optimalColumnIndex = values[mochilaLimit].indexOf(optimalValue);

            // Tomamos la cantidad óptima de la variable seleccionada
            solution[optimalColumnIndex - 1] =
              count[mochilaLimit][optimalColumnIndex];
            remainingCapacity -=
              solution[optimalColumnIndex - 1] * optimalColumnIndex;

            // Evaluar las columnas a la izquierda de la solución óptima
            for (let i = optimalColumnIndex - 1; i > 0; i--) {
              if (remainingCapacity > 0 && count[remainingCapacity][i] > 0) {
                solution[i - 1] = count[remainingCapacity][i];
                remainingCapacity -= solution[i - 1] * i; // Usamos el índice como peso
              }
            }

            // Renderizar la solución con Z incluida
            return (
              <>
                <tr>
                  <td style={{ border: "1px solid white", padding: "12px" }}>
                    Z
                  </td>
                  <td style={{ border: "1px solid white", padding: "12px" }}>
                    {optimalValue}
                  </td>
                </tr>
                {solution.map((value, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid white", padding: "12px" }}>
                      x<sub>{index + 1}</sub>
                    </td>
                    <td style={{ border: "1px solid white", padding: "12px" }}>
                      {value}
                    </td>
                  </tr>
                ))}
              </>
            );
          })()}
        </tbody>
      </table>
    </div>
  );
};

export default KnapsackTable;
