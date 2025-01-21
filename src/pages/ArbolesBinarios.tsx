import { Input, Button } from "react-daisyui";
import { useState } from "react";
import { calcularTablas } from "../components/arbolesBinarios/logicArboles";
import { saveAs } from "file-saver";
import "../components/arbolesBinarios/style.css";

function ArbolesBinarios() {
  const [numLlaves, setNumLlaves] = useState<number>(0);
  const [llaves, setLlaves] = useState<string[]>([]);
  const [pesos, setPesos] = useState<number[]>([]);
  const [tablaA, setTablaA] = useState<number[][]>([]);
  const [tablaR, setTablaR] = useState<number[][]>([]);
  const [llavesOrdenadas, setLlavesOrdenadas] = useState<string[]>([]);
  const [arbol, setArbol] = useState<any>(null);

  //llama a la funcion para generar la respuestas: tablas, llaves ordenadas y la estructura del arbol
  const handleSubmit = () => {
    const result = calcularTablas(llaves, pesos);
    setTablaA(result.tablaA);
    setTablaR(result.tablaR);
    setLlavesOrdenadas(result.llavesOrdenadas);
    setArbol(result.arbol);
  };

  //Guarda los datos ingresados al fromulario y permite descargarlos en fromato JSON
  const handleExport = () => {
    const data = { llaves, pesos };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    saveAs(blob, "datos_entrada.json");
  };

  //Toma los datos de un archivo JSON para generar respuesta de un ejercicio de manera mas rapida
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target?.result as string);
        setLlaves(data.llaves);
        setPesos(data.pesos);
        setNumLlaves(data.llaves.length);
      };
      reader.readAsText(file);
    }
  };

  //Renderiza el arbol obtenido de la respuesta para mostrarlo graficamente
  const renderArbol = (nodo: any): JSX.Element | null => {
    if (!nodo) return null;
    return (
      <div className="tree-node">
        <div className="tree-node-data">{nodo.llave}</div>
        <div className="tree-node-children">
          <div className="tree-node-left">
            {nodo.izquierda && renderArbol(nodo.izquierda)}
          </div>
          <div className="tree-node-right">
            {nodo.derecha && renderArbol(nodo.derecha)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
    <header className="app-header">
      <h1 className="title">Árboles Binarios Óptimos</h1>
      <p className="subtitle">Ingrese las llaves y sus pesos para calcular las tablas.</p>
    </header>

    <div className="main-layout">
      {/* Sección Izquierda: Formulario */}
      <div className="section-left">
        <div className="form-container">
          <div className="input-group">
            <label className="input-label">Número de llaves (máximo 10):</label>
            <Input
              type="number"
              value={numLlaves}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), 10);
                setNumLlaves(value);
                setLlaves(Array(value).fill(""));
                setPesos(Array(value).fill(0));
              }}
              min={1}
              max={10}
              className="input-field"
            />
          </div>

          {Array.from({ length: numLlaves }).map((_, i) => (
            <div key={i} className="input-pair">
              <div className="input-group">
                <label className="input-label">Llave {i + 1}:</label>
                <Input
                  type="text"
                  value={llaves[i]}
                  onChange={(e) => {
                    const newLlaves = [...llaves];
                    newLlaves[i] = e.target.value;
                    setLlaves(newLlaves);
                  }}
                  className="input-field"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Peso {i + 1}:</label>
                <Input
                  type="number"
                  step="0.01"
                  value={pesos[i]}
                  onChange={(e) => {
                    const newPesos = [...pesos];
                    newPesos[i] = parseFloat(e.target.value) || 0;
                    setPesos(newPesos);
                  }}
                  className="input-field"
                />
              </div>
            </div>
          ))}

          <Button className="generate-button" onClick={handleSubmit}>
            Generar Tablas
          </Button>
          <Button className="export-button" onClick={handleExport}>
            Exportar JSON
          </Button>
          <Input type="file" accept="application/json" onChange={handleImport} className="import-input" />
        </div>
      </div>

      {/* Sección Derecha: Respuestas */}
      <div className="section-right">
        {llavesOrdenadas.length > 0 && (
          <>
            <h3 className="results-title">Llaves Ordenadas</h3>
            <ul className="keys-list">
              {llavesOrdenadas.map((llave, idx) => (
                <li key={idx} className="key-item">
                  Llave {idx + 1}: {llave}
                </li>
              ))}
            </ul>
          </>
        )}

        {tablaA.length > 0 && (
          <div className="tables-container">
            <h2 className="tables-title">Resultados</h2>
            <div className="table-wrapper">
              <h3 className="table-title">Tabla A (Costos)</h3>
              <table className="results-table">
                <tbody>
                  {tablaA.map((fila, i) => (
                    <tr key={i}>
                      {fila.map((valor, j) => (
                        <td key={j} className="table-cell">{valor.toFixed(2)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-wrapper">
              <h3 className="table-title">Tabla R (Raíces)</h3>
              <table className="results-table">
                <tbody>
                  {tablaR.map((fila, i) => (
                    <tr key={i}>
                      {fila.map((valor, j) => (
                        <td key={j} className="table-cell">{valor}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {arbol && (
          <div className="tree-container">
            <h2 className="tree-title">Árbol Generado</h2>
            <div className="tree-visualization">{renderArbol(arbol)}</div>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

export default ArbolesBinarios;