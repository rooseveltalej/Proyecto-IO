import React, { useState } from "react";
import "../components/mochila/style.css";
import KnapsackTable from "../components/mochila/Table";

type VariableArray = number[];

const KnapsackOptions: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [limit, setLimit] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [objective, setObjective] = useState<string>("");
  const [numVariables, setNumVariables] = useState<number>(0);
  const [mochilaLimit, setMochilaLimit] = useState<number>(0);
  const [variableWeights, setVariableWeights] = useState<VariableArray>([]);
  const [variableValues, setVariableValues] = useState<VariableArray>([]);
  const [representation, setRepresentation] = useState<JSX.Element | null>(
    null
  );
  const [mergedTable, setMergedTable] = useState<JSX.Element | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value;
    setSelectedOption(option);
    setLimit(option === "0/1 Knapsack" ? "1" : "");
    setError("");
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (
      selectedOption !== "Unbounded Knapsack" &&
      (value === "" || parseInt(value, 10) > 0)
    ) {
      setLimit(value);
      setError("");
    } else if (selectedOption === "Unbounded Knapsack") {
      setLimit("");
    } else {
      setError("The limit must be greater than 0.");
    }
  };

  const handleObjectiveChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setObjective(event.target.value);
  };

  const handleWeightChange = (index: number, value: number) => {
    const updatedWeights = [...variableWeights];
    updatedWeights[index] = value;
    setVariableWeights(updatedWeights);
  };

  const handleValueChange = (index: number, value: number) => {
    const updatedValues = [...variableValues];
    updatedValues[index] = value;
    setVariableValues(updatedValues);
  };

  const loadTestData = () => {
    setNumVariables(4);
    setMochilaLimit(12);
    setVariableWeights([4, 6, 2, 5]);
    setVariableValues([6, 15, 7, 9]);
    setLimit("3");
  };

  const solveKnapsack = () => {
    const dp: number[][] = Array(mochilaLimit + 1)
      .fill(objective === "Maximizar" ? 0 : Infinity)
      .map(() =>
        Array(numVariables + 1).fill(objective === "Maximizar" ? 0 : Infinity)
      );
    const count: number[][] = Array(mochilaLimit + 1)
      .fill(0)
      .map(() => Array(numVariables + 1).fill(0));
    const values: number[][] = Array(mochilaLimit + 1)
      .fill(0)
      .map(() => Array(numVariables + 1).fill(0));

    if (objective === "Minimizar") {
      dp[0].fill(0);
    }

    for (let i = 1; i <= numVariables; i++) {
      for (let w = 0; w <= mochilaLimit; w++) {
        dp[w][i] = dp[w][i - 1];
        values[w][i] = values[w][i - 1];

        const maxK =
          selectedOption === "0/1 Knapsack"
            ? 1
            : selectedOption === "Bounded Knapsack"
            ? parseInt(limit, 10)
            : Math.floor(w / variableWeights[i - 1]);

        for (let k = 0; k <= maxK; k++) {
          if (k * variableWeights[i - 1] <= w) {
            const newValue =
              k * variableValues[i - 1] +
              dp[w - k * variableWeights[i - 1]][i - 1];

            if (
              (objective === "Maximizar" && newValue > dp[w][i]) ||
              (objective === "Minimizar" && newValue < dp[w][i])
            ) {
              dp[w][i] = newValue;
              count[w][i] = k;
              values[w][i] = newValue;
            }
          }
        }
      }
    }

    setMergedTable(
      <KnapsackTable
        values={values}
        count={count}
        numVariables={numVariables}
        mochilaLimit={mochilaLimit}
        objective={objective}
      />
    );
  };

  const handleSave = () => {
    const config = {
      selectedOption,
      limit,
      objective,
      numVariables,
      mochilaLimit,
      variableWeights,
      variableValues,
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "knapsack_config.json";
    link.click();
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const config = JSON.parse(e.target?.result as string);
        setSelectedOption(config.selectedOption);
        setLimit(config.limit);
        setObjective(config.objective);
        setNumVariables(config.numVariables);
        setMochilaLimit(config.mochilaLimit);
        setVariableWeights(config.variableWeights);
        setVariableValues(config.variableValues);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      selectedOption === "Bounded Knapsack" &&
      (!limit || parseInt(limit, 10) <= 0)
    ) {
      setError("Please enter a valid limit greater than 0.");
      return;
    }

    const valueEquation = variableValues
      .map((value, index) => `${value}x${index + 1}`)
      .join(" + ");

    const weightEquation = variableWeights
      .map((weight, index) => `${weight}x${index + 1}`)
      .join(" + ");

    const representationHTML = (
      <div style={{ marginTop: "20px", fontFamily: "Arial, sans-serif" }}>
        <h3>Representación</h3>
        <p style={{ color: "yellow" }}>
          <strong>Z = {valueEquation}</strong>
        </p>
        <p style={{ color: "white" }}>
          <strong>
            {weightEquation} ≤ {mochilaLimit}
          </strong>
        </p>
      </div>
    );

    setRepresentation(representationHTML);
    solveKnapsack();
  };

  return (
    <div className="header-font">
      <div>
        <h1 style={{ marginBottom: "40px" }}>Problema de la mochila</h1>
      </div>
      <h2>Select Knapsack Type</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              value="0/1 Knapsack"
              checked={selectedOption === "0/1 Knapsack"}
              onChange={handleOptionChange}
            />
            0/1 Knapsack
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Bounded Knapsack"
              checked={selectedOption === "Bounded Knapsack"}
              onChange={handleOptionChange}
            />
            Bounded Knapsack
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Unbounded Knapsack"
              checked={selectedOption === "Unbounded Knapsack"}
              onChange={handleOptionChange}
            />
            Unbounded Knapsack
          </label>
        </div>
        {selectedOption !== "Unbounded Knapsack" && (
          <div style={{ marginTop: "10px" }}>
            <label>
              Límite de objetos:
              <input
                type="number"
                value={limit}
                onChange={handleLimitChange}
                style={{ marginLeft: "10px" }}
                min="1"
              />
            </label>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        )}
        <h3>Select Objective</h3>
        <div>
          <label>
            <input
              type="radio"
              value="Maximizar"
              checked={objective === "Maximizar"}
              onChange={handleObjectiveChange}
            />
            Maximizar
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="Minimizar"
              checked={objective === "Minimizar"}
              onChange={handleObjectiveChange}
            />
            Minimizar
          </label>
        </div>

        <h3>Configuración Adicional</h3>
        <div style={{ marginTop: "10px" }}>
          <label>
            Cantidad de variables:
            <input
              type="number"
              value={numVariables}
              onChange={(e) => setNumVariables(Number(e.target.value) || 0)}
              style={{ marginLeft: "10px" }}
              min="1"
            />
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>
            Límite de la mochila:
            <input
              type="number"
              value={mochilaLimit}
              onChange={(e) => setMochilaLimit(Number(e.target.value) || 0)}
              style={{ marginLeft: "10px" }}
              min="1"
            />
          </label>
        </div>

        {Array.from({ length: numVariables }, (_, index) => (
          <div key={index} style={{ marginTop: "10px" }}>
            <h4>Variable {index + 1}</h4>
            <div>
              <label>
                Peso:
                <input
                  type="number"
                  value={variableWeights[index] || ""}
                  style={{ marginLeft: "10px" }}
                  onChange={(e) =>
                    handleWeightChange(index, Number(e.target.value) || 0)
                  }
                />
              </label>
            </div>
            <div style={{ marginTop: "10px" }}>
              <label>
                Valor:
                <input
                  type="number"
                  value={variableValues[index] || ""}
                  style={{ marginLeft: "10px" }}
                  onChange={(e) =>
                    handleValueChange(index, Number(e.target.value) || 0)
                  }
                />
              </label>
            </div>
          </div>
        ))}

        <div style={{ marginTop: "20px" }}>
          <button
            type="button"
            onClick={handleSave}
            className="download-button"
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e76f00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#fd7e14")}
          >
            Descargar Configuración
          </button>

          <button
            type="button"
            onClick={() => document.getElementById("load-config").click()}
            style={{
              marginTop: "20px",
              backgroundColor: "#007bff",
              color: "white",
              fontSize: "18px",
              padding: "12px 24px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Cargar configuración
          </button>
          <input
            type="file"
            id="load-config"
            accept=".json"
            style={{ display: "none" }}
            onChange={handleLoad}
          />
        </div>
        <button
          type="submit"
          className="button-generate-table"
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Generar Tabla
        </button>
      </form>
      {representation}
      {/* {table} */}
      {mergedTable}
    </div>
  );
};

export default KnapsackOptions;
