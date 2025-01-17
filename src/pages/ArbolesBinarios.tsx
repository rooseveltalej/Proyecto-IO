import { Input, Button } from 'react-daisyui';
import { useState } from 'react';
import { calcularTablas } from "../components/arbolesBinarios";

function ArbolesBinarios() {
  const [numLlaves, setNumLlaves] = useState<number>(0);
  const [llaves, setLlaves] = useState<string[]>([]);
  const [pesos, setPesos] = useState<number[]>([]);
  const [tablaA, setTablaA] = useState<number[][]>([]);
  const [tablaR, setTablaR] = useState<number[][]>([]);

  const handleSubmit = () => {
    const result = calcularTablas(llaves, pesos);
    setTablaA(result.tablaA);
    setTablaR(result.tablaR);
  };

  return (
    <div className="bg-slate-800 text-white min-h-screen p-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold mb-4">Árboles Binarios de Búsqueda Óptimos</h1>
        <p>Ingrese los datos y genere las tablas A y R.</p>
      </header>

      <div className="flex flex-col items-center gap-4 mt-6">
        {/* Input para el número de llaves */}
        <div className="flex flex-col items-start w-1/2">
          <label>Número de llaves:</label>
          <Input
            type="number"
            value={numLlaves}
            onChange={(e) => setNumLlaves(Number(e.target.value))}
            min={1}
            max={10}
            className="w-full"
          />
        </div>

        {/* Inputs para llaves y pesos */}
        {Array.from({ length: numLlaves }).map((_, i) => (
          <div key={i} className="flex gap-4 w-1/2">
            <div className="flex flex-col w-full">
              <label>Llave {i + 1}:</label>
              <Input
                type="text"
                onChange={(e) => {
                  const newLlaves = [...llaves];
                  newLlaves[i] = e.target.value;
                  setLlaves(newLlaves);
                }}
                className="w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label>Peso {i + 1}:</label>
              <Input
                type="number"
                step="0.01"
                onChange={(e) => {
                  const newPesos = [...pesos];
                  newPesos[i] = parseFloat(e.target.value);
                  setPesos(newPesos);
                }}
                className="w-full"
              />
            </div>
          </div>
        ))}

        <Button className="bg-slate-600 hover:bg-slate-500 mt-4" onClick={handleSubmit}>
          Generar Tablas
        </Button>
      </div>

      {/* Resultados */}
      {tablaA.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Resultados</h2>
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-bold">Tabla A</h3>
              <table className="table-auto border-collapse border border-slate-500 mt-4 w-full text-center">
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

            <div>
              <h3 className="text-xl font-bold">Tabla R</h3>
              <table className="table-auto border-collapse border border-slate-500 mt-4 w-full text-center">
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
        </div>
      )}
    </div>
  );
}

export default ArbolesBinarios;
