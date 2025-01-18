import React, { useState } from "react";
import NodeSelector from "../components/floyd/NodeSelector";
import MatrixInput from "../components/floyd/MatrixInput";
import IntermediateMatrices from "../components/floyd/IntermediateMatrices";
import ResultMatrices from "../components/floyd/ResultMatrices";
import PredecessorMatrix from "../components/floyd/PredecessorMatrix";
import "../components/floyd/Styles/Rutas.css";

const Rutas = () => {
  const [nodeCount, setNodeCount] = useState(5);
  const [matrix, setMatrix] = useState([
    [0, 6, Infinity, 4, 7],
    [9, 0, 7, Infinity, Infinity],
    [Infinity, 5, 0, Infinity, 14],
    [8, 1, Infinity, 0, 15],
    [2, Infinity, 2, 19, 0],
  ]);
  const [result, setResult] = useState(null); // Guardar la matriz de resultados
  const [predecessorMatrix, setPredecessorMatrix] = useState(null); // Guardar la matriz de predecesores
  const [intermediateMatrices, setIntermediateMatrices] = useState([]); // Guardar las matrices intermedias

  const initializeMatrix = (count) => {
    const newMatrix = Array.from({ length: count }, (_, i) =>
      Array.from({ length: count }, (_, j) => (i === j ? 0 : Infinity))
    );
    setMatrix(newMatrix);
    setResult(null);
    setPredecessorMatrix(null);
    setIntermediateMatrices([]);
  };

  const floydWarshall = (graph) => {
    const nodes = graph.length; // Número de nodos
    const dist = Array.from({ length: nodes }, (_, i) => graph[i].slice()); // Inicializar la matriz de distancias
    const pred = Array.from({ length: nodes }, (_, i) => 
      Array.from({ length: nodes }, (_, j) => (i !== j && graph[i][j] !== Infinity ? i : -1)) // Inicializar la matriz de predecesores
    );
    const intermediates = [];

    for (let k = 0; k < nodes; k++) {
      const currentMatrix = Array.from({ length: nodes }, (_, i) => 
        dist[i].slice() // Copiar la matriz actual
      );
      intermediates.push(currentMatrix); // Guardar \( D(k) \)

      for (let i = 0; i < nodes; i++) { // Recorrer la matriz
        for (let j = 0; j < nodes; j++) { 
          if (dist[i][k] + dist[k][j] < dist[i][j]) { // Si el camino es más corto
            dist[i][j] = dist[i][k] + dist[k][j]; // Actualizar la distancia
            pred[i][j] = pred[k][j]; // Actualizar el predecesor
          }
        }
      }
    }

    setIntermediateMatrices(intermediates); // Guardar las matrices intermedias
    setPredecessorMatrix(pred); // Guardar la matriz de predecesores
    return dist;
  };

  const handleRun = () => {
    const resultMatrix = floydWarshall(matrix); // Ejecutar el algoritmo
    setResult(resultMatrix); // Guardar la matriz de resultados
  };

  const handleInputChange = (row, col, value) => { // Actualizar la matriz
    const updatedMatrix = [...matrix]; // Copiar la matriz
    updatedMatrix[row][col] = value === "" ? Infinity : parseInt(value, 10);
    setMatrix(updatedMatrix);
  };

  const handleNodeCountChange = (e) => { // Actualizar el número de nodos
    const count = parseInt(e.target.value, 10);
    setNodeCount(count);
    initializeMatrix(count);
  };

  return (
    <div className="App">
      <h1>Floyd-Warshall Algorithm</h1>
      <NodeSelector
        nodeCount={nodeCount}
        handleNodeCountChange={handleNodeCountChange}
      />
      <MatrixInput matrix={matrix} handleInputChange={handleInputChange} />
      <button onClick={handleRun}>Run Floyd-Warshall</button>
      <IntermediateMatrices intermediateMatrices={intermediateMatrices} />
      <PredecessorMatrix predecessorMatrix={predecessorMatrix} />
      <ResultMatrices result={result} />
    </div>
  );
};

export default Rutas;