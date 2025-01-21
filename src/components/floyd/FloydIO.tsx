import React from 'react';

const FloydIO = ({ matrix, nodeCount, onImport }) => {
  // Función auxiliar para reemplazar Infinity con un token especial
  const replacer = (key, value) => {
    if (value === Infinity) return "INF";
    if (value === -Infinity) return "-INF";
    return value;
  };

  // Función auxiliar para restaurar los valores Infinity
  const reviver = (key, value) => {
    if (value === "INF") return Infinity;
    if (value === "-INF") return -Infinity;
    return value;
  };

  const exportData = () => {
    const data = {
      nodeCount: nodeCount,
      matrix: matrix
    };
    
    // Usar el replacer para manejar valores Infinity
    const blob = new Blob([JSON.stringify(data, replacer, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'floyd-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          // Usar el reviver para restaurar valores Infinity
          const data = JSON.parse(e.target.result, reviver);
          if (data.matrix && data.nodeCount) {
            // Validar que la matriz tenga las dimensiones correctas
            if (data.matrix.length === data.nodeCount && 
                data.matrix.every(row => row.length === data.nodeCount)) {
              onImport(data.matrix, data.nodeCount);
            } else {
              alert('Invalid matrix dimensions');
            }
          } else {
            alert('Invalid file format');
          }
        } catch (error) {
          console.error('Error parsing file:', error);
          alert('Error reading file: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
    // Reset file input
    event.target.value = '';
  };

  return (
    <div className="flex justify-center items-center gap-4 my-4 w-full">
      <button
        onClick={exportData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
      >
        Export Data
      </button>
      <label className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer flex items-center">
        Import Data
        <input
          type="file"
          accept=".json"
          onChange={importData}
          className="hidden"
        />
      </label>
    </div>
  );
};


export default FloydIO;