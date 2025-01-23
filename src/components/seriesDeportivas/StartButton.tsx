import React from "react";
import styles from "./styles/StartButton.module.css";

interface StartButtonProps {
  onClick: () => void; // Función que se ejecuta al hacer clic en el botón
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.button} title="Iniciar cálculo" > 
      Iniciar
    </button>
  );
};

export default StartButton;
