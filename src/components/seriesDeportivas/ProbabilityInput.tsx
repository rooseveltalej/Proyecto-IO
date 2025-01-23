import React, { useState } from 'react';
import styles from './styles/ProbabilityInput.module.css';

interface ProbabilityInputProps {
  label: string;
  value: number; 
  onChange: (value: number) => void; // Función para manejar cambios en el valor
}

const ProbabilityInput: React.FC<ProbabilityInputProps> = ({ label, value, onChange }) => {
  // Estado local para saber si el valor es válido
  const [isValid, setIsValid] = useState(true);

  // Maneja el cambio en el valor del input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);

    // Validar si el valor está dentro del rango (0 a 1)
    if (newValue >= 0 && newValue <= 1) {
      setIsValid(true); // Marca el estado como válido
      onChange(newValue);
    } else {
      setIsValid(false);
    }
  };

  const handleBlur = () => {
    // Corregir automáticamente el valor si está fuera de rango
    if (value < 0) {
      onChange(0);
    } else if (value > 1) {
      onChange(1);
    }
    setIsValid(true); // Restablecer el estado visual
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur} // Corrige el valor si está fuera del rango permitido al perder el foco
        min="0"
        max="1"
        step="0.01" // Incrementos de 0.01
        className={`${styles.input} ${!isValid ? styles.invalid : ''}`} // Aplica estilos dependiendo de si el valor es válido
      />
    </div>
  );
};

export default ProbabilityInput;
