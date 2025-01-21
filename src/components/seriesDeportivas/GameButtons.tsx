import React, { useState, useEffect } from "react";
import styles from "./styles/GameButtons.module.css";

interface GameButtonsProps {
  games: number;
  onGameStatusChange: (status: boolean[]) => void; // Función para actualizar el estado de los juegos
  initialStatus?: boolean[]; 
}

export default function GameButtons({
  games,
  onGameStatusChange,
  initialStatus,
}: GameButtonsProps) {
  const [buttonStates, setButtonStates] = useState<boolean[]>(
    initialStatus || Array(games).fill(true) // Inicializa los botones como "local"
  );


  // Sincroniza el estado de los botones cuando cambian los los juegos
  useEffect(() => {
    if (initialStatus && initialStatus.length === games) {
      setButtonStates(initialStatus);
    } else {
      setButtonStates(Array(games).fill(true));
    }
  }, [games, initialStatus]);

  // Cambia el estado de un botón individual al tocarlo
  const toggleButton = (index: number) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !newButtonStates[index];
    setButtonStates(newButtonStates);
    onGameStatusChange(newButtonStates); // Notifica el cambio
  };

  return (
    <div className={styles.container}>
      {/* Genera un botón por cada juego */}
      {buttonStates.map((isLocal, index) => (
        <button
          key={index}
          className={`${styles.gameButton} ${isLocal ? styles.green : styles.yellow}`}
          onClick={() => toggleButton(index)}
          title={isLocal ? "Local" : "Visita"} // Tooltip para indicar el estado
        >
          {index + 1} {/* Muestra el número del juego */}
        </button>
      ))}
    </div>
  );
}
