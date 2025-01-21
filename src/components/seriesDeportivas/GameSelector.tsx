import React from 'react';
import styles from './styles/GameSelector.module.css';

interface GameSelectorProps {
  games: number;
  onChange: (value: number) => void; // Función para manejar cambios en la selección
}


// Componente: Selector de número de juegos
const GameSelector: React.FC<GameSelectorProps> = ({ games, onChange }) => {
  const options = [3, 5, 7, 9, 11];

  return (
    <div className={styles.gameSelectorContainer}>
      <label className={styles.label}>Número de juegos:</label>
      {/* Selector desplegable para elegir el número de juegos */}
      <select
        value={games}
        onChange={(e) => onChange(parseInt(e.target.value))} 
        className={styles.select}
      >
        {/* Genera una opción para cada número en la lista */}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GameSelector;
