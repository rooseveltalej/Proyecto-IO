import React, { useState } from 'react';
import styles from './styles/TeamNames.module.css';

interface TeamNamesProps {
  teamA: string;
  teamB: string;
  onChangeTeamA: (name: string) => void; // Función para cambiar el nombre del equipo A
  onChangeTeamB: (name: string) => void; 
}

const TeamNames: React.FC<TeamNamesProps> = ({ teamA, teamB, onChangeTeamA, onChangeTeamB }) => {
  const [editingTeam, setEditingTeam] = useState<string | null>(null); // Equipo que está siendo editado ('A' o 'B')
  const [tempName, setTempName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Inicia el modo de edición para un equipo
  const startEditing = (team: string, name: string) => {
    setEditingTeam(team);
    setTempName(name);
    setError(null);
  };

  // Finaliza el modo de edición y valida el nuevo nombre
  const finishEditing = () => {
    if (tempName.trim() === '') {
      showError('El nombre no puede estar vacío.');
      return;
    }

    if ((editingTeam === 'A' && tempName === teamB) || (editingTeam === 'B' && tempName === teamA)) {
      showError('Los equipos no pueden tener el mismo nombre.');
      return;
    }

    if (editingTeam === 'A') onChangeTeamA(tempName); // Actualiza el nombre del equipo A
    if (editingTeam === 'B') onChangeTeamB(tempName); // Actualiza el nombre del equipo B
    setEditingTeam(null);
  };


  // Muestra un mensaje de error por un tiempo limitado
  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 1500); //1.5 seg
  };

  return (
    <div className={styles.container}>
      {/* Entrada de edición para el equipo A */}
      {editingTeam === 'A' ? (
        <div className={styles.inputWrapper}>
          <input
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={finishEditing}
            onKeyPress={(e) => e.key === 'Enter' && finishEditing()}
            autoFocus
            className={styles.input}
          />
          {/* Muestra el mensaje de error */}
          {error && <div className={styles.error}>{error}</div>}
        </div>
      ) : (
        <span className={styles.teamName} onClick={() => startEditing('A', teamA)}>
          {teamA}
        </span>
      )}
      <span className={styles.vs}>VS</span>
      {/* Entrada de edición para el equipo B */}
      {editingTeam === 'B' ? (
        <div className={styles.inputWrapper}>
          <input
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={finishEditing}
            onKeyPress={(e) => e.key === 'Enter' && finishEditing()}
            autoFocus
            className={styles.input}
          />
          {error && <div className={styles.error}>{error}</div>}
        </div>
      ) : (
        <span className={styles.teamName} onClick={() => startEditing('B', teamB)}>
          {teamB}
        </span>
      )}
    </div>
  );
};

export default TeamNames;
