import React from "react";
import styles from "./styles/Table.module.css";

interface TableProps {
  games: number;
  teamA: string;
  teamB: string;
  ph: number; // Probabilidad de jugar en casa
  pr: number; // Probabilidad de jugar de visita
  gameStatus: boolean[]; // Estados de los juegos (true = local, false = visita)
}

const Table: React.FC<TableProps> = ({ games, teamA, teamB, ph, pr, gameStatus }) => {
  const columns = Math.floor(games / 2) + 1; // Define el número maximo de columnas que tiene la tabla
  const qr = 1 - ph; 
  const qh = 1 - pr;

  // Matriz para almacenar las probabilidades reales
  const probabilities: number[][] = Array.from({ length: columns + 1 }, (_, i) =>
    Array(columns + 1).fill(0)
  );

  // Inicializamos las probabilidades de la fila 0 y columna 0
  for (let i = 0; i <= columns; i++) {
    probabilities[0][i] = 1; 
    probabilities[i][0] = 0; 
  }

  // Cálculo de la probabilidad real para cada celda
  const calculateProbability = (i: number, j: number): number => {
    const m = columns; // Valor máximo de las filas y columnas
    const gameNumber = (m - i) + (m - j) + 1; // Fórmula para calcular el juego actual
    const isLocal = gameStatus[gameNumber - 1]; // Estado del juego actual

    const fromTop = probabilities[i - 1]?.[j] || 0; // Probabilidad de arriba
    const fromLeft = probabilities[i]?.[j - 1] || 0; // Probabilidad de la izquierda

    if (isLocal) {
      return fromTop * ph + fromLeft * qr; // Fórmula para "Local"
    } else {
      return fromTop * pr + fromLeft * qh; // Fórmula para "Visita"
    }
  };

  // Rellenamos la matriz de probabilidades
  for (let i = 1; i <= columns; i++) {
    for (let j = 1; j <= columns; j++) {
      probabilities[i][j] = calculateProbability(i, j);
    }
  }

  return (
    <div className={styles.tableContainer}>
      {/* Muestra los nombres de los equipos */}
      <div className={styles.teamAName} style={{ color: "#11cc5f" }}>
        {teamA}
      </div>
      <div className={styles.teamBName} style={{ color: "#ecc114" }}>
        {teamB}
      </div>
      <div className={styles.layout}>
        {/* Tabla de probabilidades */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.cornerCell}></th>
              {[...Array(columns + 1)].map((_, i) => (
                <th key={i} className={styles.headerCell}>
                  {i}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(columns + 1)].map((_, i) => (
              <tr key={i}>
                <th className={styles.headerCell}>{i}</th>
                {[...Array(columns + 1)].map((_, j) => (
                  <td key={j} className={styles.cell}>
                    {/* Muestra el valor o el guion para las celdas iniciales */}
                    {i === 0 && j === 0
                      ? "-"
                      : i === 0
                      ? "1.0000"
                      : j === 0
                      ? "0.0000"
                      : probabilities[i][j].toFixed(4) // Probabilidades calculadas con 4 decimales
                      } 
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Contenedores de las probabilidades de casa y visita */}
        <div className={styles.probabilityContainer}>
          <div className={styles.probabilityColumn}>
            <h4>Probabilidad Casa</h4>
            <p>ph: {ph.toFixed(4)}</p>
            <p>qr: {qr.toFixed(4)}</p>
          </div>
          <div className={styles.probabilityColumn}>
            <h4>Probabilidad Visita</h4>
            <p>pr: {pr.toFixed(4)}</p>
            <p>qh: {qh.toFixed(4)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
