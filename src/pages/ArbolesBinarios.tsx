import { Input, Button } from "react-daisyui";
import { useState } from "react";
import { calcularTablas } from "../components/arbolesBinarios";

function ArbolesBinarios() {
  const [numLlaves, setNumLlaves] = useState<number>(0);
  const [llaves, setLlaves] = useState<string[]>([]);
  const [pesos, setPesos] = useState<number[]>([]);
  const [tablaA, setTablaA] = useState<number[][]>([]);
  const [tablaR, setTablaR] = useState<number[][]>([]);
  const [llavesOrdenadas, setLlavesOrdenadas] = useState<string[]>([]);

  const handleSubmit = () => {
    const result = calcularTablas(llaves, pesos);
    setTablaA(result.tablaA);
    setTablaR(result.tablaR);
    setLlavesOrdenadas(result.llavesOrdenadas);
  };

  return (
    <div className="app-container bg-slate-800 text-white min-h-screen p-8">
      <header className="app-header text-center mb-6">
        <h1 className="title text-4xl font-bold">Árboles Binarios Óptimos</h1>
        <p className="subtitle text-lg">Ingrese las llaves y sus pesos para calcular las tablas.</p>
      </header>

      <div className="form-container flex flex-col items-center gap-6">
        {/* Input para el número de llaves */}
        <div className="input-group w-full max-w-lg">
          <label className="input-label text-lg font-medium">Número de llaves (máximo 10):</label>
          <Input
            type="number"
            value={numLlaves}
            onChange={(e) => {
              const value = Math.min(Number(e.target.value), 10); // Máximo 10 llaves
              setNumLlaves(value);
              setLlaves(Array(value).fill(""));
              setPesos(Array(value).fill(0));
            }}
            min={1}
            max={10}
            className="input-field w-full mt-2"
          />
        </div>

        {/* Inputs para llaves y pesos */}
        {Array.from({ length: numLlaves }).map((_, i) => (
          <div key={i} className="input-pair flex w-full max-w-lg gap-4">
            <div className="input-group w-1/2">
              <label className="input-label text-md font-medium">Llave {i + 1}:</label>
              <Input
                type="text"
                value={llaves[i]}
                onChange={(e) => {
                  const newLlaves = [...llaves];
                  newLlaves[i] = e.target.value;
                  setLlaves(newLlaves);
                }}
                className="input-field w-full mt-2"
              />
            </div>
            <div className="input-group w-1/2">
              <label className="input-label text-md font-medium">Peso {i + 1}:</label>
              <Input
                type="number"
                step="0.01"
                value={pesos[i]}
                onChange={(e) => {
                  const newPesos = [...pesos];
                  newPesos[i] = parseFloat(e.target.value) || 0;
                  setPesos(newPesos);
                }}
                className="input-field w-full mt-2"
              />
            </div>
          </div>
        ))}

        <Button
          className="generate-button bg-slate-600 hover:bg-slate-500 mt-4"
          onClick={handleSubmit}
          disabled={llaves.some((llave) => llave === "") || pesos.some((peso) => peso <= 0)}
        >
          Generar Tablas
        </Button>
      </div>

      {/* Mostrar las llaves ordenadas */}
      {llavesOrdenadas.length > 0 && (
        <div className="results-container mt-10">
          <h3 className="results-title text-2xl font-bold mb-4">Llaves Ordenadas</h3>
          <ul className="keys-list text-lg">
            {llavesOrdenadas.map((llave, idx) => (
              <li key={idx} className="key-item">
                Llave {idx + 1}: {llave}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Resultados */}
      {tablaA.length > 0 && (
        <div className="tables-container mt-10">
          <h2 className="tables-title text-3xl font-bold mb-6">Resultados</h2>

          <div className="table-wrapper">
            <h3 className="table-title text-2xl font-semibold mb-4">Tabla A (Costos)</h3>
            <table className="results-table border-collapse border border-slate-500 w-full text-center">
              <tbody>
                {tablaA.map((fila, i) => (
                  <tr key={i}>
                    {fila.map((valor, j) => (
                      <td key={j} className="border border-slate-400 p-2">
                        {valor.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-wrapper mt-6">
            <h3 className="table-title text-2xl font-semibold mb-4">Tabla R (Raíces)</h3>
            <table className="results-table border-collapse border border-slate-500 w-full text-center">
              <tbody>
                {tablaR.map((fila, i) => (
                  <tr key={i}>
                    {fila.map((valor, j) => (
                      <td key={j} className="border border-slate-400 p-2">
                        {valor}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArbolesBinarios;
