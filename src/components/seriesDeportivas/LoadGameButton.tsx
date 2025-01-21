import React, { useRef } from "react";
import styles from "./styles/LoadGameButton.module.css";

interface LoadGameButtonProps {
  onLoadGame: (gameData: any) => void; // Función para manejar la carga de datos desde un archivo
  //Es donde se almacenan los datos a guardar
  gameData: {
    teamA: string;
    teamB: string;
    homeProb: number;
    awayProb: number;
    games: number;
  };
}

const LoadGameButton: React.FC<LoadGameButtonProps> = ({ onLoadGame, gameData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Maneja el clic en el botón "Cargar juego" y simula un clic en el input oculto
  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  // Maneja el cambio en el input de archivo cuando se selecciona un archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtiene el archivo seleccionado
    if (file && file.name.endsWith(".json")) { // Verifica si es un archivo JSON
      const reader = new FileReader(); // Crea un lector de archivos
      reader.onload = (e) => {
        try {
          const loadedGameData = JSON.parse(e.target?.result as string);
          onLoadGame(loadedGameData); // Llama la función para cargar los datos
        } catch (error) {
          console.error("Error parsing file:", error); 
          alert("Error al cargar el archivo. Asegúrate de que sea un JSON válido.");
        }
      };
      reader.readAsText(file); // Lee el contenido del archivo como texto
    } else {
      alert("Por favor, selecciona un archivo JSON válido.");
    }
  };


  // Maneja el clic en "Guardar juego" para descargar los datos actuales como un archivo JSON
  const handleSaveClick = () => {
    const fileName = `${gameData.teamA}_vs_${gameData.teamB}.json`; // Nombre del archivo generado
    const jsonString = JSON.stringify(gameData, null, 2); // Convierte los datos a formato JSON
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob); // Genera una URL para descargar el archivo
    const link = document.createElement("a"); // Crea un enlace temporal
    link.href = href;
    link.download = fileName; // Establece el nombre del archivo a descargar
    document.body.appendChild(link);
    link.click(); // Simula un clic en el enlace
    document.body.removeChild(link); // Elimina el enlace después de la descarga
  };

  return (
    <div className={styles.container}>
      <button onClick={handleLoadClick} className={styles.button}>
        📤 Cargar juego
      </button>
      <button onClick={handleSaveClick} className={styles.button}>
        📥 Guardar juego
      </button>
      {/* Input de archivo oculto para seleccionar el archivo JSON */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{ display: "none" }}
        aria-label="Cargar juego"
      />
    </div>
  );
};

export default LoadGameButton;
